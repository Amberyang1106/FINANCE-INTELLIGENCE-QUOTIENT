/* Curated demo knowledge and deterministic local text retrieval. No model or embeddings. */
(function (root) {
  'use strict';
  var reports = [{id:'isg-service',name:'ISG Service'},{id:'row-psd',name:'ROW PSD'}];
  var builtin = {id:'builtin-mr-logic',name:'MR Logic',report:'isg-service',builtin:true,description:'Curated ISG Service allocation rules from the confirmed business story.',sources:[
    {id:'business-logic',type:'file',name:'Business Logic.md',updatedAt:'2026-10-28',sections:[
      {id:'allocation-scope',title:'Allocation scope and eligible inputs',kind:'rule',tags:['allocation','methodology','revenue base'],text:'Allocate ISG Service costs by quarter, profit center and bpc_seg_cd, using the share of revenue after allocation (Rev%). The revenue base includes AMTREV, IMMDREV and GTN rows where checking_flg=AL and non_alloc_flg is not Y. Cost inputs are BMC and NBMC rows where checking_flg is blank and non_alloc_flg is not Y.'},
      {id:'copy-routing',title:'Copy costs before allocating the pool',kind:'rule',tags:['allocation','copy','A/B/C','gtm'],text:'Costs with an existing bpc_seg_cd are copied to that segment, regardless of alloc_flg. If bpc_seg_cd is blank, alloc_flg=B and refreshed_gtm_cust_seg_leve2 has a value, map SM to B0 and MM to SMBMM; retain other values and copy the cost. Other costs with a blank bpc_seg_cd enter the allocation pool. An A-class cost with missing bpc_seg_cd also triggers the A-class missing-dimension check.'},
      {id:'monthly-rate',title:'Month 1 and month 2 allocation',kind:'rule',tags:['allocation','monthly','Rev%'],text:'For month 1 and month 2, Rev%[segment] = the month revenue base for that segment / the total month revenue base for the profit center. Allocated cost[segment] = the month allocation pool × that month Rev%. Keep copied costs separate from the allocated pool.'},
      {id:'quarter-true-up',title:'Month 3 quarterly true-up',kind:'rule',tags:['allocation','quarter','true-up','month 3'],text:'For month 3, calculate quarterly Rev% from the quarter revenue base. Month 3 allocated cost[segment] = quarter allocation pool × quarterly Rev%[segment] − month 1 executed allocation[segment] − month 2 executed allocation[segment]. Deduct prior pool allocations only, not copied costs. In the approved close scenario, months 1–2 stay locked and only month 3 true-up is recalculated.'},
      {id:'no-base',title:'No-base default and unresolved boundaries',kind:'rule',tags:['allocation','B0','no base'],text:'When there is no revenue base, allocate the cost pool to B0 (no_base_default_seg). Do not automatically treat a net-zero, near-zero or negative total revenue base as the no-row case; those boundary policies require separate confirmation. A negative true-up can be a valid quarterly adjustment and is not by itself proof of a posting error.'},
      {id:'base-exclusion',title:'Revenue-base exclusion scenario',kind:'concept',tags:['scenario','revenue','GP','exclusion'],text:'In the approved demonstration, exclude the selected revenue voucher from the allocation base only. Posted revenue, copy costs, the cost pool and months 1–2 executed allocations remain unchanged. Recalculate the quarter target and month 3 true-up for all affected segments. Cost shifts between segments, so a better GA result is not an increase in total profit; the LE posting still requires finance review.'}
    ]},
    {id:'data-dictionary',type:'file',name:'Data Dictionary & Mapping.md',updatedAt:'2026-10-28',sections:[
      {id:'checking-flag',title:'checking_flg: before and after allocation',kind:'field',tags:['checking_flg','AL','revenue','cost'],text:'checking_flg=AL identifies after-allocation rows; a blank checking_flg identifies before-allocation rows. This flag applies to both revenue and cost. Use after-allocation revenue for the base and before-allocation cost for the input pool; do not reallocate already-allocated cost rows.'},
      {id:'allocation-flags',title:'alloc_flg: A, B and C',kind:'field',tags:['alloc_flg','A/B/C','manual','dimension'],text:'alloc_flg identifies allocation scenarios A, B and C. A-class records are expected to obtain bpc_seg_cd from sales orders; a blank A-class cost segment triggers a missing-dimension check. For B-class costs with blank bpc_seg_cd and a populated GTM level 2, map the GTM value before copy. Do not infer a separate cost pool per alloc_flg unless the allocation policy explicitly requires it.'},
      {id:'non-allocation',title:'non_alloc_flg: excluded rows',kind:'field',tags:['non_alloc_flg','Y','exclude'],text:'non_alloc_flg=Y means the row does not participate in allocation. Remove such revenue rows from the revenue base and such cost rows from the cost input. Blank non_alloc_flg values remain eligible. The demo action of excluding one revenue-base contribution is distinct from changing the original non_alloc_flg or removing related cost.'},
      {id:'categories-currency',title:'Service categories and amount selection',kind:'field',tags:['svc_catg_cd','geo_cd','amt','amt_lc','currency'],text:'Revenue categories are AMTREV, IMMDREV and GTN; cost categories are BMC and NBMC. Select amt_lc for geo_cd=PRC; select amt for other geographies, including ROW. The sample displays USD. The field-selection rule alone does not establish the currency of every real dataset.'},
      {id:'period-mapping',title:'Quarter and month-in-quarter mapping',kind:'field',tags:['period','quarter','month'],text:'Parse the period-year and period number first. Month-in-quarter = (period − 1) % 3 + 1. Quarter = floor((period − 1) / 3) + 1. For example, periods 2025007–2025009 map to Q3 of that period-year. Do not run the formula directly on the full seven-digit key or infer a company fiscal-year label from it.'}
    ]}
  ]};
  function sectionsFromText(text, title) {
    var clean = String(text || '').replace(/\r\n/g,'\n').trim();
    if (!clean) return [];
    var parts = clean.split(/\n\s*\n/).flatMap(function (p) { return p.match(/[\s\S]{1,1600}/g) || []; });
    return parts.map(function (p,i) { return {id:'section-'+(i+1),title:parts.length===1?title:title+' · '+(i+1),kind:'source',tags:[],text:p.trim()}; });
  }
  function retrieve(bases, report, library, question) {
    var q = question.toLowerCase().trim();
    var scope = bases.filter(function (b) { return b.report === report && (library === 'all' || b.id === library); });
    var stop = new Set(['a','an','the','is','are','for','of','to','and','in','on','me','my','please','pls','tell','what','how','does','do','can','you','about','service','isg']);
    var words = (q.match(/[a-z0-9_]+/g) || []).filter(function (w) { return !stop.has(w) && w.length > 1; });
    var compounds = q.match(/[a-z0-9]+(?:[-_][a-z0-9]+)+/g) || [];
    var broad = /allocation logic|allocation method|how.*allocat|explain.*allocat/.test(q);
    var broadIds = ['allocation-scope','copy-routing','monthly-rate','quarter-true-up','no-base','categories-currency'];
    var hits = [];
    scope.forEach(function (b) { b.sources.forEach(function (source) { (source.sections || []).forEach(function (s) {
      var hay = (s.title+' '+s.text+' '+(s.tags||[]).join(' ')).toLowerCase();
      var score = words.reduce(function (n,w) { return n + (hay.includes(w)?1:0) + (s.title.toLowerCase().includes(w)?2:0); },0);
      var exactField = words.filter(function (w) { return w.includes('_') && hay.includes(w); });
      if (exactField.length) score += 10;
      score += compounds.reduce(function (n,term) { return n+(hay.includes(term)?12:0); },0);
      if (broad && b.builtin) score = broadIds.includes(s.id) ? 100-broadIds.indexOf(s.id) : 0;
      if (score > 0) hits.push({id:b.id+'/'+source.id+'/'+s.id,baseId:b.id,baseName:b.name,sourceId:source.id,sourceName:source.name,sourceType:source.type,sectionId:s.id,title:s.title,text:s.text,kind:s.kind,tags:s.tags||[],score:score,report:report});
    }); }); });
    hits.sort(function (a,b) { return b.score-a.score || a.id.localeCompare(b.id); });
    var minimum = hits.length ? Math.max(1,Math.ceil(hits[0].score * 0.55)) : 1;
    return {hits:hits.filter(function (h) { return h.score >= minimum; }).slice(0,6),baseNames:scope.map(function (b) { return b.name; }),sourceCount:scope.reduce(function (n,b) { return n+b.sources.filter(function (s) { return s.sections.length; }).length; },0)};
  }
  root.FPAKnowledgeModel = {reports:reports,builtin:builtin,sectionsFromText:sectionsFromText,retrieve:retrieve};
})(globalThis);
