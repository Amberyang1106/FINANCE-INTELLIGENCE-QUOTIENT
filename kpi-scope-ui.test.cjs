const assert=require('node:assert/strict'),fs=require('node:fs'),{fixture}=require('./case-flow.test.cjs');
const f=fixture();for(const name of ['monitor-model.js','kpi-scope-config.js','kpi-overview.js'])f.load(name);
assert.ok(f.c.FPAKpiOverview,'overview selection controller exists');
assert.equal(f.c.FPAKpiOverview.hasData(),true);assert.match(f.element('kpiMetrics').innerHTML,/224,711.76/);
const config=f.c.FPAKpiScopes;config.datasets.push({...config.datasets[0],id:'wrong-provider-scope',scope:{...config.defaults,geo:'PRC'}});f.element('kpiGeo').value='PRC';f.element('kpiGeo').handlers.change();assert.equal(f.c.FPAKpiOverview.hasData(),false,'provider source scope must match even if configuration is misrouted');config.datasets.pop();f.element('kpiGeo').value='ROW';f.element('kpiGeo').handlers.change();
function visibleRows(){return [...f.element('statusGrid').innerHTML.matchAll(/<tr([^>]*)><th scope="row">([^<]+)<\/th>/g)].filter(m=>!m[1].includes('hidden')).map(m=>m[2]);}
assert.deepEqual(visibleRows(),['Geo','Region','Segment','RTM','Channel','Freight']);
const segment=f.element('statusGrid').innerHTML.match(/<tr[^>]*><th scope="row">Segment<\/th>([\s\S]*?)<\/tr>/)[1];
const cells=[...segment.matchAll(/<td>([\s\S]*?)<\/td>/g)];assert.equal(cells.length,12);assert.match(cells[8][1],/data-review-allocation/);assert.match(cells[8][1],/Dec-26/);
assert.equal((f.element('statusGrid').innerHTML.match(/scope="row">Freight/g)||[]).length,1);
f.click({'data-toggle-matrix':''});assert.equal(visibleRows().length,22);assert.equal(f.element('matrixToggle').attrs['aria-expanded'],'true');
f.click({'data-toggle-matrix':''});assert.equal(visibleRows().length,6);assert.equal(f.element('matrixToggle').attrs['aria-expanded'],'false');
for(const [id,value] of [['kpiGeo','PRC'],['kpiPeriod','2026-Q2'],['kpiReport','isg-hw'],['kpiBG','PCSD']]){
 const previous=f.element(id).value;f.element(id).value=value;f.element(id).handlers.change.call(f.element(id));
 assert.equal(f.c.FPAKpiOverview.hasData(),false);assert.equal(f.element('kpiDataPanel').hidden,true);assert.equal(f.element('kpiEmptyState').hidden,false);
 for(const target of ['kpiMetrics','allocationCaseCard','kpiCharts','kpiQuarterTable','statusGrid'])assert.equal(f.element(target).innerHTML,'',target+' must not retain previous scope data');
 assert.doesNotMatch(f.element('kpiDefinitionNote').textContent,/0.00|current Q3/);
 f.c.FPAWorkspace.showView('kpi');f.click({'data-review-allocation':''});assert.equal(f.element('monitorView').hidden,true,'unsupported overview does not open current case');
 f.element(id).value=previous;f.element(id).handlers.change.call(f.element(id));
 if(id==='kpiBG'){f.element('kpiReport').value='isg-service';f.element('kpiReport').handlers.change.call(f.element('kpiReport'));}
 assert.equal(f.c.FPAKpiOverview.hasData(),true);assert.match(f.element('kpiMetrics').innerHTML,/224,711.76/);assert.deepEqual(visibleRows(),['Geo','Region','Segment','RTM','Channel','Freight']);
}
f.click({'data-review-allocation':''});assert.equal(f.element('monitorView').hidden,false);assert.equal(f.element('periodSelect').value,'2026009');
const html=fs.readFileSync(__dirname+'/index.html','utf8'),overview=html.slice(html.indexOf('<section id="kpiView"'),html.indexOf('<section id="monitorView"'));
assert.doesNotMatch(overview,/L0AUXG/);assert.ok(overview.indexOf('statusGrid')<overview.indexOf('kpiCharts'));assert.doesNotMatch(overview,/<details[^>]*monthly-matrix/);
assert.match(html,/aria-label="Ask Report Rules"/);assert.match(html,/aria-label="Investigation Reports"/);
f.c.FPAWorkspace.showView('chat');assert.match(f.element('breadcrumb').innerHTML,/Ask Report Rules/);f.c.FPAWorkspace.showView('reports');assert.match(f.element('breadcrumb').innerHTML,/Investigation Reports/);
console.log('Overview exact-scope empty/restored states, matrix expansion, shared case route and labels passed.');
