/* Overview selection catalog. An option does not imply a connected dataset. */
(function(root){'use strict';
var defaults={bg:'ISG',report:'isg-service',geo:'ROW',period:'2026-Q3'};
var datasets=[{id:'isg-service-row-2026-q3',scope:defaults,provider:'isg-allocation-sample',coverage:'single_profit_center',casePeriod:'2026009',displayMonth:'Dec-26',monthLink:'illustrative',caseId:'service-allocation',matrixId:'illustrative-monitor'}];
function resolve(selection){return datasets.find(function(dataset){return ['bg','report','geo','period'].every(function(key){return dataset.scope[key]===selection[key];});})||null;}
root.FPAKpiScopes={version:1,defaults:defaults,
 businessGroups:[{id:'ISG',label:'ISG'},{id:'PCSD',label:'PCSD'},{id:'MBG',label:'MBG'},{id:'SSG',label:'SSG'}],
 reports:[{id:'isg-service',bg:'ISG',label:'ISG Service'},{id:'isg-hw',bg:'ISG',label:'ISG HW'},{id:'pcsd-hw',bg:'PCSD',label:'PCSD HW'},{id:'pcsd-service',bg:'PCSD',label:'PCSD Service'},{id:'mbg-hw-service',bg:'MBG',label:'MBG HW/Service'},{id:'lps',bg:'SSG',label:'LPS'}],
 geos:[{id:'ROW',label:'ROW'},{id:'PRC',label:'PRC'}],
 periods:[{id:'2026-Q3',label:'2026 Q3'},{id:'2026-Q2',label:'2026 Q2'},{id:'2026-Q1',label:'2026 Q1'},{id:'2025-Q4',label:'2025 Q4'},{id:'2025-Q3',label:'2025 Q3'}],
 datasets:datasets,resolve:resolve};
})(window);
