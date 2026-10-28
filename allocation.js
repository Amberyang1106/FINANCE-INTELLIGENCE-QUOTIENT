/* ISG Service calculations. All monetary values are integer cents. */
(function (root) {
  'use strict';
  var segments = ['B0', 'GA', 'LE', 'SMBMM'];
  var zero = function () { return Object.fromEntries(segments.map(function (s) { return [s, 0]; })); };
  var total = function (values) { return Object.values(values).reduce(function (a, b) { return a + b; }, 0); };
  function allocate(pool, base, hasRevenue) {
    var result = zero();
    if (!hasRevenue) { result.B0 = pool; return result; }
    var denominator = total(base);
    if (denominator <= 0) throw new Error('The demo does not define a zero or negative total revenue base.');
    segments.forEach(function (s) {
      var numerator = BigInt(pool) * BigInt(base[s]);
      // The approved fixture divides exactly; a different dataset needs an agreed rounding policy.
      if (numerator % BigInt(denominator) !== 0n) throw new Error('This dataset requires a rounding policy before allocation.');
      result[s] = Number(numerator / BigInt(denominator));
    });
    return result;
  }
  function calculate(data, excludedIds) {
    excludedIds = excludedIds || [];
    var scope = data.scope;
    var rows = data.source_rows.filter(function (r) {
      return r.profit_center === scope.profit_center && r.company_code === scope.company_code && scope.periods.includes(r.period) && r.non_alloc_flg !== 'Y';
    });
    var rev = rows.filter(function (r) { return r.checking_flg === 'AL' && ['AMTREV', 'IMMDREV', 'GTN'].includes(r.svc_catg_cd); });
    var cost = rows.filter(function (r) { return !r.checking_flg && ['BMC', 'NBMC'].includes(r.svc_catg_cd); });
    function amount(r) { var value = r.geo_cd === 'PRC' ? r.amt_lc_cents : r.amt_cents; if (!Number.isSafeInteger(value)) throw new Error('Invalid money amount.'); return value; }
    var months = scope.periods.map(function (period, index) {
      var m = {period: period, revenue: zero(), base: zero(), copy: zero(), pool: 0, allocation: zero(), cost: zero(), gp: zero(), aMissing: 0};
      var monthRev = rev.filter(function (r) { return r.period === period; });
      monthRev.forEach(function (r) {
        if (!segments.includes(r.bpc_seg_cd)) throw new Error('Revenue has an unsupported or missing BPC segment.');
        m.revenue[r.bpc_seg_cd] += amount(r);
        if (!excludedIds.includes(r.record_id)) m.base[r.bpc_seg_cd] += amount(r);
      });
      cost.filter(function (r) { return r.period === period; }).forEach(function (r) {
        var segment = r.bpc_seg_cd;
        if (!segment && r.alloc_flg === 'A') m.aMissing += 1;
        if (!segment && r.alloc_flg === 'B' && r.gtm_lv2) segment = {SM: 'B0', MM: 'SMBMM'}[r.gtm_lv2] || r.gtm_lv2;
        if (segment) {
          if (!segments.includes(segment)) throw new Error('Unsupported cost segment.');
          m.copy[segment] += amount(r);
        } else m.pool += amount(r);
      });
      m.hasRevenue = monthRev.some(function (r) { return !excludedIds.includes(r.record_id); });
      if (index < 2) {
        var historical = data.monthly_inputs.find(function (h) { return h.period === period; });
        if (!historical || !historical.executed_allocation_cents) throw new Error('Executed allocation history is missing.');
        m.allocation = Object.assign(zero(), historical.executed_allocation_cents);
        if (total(m.allocation) !== m.pool) throw new Error('Executed allocation does not reconcile to its pool.');
      }
      return m;
    });
    var quarter = {revenue: zero(), base: zero(), copy: zero(), allocation: zero(), cost: zero(), gp: zero(), pool: 0};
    months.forEach(function (m) {
      quarter.pool += m.pool;
      segments.forEach(function (s) { ['revenue', 'base', 'copy'].forEach(function (key) { quarter[key][s] += m[key][s]; }); });
    });
    quarter.allocation = allocate(quarter.pool, quarter.base, months.some(function (m) { return m.hasRevenue; }));
    var prior = zero();
    segments.forEach(function (s) {
      prior[s] = months[0].allocation[s] + months[1].allocation[s];
      months[2].allocation[s] = quarter.allocation[s] - prior[s];
      months.forEach(function (m) { m.cost[s] = m.copy[s] + m.allocation[s]; m.gp[s] = m.revenue[s] - m.cost[s]; });
      quarter.cost[s] = quarter.copy[s] + quarter.allocation[s];
      quarter.gp[s] = quarter.revenue[s] - quarter.cost[s];
    });
    var rates = function (base) { var t = total(base); return Object.fromEntries(segments.map(function (s) { return [s, t > 0 ? base[s] / t : null]; })); };
    quarter.rates = rates(quarter.base);
    months.forEach(function (m, index) { m.rates = index === 2 ? quarter.rates : rates(m.base); });
    if (total(months[2].allocation) !== months[2].pool || total(quarter.allocation) !== quarter.pool) throw new Error('The cost pool does not reconcile.');
    return {months: months, quarter: quarter, prior: prior, revenueRows: rev, costRows: cost, segments: segments, total: total};
  }
  root.ISGAllocation = {calculate: calculate, allocate: allocate, total: total, segments: segments};
})(globalThis);
