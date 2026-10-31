const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
const htmlIds=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
assert.equal(new Set(htmlIds).size,htmlIds.length,'HTML IDs must remain unique');
assert.ok(html.indexOf('case-ui-model.js')<html.indexOf('app.js'),'presentation model loads before app');
const ancestors=[],voidTags=new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
for(const match of html.matchAll(/<\/?([a-z][a-z0-9-]*)\b[^>]*>/gi)){
 const tag=match[1].toLowerCase(),closing=match[0].startsWith('</');
 if(closing){const at=ancestors.lastIndexOf(tag);if(at>=0)ancestors.length=at;continue;}
 if(/\bid="freightAlert"/.test(match[0])){assert.ok(!ancestors.includes('details'),'Freight dialog must not inherit collapsed details');assert.equal(ancestors.at(-1),'body','Freight dialog belongs to body-level modal collection');}
 if(!voidTags.has(tag)&&!match[0].endsWith('/>'))ancestors.push(tag);
}
for(const file of ['app.js','task-board.js','kpi-overview.js']){
 const script=fs.readFileSync(__dirname+'/'+file,'utf8');
 const dynamicIds=[...script.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 for(const [,id] of script.matchAll(/\$\('([^']+)'\)/g))assert.ok(htmlIds.includes(id)||dynamicIds.includes(id),file+' requires HTML element '+id);
}
function fixture(storageThrows=false,initial={}){
 const elements=new Map(),events={},timers=[],storage=new Map(Object.entries(initial));let runs=0;
 function element(id){if(elements.has(id))return elements.get(id);const handlers={},classes=new Set();const el={id,hidden:false,disabled:false,value:'',innerHTML:'',textContent:'',dataset:{},attrs:{},open:false,handlers,
 classList:{add(...v){v.forEach(x=>classes.add(x));},remove(...v){v.forEach(x=>classes.delete(x));},contains:v=>classes.has(v),toggle(v,on){const yes=on===undefined?!classes.has(v):on;yes?classes.add(v):classes.delete(v);return yes;}},
 addEventListener(n,fn){handlers[n]=fn;},appendChild(){},setAttribute(n,v){this.attrs[n]=v;},getAttribute(n){return this.attrs[n];},removeAttribute(n){delete this.attrs[n];},querySelector(s){return element(id+' '+s);},querySelectorAll(){return [];},focus(){this.focused=true;},scrollIntoView(options){this.scrollOptions=options;},showModal(){this.open=true;},close(){this.open=false;},getBoundingClientRect(){return {left:0,top:0,width:100,height:30};}};
 elements.set(id,el);return el;}
 const document={getElementById:element,querySelector:element,querySelectorAll(){return [];},addEventListener(n,fn){(events[n]??=[]).push(fn);},dispatchEvent(e){(events[e.type]||[]).forEach(fn=>fn(e));}};
 const c=vm.createContext({document,Intl,Date,JSON,Set,Map,crypto,console,ResizeObserver:class{observe(){}},requestAnimationFrame(){},CustomEvent:class{constructor(type,init){this.type=type;this.detail=init?.detail;}},matchMedia:()=>({matches:true,addEventListener(){}}),localStorage:{getItem(k){if(storageThrows)throw Error('denied');return storage.get(k)||null;},setItem(k,v){if(storageThrows)throw Error('denied');storage.set(k,v);},removeItem(k){storage.delete(k);}},setTimeout(fn){timers.push(fn);return timers.length;},clearTimeout(){},location:{reload(){}},Blob,URL});c.window=c;
 for(const f of ['demo-data.js','allocation.js','case-ui-model.js','app.js'])vm.runInContext(fs.readFileSync(__dirname+'/'+f,'utf8'),c);
 function click(attrs){const b={dataset:{},id:'',classList:{contains(){return false;}},hasAttribute:k=>k in attrs};Object.entries(attrs).forEach(([k,v])=>{if(k==='id')b.id=v;else if(k.startsWith('data-'))b.dataset[k.slice(5).replace(/-([a-z])/g,(_,x)=>x.toUpperCase())]=v;});document.dispatchEvent({type:'click',target:{closest:()=>b}});}
 return {c,element,events,timers,storage,click,load(f){vm.runInContext(fs.readFileSync(__dirname+'/'+f,'utf8'),c);},flush(){while(timers.length){const fn=timers.shift();fn();runs++;if(runs>100)throw Error('infinite timers');}}};
}
if(require.main===module){
 let f=fixture(),w=f.c.FPAWorkspace;
 assert.equal(typeof w.startCaseAnalysis,'function','explicit case analysis action is exposed');
 f.element('caseSteps').clientWidth=240;f.element('caseSteps').scrollLeft=0;f.element('caseSteps [aria-current="step"]').offsetLeft=576;f.element('caseSteps [aria-current="step"]').offsetWidth=144;
 f.click({'data-review-allocation':''});assert.equal(f.element('monitorView').hidden,false);assert.equal(f.element('periodSelect').value,'2026009');assert.equal(f.element('analysisView').hidden,true);
 assert.equal(f.element('caseSteps').scrollLeft,480,'narrow journey scrolls horizontally to its current step');assert.equal(f.element('caseSteps [aria-current="step"]').scrollOptions,undefined,'step visibility does not scroll the document vertically');
 f.click({'data-analyze':'GA'});assert.equal(f.element('analysisView').hidden,false);assert.match(f.element('runStatus').textContent,/Tracing/);f.flush();assert.match(f.element('analysisThread').innerHTML,/Calculation traced/);
 f.click({'data-open-scenario':''});assert.equal(f.element('scenarioView').hidden,false);
 w.showView('analysis');f.click({'data-tab':'actions'});assert.equal(f.element('scenarioView').hidden,false,'legacy Actions tab opens the shared Scenario actions');assert.equal(f.element('scenarioActions').focused,true);assert.equal(f.element('scenarioActions').scrollOptions.block,'start');
 f.element('excludeBase').handlers.change({target:{checked:true}});f.element('decisionNotes').handlers.input({target:{value:'Saved notes'}});f.element('savePlan').handlers.click();const saved=w.getProposal();
 w.showView('monitor');w.showView('analysis');assert.equal(w.getProposal().plan.savedAt,saved.plan.savedAt);assert.equal(f.element('runStatus').textContent,'Calculation traced');
 f.element('decisionNotes').handlers.input({target:{value:'Unsaved notes'}});assert.equal(w.getProposal().plan.notes,'Saved notes');assert.equal(w.getProposal().hasUnsavedChanges,true);
 f.element('excludeBase').handlers.change({target:{checked:false}});assert.equal(w.getProposal().plan.exclude,true);assert.equal(w.getProposal().hasUnsavedChanges,true);assert.match(f.element('saveStatus').textContent,/Uses last saved candidate/);
 f.element('excludeBase').handlers.change({target:{checked:true}});
 f.element('generateReport').handlers.click();assert.match(f.element('reportContent').innerHTML,/Saved notes/);assert.doesNotMatch(f.element('reportContent').innerHTML,/Unsaved notes/);
 const frozen=w.getProposal();w.reviewProposal(frozen);assert.equal(f.element('comparisonDialog').open,true);assert.match(f.element('comparisonContent').innerHTML,/Frozen proposal snapshot/);assert.match(f.element('comparisonContent').innerHTML,/Saved notes/);assert.doesNotMatch(f.element('comparisonContent').innerHTML,/Unsaved notes/);
 f.element('taskDetailDialog').showModal();f.click({'data-close':'comparisonDialog'});assert.equal(f.element('taskDetailDialog').open,true,'closing source review returns to task details');
 w.reviewProposal(frozen);f.click({'data-open-scenario':'','data-return-current-candidate':''});assert.equal(f.element('comparisonDialog').open,false);assert.equal(f.element('taskDetailDialog').open,false,'explicit return must clear task modal');assert.equal(f.element('scenarioView').hidden,false);
 assert.match(frozen.reportMarkdown,/Saved notes/);assert.equal(w.getProposal().hasUnsavedChanges,true);
 const snapshot=JSON.parse(f.storage.get('isg-allocation-demo:L0AUXG:1.33757:v1'));f=fixture(false,{'isg-allocation-demo:L0AUXG:1.33757:v1':JSON.stringify(snapshot)});assert.equal(f.c.FPAWorkspace.getProposal().plan.notes,'Saved notes');assert.equal(f.element('runStatus').textContent,'Ready');
 f=fixture(true);f.element('excludeBase').handlers.change({target:{checked:true}});f.element('savePlan').handlers.click();assert.ok(f.c.FPAWorkspace.getProposal());assert.match(f.element('saveStatus').textContent,/Session only/);
 const wide=fixture();wide.c.matchMedia=()=>({matches:false,addEventListener(){}});wide.element('caseSteps').clientWidth=240;wide.element('caseSteps').scrollLeft=0;wide.element('caseSteps [aria-current="step"]').offsetLeft=576;wide.element('caseSteps [aria-current="step"]').offsetWidth=144;wide.click({'data-review-allocation':''});assert.equal(wide.element('caseSteps').scrollLeft,0,'desktop navigation keeps its existing layout and scroll');
 console.log('Case entry, single-action analysis, navigation, saved snapshots and storage fallback passed.');
}
module.exports={fixture};
