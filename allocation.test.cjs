const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'ISG-SERVICE-DEMO-DATA.json'), 'utf8'));
const context = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(__dirname, 'allocation.js'), 'utf8'), context);
const model = context.ISGAllocation;
const plain = value => JSON.parse(JSON.stringify(value));
const copy = () => structuredClone(data);
let checks = 0;
function equal(actual, expected, message) { assert.deepEqual(plain(actual), plain(expected), message); checks++; }
for (const [name, ids] of [['before', []], ['after', data.scenario.excluded_revenue_base_record_ids]]) {
  const result = model.calculate(data, ids);
  const gold = data.results[name];
  for (const [actual, expected] of [[result.quarter.base, gold.quarter_base_cents], [result.quarter.allocation, gold.quarter_target_allocation_cents], [result.prior, gold.prior_executed_allocation_cents], [result.months[2].allocation, gold.month3_true_up_cents], [result.months[2].cost, gold.month3_cost_after_cents], [result.months[2].gp, gold.month3_gp_cents], [result.quarter.cost, gold.quarter_cost_after_cents], [result.quarter.gp, gold.quarter_gp_cents]]) equal(actual, expected, name);
  for (const m of result.months) {
    equal(model.total(m.allocation), m.pool, 'Pool conserved');
    equal(model.total(m.cost), model.total(m.copy) + m.pool, 'Copy plus pool');
  }
}
const baseline = model.calculate(data);
const revised = model.calculate(data, data.scenario.excluded_revenue_base_record_ids);
equal(baseline.months.slice(0,2), revised.months.slice(0,2), 'Executed months unchanged');
equal(baseline.months[2].revenue, revised.months[2].revenue, 'Booked revenue unchanged');
equal(model.total(baseline.months[2].gp), model.total(revised.months[2].gp), 'Total GP unchanged');
equal(baseline.months[0].copy.B0, 267514, 'SM maps to B0');
equal(baseline.months[0].copy.SMBMM, 267514, 'MM maps to SMBMM');
const filtered = copy();
filtered.source_rows.push({...filtered.source_rows[0], record_id:'ignored-rev', non_alloc_flg:'Y', amt_cents:999999});
filtered.source_rows.push({...filtered.source_rows[4], record_id:'ignored-cost', non_alloc_flg:'Y', amt_cents:999999});
filtered.source_rows.push({...filtered.source_rows[4], record_id:'already-allocated-cost', checking_flg:'AL', amt_cents:999999});
equal(model.calculate(filtered).quarter, baseline.quarter, 'Excluded rows and AL cost do not reenter the pool');
const prc = copy();
prc.source_rows.forEach(r => { r.geo_cd='PRC'; r.amt_cents=123; });
equal(model.calculate(prc).quarter, baseline.quarter, 'PRC selects amt_lc rather than amt');
const precedence = copy();
precedence.source_rows.filter(r => r.record_id.startsWith('COST-') && r.bpc_seg_cd==='GA').forEach(r => { r.alloc_flg='B';r.gtm_lv2='SM'; });
equal(model.calculate(precedence).quarter, baseline.quarter, 'Existing BPC wins over GTM mapping');
const missingA = copy();
missingA.source_rows.filter(r => r.record_id.startsWith('POOL-') && r.svc_catg_cd==='BMC').forEach(r => { r.alloc_flg='A'; });
equal(model.calculate(missingA).months.map(m=>m.aMissing), [1,1,1], 'A missing dimension is detected');
equal(model.calculate(missingA).quarter, baseline.quarter, 'Missing-A pool remains included');
equal(model.allocate(12345, {B0:0,GA:0,LE:0,SMBMM:0}, false), {B0:12345,GA:0,LE:0,SMBMM:0}, 'No rows defaults to B0');
assert.throws(() => model.allocate(12345, {B0:0,GA:0,LE:0,SMBMM:0}, true), /zero or negative/); checks++;
const source = JSON.stringify(data);
model.calculate(data, data.scenario.excluded_revenue_base_record_ids);
equal(JSON.stringify(data),source,'Input snapshot is not mutated');
const browser = {window:{}};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'demo-data.js'),'utf8'),browser);
equal(browser.window.ISG_DEMO,data,'Browser snapshot matches JSON');
console.log(checks + ' financial calculation and data checks passed.');
