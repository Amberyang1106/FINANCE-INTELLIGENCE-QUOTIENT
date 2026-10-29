/* Presentation only; timings never write financial values or task state. */
(function () {
  'use strict';
  var groups = new Map(), pendingBoard = null;
  var preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  function cancel(name) {
    var group = groups.get(name); if (!group) return;
    group.timers.forEach(clearTimeout);
    group.animations.forEach(function (a) { a.cancel(); });
    group.focused.forEach(function (el) { el.classList.remove('story-focus'); });
    groups.delete(name);
  }
  function cancelAll() { Array.from(groups.keys()).forEach(cancel); pendingBoard = null; }
  function visible(el) { return el && el.isConnected && !el.closest('[hidden]') && typeof el.animate === 'function'; }
  function play(name, steps) {
    cancel(name); if (preference.matches || document.hidden) return;
    var group = {timers:[], animations:[], focused:[]}; groups.set(name, group);
    steps.forEach(function (step) {
      var el = step.el; if (!visible(el)) return;
      if (step.focus) {
        group.timers.push(setTimeout(function () {
          if (!visible(el)) return;
          el.classList.add('story-focus'); group.focused.push(el);
          group.timers.push(setTimeout(function () { el.classList.remove('story-focus'); }, 900));
        }, step.at || 0));
      } else {
        var animation = el.animate(step.frames || [{opacity:0,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}],
          {duration:step.duration || 340,delay:step.at || 0,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'});
        group.animations.push(animation);
        animation.finished.then(function () { animation.cancel(); }, function () {});
      }
    });
    var end = steps.reduce(function (max, s) { return Math.max(max,(s.at || 0)+(s.focus?900:s.duration || 340)); },0);
    group.timers.push(setTimeout(function () { if (groups.get(name) === group) cancel(name); },end+40));
  }
  function focus(el, at) { return {el:el,at:at,focus:true}; }
  function q(selector) { return document.querySelector(selector); }
  function monitor() {
    if (!q('#ledgerTable .focus-row')) { cancel('monitor'); return; }
    play('monitor', [focus(q('#ledgerTable .focus-row td:last-child'),0),focus(q('#ledgerTable .warning-row td:nth-child(2)'),650),focus(q('#monitorAlerts [data-analyze="GA"]'),1300)]);
  }
  function investigation(stage, complete) {
    var steps = [];
    if (complete) {
      steps.push({el:q('#analysisThread .finding-ledger')});
      document.querySelectorAll('#analysisThread .trace-list li').forEach(function (el,i) { steps.push({el:el,at:180+i*130}); });
      steps.push(focus(q('#evidenceContent .evidence-voucher'),600));
    } else {
      steps.push({el:q('#analysisThread .execution-stack li.current')});
      var evidence = [q('#evidenceContent .cause-row'),q('#evidenceContent .cause-root'),document.querySelectorAll('#evidenceContent .cause-row')[1],q('#evidenceContent .evidence-voucher')];
      steps.push(focus(evidence[stage],120));
    }
    play('investigation',steps);
  }
  function voucher() {
    var fields = document.querySelectorAll('#voucherContent .voucher-ledger > div');
    play('voucher', [{el:q('#voucherDialog'),duration:280,frames:[{opacity:0,transform:'translateY(8px) scale(.99)'},{opacity:1,transform:'translateY(0) scale(1)'}]},focus(q('#voucherContent .voucher-amount'),200),focus(fields[3],550),focus(fields[5],900),focus(fields[6],1250),{el:q('#voucherContent h3'),at:1550},{el:q('#voucherContent h3 + p'),at:1650}]);
  }
  function scenario() {
    var rows = document.querySelectorAll('#scenarioContent .mini-comparison > div');
    play('scenario',[focus(rows[0],0),focus(rows[1],450),focus(rows[2],750),focus(q('#scenarioContent .scenario-result'),1100),focus(rows[rows.length-1],1550),focus(q('#scenarioContent .scenario-note'),1800)]);
  }
  function captureTasks() {
    var boxes = new Map();
    if (!q('#tasksView') || q('#tasksView').hidden) return boxes;
    document.querySelectorAll('#taskKanban [data-open-task]').forEach(function (el) { boxes.set(el.dataset.openTask,el.getBoundingClientRect()); });
    return boxes;
  }
  function taskBoard(before) {
    if (q('#taskDetailDialog').open) { if (!pendingBoard) pendingBoard=before; return; }
    var steps=[],added=0;
    document.querySelectorAll('#taskKanban [data-open-task]').forEach(function (el) {
      var old=before.get(el.dataset.openTask), now=el.getBoundingClientRect();
      if (!old) { steps.push({el:el,at:added++*90}); steps.push(focus(el,added*90+260)); }
      else if (Math.abs(old.left-now.left)>1 || Math.abs(old.top-now.top)>1) {
        steps.push({el:el,duration:520,frames:[{transform:'translate('+(old.left-now.left)+'px,'+(old.top-now.top)+'px)'},{transform:'translate(0,0)'}]});
        steps.push(focus(el,420));
      }
    });
    play('tasks',steps);
  }
  function taskUpdate() {
    play('task-detail',[{el:q('#taskDetailBody .task-flow-step.current .task-flow-node'),frames:[{opacity:.5,transform:'scale(.92)'},{opacity:1,transform:'scale(1)'}]},focus(q('#taskDetailBody .task-flow-note'),250),{el:q('#taskDetailBody .task-log-event:last-child'),at:260},focus(q('#taskDetailBody .task-flow-step:last-child.done .task-flow-node'),0)]);
  }
  window.addEventListener('resize',function () { cancel('tasks'); pendingBoard=null; });
  document.addEventListener('workspace:view',cancelAll);
  ['voucherDialog','taskDetailDialog'].forEach(function (id) {
    document.getElementById(id).addEventListener('close',function () {
      cancel(id==='voucherDialog'?'voucher':'task-detail');
      if (id==='taskDetailDialog' && pendingBoard) { var before=pendingBoard;pendingBoard=null;taskBoard(before); }
    });
  });
  document.addEventListener('visibilitychange',function () { if (document.hidden) cancelAll(); });
  preference.addEventListener('change',cancelAll);
  window.FPAStoryMotion={cancel:cancel,cancelAll:cancelAll,monitor:monitor,investigation:investigation,voucher:voucher,scenario:scenario,captureTasks:captureTasks,taskBoard:taskBoard,taskUpdate:taskUpdate};
})();
