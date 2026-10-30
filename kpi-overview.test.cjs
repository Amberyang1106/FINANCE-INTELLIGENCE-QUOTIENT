const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function load(extra=[]){const c=vm.createContext({});c.window=c;for(const file of ['demo-data.js','allocation.js'])vm.runInContext(fs.readFileSync(__dirname+'/'+file,'utf8'),c);c.ISG_DEMO.source_rows.push(...extra);vm.runInContext(fs.readFileSync(__dirname+'/monitor-model.js','utf8'),c);return c;}
const c=load(),m=c.FPAMonitor,rows=m.overview(),base=c.ISGAllocation.calculate(c.ISG_DEMO),total=c.ISGAllocation.total;
assert.equal(rows.length,5);assert.equal(rows[4].label,'2026 Q3');assert.equal(rows[4].revenueCents,total(base.quarter.revenue));assert.equal(rows[4].costCents,total(base.quarter.cost));assert.equal(rows[4].creditCents,0);assert.ok(rows.slice(0,4).every(r=>!r.reviewed));assert.equal(rows[4].reviewed,true);
const bu=m.dataFor(m.templates[1]);rows.forEach((row,i)=>assert.equal(row.revenueCents,bu.series.reduce((n,s)=>n+Math.round(s.values[i]*100),0)));
assert.equal(m.overviewChange(0,0),null);assert.equal(m.overviewChange(12,0),null);assert.equal(m.overviewChange(0,100),-100);assert.equal(m.overviewChange(125,100),25);
const costRow={...base.costRows[0],record_id:'CREDIT-TEST',period:'2026009',bpc_seg_cd:'B0',amt_cents:-123456,amt_lc_cents:-123456};
const d=load([costRow,{...costRow,record_id:'EXCLUDED',non_alloc_flg:'Y',amt_cents:-999999},{...costRow,record_id:'POST-ALLOCATION',checking_flg:'AL',amt_cents:-888888}]);
assert.equal(d.FPAMonitor.overview()[4].creditCents,123456);assert.equal(d.FPAMonitor.overview()[4].costCents,total(base.quarter.cost)-123456);
assert.equal(rows.slice(-3)[0].label,'2026 Q1');assert.equal(rows[4].costCents-rows[4].creditCents,rows[4].costCents);
console.log('KPI reconciliation, source-credit eligibility, BU history consistency and zero-base comparison checks passed.');

// Execute the production renderer with a minimal document, then check the emitted bar geometry.
const controls={};for(const id of ['kpiRange','kpiWindowLabel','kpiMetrics','kpiCharts','kpiQuarterTable'])controls[id]={value:'5',innerHTML:'',textContent:'',addEventListener(){}};
c.document={getElementById:id=>controls[id],addEventListener(){}};
function checkPlot(count){controls.kpiRange.value=String(count);vm.runInContext(fs.readFileSync(__dirname+'/kpi-overview.js','utf8'),c);const svg=controls.kpiCharts.innerHTML.match(/<svg[^>]*aria-label="Cost credit trend[\s\S]*?<\/svg>/)[0];const bars=[...svg.matchAll(/<rect class="kpi-bar" x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"/g)].map(m=>({x:+m[1],y:+m[2],w:+m[3],h:+m[4]}));assert.equal(bars.length,count);bars.forEach(b=>{assert.ok(b.x>=75,'Bar must stay right of the axis gutter');assert.ok(b.x+b.w<=610,'Bar must stay inside the plot');assert.ok(Number.isFinite(b.y)&&b.h>=2);});assert.ok(bars[0].x-63>=12,'Keep a visible gap from the right edge of y-axis labels');for(let i=1;i<bars.length;i++)assert.ok(bars[i].x>bars[i-1].x+bars[i-1].w);assert.equal(bars.at(-1).h,2,'Zero credit remains a baseline indicator');}
checkPlot(5);checkPlot(3);
console.log('Rendered Cost credit chart: 3/5-quarter bars stay inside the plot and clear the y-axis labels.');
