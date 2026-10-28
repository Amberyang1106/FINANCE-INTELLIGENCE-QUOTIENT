/* Deterministic demo routing, calculations and portable monitor templates. */
(function(root){
'use strict';
var baseline=root.ISGAllocation.calculate(root.ISG_DEMO);
var scopes={bg:'ISG',report:'isg-service',dimension:'bpc_seg_cd',kpi:'gp'};
var templates=[
{id:'gp-segment',title:'Segment gross profit',kind:'bar',description:'Latest quarter · GP by BPC Segment. Flag losses before close.',scope:{bg:'ISG',report:'isg-service',dimension:'bpc_seg_cd',kpi:'gp'},benchmark:{below:0}},
{id:'revenue-bu',title:'Revenue momentum',kind:'line',description:'Five quarters · Revenue by BPC BU. Follow growth and decline.',scope:{bg:'ISG',report:'isg-service',dimension:'bpc_bu',kpi:'revenue'},benchmark:{growth:8,decline:5}},
{id:'cost-segment',title:'Segment cost watch',kind:'bar',description:'Latest quarter · Cost by BPC Segment. Review high cost exposure.',scope:{bg:'ISG',report:'isg-service',dimension:'bpc_seg_cd',kpi:'cost'},benchmark:{above:1000000}}
];
function route(prompt,scope){
 if(scope.bg!=='ISG'||scope.report!=='isg-service')return {error:'No sample dataset is attached to this BG / report. Select ISG / ISG Service.'};
 var q=prompt.toLowerCase(), kpi=/gross profit|\bgp\b|毛利|revenue\s*[-−]\s*cost/.test(q)?'gp':/revenue|收入/.test(q)?'revenue':/cost|成本/.test(q)?'cost':scope.kpi;
 var dimension=/bpc[ _-]*bu|业务单元/.test(q)?'bpc_bu':/segment|分摊维度/.test(q)?'bpc_seg_cd':scope.dimension;
 var trend=/trend|趋势|five|5.*quarter|五.*季度/.test(q);
 if(!/monitor|查看|监控|分析|revenue|cost|gp|毛利|收入|成本|trend|趋势|segment/i.test(q))return {error:'Try a supported question about segment GP, segment cost or five-quarter BU revenue.'};
 var template=templates.find(function(t){return t.scope.kpi===kpi&&t.scope.dimension===dimension;});
 if(!template|| (trend && template.kind!=='line'))return {error:'This sample supports quarterly GP or Cost by BPC Segment, and five-quarter Revenue by BPC BU. Choose an example below.'};
 return {template:JSON.parse(JSON.stringify(template)),trace:['BG / Report → ISG / ISG Service','Resolve fields → '+dimension+' + '+(kpi==='gp'?'GP = Revenue − Cost':kpi),'Sample dataset → '+(template.kind==='line'?'BU revenue history · synthetic five-quarter fixture':'allocation quarter totals · existing reviewed fixture'),'Aggregate → '+(template.kind==='line'?'2025 Q3–2026 Q3 / BPC BU':'2026 Q3 / BPC Segment'),'Render → '+(template.kind==='line'?'Revenue trend with QoQ benchmarks':'Segment bars with threshold alerts')]};
}
function dataFor(card){
 if(card.scope.report!=='isg-service'||card.scope.bg!=='ISG')throw Error('Unsupported report');
 if(card.kind==='bar')return {labels:root.ISGAllocation.segments,values:root.ISGAllocation.segments.map(function(s){return baseline.quarter[card.scope.kpi][s]/100;}),period:'2026 Q3',source:'Reviewed allocation sample · Quarter total'};
 var total=root.ISGAllocation.total(baseline.quarter.revenue)/100;
 return {labels:['2025 Q3','2025 Q4','2026 Q1','2026 Q2','2026 Q3'],series:[{name:'Support Services',values:[.34,.36,.39,.42,.46].map(function(x){return Math.round(total*x*100)/100;})},{name:'Professional Services',values:[.24,.26,.28,.30,.27].map(function(x){return Math.round(total*x*100)/100;})},{name:'Managed Services',values:[.14,.17,.19,.22,.27].map(function(x){return Math.round(total*x*100)/100;})}],period:'2025 Q3–2026 Q3',source:'Synthetic BPC BU history · Demo only'};
}
function signals(card){var d=dataFor(card),b=card.benchmark;
 if(card.kind==='bar')return d.labels.map(function(label,i){var value=d.values[i],alert=card.scope.kpi==='cost'?value>b.above:value<b.below;return {label:label,value:value,status:alert?'alert':'normal'};});
 return d.series.map(function(s){var prior=s.values[3],rate=prior===0?null:(s.values[4]-prior)/Math.abs(prior)*100;return {label:s.name,value:rate,status:rate===null?'no-base':rate<=-b.decline?'alert':rate>=b.growth?'highlight':'normal'};});
}
function validate(payload){
 if(!payload||payload.format!=='fpa-monitor-template'||payload.version!==1||!Array.isArray(payload.cards)||!payload.cards.length||payload.cards.length>20)throw Error('Use a version 1 FP&A monitor template with 1–20 cards.');
 return {name:String(payload.name||'Imported monitor').slice(0,80),cards:payload.cards.map(function(c,i){
 var t=templates.find(function(t){return c.scope&&t.scope.bg===c.scope.bg&&t.scope.report===c.scope.report&&t.scope.kpi===c.scope.kpi&&t.scope.dimension===c.scope.dimension&&t.kind===c.kind;});if(!t)throw Error('Template contains an unsupported report or chart field combination.');
 var benchmark={};Object.keys(t.benchmark).forEach(function(k){var n=Number(c.benchmark&&c.benchmark[k]);if(!Number.isFinite(n)||(k!=='below'&&n<0)||((k==='growth'||k==='decline')&&n>1000))throw Error('Invalid benchmark.');benchmark[k]=n;});
 var p=c.pos||{},num=function(k,def,max){return Number.isInteger(p[k])&&p[k]>=0&&p[k]<=max?p[k]:def;};var w=num('w',6,12);if(w<3)w=6;var x=Math.min(num('x',i%2*6,11),12-w);
 return {id:root.crypto.randomUUID(),kind:t.kind,title:String(c.title||t.title).slice(0,100),scope:Object.assign({},t.scope),benchmark:benchmark,pos:{x:x,y:num('y',Math.floor(i/2)*5,100),w:w,h:Math.max(5,num('h',5,10))}};
 })};
}
root.FPAMonitor={templates:templates,scopes:scopes,route:route,dataFor:dataFor,signals:signals,validate:validate};
})(window);
