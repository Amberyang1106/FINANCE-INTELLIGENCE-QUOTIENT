const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
assert.ok(fs.existsSync(__dirname+'/kpi-scope-config.js'),'configuration-backed KPI scope must exist');
const c=vm.createContext({});c.window=c;vm.runInContext(fs.readFileSync(__dirname+'/kpi-scope-config.js','utf8'),c);
const m=c.FPAKpiScopes,s=m.defaults;
assert.equal(m.resolve(s).provider,'isg-allocation-sample');
for(const change of [{bg:'PCSD'},{report:'isg-hw'},{geo:'PRC'},{period:'2026-Q2'},{period:'2025-Q3'}])assert.equal(m.resolve({...s,...change}),null);
assert.equal(m.datasets.length,1);assert.equal(m.datasets[0].coverage,'single_profit_center');assert.equal(m.datasets[0].casePeriod,'2026009');assert.equal(m.datasets[0].displayMonth,'Dec-26');assert.equal(m.datasets[0].monthLink,'illustrative');
assert.ok(m.reports.filter(r=>r.bg==='ISG').some(r=>r.id==='isg-service'));
console.log('Exact KPI dataset routing, coverage and explicit illustrative month link passed.');
