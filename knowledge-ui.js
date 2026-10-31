/* Report-logic chat and browser-local personal knowledge. */
(function () {
  'use strict';
  var model = window.FPAKnowledgeModel;
  var workspace = window.FPAWorkspace;
  if (!model || !workspace) return;
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (v) { return String(v == null ? '' : v).replace(/[&<>"']/g,function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); };
  var uid = function () { return crypto.randomUUID(); };
  var reportName = function (id) { return (model.reports.find(function (r) { return r.id===id; }) || {}).name || id; };
  var storageKey = 'fpa-report-knowledge:v1';
  var state = {bases:[],chats:[],activeChat:null,activeBase:model.builtin.id};
  var view = {tab:'file',filter:'all',query:'',sourceType:'note',editingSource:null,pendingDelete:null};
  var running = null, storageOk = true;
  try {
    var saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
    if (saved && saved.version===1 && Array.isArray(saved.bases) && Array.isArray(saved.chats)) {
      state.bases = saved.bases.filter(function (b) { return b.id && typeof b.name==='string' && model.reports.some(function (r) { return r.id===b.report; }) && Array.isArray(b.sources); }).map(function (b) { b.builtin=false; b.sources=b.sources.filter(function (s) { return s.id && typeof s.name==='string' && Array.isArray(s.sections); }); return b; });
      state.chats = saved.chats.filter(function (c) { return c.id && Array.isArray(c.messages) && model.reports.some(function (r) { return r.id===c.report; }); });
      state.activeChat = state.chats.some(function (c) { return c.id===saved.activeChat; }) ? saved.activeChat : null;
      state.activeBase = saved.activeBase || model.builtin.id;
      state.chats.forEach(function (c) { c.messages.forEach(function (m) { if (m.role==='assistant' && ['retrieving','streaming'].includes(m.status)) m.status='stopped'; }); });
    }
  } catch (_) { storageOk=false; }
  function bases() { return [model.builtin].concat(state.bases); }
  function base() { return bases().find(function (b) { return b.id===state.activeBase; }) || model.builtin; }
  function chat() { return state.chats.find(function (c) { return c.id===state.activeChat; }); }
  function persist() {
    try { localStorage.setItem(storageKey,JSON.stringify(Object.assign({version:1},state))); storageOk=true; }
    catch (_) { storageOk=false; }
    $('knowledgeStorage').textContent=storageOk?'Personal libraries and conversations are saved in this browser.':'Browser storage is unavailable or full. Changes remain in this session only.';
  }
  function renderChatList() {
    $('chatList').innerHTML=state.chats.length ? state.chats.map(function (c) { return '<div class="conversation-item '+(c.id===state.activeChat?'selected':'')+'"><button type="button" data-chat="'+c.id+'"><strong>'+esc(c.title || 'New report conversation')+'</strong><small>'+esc(reportName(c.report))+'</small></button><button type="button" class="conversation-remove" data-delete-chat="'+c.id+'" aria-label="Remove conversation '+esc(c.title || 'New report conversation')+'">×</button></div>'; }).join(''):'<p class="small muted">Your report questions will appear here.</p>';
  }
  function newChat(report,library) {
    stopStream();
    var c={id:uid(),report:report || 'isg-service',library:library || 'all',title:'New report conversation',messages:[],createdAt:new Date().toISOString()};
    state.chats.unshift(c); state.activeChat=c.id; persist(); renderChatList(); workspace.showView('chat'); renderChat(); $('knowledgePrompt').value=''; $('knowledgePrompt').focus();
  }
  function focusChat() { if (!chat()) newChat(); else { workspace.showView('chat'); renderChat(); $('knowledgePrompt').focus(); } }
  function renderChat() {
    var c=chat();
    $('chatReport').innerHTML=model.reports.map(function (r) { return '<option value="'+r.id+'">'+r.name+'</option>'; }).join('');
    $('chatReport').value=c?c.report:'isg-service';
    var report=c?c.report:'isg-service';
    var options=bases().filter(function (b) { return b.report===report; });
    $('chatLibrary').innerHTML='<option value="all">All knowledge for this report</option>'+options.map(function (b) { return '<option value="'+b.id+'">'+esc(b.name)+(b.builtin?' / Built-in':' / Personal')+'</option>'; }).join('');
    if (c && c.library!=='all' && !options.some(function (b) { return b.id===c.library; })) c.library='all';
    $('chatLibrary').value=c?c.library:'all';
    var busy=!!(running && c && running.chatId===c.id);
    $('chatReport').disabled=busy; $('chatLibrary').disabled=busy; $('knowledgeSend').hidden=busy; $('knowledgeStop').hidden=!busy;
    $('chatTitle').textContent='Ask Report Rules';
    $('chatSuggestions').innerHTML=(report==='isg-service'?['pls tell me the allocation logic for ISG Service?','How is month 3 true-up calculated?','What does non_alloc_flg mean?']:['What rules are documented for ROW PSD?']).map(function (q) { return '<button type="button" data-knowledge-prompt="'+esc(q)+'">'+esc(q)+'</button>'; }).join('');
    renderMessages(); renderSources(); renderChatList();
  }
  function renderMessages() {
    var c=chat();var el=$('chatMessages');var atEnd=el.scrollHeight-el.scrollTop-el.clientHeight<140;
    if (!c || !c.messages.length) {
      el.innerHTML='<div class="knowledge-welcome"><span class="large-mark" aria-hidden="true">F</span><h2>Ask a report question.<br>See the knowledge behind it.</h2><p>Choose the management report above. I will find relevant source sections and organize the answer with citations.</p><div class="welcome-source"><span>Built-in knowledge</span><strong>MR Logic</strong><p>ISG Service / 2 documents / '+model.builtin.sources.reduce(function (n,s) { return n+s.sections.length; },0)+' knowledge cards</p><button type="button" class="row-link" data-browse-builtin>Browse the source rules</button></div></div>';return;
    }
    el.innerHTML=c.messages.map(function (m) {
      if (m.role==='user') return '<article class="knowledge-message"><div class="avatar" aria-hidden="true">YT</div><div><div class="chat-message-label">You <span>'+esc(reportName(m.report))+'</span></div><p class="user-question">'+esc(m.text)+'</p></div></article>';
      var remaining=m.visibleChars || 0;
      var blocks=(m.blocks || []).map(function (b,i) { if (remaining<=0) return '';var text=b.text.slice(0,remaining);remaining-=b.text.length;return '<section class="answer-section"><h3>'+esc(b.title)+'</h3><p>'+esc(text)+'</p>'+(text.length===b.text.length && m.citations[i]?'<button type="button" class="citation" data-cite-message="'+m.id+'" data-cite-index="'+i+'">['+(i+1)+'] '+esc(m.citations[i].sourceName)+'</button>':'')+'</section>'; }).join('');
      var trace=(m.trace || []).map(function (t) { return '<li>'+esc(t)+'</li>'; }).join('');
      var status=m.status==='streaming'?'Writing from retrieved knowledge…':m.status==='retrieving'?'Retrieving knowledge…':m.status==='stopped'?'Stopped / Partial response':m.notFound?'No matching source found':'Answer complete / Source-backed demo';
      return '<article class="knowledge-message assistant"><div class="avatar" aria-hidden="true">F</div><div class="answer-body"><div class="chat-message-label">FINANCE EXCEPTION INTELLIGENCE <span>'+esc(reportName(m.report))+' / Simulated AI</span></div><details class="retrieval-trace" '+(m.status==='retrieving'?'open':'')+'><summary>'+status+'</summary><ol>'+trace+'</ol></details>'+blocks+(m.notice?'<p class="info-box">'+esc(m.notice)+'</p>':'')+(m.status==='streaming'?'<span class="stream-caret" aria-hidden="true"></span>':'')+(m.status==='stopped'?'<p class="small muted">This response was stopped before completion. Sources already retrieved remain available.</p>':'')+'</div></article>';
    }).join('');
    if (atEnd) el.scrollTop=el.scrollHeight;
  }
  function latestAnswer() { var c=chat();return c?c.messages.slice().reverse().find(function (m) { return m.role==='assistant'; }):null; }
  function renderSources() {
    var last=latestAnswer();var citations=last?last.citations || []:[];
    $('chatSources').innerHTML=citations.length?'<p class="small muted">'+citations.length+' matched sections / '+new Set(citations.map(function (h) { return h.baseId+'/'+h.sourceId; })).size+' source documents</p>'+citations.map(function (h,i) { return '<button type="button" class="chat-source-card" data-cite-message="'+last.id+'" data-cite-index="'+i+'"><span>['+(i+1)+'] '+esc(h.baseName)+'</span><strong>'+esc(h.title)+'</strong><small>'+esc(h.sourceName)+'</small><p>'+esc(h.text.slice(0,110))+'…</p></button>'; }).join(''):'<div class="source-empty"><span aria-hidden="true">↳</span><p>Retrieved sections will appear here. Click a citation to inspect its exact text.</p><button type="button" class="row-link" data-browse-builtin>Explore built-in knowledge</button></div>';
  }
  function stopStream() {
    if (!running) return;
    clearTimeout(running.timer);
    var c=state.chats.find(function (x) { return x.id===running.chatId; });var m=c&&c.messages.find(function (x) { return x.id===running.messageId; });
    if (m) m.status='stopped';running=null;persist();renderChat();$('chatNotice').textContent='Response stopped. The partial answer is kept in this conversation.';
  }
  function sendQuestion(question) {
    if (!question.trim()) { $('chatNotice').textContent='Enter a question or choose a suggested question.';$('knowledgePrompt').focus();return; }
    if (running) return;
    if (!chat()) newChat($('chatReport').value,$('chatLibrary').value);
    var c=chat();var q=question.trim();
    c.messages.push({id:uid(),role:'user',report:c.report,text:q});
    if (c.messages.filter(function (m) { return m.role==='user'; }).length===1) c.title=q.length>54?q.slice(0,51)+'…':q;
    var message={id:uid(),role:'assistant',report:c.report,status:'retrieving',visibleChars:0,blocks:[],citations:[],trace:['Report scope: '+reportName(c.report)],createdAt:new Date().toISOString()};c.messages.push(message);
    var task={chatId:c.id,messageId:message.id,timer:null};running=task;persist();$('knowledgePrompt').value='';renderChat();
    $('chatNotice').textContent='Searching the selected report knowledge. This is a local demo retrieval.';
    task.timer=setTimeout(function () {
      if (running!==task) return;
      var result=model.retrieve(bases(),c.report,c.library,q);
      message.trace.push('Search knowledge bases: '+(result.baseNames.join(', ') || 'none attached to this report'));
      message.trace.push('Read '+result.sourceCount+' searchable source documents; matched '+result.hits.length+' sections.');
      message.citations=JSON.parse(JSON.stringify(result.hits));renderMessages();renderSources();
      task.timer=setTimeout(function () {
        if (running!==task) return;
        if (!result.hits.length) {
          message.notFound=true;message.notice='No matching knowledge was found for '+reportName(c.report)+'. Add a relevant file or note, or select another knowledge base. I will not substitute rules from another report.';message.status='complete';message.trace.push('No answer generated without matching report knowledge.');running=null;persist();renderChat();$('chatNotice').textContent='No matching source. Add knowledge for this report to continue.';return;
        }
        message.blocks=result.hits.map(function (h) { return {title:h.title,text:h.text}; });message.status='streaming';message.trace.push('Organize the retrieved sections and stream the answer with citations.');
        var length=message.blocks.reduce(function (n,b) { return n+b.text.length; },0);var lastSaved=0;
        persist();renderChat();$('chatNotice').textContent='Streaming a source-backed demo answer. You can stop the response.';
        function tick() {
          if (running!==task) return;
          message.visibleChars=Math.min(length,message.visibleChars+18);renderMessages();
          if (message.visibleChars-lastSaved>=360) { persist();lastSaved=message.visibleChars; }
          if (message.visibleChars>=length) { message.status='complete';running=null;persist();renderChat();$('chatNotice').textContent='Answer complete. Open a citation to inspect the retrieved text.';return; }
          task.timer=setTimeout(tick,35);
        }
        tick();
      },400);
    },500);
  }
  function allSourceRows() { return bases().flatMap(function (b) { return b.sources.map(function (s) { return {base:b,source:s}; }); }); }
  function showEvidence(title, subtitle, sections, footer) {
    $('knowledgeEvidenceTitle').textContent=title;
    $('knowledgeEvidenceBody').innerHTML='<p class="small muted">'+esc(subtitle)+'</p>'+sections.map(function (s) { return '<section class="source-excerpt"><span class="kind-tag">'+esc(s.kind || 'source')+'</span><h3>'+esc(s.title)+'</h3><blockquote>'+esc(s.text)+'</blockquote></section>'; }).join('')+(footer || '');
    $('knowledgeEvidenceDialog').showModal();
  }
  function showCitation(messageId,index) {
    var m=state.chats.flatMap(function (c) { return c.messages; }).find(function (m) { return m.id===messageId; });var h=m&&m.citations&&m.citations[index];if (!h) return;
    showEvidence(h.sourceName,reportName(h.report)+' / '+h.baseName+' / Retrieved source snapshot',[h],'<p class="small muted">This citation retains the source text used for this answer, even if the personal source is edited or removed later.</p>');
  }
  function showSource(baseId,sourceId) {
    var b=bases().find(function (b) { return b.id===baseId; });var s=b&&b.sources.find(function (s) { return s.id===sourceId; });if (!s) return;
    var foot=s.type==='link'?'<p class="small muted">Saved URL: '+esc(s.url)+'. Only the supplied excerpt is searchable; this demo does not crawl the page.</p>':'';
    showEvidence(s.name,reportName(b.report)+' / '+b.name,s.sections,foot);
  }
  function renderKnowledgeList() {
    $('knowledgeList').innerHTML=bases().map(function (b) { return '<button type="button" class="kb-library '+(b.id===base().id?'selected':'')+'" data-base="'+b.id+'"><span class="kb-library-icon" aria-hidden="true">▤</span><span><strong>'+esc(b.name)+'</strong><small>'+esc(reportName(b.report))+' / '+(b.builtin?'Built-in':'Personal')+'</small></span><b>'+b.sources.length+'</b></button>'; }).join('');
  }
  function renderKnowledge() {
    var b=base();state.activeBase=b.id;renderKnowledgeList();
    $('knowledgeHeader').innerHTML='<div><h2>'+esc(b.name)+'</h2><p>'+esc(b.description || 'Your report-specific knowledge.')+'</p></div><div><span class="pill '+(b.builtin?'success':'')+'">'+(b.builtin?'Built-in / Read-only':'Personal')+'</span><span class="kb-search-mode">Local text search / Demo</span></div><div class="kb-header-actions"><button type="button" class="quiet-key" data-ask-base="'+b.id+'">Ask this library</button>'+(!b.builtin?'<button type="button" class="kb-text-remove" data-delete-base="'+b.id+'">Remove library</button>':'')+'</div>';
    var counts={file:0,note:0,link:0,cards:0};b.sources.forEach(function (s) { counts[s.type]++;counts.cards+=s.sections.length; });
    $('kbFileCount').textContent=counts.file;$('kbNoteCount').textContent=counts.note;$('kbLinkCount').textContent=counts.link;$('kbCardCount').textContent=counts.cards;
    var names={file:'Files',note:'Notes',link:'Links',cards:'Cards'};
    document.querySelectorAll('[data-kb-tab]').forEach(function (button) { var selected=button.dataset.kbTab===view.tab;button.setAttribute('aria-selected',String(selected));button.tabIndex=selected?0:-1;if(selected)$('kbContent').setAttribute('aria-labelledby',button.id); });
    $('addKnowledgeSource').disabled=b.builtin;$('addKnowledgeSource').textContent=b.builtin?'Read-only':view.tab==='file'?'+ Add file':view.tab==='link'?'+ Add link':'+ Add note';
    $('cardFilters').hidden=view.tab!=='cards';
    $('cardFilters').innerHTML=['all','rule','field','concept','source'].map(function (type) { return '<button type="button" data-card-kind="'+type+'" aria-pressed="'+(view.filter===type)+'">'+(type==='all'?'All cards':type)+'</button>'; }).join('');
    var q=view.query.toLowerCase();
    var match=function (s) { return (s.name+' '+s.sections.map(function (x) { return x.title+' '+x.text+' '+(x.tags||[]).join(' '); }).join(' ')).toLowerCase().includes(q); };
    if (view.tab==='cards') {
      var cards=b.sources.flatMap(function (s) { return s.sections.filter(function (p) { return (view.filter==='all'||p.kind===view.filter) && (p.title+' '+p.text+' '+(p.tags||[]).join(' ')).toLowerCase().includes(q); }).map(function (p) { return {source:s,section:p}; }); });
      $('kbContent').innerHTML=cards.length?'<div class="knowledge-cards">'+cards.map(function (c) { return '<button type="button" class="knowledge-card" data-source-base="'+b.id+'" data-source-id="'+c.source.id+'"><span class="kind-tag">'+esc(c.section.kind)+'</span><h3>'+esc(c.section.title)+'</h3><p>'+esc(c.section.text.slice(0,140))+'…</p><div>'+c.section.tags.map(function (tag) { return '<span>#'+esc(tag)+'</span>'; }).join(' ')+'</div><small>'+esc(c.source.name)+'</small></button>'; }).join('')+'</div>':'<div class="kb-empty">No cards match this search. Add a source or try another filter.</div>';
    } else {
      var list=b.sources.filter(function (s) { return s.type===view.tab && match(s); });
      var intro=view.tab==='file'&&!b.builtin?'<div id="knowledgeDropZone" class="knowledge-drop" tabindex="0" role="button" aria-label="Add Markdown, text or HTML files"><strong>Drop files here</strong><span>Markdown, TXT or HTML / Content is read locally</span></div>':b.builtin?'<div class="kb-curated"><span aria-hidden="true">▤</span><p>Curated report knowledge<br><small>Confirmed allocation rules, organized into searchable source sections.</small></p></div>':'';
      $('kbContent').innerHTML=intro+(list.length?'<div class="knowledge-files">'+list.map(function (s) { return '<article class="knowledge-file"><span class="file-mark">'+esc(s.type==='note'?'NT':s.type==='link'?'':s.name.split('.').pop().slice(0,3).toUpperCase())+'</span><button type="button" class="source-name" data-source-base="'+b.id+'" data-source-id="'+s.id+'"><strong>'+esc(s.name)+'</strong><small>'+s.sections.length+' sections / '+esc((s.updatedAt || '').slice(0,10))+'</small></button><span class="pill '+(s.sections.length?'success':'warning')+'">'+(s.sections.length?'Ready':'Reference only')+'</span>'+(!b.builtin?'<div class="source-controls">'+(s.type!=='file'?'<button type="button" class="quiet-key" data-edit-source="'+s.id+'">Edit</button>':'')+'<button type="button" class="source-remove" data-delete-source="'+s.id+'" aria-label="Remove source '+esc(s.name)+'">×</button></div>':'')+'</article>'; }).join('')+'</div>':'<div class="kb-empty">'+(q?'No matching '+names[view.tab].toLowerCase()+'.':b.builtin?'No '+names[view.tab].toLowerCase()+' in this built-in library. Create a personal library to add your own.':'No '+names[view.tab].toLowerCase()+' yet. Add the first source for this report.')+'</div>');
    }
    $('knowledgeStorage').textContent=storageOk?'Personal libraries and conversations are saved in this browser.':'Session only: browser storage is unavailable or full.';
  }
  function openCreateBase() { $('knowledgeBaseForm').reset();$('baseReport').innerHTML=model.reports.map(function (r) { return '<option value="'+r.id+'">'+r.name+'</option>'; }).join('');$('baseReport').value=chat()?chat().report:'isg-service';$('baseFormError').textContent='';$('knowledgeBaseDialog').showModal(); }
  function openSourceForm(type,source) {
    if (base().builtin) return;
    view.sourceType=type;view.editingSource=source?source.id:null;
    $('knowledgeSourceForm').reset();$('knowledgeSourceTitle').textContent=(source?'Edit ':'Add a ')+(type==='link'?'link':'note');$('sourceUrlLabel').hidden=type!=='link';$('sourceUrl').required=type==='link';$('sourceBody').required=type!=='link';$('sourceBodyLabel').textContent=type==='link'?'Source excerpt (optional)':'Note text';
    $('sourceFormHint').textContent=type==='link'?'Save a URL with an excerpt to make it searchable. A URL without an excerpt stays reference-only; no webpage is fetched.':'Your text becomes searchable knowledge cards for the selected report.';
    if (source) { $('sourceName').value=source.name;$('sourceUrl').value=source.url || '';$('sourceBody').value=source.sections.map(function (s) { return s.text; }).join('\n\n'); }
    $('sourceFormError').textContent='';$('knowledgeSourceDialog').showModal();
  }
  async function importFiles(files) {
    var target=base();if(target.builtin)return;
    var imported=0,errors=[];
    for (var file of Array.from(files)) {
      if (!/\.(md|markdown|txt|html?|htm)$/i.test(file.name)) { errors.push(file.name+': use MD, TXT or HTML.');continue; }
      if (file.size>500000) { errors.push(file.name+': exceeds this demo limit of 500 KB.');continue; }
      try {
        var text=await file.text();
        if (/\.html?$/i.test(file.name)) { var doc=new DOMParser().parseFromString(text,'text/html');doc.querySelectorAll('script,style,template,noscript').forEach(function (n) { n.remove(); });doc.querySelectorAll('p,div,section,article,li,h1,h2,h3,h4,br,tr').forEach(function (n) { n.appendChild(doc.createTextNode('\n\n')); });text=doc.body.textContent; }
        var sections=model.sectionsFromText(text,file.name);if (!sections.length) { errors.push(file.name+': no readable text.');continue; }
        if (!state.bases.some(function (b) { return b.id===target.id; })) { errors.push('The target library was removed.');break; }
        target.sources.push({id:uid(),type:'file',name:file.name,updatedAt:new Date().toISOString(),sections:sections});imported++;
      } catch (_) { errors.push(file.name+': could not read the file.'); }
    }
    persist();renderKnowledge();renderChat();$('knowledgeFileInput').value='';workspace.notify(imported+' file(s) added.'+(errors.length?' '+errors.join(' '):'')+(!storageOk?' Session only; browser storage is full or unavailable.':''));
  }
  function requestDelete(type,id,label) { view.pendingDelete={type:type,id:id};$('knowledgeDeleteTitle').textContent='Remove '+label+'?';$('knowledgeDeleteText').textContent=type==='base'?'This removes this personal library and its sources from this browser. Existing answers retain their cited text snapshots.':type==='chat'?'This removes the selected conversation from this browser.':'This removes the source from this personal library. Existing answers retain their cited text snapshots.';$('knowledgeDeleteDialog').showModal(); }
  document.addEventListener('workspace:view',function (event) { if(event.detail.name==='chat')renderChat();if(event.detail.name==='knowledge')renderKnowledge(); });
  document.addEventListener('click',function (event) {
    var button=event.target.closest('button');if (!button) return;
    if (button.dataset.kbClose) $(button.dataset.kbClose).close();
    if (button.dataset.chat) { stopStream();state.activeChat=button.dataset.chat;persist();workspace.showView('chat');renderChat(); }
    if (button.dataset.deleteChat) requestDelete('chat',button.dataset.deleteChat,'this conversation');
    if (button.dataset.base) { state.activeBase=button.dataset.base;view.query='';view.filter='all';$('knowledgeSearch').value='';persist();renderKnowledge(); }
    if (button.dataset.kbTab) { view.tab=button.dataset.kbTab;renderKnowledge(); }
    if (button.dataset.cardKind) { view.filter=button.dataset.cardKind;renderKnowledge(); }
    if (button.dataset.sourceId) showSource(button.dataset.sourceBase,button.dataset.sourceId);
    if (button.dataset.citeMessage) showCitation(button.dataset.citeMessage,Number(button.dataset.citeIndex));
    if (button.hasAttribute('data-browse-builtin')) { state.activeBase=model.builtin.id;view.tab='file';workspace.showView('knowledge');renderKnowledge(); }
    if (button.dataset.askBase) { var b=bases().find(function (b) { return b.id===button.dataset.askBase; });if(b)newChat(b.report,b.id); }
    if (button.dataset.knowledgePrompt) { $('knowledgePrompt').value=button.dataset.knowledgePrompt;$('knowledgePrompt').focus(); }
    if (button.dataset.deleteBase) requestDelete('base',button.dataset.deleteBase,base().name);
    if (button.dataset.deleteSource) { var s=base().sources.find(function (s) { return s.id===button.dataset.deleteSource; });if(s)requestDelete('source',s.id,s.name); }
    if (button.dataset.editSource) { var s=base().sources.find(function (s) { return s.id===button.dataset.editSource; });if(s)openSourceForm(s.type,s); }
  });
  $('sidebarNewChat').addEventListener('click',function () { newChat(); });$('chatNewButton').addEventListener('click',function () { newChat(chat()?chat().report:'isg-service'); });
  $('manageKnowledge').addEventListener('click',function () { workspace.showView('knowledge'); });$('createKnowledge').addEventListener('click',openCreateBase);
  $('knowledgeChatForm').addEventListener('submit',function (e) { e.preventDefault();sendQuestion($('knowledgePrompt').value); });$('knowledgeStop').addEventListener('click',stopStream);
  $('knowledgePrompt').addEventListener('keydown',function (e) { if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();$('knowledgeChatForm').requestSubmit();} });
  $('chatReport').addEventListener('change',function () { if(!chat()){newChat($('chatReport').value);return;}chat().report=$('chatReport').value;chat().library='all';persist();renderChat(); });
  $('chatLibrary').addEventListener('change',function () { if(!chat()){newChat($('chatReport').value,$('chatLibrary').value);return;}chat().library=$('chatLibrary').value;persist();renderChat(); });
  $('knowledgeSearch').addEventListener('input',function (e) { view.query=e.target.value;renderKnowledge(); });
  $('addKnowledgeSource').addEventListener('click',function () { if(base().builtin)return;if(view.tab==='file')$('knowledgeFileInput').click();else openSourceForm(view.tab==='link'?'link':'note'); });
  $('knowledgeFileInput').addEventListener('change',function (e) { importFiles(e.target.files); });
  $('kbContent').addEventListener('click',function (e) { if(e.target.closest('#knowledgeDropZone'))$('knowledgeFileInput').click(); });
  $('kbContent').addEventListener('keydown',function (e) { if(e.target.id==='knowledgeDropZone'&&(e.key==='Enter'||e.key===' ')){e.preventDefault();$('knowledgeFileInput').click();} });
  $('kbContent').addEventListener('dragover',function (e) { if(e.target.closest('#knowledgeDropZone')){e.preventDefault();e.target.closest('#knowledgeDropZone').classList.add('drag-over');} });
  $('kbContent').addEventListener('dragleave',function (e) { var z=e.target.closest('#knowledgeDropZone');if(z)z.classList.remove('drag-over'); });
  $('kbContent').addEventListener('drop',function (e) { var z=e.target.closest('#knowledgeDropZone');if(z){e.preventDefault();z.classList.remove('drag-over');importFiles(e.dataTransfer.files);} });
  $('knowledgeBaseForm').addEventListener('submit',function (e) { e.preventDefault();var name=$('baseName').value.trim();if(!name){$('baseFormError').textContent='Enter a knowledge base name.';return;}var b={id:uid(),name:name,report:$('baseReport').value,description:$('baseDescription').value.trim(),builtin:false,sources:[]};state.bases.push(b);state.activeBase=b.id;view.tab='file';view.query='';$('knowledgeSearch').value='';persist();$('knowledgeBaseDialog').close();renderKnowledge();renderChat();workspace.notify(storageOk?'Personal knowledge base created.':'Library created for this session only.'); });
  $('knowledgeSourceForm').addEventListener('submit',function (e) {
    e.preventDefault();var b=base();if(b.builtin)return;var name=$('sourceName').value.trim(),body=$('sourceBody').value.trim(),url=$('sourceUrl').value.trim();
    if(!name||(!body&&view.sourceType!=='link')){$('sourceFormError').textContent='Add a title and source text.';return;}
    if(view.sourceType==='link'){try{if(!['http:','https:'].includes(new URL(url).protocol))throw new Error();}catch(_){$('sourceFormError').textContent='Use an http or https URL.';return;}}
    var source={id:view.editingSource || uid(),type:view.sourceType,name:name,url:view.sourceType==='link'?url:undefined,updatedAt:new Date().toISOString(),sections:model.sectionsFromText(body,name)};
    var index=b.sources.findIndex(function (s) { return s.id===view.editingSource; });if(index>=0)b.sources[index]=source;else b.sources.push(source);view.tab=view.sourceType;persist();$('knowledgeSourceDialog').close();renderKnowledge();renderChat();workspace.notify(storageOk?'Knowledge source saved.':'Source saved for this session only.');
  });
  $('confirmKnowledgeDelete').addEventListener('click',function () { var p=view.pendingDelete;if(!p)return;
    if(p.type==='base'){state.bases=state.bases.filter(function (b) { return b.id!==p.id; });state.activeBase=model.builtin.id;view.query='';view.filter='all';$('knowledgeSearch').value='';}
    if(p.type==='source'&&!base().builtin)base().sources=base().sources.filter(function (s) { return s.id!==p.id; });
    if(p.type==='chat'){if(running&&running.chatId===p.id)stopStream();state.chats=state.chats.filter(function (c) { return c.id!==p.id; });if(state.activeChat===p.id)state.activeChat=state.chats[0]?state.chats[0].id:null;}
    $('knowledgeDeleteDialog').close();persist();renderKnowledge();renderChat();workspace.notify('Removed from this browser workspace.');
  });
  document.querySelector('.kb-tabs').addEventListener('keydown',function (e) { var tabs=Array.from(document.querySelectorAll('[data-kb-tab]'));var i=tabs.indexOf(document.activeElement);if(i<0)return;var n=e.key==='ArrowRight'?(i+1)%tabs.length:e.key==='ArrowLeft'?(i+tabs.length-1)%tabs.length:e.key==='Home'?0:e.key==='End'?tabs.length-1:null;if(n!==null){e.preventDefault();view.tab=tabs[n].dataset.kbTab;renderKnowledge();tabs[n].focus();} });
  window.addEventListener('pagehide',function () { if(running)stopStream(); });
  window.FPAKnowledge={focusChat:focusChat};renderChatList();renderChat();renderKnowledge();
})();
