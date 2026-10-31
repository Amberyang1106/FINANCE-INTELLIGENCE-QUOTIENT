/* Presentation only: cents and weights are supplied by the reviewed allocation engine. */
(function(root){'use strict';
function total(values){return Object.keys(values).reduce(function(n,k){return n+values[k];},0);}
function summary(data,baseline,adjusted){
 var original=baseline.months[2],candidate=adjusted.months[2];
 return {scope:JSON.parse(JSON.stringify(data.scope)),closingPeriod:data.scope.periods[2],quarterlyGP:total(baseline.quarter.gp),originalGA:original.gp.GA,candidateGA:candidate.gp.GA,originalLE:original.gp.LE,candidateLE:candidate.gp.LE,originalTotal:total(original.gp),candidateTotal:total(candidate.gp),originalGAWeight:baseline.quarter.rates.GA,candidateGAWeight:adjusted.quarter.rates.GA};
}
function steps(state){
 var calculated=state.analysisStatus==='complete',saved=!!state.hasSavedPlan;
 return [
 {id:'monitor',label:'Review allocation',available:true,status:'not_started'},
 {id:'analysis',label:'Investigate',available:true,status:calculated?'calculated':state.analysisStatus==='running'?'in_progress':'not_started'},
 {id:'scenario',label:'Compare scenario',available:calculated||saved,status:saved?(state.hasUnsavedChanges?'in_progress':'saved'):'not_started'},
 {id:'reports',label:'Investigation Reports',available:true,status:state.hasReport?'generated':'not_started'},
 {id:'tasks',label:'Follow up',available:true,status:state.taskCount>0?'tasks_created':'not_started'}
 ].map(function(step){step.current=state.view===step.id;return step;});
}
root.FPACaseUI={summary:summary,steps:steps};
})(window);
