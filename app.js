/* Local interactive demo; all analysis responses use the reviewed sample. */
(function () {
  'use strict';
  var data = window.ISG_DEMO;
  var engine = window.ISGAllocation;
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (v) { return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); };
  if (!data || !engine) { $('main').innerHTML = '<p class="demo-banner">' + esc($('loadFailure').textContent) + '</p>'; return; }
  var segments = engine.segments;
  var sum = engine.total;
  var money = function (c) { return new Intl.NumberFormat('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).format(c / 100).replace('-', '−'); };
  var signed = function (c) { return (c > 0 ? '+' : '') + money(c); };
  var rate = function (n) { return n == null ? 'No base' : (n * 100).toFixed(4) + '%'; };
  var cls = function (c) { return c < 0 ? 'negative' : ''; };
  var baseline, adjusted;
  try { baseline = engine.calculate(data); adjusted = engine.calculate(data, data.scenario.excluded_revenue_base_record_ids); }
  catch (error) { $('main').innerHTML = '<p class="demo-banner">Unable to calculate this sample: ' + esc(error.message) + '</p>'; return; }
  var voucher = data.source_rows.find(function (r) { return data.scenario.excluded_revenue_base_record_ids.includes(r.record_id); });
  var closing = data.scope.periods[2];
  var original = baseline.months[2];
  var revised = adjusted.months[2];
  var storageKey = 'isg-allocation-demo:L0AUXG:1.33757:v1';
  var state = {view:'monitor',period:closing,segment:'GA',status:'idle',stage:0,exclude:false,notes:'',actions:['contact','offset','segment'],plan:null,report:null,lastQuestion:'',followup:''};
  var timer, toastTimer, storageAvailable = true;
  try {
    var saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
    if (saved && saved.version === 1 && saved.scope === data.scope.profit_center && saved.plan && saved.plan.exclude === true && Array.isArray(saved.plan.actions)) {
      state.plan = saved.plan; state.exclude = true; state.notes = String(saved.plan.notes || '');
      state.actions = saved.plan.actions.filter(function (a) { return ['contact','offset','segment','fx'].includes(a); });
      state.report = saved.report && saved.report.plan && Array.isArray(saved.report.plan.actions) && typeof saved.report.generatedAt === 'string' ? saved.report : null;
    }
  } catch (_) { storageAvailable = false; }
  function notify(text) { clearTimeout(toastTimer); $('toast').textContent = text; $('toast').classList.add('show'); toastTimer = setTimeout(function () { $('toast').classList.remove('show'); }, 4500); }
  function persist() {
    try { localStorage.setItem(storageKey, JSON.stringify({version:1,scope:data.scope.profit_center,plan:state.plan,report:state.report})); storageAvailable = true; return true; }
    catch (_) { storageAvailable = false; return false; }
  }
  var monitorAnimations = [], monitorMotionTimer, monitorShown = false;
  function finishMonitorMotion() {
    clearTimeout(monitorMotionTimer);
    monitorAnimations.forEach(function (animation) { animation.cancel(); });
    monitorAnimations = [];
    $('monitorLoadStatus').classList.remove('is-loading');
    $('monitorLoadStatus').textContent = 'Sample allocation ready · USD';
    $('monitorView').setAttribute('aria-busy','false');
  }
  function animateMonitor(mode) {
    finishMonitorMotion();
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || typeof $('monitorMetrics').animate !== 'function') return;
    var targets = mode === 'entry'
      ? Array.from(document.querySelectorAll('#monitorMetrics > div, #ledgerTable tbody tr, #ledgerTable tfoot tr, #monitorAlerts > *'))
      : [$('monitorMetrics'), $('ledgerTable'), $('monitorAlerts')];
    if (mode === 'entry') {
      $('monitorLoadStatus').textContent = 'Preparing sample allocation view…';
      $('monitorLoadStatus').classList.add('is-loading');
      $('monitorView').setAttribute('aria-busy','true');
    }
    targets.forEach(function (target,index) {
      var frames = mode === 'entry' ? [{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}] : [{opacity:0},{opacity:1}];
      var animation = target.animate(frames,{duration:mode === 'entry'?340:280,delay:mode === 'entry'?120+index*45:0,easing:'cubic-bezier(0.16,1,0.3,1)',fill:'backwards'});
      monitorAnimations.push(animation);
      animation.finished.then(function () { animation.cancel(); },function () {});
    });
    monitorMotionTimer = setTimeout(finishMonitorMotion,mode === 'entry'?500+targets.length*45:300);
  }
  $('sidebarToggle').addEventListener('click',function () {
    var collapsed = document.querySelector('.app-body').classList.toggle('rail-collapsed');
    this.setAttribute('aria-expanded',String(!collapsed));
    this.setAttribute('aria-label',collapsed?'Expand sidebar':'Collapse sidebar');
    this.title=collapsed?'Expand sidebar':'Collapse sidebar';
    this.querySelector('span').textContent=collapsed?'›':'‹';
    $('railContents').hidden=collapsed;
    document.querySelector('.rail-shortcuts').hidden=!collapsed;
  });
  $('compactNewChat').addEventListener('click',function () { $('sidebarNewChat').click(); });
  function switchView(name) {
    if (!['monitor','analysis','reports','chat','knowledge'].includes(name)) return;
    var enterMonitor = name === 'monitor' && (state.view !== 'monitor' || !monitorShown);
    if (name !== 'monitor') finishMonitorMotion();
    state.view = name;
    ['monitor','analysis','reports','chat','knowledge'].forEach(function (v) { var el = $(v + 'View'); el.hidden = v !== name; el.classList.toggle('active', v === name); });
    document.querySelectorAll('.nav-item').forEach(function (b) { var yes = b.dataset.view === name; b.classList.toggle('active', yes); if (yes) b.setAttribute('aria-current','page'); else b.removeAttribute('aria-current'); });
    var titles = {monitor:['Monitor','Service allocation'],analysis:['Analysis','L0AUXG / Quarter-end'],reports:['Reports','Close record'],chat:['Chat','Report logic'],knowledge:['Knowledge','Report libraries']};
    $('breadcrumb').innerHTML = '<span>' + titles[name][0] + '</span><b>/</b><strong>' + titles[name][1] + '</strong>';
    if (name === 'reports') renderReport();
    var isKnowledge = name === 'chat' || name === 'knowledge';
    document.querySelector('.app-body').classList.toggle('knowledge-mode', isKnowledge);
    document.querySelector('.inspector').hidden = isKnowledge;
    $('commandSearch').querySelector('span').textContent = isKnowledge ? 'Ask about report logic' : 'Ask about this allocation';
    document.dispatchEvent(new CustomEvent('workspace:view', {detail:{name:name}}));
    if (enterMonitor) { monitorShown=true; animateMonitor('entry'); }
  }
  function tab(name, focus) {
    document.querySelectorAll('[data-tab]').forEach(function (b) { var yes = b.dataset.tab === name; b.setAttribute('aria-selected',String(yes)); b.tabIndex = yes ? 0 : -1; $(b.getAttribute('aria-controls')).hidden = !yes; if (yes && focus) b.focus(); });
  }
  function td(value, extra) { return '<td class="numeric ' + (extra || '') + '">' + value + '</td>'; }
  function table(head, body, foot) { return '<table><thead><tr>' + head.map(function (h) { return '<th scope="col">' + h + '</th>'; }).join('') + '</tr></thead><tbody>' + body + '</tbody>' + (foot ? '<tfoot>' + foot + '</tfoot>' : '') + '</table>'; }
  function monitorModel() { return state.period === 'quarter' ? baseline.quarter : baseline.months.find(function (m) { return m.period === state.period; }); }
  function renderMonitor() {
    var model = monitorModel();
    var isQuarter = state.period === 'quarter';
    var isClose = state.period === closing;
    var mode = isQuarter ? 'Quarter cumulative' : isClose ? 'Month 3 true-up' : 'Executed allocation · Locked';
    $('periodSelect').value = state.period;
    $('periodContext').textContent = (isQuarter || isClose ? 'Quarter weights' : 'Monthly weights') + ' · ' + (isQuarter ? 'Quarter totals' : 'Current-period amounts') + ' · USD';
    $('ledgerSubtitle').textContent = (isQuarter ? '2026 Q3' : state.period) + ' · ' + mode + ' · Select a segment to drill down';
    $('monitorMetrics').innerHTML = '<div><dt>GA gross profit · ' + (isQuarter ? 'quarter' : 'period') + '</dt><dd class="' + cls(model.gp.GA) + '">' + money(model.gp.GA) + '</dd><p>USD · Revenue less allocated cost</p></div><div><dt>' + (isClose || isQuarter ? 'GA quarter revenue weight' : 'GA monthly revenue weight') + '</dt><dd>' + rate(model.rates.GA) + '</dd><p>' + (isClose || isQuarter ? 'Months 1–2 reference: 60.0000%' : 'Executed using the monthly base') + '</p></div><div><dt>Total GP · ' + (isQuarter ? 'quarter' : 'period') + '</dt><dd class="' + cls(sum(model.gp)) + '">' + money(sum(model.gp)) + '</dd><p>' + ((isClose || isQuarter) ? 'Includes the posted LE revenue adjustment' : 'Based on locked monthly allocations') + '</p></div>';
    var body = '<tr class="pool-row"><td>To allocate</td>' + td('—') + td('—') + td(money(model.pool)) + td('—') + td('—') + td('—') + '</tr>';
    segments.forEach(function (s) {
      body += '<tr class="' + ((s === 'GA' && isClose) ? 'focus-row' : ((s === 'LE' && (isQuarter || isClose)) ? 'warning-row' : '')) + '"><td><button type="button" class="row-link" data-segment="' + s + '" aria-label="Inspect ' + s + ' revenue base">' + s + '</button></td>' + td(money(model.revenue[s]),cls(model.revenue[s])) + td(rate(model.rates[s]),model.rates[s] < 0 ? 'negative' : '') + td(money(model.copy[s])) + td(money(model.allocation[s]),cls(model.allocation[s])) + td(money(model.cost[s]),cls(model.cost[s])) + td(money(model.gp[s]),cls(model.gp[s])) + '</tr>';
    });
    var foot = '<tr><td>Total</td>' + td(money(sum(model.revenue))) + td('100.0000%') + td(money(sum(model.copy)+model.pool)) + td(money(model.pool)) + td(money(sum(model.cost))) + td(money(sum(model.gp)),cls(sum(model.gp))) + '</tr>';
    $('ledgerTable').innerHTML = table(['BPC segment','Revenue<br>after allocation',(isClose || isQuarter ? 'Quarter' : 'Monthly') + '<br>Rev%','Cost<br>before allocation',isClose ? 'Month 3<br>true-up' : 'Pool<br>allocated','Cost<br>after allocation','GP'],body,foot);
    $('ledgerFootnote').textContent = 'USD · Cost before = copy costs plus the separate unsegmented pool. B0 / SMBMM copy includes SM / MM mapping. ' + (isClose ? 'True-up deducts executed pool allocations only; a negative true-up can be valid.' : isQuarter ? 'Quarter GP is the sum of all three months. The GA negative-GP alert relates to month 3.' : 'Historical results are locked and will not change in the candidate scenario.');
    if (isClose || isQuarter) {
      $('monitorAlerts').innerHTML = '<button type="button" class="alert-card" data-analyze="GA"><span>01 / NEGATIVE GP AT CLOSE</span><strong>GA · ' + money(original.gp.GA) + ' USD</strong><p>2026009 GP is negative. Quarter weight is 85.7143%, up 25.7143pp from months 1–2.</p><b>Investigate GA →</b></button><button type="button" class="alert-card" data-analyze="LE"><span>02 / LINKED REVENUE-BASE SIGNAL</span><strong>LE · Negative quarter base</strong><p>' + money(baseline.quarter.base.LE) + ' USD base. Trace the negative voucher and check its positive counterpart.</p><b>Inspect the linked cause →</b></button>';
    } else $('monitorAlerts').innerHTML = '<div class="info-box">No negative segment GP in this locked period. The linked case occurs in 2026009.<br><button type="button" class="row-link" data-period-close>Review month 3 true-up →</button></div>';
    $('segmentPanel').hidden = true;
  }
  function showSegment(segment) {
    var rows = baseline.revenueRows.filter(function (r) { return r.bpc_seg_cd === segment; });
    $('segmentTitle').textContent = segment + ' · Quarter revenue-base detail';
    $('segmentSubtitle').textContent = '2026007–2026009 · L0AUXG · USD · All rows contribute to the original quarter base';
    $('segmentRows').innerHTML = table(['Period','Document','Category','Revenue','User'], rows.map(function (r) { return '<tr><td>' + r.period + '</td><td><button type="button" class="row-link" data-document="' + esc(r.record_id) + '">' + esc(r.document_number) + '</button></td><td>' + esc(r.svc_catg_cd) + '</td>' + td(money(r.amt_cents),cls(r.amt_cents)) + '<td>' + esc(r.user_info) + '</td></tr>'; }).join(''), '<tr><td colspan="3">Quarter base</td>' + td(money(baseline.quarter.base[segment]),cls(baseline.quarter.base[segment])) + '<td></td></tr>');
    $('segmentPanel').hidden = false;
    $('segmentPanel').scrollIntoView({block:'nearest',behavior:'smooth'});
  }
  function positiveRows() { return baseline.revenueRows.filter(function (r) { return r.amt_cents > 0; }); }
  function openVoucher(id) {
    var row = data.source_rows.find(function (r) { return r.record_id === id; });
    if (!row) return;
    var focal = row.record_id === voucher.record_id;
    $('voucherTitle').textContent = 'Document ' + row.document_number;
    var fields = [['Company / year / line',row.company_code + ' / ' + row.fiscal_year + ' / ' + row.line_item],['Period',row.period],['Profit center',row.profit_center],['BPC segment',row.bpc_seg_cd],['Category / allocation flag',row.svc_catg_cd + ' / ' + row.alloc_flg],['User info',row.user_info],['Reference',row.reference || 'Not supplied'],['Checking / non-allocation flag',String(row.checking_flg || '(blank)') + ' / ' + (row.non_alloc_flg || '(blank)')]];
    $('voucherContent').innerHTML = '<p class="voucher-amount ' + cls(row.amt_cents) + '">' + money(row.amt_cents) + ' <small>USD</small></p><dl class="voucher-ledger">' + fields.map(function (f) { return '<div><dt>' + f[0] + '</dt><dd>' + esc(f[1]) + '</dd></div>'; }).join('') + '<div class="wide"><dt>Document text</dt><dd>' + esc(row.document_text) + '</dd></div></dl>' + (focal ? '<div class="info-box"><strong>Manual entry · Demo assumption</strong><br>The supplied username is yangtt16. The manual-entry classification is part of this sample, not inferred from the username.</div><h3>Positive-entry check</h3><p class="small">' + positiveRows().length + ' positive revenue records checked across all four segments in this quarter and profit center. No positive record shares reference ' + esc(voucher.reference) + '; no single positive amount equals the adjustment. Routine revenue with another reference is not a confirmed offset.</p><p class="scenario-note">Cross-period or one-to-many offsets still require finance review. Original and reporting currency are both USD in this sample; no FX residual has been established.</p><button type="button" class="key key-primary" data-voucher-scenario>Compare exclusion from base</button>' : '<p class="small muted">Routine sample revenue. A matching segment alone does not establish an offset relationship.</p>');
    $('voucherDialog').showModal();
  }
  var actionDefinitions = [
    {id:'contact',title:'Contact the posting user',text:'Ask yangtt16 about the entry background and reference 5900018392. Request the expected positive voucher.'},
    {id:'offset',title:'Verify the positive counterpart',text:'Extend the search if needed. The sample-quarter check does not prove that no offset exists elsewhere.'},
    {id:'segment',title:'Check the LE segment assignment',text:'Compare the source document and business ownership before deciding whether a segment correction is needed.'},
    {id:'fx',title:'Check currency differences if relevant',text:'No FX residual is evidenced in this USD-only sample. Request original-currency details for a real case.'}
  ];
  function renderActions() {
    $('actionsContent').innerHTML = actionDefinitions.map(function (a) { return '<article class="action-row"><label><input type="checkbox" data-action="' + a.id + '" ' + (state.actions.includes(a.id) ? 'checked' : '') + '><span>' + a.title + '</span></label><p>' + a.text + '</p></article>'; }).join('') + '<article class="action-row"><h3>Evaluate a base exclusion</h3><p>Compare all segments, then save a candidate for finance review.</p><button type="button" class="quiet-key full-width" data-open-scenario>Compare candidate →</button></article>';
  }
  function renderEvidence() {
    $('evidenceStatus').textContent = state.status === 'complete' ? 'Calculation traced · Business rationale still needs finance review.' : 'Available sample evidence · Run the investigation to trace the calculation.';
    $('evidenceContent').innerHTML = '<div class="cause-root"><span>GA / 2026009 gross profit</span><strong>' + money(original.gp.GA) + ' USD</strong></div><div class="cause-row"><span>01</span><div><strong>GA quarter weight: 85.7143%</strong><small>Quarter target ' + money(baseline.quarter.allocation.GA) + '<br>Less executed: ' + money(baseline.prior.GA) + '</small></div><b>Sample</b></div><div class="cause-row"><span>02</span><div><strong>LE reduces the denominator</strong><small>Quarter base ' + money(baseline.quarter.base.LE) + '<br>Cost pool totals still reconcile.</small></div><b>Sample</b></div><button type="button" class="evidence-voucher" data-document="' + esc(voucher.record_id) + '"><small>VOUCHER ' + esc(voucher.document_number) + ' · LE</small><strong>' + money(voucher.amt_cents) + '</strong><span>Open document evidence →</span></button><div class="cause-row"><span>03</span><div><strong>Counterpart not confirmed</strong><small>' + positiveRows().length + ' positive records in this sample-quarter scope. No matching reference.</small></div><b class="negative">Review</b></div><p class="scenario-note">Negative GP and negative weights are investigation signals. They do not establish that the posting is wrong.</p><button type="button" class="quiet-key full-width" data-open-actions>Review recommended actions</button>';
  }
  function renderScenario() {
    var active = state.exclude ? adjusted : baseline;
    var m = active.months[2];
    $('excludeBase').checked = state.exclude;
    $('scenarioContent').innerHTML = '<div class="scenario-result"><span>GA / 2026009 GP · ' + (state.exclude ? 'candidate' : 'original') + '</span><strong>' + money(m.gp.GA) + '</strong><small>USD · ' + (state.exclude ? signed(m.gp.GA-original.gp.GA) + ' change from original' : 'Select the exclusion to compare') + '</small></div><dl class="mini-comparison"><div><dt>GA quarter weight</dt><dd>85.7143% → ' + rate(active.quarter.rates.GA) + '</dd></div><div><dt>GA month 3 true-up · USD</dt><dd>' + money(original.allocation.GA) + ' → ' + money(m.allocation.GA) + '</dd></div><div><dt>LE month 3 GP · USD</dt><dd class="negative">' + money(original.gp.LE) + ' → ' + money(m.gp.LE) + '</dd></div><div><dt>Total month 3 GP · USD</dt><dd>' + money(sum(m.gp)) + ' · unchanged</dd></div></dl><p class="scenario-note">Posted revenue stays unchanged. LE remains unresolved. The candidate reallocates cost across segments; it does not increase total profit.</p>';
    $('decisionNotes').value = state.notes;
    $('savePlan').disabled = !state.exclude;
    $('saveStatus').textContent = state.plan ? ('Candidate saved ' + new Date(state.plan.savedAt).toLocaleString('en-GB') + '. ' + (storageAvailable ? 'Stored in this browser.' : 'Session only; browser storage is unavailable.') + (planChanged() ? ' Current selections have unsaved changes.' : '')) : (state.exclude ? 'Save the candidate with its assumptions and selected follow-ups.' : 'Select the exclusion to save this candidate.');
    $('generateReport').disabled = !state.plan;
  }
  function planChanged() { return state.plan && (state.exclude !== state.plan.exclude || state.notes !== state.plan.notes || JSON.stringify(state.actions) !== JSON.stringify(state.plan.actions)); }
  function comparisonTable() {
    var m = state.exclude ? revised : original;
    var model = state.exclude ? adjusted : baseline;
    var body = segments.map(function (s) { return '<tr><td>' + s + '</td>' + td(rate(baseline.quarter.rates[s])) + td(rate(model.quarter.rates[s])) + td(money(original.cost[s])) + td(money(m.cost[s])) + td(money(original.gp[s]),cls(original.gp[s])) + td(money(m.gp[s]),cls(m.gp[s])) + td(signed(m.gp[s]-original.gp[s]),cls(m.gp[s]-original.gp[s])) + '</tr>'; }).join('');
    return table(['Segment','Original<br>quarter Rev%','Selected<br>quarter Rev%','Original<br>Cost','Selected<br>Cost','Original<br>GP','Selected<br>GP','GP change'],body,'<tr><td>Total</td>' + td('100%') + td('100%') + td(money(sum(original.cost))) + td(money(sum(m.cost))) + td(money(sum(original.gp)),cls(sum(original.gp))) + td(money(sum(m.gp)),cls(sum(m.gp))) + td('0.00') + '</tr>');
  }
  function showComparison() {
    $('comparisonContent').innerHTML = '<p class="small muted">L0AUXG · 2026009 amounts · USD · ' + (state.exclude ? 'Voucher excluded from the base only' : 'Original base retained') + '</p><div class="table-scroll" tabindex="0" aria-label="All segment scenario results">' + comparisonTable() + '</div><div class="info-box">Months 1–2 stay locked. Booked revenue stays unchanged. Quarter total GP remains ' + money(sum(baseline.quarter.gp)) + ' USD.</div><p class="small">LE retains its posted negative revenue. Its lower GP in the exclusion candidate must remain visible in the close review.</p>';
    $('comparisonDialog').showModal();
  }
  function prepareAnalysis(segment) {
    state.segment = segment || 'GA'; state.period = closing; renderMonitor();
    $('analysisTitle').textContent = state.segment === 'LE' ? 'Why is the LE revenue base negative?' : 'Why did GA GP turn negative?';
    $('caseSegment').textContent = state.segment + ' → all segments';
    $('analysisPrompt').value = state.segment === 'LE' ? 'Trace the negative LE revenue base to its source voucher and check the positive counterpart.' : 'Why did GA GP turn negative after the month 3 true-up? Trace the revenue base and source voucher.';
    switchView('analysis'); $('analysisPrompt').focus();
  }
  function followupText(question) {
    if (/exchange|currency|\bfx\b/i.test(question)) return 'The sample uses USD for both original and reporting amounts. No FX residual is evidenced. Currency differences remain a review question for real source documents.';
    if (/offset|counterpart|positive|reference/i.test(question)) return 'The sample contains 12 positive revenue records across the quarter and all four segments. None shares reference 5900018392. Routine LE revenue has different references; cross-period and one-to-many matching still require review.';
    if (/manual|user|yangtt16/i.test(question)) return 'The voucher user is yangtt16. Manual posting is an explicit sample assumption; the username itself is not evidence of a manual entry.';
    if (/quarter.*gp|total.*gp|profit.*total/i.test(question)) return 'Quarter total GP remains ' + money(sum(baseline.quarter.gp)) + ' USD. Month 3 total GP remains ' + money(sum(original.gp)) + ' USD. Excluding the voucher from the base redistributes cost; the posted revenue adjustment remains.';
    if (/scenario|exclude|improve|plan|report/i.test(question)) return 'Compare the voucher exclusion in Scenario. GA month 3 GP changes from ' + money(original.gp.GA) + ' to ' + money(revised.gp.GA) + ' USD, while LE changes to ' + money(revised.gp.LE) + ' USD. Save a candidate before generating a report.';
    return 'Within this fixed sample, the LE adjustment changes the quarter revenue denominator and therefore the GA allocation. The calculation below traces that effect; entry validity and allocation-policy eligibility still need finance review.';
  }
  function renderAnalysis() {
    $('runStatus').textContent = state.status === 'running' ? 'Tracing ' + Math.min(state.stage+1,4) + ' / 4' : state.status === 'complete' ? 'Traced · Review open' : 'Ready';
    $('runStatus').className = 'pill' + (state.status === 'complete' ? ' success' : '');
    $('sendButton').disabled = state.status === 'running';
    if (state.status === 'idle') return;
    var steps = [['Check the allocation rules','Copy costs first; hold months 1–2 executed allocations fixed.'],['Reconcile the GA true-up','Quarter target ' + money(baseline.quarter.allocation.GA) + ' less executed ' + money(baseline.prior.GA) + ' USD.'],['Trace the quarter revenue base','LE contributes ' + money(baseline.quarter.base.LE) + ' USD to the denominator.'],['Inspect the negative voucher','5900018271 · ' + positiveRows().length + ' positive records checked in the sample scope.']];
    var list = steps.map(function (s,i) { var done = state.status === 'complete' || i < state.stage; return '<li class="' + (done ? 'done' : i === state.stage ? 'current' : '') + '"><span>' + (done ? '✓' : i+1) + '</span><div><strong>' + s[0] + '</strong><small>' + s[1] + '</small></div><em>' + (done ? 'Checked' : i === state.stage ? 'Tracing' : 'Queued') + '</em></li>'; }).join('');
    var result = state.status === 'complete' ? '<div class="finding-ledger"><p class="eyebrow">THE LINKED CAUSE</p><h2>A negative LE voucher inflates the GA weight.</h2><p>The quarter base is ' + money(sum(baseline.quarter.base)) + ' USD. GA contributes ' + money(baseline.quarter.base.GA) + ' USD, giving it an 85.7143% weight.</p></div><ol class="trace-list"><li>GA month 3 true-up: <strong>' + money(baseline.quarter.allocation.GA) + ' − ' + money(baseline.prior.GA) + ' = ' + money(original.allocation.GA) + '</strong> USD.</li><li>Add GA copy cost of ' + money(original.copy.GA) + ': total cost is ' + money(original.cost.GA) + ' USD.</li><li>Revenue ' + money(original.revenue.GA) + ' less cost gives <strong class="negative">GP ' + money(original.gp.GA) + '</strong> USD.</li><li>LE contains voucher <button type="button" class="row-link" data-document="' + esc(voucher.record_id) + '">' + esc(voucher.document_number) + '</button>, amount <strong>' + money(voucher.amt_cents) + '</strong> USD, posted by ' + esc(voucher.user_info) + '.</li></ol><p><strong>Counterpart not confirmed in the sample scope.</strong> Check reference 5900018392, posting background and segment assignment with the posting user.</p><p class="small muted">Manual-entry status is a demo assumption. Source validity, cross-period offsets and eligibility for a base exclusion remain unverified. No FX cause has been established.</p><div class="suggested-prompts"><button type="button" data-document="' + esc(voucher.record_id) + '">Open voucher</button><button type="button" data-followup="Check the positive counterpart and reference">Check the counterpart</button><button type="button" data-open-scenario>Compare base exclusion</button><button type="button" data-open-actions>Review actions</button></div><div class="info-box"><strong>Answer to your question</strong><br>' + esc(state.followup) + '</div>' : '<p class="muted small" role="status">Running the predefined investigation against the sample records…</p>';
    $('analysisThread').innerHTML = '<article class="message"><div class="avatar" aria-hidden="true">YT</div><div class="message-body"><strong>You</strong><p>' + esc(state.lastQuestion) + '</p></div></article><article class="message"><div class="avatar" aria-hidden="true">F</div><div class="message-body"><strong>FP&amp;A Agent <span class="muted small">· Simulated investigation</span></strong><ol class="execution-stack">' + list + '</ol>' + result + '</div></article>';
    $('recentStatus').textContent = state.status === 'complete' ? 'Investigation traced · Review open' : 'Tracing sample evidence…';
    renderEvidence();
  }
  function runAnalysis(question) {
    if (state.status === 'running') return;
    if (!question.trim()) { $('composerNote').textContent = 'Enter a question, or choose Analyze negative GP.'; $('analysisPrompt').focus(); return; }
    state.lastQuestion = question.trim(); state.followup = followupText(question); state.status = 'running'; state.stage = 0;
    $('analysisPrompt').value = ''; $('composerNote').textContent = 'Predefined sample investigation · No external AI call.';
    renderAnalysis();
    function next() { state.stage += 1; if (state.stage >= 4) { state.status = 'complete'; renderAnalysis(); notify('Investigation traced. Review the voucher and candidate actions.'); return; } renderAnalysis(); timer = setTimeout(next, 500); }
    timer = setTimeout(next, 500);
  }
  function savePlan() {
    if (!state.exclude) return;
    state.plan = {exclude:true,excludedRecord: voucher.record_id,document: voucher.document_number,scope:data.scope.profit_center,period:closing,notes:state.notes,actions:state.actions.slice(),savedAt:new Date().toISOString()};
    state.report = null;
    var ok = persist(); renderScenario(); renderReport();
    notify(ok ? 'Candidate saved in this browser. Business review remains open.' : 'Candidate saved for this session only; browser storage is unavailable.');
  }
  function generateReport() {
    if (!state.plan) { tab('scenario',true); notify('Save a candidate plan before generating the report.'); return; }
    state.report = {plan:JSON.parse(JSON.stringify(state.plan)),generatedAt:new Date().toISOString()}; persist(); renderReport(); switchView('reports');
    $('reportsTitle').focus({preventScroll:true}); notify('Report draft generated from the saved candidate.');
  }
  function reportText() {
    if (!state.report) return '';
    var p = state.report.plan;
    return '# ISG Service allocation investigation\n\nSample data / simulated AI / candidate for finance review\n\nScope: ROW / L0AUXG / 2026 Q3 / 2026009\nGenerated: ' + state.report.generatedAt + '\nCandidate saved: ' + p.savedAt + '\n\n## Finding\nGA month 3 GP is ' + money(original.gp.GA) + ' USD. LE voucher 5900018271, amount ' + money(voucher.amt_cents) + ' USD, reduces the quarter revenue denominator. GA weight becomes 85.7143%.\n\n## Evidence\nCompany DEMO / year 2026 / line 001 / user yangtt16 / segment LE / reference 5900018392.\nDocument text: ' + voucher.document_text + '\nManual entry is a sample assumption, not inferred from the username. No matching positive reference was found among 12 positive sample-quarter records across all segments. Cross-period or one-to-many offsets and business validity remain unverified. No FX cause is established.\n\n## Assumptions\nExclude only this voucher from the revenue base. Keep booked revenue, copy costs, the cost pool and months 1–2 executed allocations unchanged. Recalculate month 3 true-up only.\n\n## Impact (USD)\n| Segment | Original GP | Candidate GP | Original cost | Candidate cost |\n| --- | ---: | ---: | ---: | ---: |\n' + segments.map(function (s) { return '| ' + s + ' | ' + money(original.gp[s]) + ' | ' + money(revised.gp[s]) + ' | ' + money(original.cost[s]) + ' | ' + money(revised.cost[s]) + ' |'; }).join('\n') + '\n\nTotal month 3 GP remains ' + money(sum(original.gp)) + ' USD. Quarter GP remains ' + money(sum(baseline.quarter.gp)) + ' USD. LE remains unresolved. This is cost redistribution, not a total-profit improvement.\n\n## Selected actions\n' + actionDefinitions.filter(function (a) { return p.actions.includes(a.id); }).map(function (a) { return '- ' + a.title + ': ' + a.text + ' Status: pending finance review.'; }).join('\n') + (p.actions.length ? '' : '- No follow-up selected. Finance must define the next action before implementation.') + '\n\n## Decision notes\n' + (p.notes || 'No additional notes recorded.') + '\n\n## Status\nSaved candidate; posting background, allocation-policy eligibility and LE negative revenue remain open. No journal or production allocation was changed.\n';
  }
  function renderReport() {
    $('reportCount').hidden = !state.report;
    if (!state.report) {
      $('reportContent').innerHTML = '<div class="report-empty"><span class="pill">No report draft yet</span><h2 style="margin-top:1rem">Save the decision context first.</h2><p>Review the evidence, compare the base exclusion and save a candidate. The report will retain all segment impacts and the unresolved LE issue.</p><button type="button" class="key key-primary" data-open-scenario>Review the candidate</button>' + (state.plan ? '<button type="button" class="quiet-key" data-generate-report>Generate from saved candidate</button>' : '') + '</div>'; return;
    }
    var p = state.report.plan;
    var rows = segments.map(function (s) { return '<tr><td>' + s + '</td>' + td(money(original.gp[s]),cls(original.gp[s])) + td(money(revised.gp[s]),cls(revised.gp[s])) + td(signed(revised.gp[s]-original.gp[s])) + '</tr>'; }).join('');
    $('reportContent').innerHTML = '<article class="report-document"><header><span class="pill warning">Draft · Finance review open</span><h2>ISG Service allocation investigation</h2><p>ROW / L0AUXG / 2026 Q3 / Closing period 2026009<br>Generated ' + esc(new Date(state.report.generatedAt).toLocaleString('en-GB')) + ' · From candidate saved ' + esc(new Date(p.savedAt).toLocaleString('en-GB')) + '</p><div class="report-actions"><button type="button" class="key key-primary" id="downloadReport">Download Markdown</button><button type="button" class="quiet-key" data-open-scenario>Revisit scenario</button></div></header><section class="report-section"><h3>01 / Cause and evidence</h3><p>GA month 3 GP is <strong class="negative">' + money(original.gp.GA) + ' USD</strong>. LE voucher <button type="button" class="row-link" data-document="' + esc(voucher.record_id) + '">5900018271</button>, amount ' + money(voucher.amt_cents) + ' USD, reduces the quarter revenue denominator and raises the GA weight to 85.7143%.</p><p>Document text: ' + esc(voucher.document_text) + '</p><p>User: yangtt16 · Reference: 5900018392. No matching positive reference was confirmed in the sample-quarter scope. Manual-entry status is a demo assumption; posting validity remains open.</p></section><section class="report-section"><h3>02 / Calculation assumptions</h3><p>Exclude this voucher from the revenue base only. Keep booked revenue, copy costs, the cost pool and months 1–2 executed allocations unchanged. Recalculate 2026009 true-up.</p></section><section class="report-section"><h3>03 / All-segment impact · USD</h3><div class="table-scroll" tabindex="0" aria-label="Report GP comparison">' + table(['Segment','Original GP','Candidate GP','Change'],rows,'<tr><td>Total month 3 GP</td>' + td(money(sum(original.gp))) + td(money(sum(revised.gp))) + td('0.00') + '</tr>') + '</div><p class="scenario-note">LE candidate GP is ' + money(revised.gp.LE) + ' USD. Month 3 total GP stays ' + money(sum(original.gp)) + ' USD; quarter GP stays ' + money(sum(baseline.quarter.gp)) + ' USD. This candidate redistributes cost and does not resolve the posted negative revenue.</p></section><section class="report-section"><h3>04 / Selected follow-ups</h3><ul>' + actionDefinitions.filter(function (a) { return p.actions.includes(a.id); }).map(function (a) { return '<li><strong>' + a.title + '</strong> — ' + a.text + ' <em>Pending review.</em></li>'; }).join('') + (p.actions.length ? '' : '<li>No follow-up selected; finance needs to define the next action.</li>') + '</ul></section><section class="report-section"><h3>05 / Decision notes</h3><p>' + esc(p.notes || 'No additional notes recorded.') + '</p><p class="small muted">Saved candidate only. Entry background, segment validity, cross-period offsets and allocation-policy eligibility still require finance review. No journal or actual allocation has been changed.</p></section></article>';
  }
  function download(name, content, type) {
    var blob = new Blob([content],{type:type}); var url = URL.createObjectURL(blob); var a = document.createElement('a'); a.href=url; a.download=name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(url); },1000);
  }
  function csv() {
    var m=monitorModel(); var rows=[['Profit center','Period','BPC segment','Revenue USD','Rev%','Copy cost USD','Pool allocated USD','Cost after USD','GP USD']];
    segments.forEach(function (s) { rows.push([data.scope.profit_center,state.period,s,(m.revenue[s]/100).toFixed(2),(m.rates[s]*100).toFixed(6),(m.copy[s]/100).toFixed(2),(m.allocation[s]/100).toFixed(2),(m.cost[s]/100).toFixed(2),(m.gp[s]/100).toFixed(2)]); });
    rows.push([data.scope.profit_center,state.period,'TOTAL',(sum(m.revenue)/100).toFixed(2),'100.000000',(sum(m.copy)/100).toFixed(2),(m.pool/100).toFixed(2),(sum(m.cost)/100).toFixed(2),(sum(m.gp)/100).toFixed(2)]);
    download('L0AUXG-'+state.period+'-allocation.csv','\uFEFF'+rows.map(function (r) { return r.map(function (v) { return '"'+String(v).replaceAll('"','""')+'"'; }).join(','); }).join('\r\n'),'text/csv;charset=utf-8');
  }
  document.addEventListener('click',function (event) {
    var b = event.target.closest('button'); if (!b) return;
    if (b.dataset.view) switchView(b.dataset.view);
    if (b.dataset.tab) tab(b.dataset.tab,false);
    if (b.dataset.segment) showSegment(b.dataset.segment);
    if (b.dataset.analyze) prepareAnalysis(b.dataset.analyze);
    if (b.dataset.document) openVoucher(b.dataset.document);
    if (b.hasAttribute('data-period-close')) { state.period=closing; renderMonitor(); animateMonitor('period'); }
    if (b.dataset.close) $(b.dataset.close).close();
    if (b.hasAttribute('data-open-actions')) tab('actions',true);
    if (b.hasAttribute('data-open-scenario') || b.hasAttribute('data-voucher-scenario')) { if ($('voucherDialog').open) $('voucherDialog').close(); tab('scenario',true); $('scenarioTab').scrollIntoView({block:'nearest',behavior:'smooth'}); }
    if (b.dataset.followup) { $('analysisPrompt').value=b.dataset.followup; $('analysisPrompt').focus(); }
    if (b.hasAttribute('data-generate-report')) generateReport();
    if (b.id==='downloadReport') download('L0AUXG-2026Q3-investigation.md',reportText(),'text/markdown;charset=utf-8');
  });
  $('periodSelect').addEventListener('change',function (e) { state.period=e.target.value; renderMonitor(); animateMonitor('period'); });
  $('closeSegment').addEventListener('click',function () { $('segmentPanel').hidden=true; });
  $('newAnalysis').addEventListener('click',function () { prepareAnalysis('GA'); });
  $('recentCase').addEventListener('click',function () { prepareAnalysis('GA'); });
  $('commandSearch').addEventListener('click',function () { if ((state.view === 'chat' || state.view === 'knowledge') && window.FPAKnowledge) window.FPAKnowledge.focusChat(); else prepareAnalysis(state.segment); });
  $('analysisForm').addEventListener('submit',function (e) { e.preventDefault(); runAnalysis($('analysisPrompt').value); });
  $('startInvestigation').addEventListener('click',function () { runAnalysis('Why did GA GP turn negative after the month 3 true-up? Trace the revenue base and source voucher.'); });
  $('analysisPrompt').addEventListener('keydown',function (e) { if (e.key==='Enter'&&!e.shiftKey&&!e.isComposing) { e.preventDefault(); $('analysisForm').requestSubmit(); } });
  $('excludeBase').addEventListener('change',function (e) { state.exclude=e.target.checked; renderScenario(); });
  $('decisionNotes').addEventListener('input',function (e) { state.notes=e.target.value; $('saveStatus').textContent=state.plan?'Current notes have unsaved changes. Save the candidate again to update the report inputs.':'Notes will be saved with the candidate.'; });
  $('actionsContent').addEventListener('change',function (e) { if (!e.target.dataset.action) return; state.actions=Array.from(document.querySelectorAll('[data-action]:checked')).map(function (b) { return b.dataset.action; }); renderScenario(); });
  $('fullComparison').addEventListener('click',showComparison);
  $('savePlan').addEventListener('click',savePlan);
  $('generateReport').addEventListener('click',generateReport);
  $('downloadCsv').addEventListener('click',csv);
  $('resetDemo').addEventListener('click',function () { $('resetDialog').showModal(); });
  $('confirmReset').addEventListener('click',function () {
    clearTimeout(timer); state.status='idle';state.stage=0;state.plan=null;state.report=null;state.exclude=false;state.notes='';state.actions=['contact','offset','segment'];state.period=closing;
    try { localStorage.removeItem(storageKey); } catch (_) { storageAvailable=false; }
    $('resetDialog').close(); location.reload();
  });
  document.addEventListener('keydown',function (e) { if ((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k') { e.preventDefault(); if ((state.view === 'chat' || state.view === 'knowledge') && window.FPAKnowledge) window.FPAKnowledge.focusChat(); else prepareAnalysis(state.segment); } });
  document.querySelector('.inspector-tabs').addEventListener('keydown',function (e) {
    var tabs=Array.from(document.querySelectorAll('[data-tab]'));var index=tabs.indexOf(document.activeElement);if(index<0)return;
    var next=e.key==='ArrowRight'?(index+1)%3:e.key==='ArrowLeft'?(index+2)%3:e.key==='Home'?0:e.key==='End'?2:null;
    if(next!==null){e.preventDefault();tab(tabs[next].dataset.tab,true);}
  });
  window.FPAWorkspace = {showView:switchView, notify:notify};
  renderMonitor();renderEvidence();renderActions();renderScenario();renderReport();switchView('monitor');
})();
