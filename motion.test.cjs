const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const code = fs.readFileSync(__dirname + '/app.js','utf8');
const motion = code.slice(code.indexOf('  var monitorAnimations ='),code.indexOf("  $('sidebarToggle').addEventListener"));
function fixture(reduced=false,support=true) {
  const elements = Object.fromEntries(['monitorLoadStatus','monitorView','monitorMetrics','ledgerTable','monitorAlerts'].map(id=>[id,{textContent:'',attrs:{},classList:{add(){},remove(){}},setAttribute(k,v){this.attrs[k]=v;}}]));
  const animations=[],timers=new Map();let serial=0;
  function animate(frames,options){const a={frames,options,cancelled:false,cancel(){this.cancelled=true;},finished:new Promise(()=>{})};animations.push(a);return a;}
  if(support) elements.monitorMetrics.animate=animate;
  const targets=Array.from({length:11},()=>({animate}));elements.ledgerTable.animate=animate;elements.monitorAlerts.animate=animate;
  const context=vm.createContext({$:id=>elements[id],window:{matchMedia:()=>({matches:reduced})},document:{querySelectorAll:()=>targets},setTimeout(fn){const id=++serial;timers.set(id,fn);return id;},clearTimeout(id){timers.delete(id);}});
  vm.runInContext(motion,context);
  return {elements,animations,timers,run:mode=>context.animateMonitor(mode),finish:()=>context.finishMonitorMotion()};
}
let checks=0;function check(fn){fn();checks++;}
let f=fixture();f.run('entry');
check(()=>assert.equal(f.elements.monitorView.attrs['aria-busy'],'true'));
check(()=>assert.equal(f.animations.length,11));
check(()=>assert.ok(f.animations.every((a,i)=>a.options.delay===120+i*45 && a.options.duration===340 && a.options.fill==='backwards')));
check(()=>assert.ok(f.animations.every(a=>a.frames[0].opacity===0 && a.frames[1].opacity===1)));
const first=f.animations.slice();f.run('period');
check(()=>assert.ok(first.every(a=>a.cancelled)));
check(()=>assert.equal(f.timers.size,1));
check(()=>assert.ok(f.animations.slice(11).every(a=>a.options.delay===0 && a.options.duration===280 && !('transform' in a.frames[0]))));
for(const finish of f.timers.values())finish();
check(()=>assert.ok(f.animations.every(a=>a.cancelled)));
check(()=>assert.equal(f.elements.monitorView.attrs['aria-busy'],'false'));
check(()=>assert.equal(f.elements.monitorLoadStatus.textContent,'Sample allocation ready · USD'));
f=fixture(true);f.run('entry');check(()=>assert.equal(f.animations.length,0));check(()=>assert.equal(f.timers.size,0));
f=fixture(false,false);f.run('entry');check(()=>assert.equal(f.animations.length,0));check(()=>assert.equal(f.elements.monitorView.attrs['aria-busy'],'false'));
console.log(checks+' finite-motion checks passed.');
