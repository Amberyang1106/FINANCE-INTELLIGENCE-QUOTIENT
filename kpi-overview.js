/* Fixed KPI monitors reuse the reviewed allocation model; historical quarters are illustrative. */
(function(){'use strict';
var model=window.FPAMonitor,$=function(id){return document.getElementById(id);};
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
function render(){
 var all=model.overview(),rows=all.slice(-Number($('kpiRange').value)),latest=all[4],prior=all[3];
 $('kpiWindowLabel').textContent=rows[0].label+'–'+latest.label+' / Quarterly totals / USD';
 $('kpiMetrics').innerHTML=definitions.map(function(d){return '<div><dt>'+d.name+' / '+latest.label+'</dt><dd>'+money(latest[d.key])+'</dd><p>'+change(latest[d.key],prior[d.key])+' / USD</p></div>';}).join('');
 $('kpiCharts').innerHTML=definitions.map(function(d){return '<article class="monitor-card kpi-chart-card"><header><div><h2>'+d.name+' trend</h2><p>'+d.note+'</p></div><span class="pill">'+(d.kind==='line'?'Quarterly trend':'Source credits')+'</span></header><div class="monitor-chart">'+chart(rows,d)+'</div><footer><span>'+change(latest[d.key],prior[d.key])+'</span><span>'+ (d.key==='creditCents'?'Q3: no eligible credit rows':'Latest quarter / reviewed sample')+'</span></footer></article>';}).join('');
 $('kpiQuarterTable').innerHTML='<table><thead><tr><th scope="col">Quarter</th><th scope="col">Revenue / USD</th><th scope="col">Cost / USD</th><th scope="col">Cost credit / USD</th><th scope="col">Source</th></tr></thead><tbody>'+rows.map(function(r){return '<tr><th scope="row">'+r.label+'</th>'+definitions.map(function(d){return '<td class="numeric">'+money(r[d.key])+'</td>';}).join('')+'<td>'+(r.reviewed?'Reviewed Q3 sample':'Synthetic history')+'</td></tr>';}).join('')+'</tbody></table>';
}
$('kpiRange').addEventListener('change',render);
document.addEventListener('workspace:view',function(e){if(e.detail.name==='kpi')render();});
render();
})();
