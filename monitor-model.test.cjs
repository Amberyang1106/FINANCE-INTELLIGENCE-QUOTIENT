const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
const context=vm.createContext({crypto});context.window=context;for(const file of ['demo-data.js','allocation.js','monitor-model.js'])vm.runInContext(fs.readFileSync(__dirname+'/'+file,'utf8'),context);
const m=context.FPAMonitor,scope={bg:'ISG',report:'isg-service',dimension:'bpc_seg_cd',kpi:'gp'};let checks=0;function check(fn){fn();checks++;}
check(()=>assert.equal(m.route('Monitor GP by BPC Segment for the latest quarter',scope).template.kind,'bar'));
check(()=>assert.equal(m.route('Show revenue trends for the last 5 quarters by BPC BU',scope).template.kind,'line'));
check(()=>assert.equal(m.route('最近5个季度在不同BPC BU下revenue的趋势',scope).template.kind,'line'));
check(()=>assert.ok(m.route('Monitor GP',{...scope,bg:'SSG'}).error));check(()=>assert.ok(m.route('Monitor GP',{...scope,report:'row-psd'}).error));check(()=>assert.ok(m.route('weather tomorrow',scope).error));check(()=>assert.ok(m.route('GP trend by BPC BU',scope).error));
const gp=m.templates[0],line=m.templates[1],cost=m.templates[2],baseline=context.ISGAllocation.calculate(context.ISG_DEMO);
check(()=>assert.equal(m.dataFor(gp).values[1],baseline.quarter.gp.GA/100));check(()=>assert.equal(m.dataFor(gp).values.reduce((a,b)=>a+b,0).toFixed(2),(context.ISGAllocation.total(baseline.quarter.gp)/100).toFixed(2)));
check(()=>assert.equal(m.signals(gp).find(s=>s.label==='LE').status,'alert'));
check(()=>assert.ok(m.signals({...gp,benchmark:{below:1e9}}).every(s=>s.status==='alert')));
check(()=>assert.equal(m.dataFor(line).series.length,3));check(()=>assert.ok(m.dataFor(line).series.every(s=>s.values.length===5)));check(()=>assert.equal(m.signals(line)[1].status,'alert'));check(()=>assert.equal(m.signals(line)[0].status,'highlight'));
check(()=>assert.ok(m.signals({...line,benchmark:{growth:100,decline:100}}).every(s=>s.status==='normal')));
check(()=>assert.equal(m.dataFor(cost).values[0],baseline.quarter.cost.B0/100));
function payload(cards){return {format:'fpa-monitor-template',version:1,name:'Test',cards};}
const imported=m.validate(payload([gp,line]));check(()=>assert.equal(imported.cards.length,2));check(()=>assert.notEqual(imported.cards[0].id,imported.cards[1].id));
check(()=>assert.throws(()=>m.validate(payload([]))));check(()=>assert.throws(()=>m.validate(payload([{...gp,scope:{...scope,report:'wrong'}}]))));check(()=>assert.throws(()=>m.validate(payload([{...line,benchmark:{growth:Infinity,decline:5}}]))));check(()=>assert.throws(()=>m.validate(payload([{...line,benchmark:{growth:8,decline:-1}}]))));check(()=>assert.throws(()=>m.validate({...payload([gp]),version:2})));
check(()=>assert.equal(m.validate(payload([{...gp,pos:{x:11,y:0,w:12,h:5}}])).cards[0].pos.x,0));
console.log(checks+' custom monitor model checks passed.');
