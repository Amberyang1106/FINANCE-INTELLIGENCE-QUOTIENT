/* Scope-aware KPI presentation; all financial values come from connected providers. */
(function(){'use strict';
var model=window.FPAMonitor,config=window.FPAKpiScopes,$=function(id){return document.getElementById(id);};
var esc=function(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});};
var selection=Object.assign({},config.defaults),expanded=false,activeData=null;
var months=['Apr-26','May-26','Jun-26','Jul-26','Aug-26','Sep-26','Oct-26','Nov-26','Dec-26','Jan-27','Feb-27','Mar-27'];
var monitors=['Geo','Region','Segment','RTM','Channel','CPU','CPU Deal','CPU Deal Name','CPU Family','CPU Part Number','CPU SKU Name','CPU Vendor','Units QTY','Derived net revenue','Derived BMC','Derived GP','Q BPC Revenue','Q BPC BMC','Q BPC GP','Freight','Warranty','WOI'];
var priority=monitors.slice(0,5).concat(['Freight']);
var providers=window.FPAKpiDataProviders=window.FPAKpiDataProviders||{};
providers['isg-allocation-sample']=providers['isg-allocation-sample']||function(){var source=window.ISG_DEMO.scope;return {sourceScope:{bg:'ISG',report:'isg-service',geo:source.geo_cd,period:source.period_year+'-Q'+source.quarter},coverage:'single_profit_center',quarters:model.overview(),caseSummary:window.FPAWorkspace.getCaseSummary()};};
function fill(id,options,value){
 $(''+id).innerHTML=options.map(function(option){return '<option value="'+esc(option.id)+'">'+esc(option.label)+'</option>';}).join('');
 $(''+id).value=options.some(function(option){return option.id===value;})?value:options[0].id;
}
function reportOptions(){return config.reports.filter(function(report){return report.bg===$('kpiBG').value;});}
function hasCase(){return !!(activeData&&activeData.dataset.caseId==='service-allocation'&&activeData.caseSummary);}
function resolveData(){
 var dataset=config.resolve(selection),provider=dataset&&providers[dataset.provider];
 if(typeof provider!=='function')return null;
 try{
  var result=provider(Object.assign({},selection),dataset),period=config.periods.find(function(p){return p.id===selection.period;});
  if(!result||!Array.isArray(result.quarters)||!period||!result.sourceScope||!['bg','report','geo','period'].every(function(key){return result.sourceScope[key]===selection[key];}))return null;
  var latest=result.quarters.find(function(row){return row.label===period.label&&row.reviewed===true;});
  return latest?{dataset:dataset,quarters:result.quarters,latest:latest,caseSummary:result.caseSummary,coverage:result.coverage}:null;
 }catch(_){return null;}
}
function renderMatrix(){
 var enabled=activeData&&activeData.dataset.matrixId==='illustrative-monitor';
 $('monthlyMatrix').hidden=!enabled;
 $('matrixToggle').setAttribute('aria-expanded',String(expanded&&!!enabled));
 if(!enabled){$('statusGrid').innerHTML='';return;}
 var dataset=activeData.dataset,ordered=priority.concat(monitors.filter(function(name){return !priority.includes(name);}));
 $('statusGrid').innerHTML='<table class="status-table"><thead><tr><th scope="col">Monitor</th>'+months.map(function(month){return '<th scope="col">'+month+'</th>';}).join('')+'</tr></thead><tbody>'+ordered.map(function(name,index){
  return '<tr'+(index>=priority.length&&!expanded?' hidden':'')+'><th scope="row">'+name+'</th>'+months.map(function(month){
   var signal=name==='Segment'&&month===dataset.displayMonth,freight=name==='Freight'&&month==='Jun-26';
   return '<td>'+(signal?'<button type="button" class="status-light alert-light" data-review-allocation aria-label="Segment alert for '+esc(month)+'; review case period '+esc(dataset.casePeriod)+'"></button>':freight?'<button type="button" class="status-light alert-light" data-open-freight aria-label="Freight alert for Jun-26; open independent sample"></button>':'<span class="status-light" role="img" aria-label="No sample alert / illustrative"></span>')+'</td>';
  }).join('')+'</tr>';
 }).join('')+'</tbody></table>';
 $('matrixToggle').textContent=expanded?'Show only 6 priority monitors':'Show all '+monitors.length+' monitors';
}
var money=function(cents){return new Intl.NumberFormat('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}).format(cents/100);};
var compact=function(cents){return '$'+(cents/100000000).toFixed(2)+'m';};
var short=function(cents){return cents>=100000000?compact(cents):'$'+(cents/100000).toFixed(0)+'k';};
var definitions=[{key:'revenueCents',name:'Revenue',kind:'line',color:'var(--chart-series-1)',note:'Allocated revenue / reporting scope'},{key:'costCents',name:'Cost',kind:'line',color:'var(--chart-series-3)',note:'Net eligible cost / positive expense'},{key:'creditCents',name:'Cost credit',kind:'bar',color:'var(--chart-series-2)',note:'Negative source cost / absolute value'}];
function change(current,prior){var value=model.overviewChange(current,prior);return value===null?'No comparison base':(value>0?'+':'')+value.toFixed(1)+'% QoQ';}
function chart(rows,definition){
 var width=640,height=270,left=75,right=610,top=25,bottom=220,max=Math.max.apply(null,rows.map(function(r){return r[definition.key];}))*1.18||100;
 // Bars occupy quarter bands; their edges must not enter the y-axis label gutter.
 var step=(right-left)/rows.length,barWidth=Math.min(44,step*.6);
 var x=function(i){return definition.kind==='bar'?left+(i+.5)*step:left+i*(right-left)/(rows.length-1);},y=function(n){return bottom-n/max*(bottom-top);},out='';
 [0,max/2,max].forEach(function(n){out+='<line class="chart-gridline" x1="'+left+'" y1="'+y(n)+'" x2="'+right+'" y2="'+y(n)+'"/><text x="'+(left-12)+'" y="'+(y(n)+4)+'" text-anchor="end">'+short(n)+'</text>';});
 rows.forEach(function(row,i){out+='<text x="'+x(i)+'" y="255" text-anchor="middle">'+row.label+'</text>';});
 if(definition.kind==='line'){
  var path=rows.map(function(row,i){return (i?'L ':'M ')+x(i)+' '+y(row[definition.key]);}).join(' ');
  out+='<path class="kpi-trend" d="'+path+'" pathLength="1" fill="none" stroke="'+definition.color+'" stroke-width="3" stroke-linejoin="round"/>';
  rows.forEach(function(row,i){out+='<circle cx="'+x(i)+'" cy="'+y(row[definition.key])+'" r="'+(i===rows.length-1?6:4)+'" fill="'+definition.color+'"><title>'+row.label+' / '+money(row[definition.key])+' USD</title></circle>';});
 }else rows.forEach(function(row,i){var value=row[definition.key];out+='<rect class="kpi-bar" x="'+(x(i)-barWidth/2)+'" y="'+y(value)+'" width="'+barWidth+'" height="'+Math.max(2,bottom-y(value))+'" rx="4" fill="'+definition.color+'" style="animation-delay:'+i*60+'ms"><title>'+row.label+' / '+money(value)+' USD</title></rect>';});
 return '<svg viewBox="0 0 '+width+' '+height+'" role="img" aria-label="'+definition.name+' trend / '+rows[0].label+' to '+rows[rows.length-1].label+' / USD"><title>'+definition.name+' quarterly trend in USD</title>'+out+'</svg>';
}

function showNoData(){
 $('kpiDataPanel').hidden=true;$('kpiEmptyState').hidden=false;
 $('kpiEmptyState').innerHTML='<h2>No data for this scope</h2><p>No reviewed sample is connected. Choose ISG / ISG Service / ROW / 2026 Q3 to review the available sample.</p>';
 $('kpiDataNote').textContent='Select a connected reporting scope to see sample figures.';
 ['kpiMetrics','allocationCaseCard','kpiCharts','kpiQuarterTable','statusGrid'].forEach(function(id){$(id).innerHTML='';});
 $('kpiWindowLabel').textContent='';$('kpiDefinitionNote').textContent='';$('kpiRange').disabled=true;
 renderMatrix();
}
function render(){
 activeData=resolveData();
 if(!activeData){showNoData();return;}
 var all=activeData.quarters,latest=activeData.latest,index=all.indexOf(latest),rows=all.slice(0,index+1).slice(-Number($('kpiRange').value||5)),prior=all[index-1],summary=activeData.caseSummary;
 $('kpiDataPanel').hidden=false;$('kpiEmptyState').hidden=true;$('kpiEmptyState').innerHTML='';$('kpiRange').disabled=false;
 $('kpiDataNote').textContent='Sample data / '+(activeData.coverage==='single_profit_center'?'Single-profit-center sample, not a BG/Geo total. ':'Connected sample scope. ')+(rows.some(function(row){return !row.reviewed;})?'Trend includes synthetic history.':'');
 $('kpiWindowLabel').textContent=rows[0].label+'–'+latest.label+' / Quarterly totals / USD';
 var items=[{name:'Quarter Revenue',value:latest.revenueCents,note:prior?change(latest.revenueCents,prior.revenueCents):'No comparison base'},{name:'Quarter net Cost',value:latest.costCents,note:prior?change(latest.costCents,prior.costCents):'No comparison base'},{name:'Quarter GP',value:latest.revenueCents-latest.costCents,note:'Revenue less net Cost / Sample scope'}];
 $('kpiMetrics').innerHTML=items.map(function(item){return '<div><dt>'+item.name+' / '+esc(latest.label)+'</dt><dd>'+money(item.value)+'</dd><p>'+item.note+' / USD</p></div>';}).join('');
 $('allocationCaseCard').innerHTML=hasCase()?'<span class="screen-context">One allocation case / Finance review open</span><h2>Segment GP needs review</h2><p class="case-period">GA / '+esc(summary.closingPeriod)+' / Month 3 true-up</p><div class="case-decision"><p class="case-amount negative">GP '+money(summary.originalGA).replace('-','−')+' <small>USD</small></p><button type="button" class="key key-primary" data-review-allocation>Review allocation</button></div><p class="small">Quarter allocation weight '+(summary.originalGAWeight*100).toFixed(4)+'% / Reference 60.0000%</p><p>Quarter totals can hide a segment issue. Review the month-three allocation.</p><p class="small muted">Linked signal: LE negative quarter revenue base</p>':'<h2>No linked allocation case</h2><p>This dataset has no connected investigation.</p>';
 $('kpiCharts').innerHTML=definitions.map(function(d){return '<article class="monitor-card kpi-chart-card"><header><div><h2>'+d.name+' trend</h2><p>'+d.note+'</p></div><span class="pill">'+(d.kind==='line'?'Quarterly trend':'Source credits')+'</span></header><div class="monitor-chart">'+chart(rows,d)+'</div><footer><span>'+(prior?change(latest[d.key],prior[d.key]):'No comparison base')+'</span><span>'+(d.key==='creditCents'?'Selected quarter / source credits':'Earlier quarters / synthetic history')+'</span></footer></article>';}).join('');
 $('kpiWindowLabel').textContent+=' / Cost credit '+money(latest.creditCents)+' USD (already included in net Cost)';
 $('kpiDefinitionNote').textContent='Selected-quarter Cost credit: '+money(latest.creditCents)+' USD, already included in net Cost. Earlier quarters are synthetic; QoQ uses the previous quarter, with no comparison when its value is zero.';
 $('kpiQuarterTable').innerHTML='<table><thead><tr><th scope="col">Quarter</th><th scope="col">Revenue / USD</th><th scope="col">Cost / USD</th><th scope="col">Cost credit / USD</th><th scope="col">Source</th></tr></thead><tbody>'+rows.map(function(row){return '<tr><th scope="row">'+esc(row.label)+'</th>'+definitions.map(function(d){return '<td class="numeric">'+money(row[d.key])+'</td>';}).join('')+'<td>'+(row.reviewed?'Reviewed selected-quarter sample':'Synthetic history')+'</td></tr>';}).join('')+'</tbody></table>';
 renderMatrix();
}
function changeScope(){
 selection={bg:$('kpiBG').value,report:$('kpiReport').value,geo:$('kpiGeo').value,period:$('kpiPeriod').value};
 expanded=false;$('kpiDefinitions').open=false;render();
}
fill('kpiBG',config.businessGroups,selection.bg);fill('kpiReport',reportOptions(),selection.report);fill('kpiGeo',config.geos,selection.geo);fill('kpiPeriod',config.periods,selection.period);
$('kpiBG').addEventListener('change',function(){fill('kpiReport',reportOptions(),$('kpiReport').value);changeScope();});
['kpiReport','kpiGeo','kpiPeriod'].forEach(function(id){$(id).addEventListener('change',changeScope);});
$('kpiRange').addEventListener('change',render);
$('closeFreight').addEventListener('click',function(){$('freightAlert').close();});
document.addEventListener('click',function(event){
 var button=event.target.closest('button');if(!button)return;
 if(button.hasAttribute('data-open-freight')&&activeData)$('freightAlert').showModal();
 if(button.hasAttribute('data-toggle-matrix')&&activeData){expanded=!expanded;renderMatrix();}
});
document.addEventListener('workspace:view',function(event){if(event.detail.name==='kpi')render();});
window.FPAKpiOverview={hasData:function(){return !!activeData;},hasCase:hasCase,getScope:function(){return Object.assign({},selection);}};
render();
})();
