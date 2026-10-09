/* Original Prompt-Vault Practice Studio. MIT. No remote AI or vendor components. */
import {lessons,families,sources,promptFor} from './studio-data.mjs';
const $=id=>document.getElementById(id);
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const state={track:'app',id:lessons[0].id,query:'',family:'all',savedOnly:false,tab:'read',saved:new Set(),done:new Set(),demo:{}};
const known=new Set(lessons.map(l=>l.id));
for(const [key,name] of [['pv-practice-saves','saved'],['pv-practice-done','done']]){
 try{const data=JSON.parse(localStorage.getItem(key)||'[]');if(Array.isArray(data))state[name]=new Set(data.filter(x=>known.has(x)));}catch{}
}
const current=()=>lessons.find(l=>l.id===state.id)||lessons[0];
const family=()=>families[current().family];
let toastTimer;
function notify(text){$('notice').textContent=text;$('notice').hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('notice').hidden=true,3600);}
function persist(){try{localStorage.setItem('pv-practice-saves',JSON.stringify([...state.saved]));localStorage.setItem('pv-practice-done',JSON.stringify([...state.done]));}catch{notify('Saved for this session only. Browser storage is unavailable.');}}
function filtered(){return lessons.filter(l=>l.track===state.track&&(state.family==='all'||l.family===state.family)&&(!state.savedOnly||state.saved.has(l.id))&&[l.title,l.meaning,l.example,l.placement,...families[l.family].skills].join(' ').toLowerCase().includes(state.query));}
function renderDirectory(){
 const rows=filtered();$('result-count').textContent=rows.length+' of '+lessons.filter(l=>l.track===state.track).length+' lessons shown';
 $('lesson-list').innerHTML=rows.length?rows.map(l=>`<button type="button" data-lesson="${esc(l.id)}" aria-current="${l.id===state.id?'true':'false'}"><span>${String(l.index).padStart(2,'0')}</span><span>${esc(l.title)}<small>${esc(families[l.family].title)}${state.done.has(l.id)?' · Practiced':''}</small></span></button>`).join(''):'<p class="boundary">No matching lessons. Clear search, choose another area, or turn off Saved only.</p>';
}
function renderFilters(){
 $('family').innerHTML='<option value="all">All areas</option>'+Object.entries(families).filter(([,v])=>v.track===state.track).map(([k,v])=>`<option value="${k}">${esc(v.title)}</option>`).join('');
 $('family').value=state.family;$('search').value=state.query;$('saved-only').checked=state.savedOnly;
 document.querySelectorAll('[data-track]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.track===state.track)));
}
function selectTab(tab,focus=false){
 if(!['read','try','build'].includes(tab))return;state.tab=tab;
 for(const key of ['read','try','build']){const b=$('tab-'+key);b.setAttribute('aria-selected',String(key===tab));b.tabIndex=key===tab?0:-1;$('panel-'+key).hidden=key!==tab;}
 if(tab==='build')renderPrompt();if(focus)$('tab-'+tab).focus();
}
function renderPrompt(){$('prompt').textContent=promptFor(current(),$('project').value,$('prompt-mode').value);}
function progress(){
 $('save').setAttribute('aria-pressed',String(state.saved.has(state.id)));$('save').textContent=state.saved.has(state.id)?'★ Saved':'☆ Save';
 $('practiced').checked=state.done.has(state.id);$('progress').textContent=state.done.size+' of 100 tried on this browser';
}
function selectLesson(id,focus=false){
 const lesson=lessons.find(l=>l.id===id);if(!lesson)return;
 state.id=id;state.track=lesson.track;const f=family();
 $('lesson-meta').textContent=(lesson.track==='app'?'APP / iOS + ANDROID':'WEBSITE / PUBLIC PAGES')+' · '+f.title.toUpperCase();
 $('lesson-title').textContent=lesson.title;$('meaning').textContent=lesson.meaning;$('placement').textContent=lesson.placement;
 for(const key of ['example','avoid','check'])$(key).textContent=lesson[key];
 $('build-steps').innerHTML=f.steps.map(s=>'<li>'+esc(s)+'</li>').join('');$('skills').innerHTML=f.skills.map(s=>'<span>'+esc(s)+'</span>').join('');
 $('platform-title').textContent=lesson.track==='app'?'iOS and Android: verify the real runtime':'Website: preserve the whole visitor journey';
 $('platform-note').textContent=lesson.track==='app'?'Adapt safe areas, keyboard, Back and dismissal to each platform. Test Dynamic Type and VoiceOver on iOS, font scaling and TalkBack on Android. This browser specimen cannot prove native behavior, store approval or billing correctness.':'Keep headings, links, forms and the main action useful at small widths, with a keyboard, large text and reduced motion. Verify real destinations and content sources. Do not confuse a browser specimen with a production website.';
 $('demo-caption').textContent=f.title+' · reusable '+f.demo+' model';$('recovery-check').textContent=lesson.check+' '+lesson.avoid;
 $('evidence-list').innerHTML=f.sources.map(id=>{const s=sources[id];return `<article class="source-row"><a target="_blank" rel="noopener noreferrer" href="${esc(s.url)}">${esc(s.title)} ↗</a><small>${esc(s.kind)} · ${esc(s.author)}${s.year?' · '+s.year:''}</small><p>${esc(s.finding)}</p><p><strong>Limit:</strong> ${esc(s.limit)}</p></article>`;}).join('');
 renderFilters();renderDirectory();resetDemo();renderPrompt();progress();selectTab(state.tab);
 if(location.hash!=='#'+id)history.replaceState(null,'',location.pathname+location.search+'#'+id);
 if(focus){const b=$('lesson-list').querySelector(`[data-lesson="${id}"]`);b?.focus();}
}
const button=(action,label,extra='')=>`<button type="button" data-action="${action}" ${extra}>${label}</button>`;
const status=(text,error=false)=>`<p id="model-status" class="model-status${error?' error':''}" role="status" aria-live="polite">${esc(text)}</p>`;
function resetDemo(){
 state.demo={step:0,name:'',draft:'A small draft worth keeping.',saved:'A small draft worth keeping.',failed:false,online:false,queued:0,confirmed:0,permission:'unknown',plan:'monthly',billing:'idle',items:[{id:1,text:'Name the real user task',done:false},{id:2,text:'Test a recovery path',done:false}],undo:null,yaw:-25,moved:false};
 renderDemo();
}
function renderDemo(){
 const d=state.demo,type=family().demo;let body='';
 if(type==='sequence'){
  const steps=['Capture','Review','Finish'];
  body=`<div class="sequence">${steps.map((s,i)=>`<span class="${d.step===i?'active':''}">${i+1}. ${s}</span>`).join('')}</div><h4>${steps[d.step]}</h4>`;
  if(d.step===0)body+=`<label for="sample-name">One thing to do</label><input id="sample-name" value="${esc(d.name)}" placeholder="For example, test the Back button">`;
  else if(d.step===1)body+=`<p>Review your action: <strong>${esc(d.name||'No action entered yet')}</strong>.</p><p>Go back to edit without losing the value.</p>`;
  else body+=`<p>Demonstration complete. <strong>${esc(d.name||'Your sample action')}</strong> stayed in this page only.</p>`;
  body+=`<div class="model-actions">${button('previous','← Back',d.step===0?'disabled':'')}${button('next-step',d.step===2?'Start again':'Continue →')}</div>`+status('A local three-step model. The entered text is preserved between steps.');
 }else if(type==='form'){
  const otp=current().id.endsWith('paste-otp');
  body=`<h4>${otp?'Paste a code.':'A label that stays.'}</h4><form id="demo-form" novalidate><label for="sample-value">${otp?'Six-digit sample code':'Email address'}</label><input id="sample-value" ${otp?'inputmode="numeric" autocomplete="one-time-code" maxlength="6"':'type="email" autocomplete="off"'} aria-describedby="model-status" placeholder="${otp?'123456':'you@example.com'}" required><div class="model-actions"><button type="submit">Check ${otp?'code':'format'} ↗</button>${button('clear-form','Clear','class="secondary"')}</div></form>`+status('Nothing is submitted, verified against an account, or stored. Try an empty or invalid value.');
 }else if(type==='draft'){
  body=`<h4>Draft is not saved.</h4><label for="draft">Edit this local note</label><textarea id="draft">${esc(d.draft)}</textarea><div class="model-actions">${button('save-draft','Save locally')}${button('fail-save','Simulate failed save','class="secondary"')}${button('revert','Revert to last save','class="secondary"')}</div>`+status('Saved in this demonstration’s memory only. Refresh will reset it.');
 }else if(type==='search'){
  body=`<h4>What are you looking for?</h4><label for="sample-search">Search the sample library</label><input id="sample-search" type="search" placeholder="Try design, notes, or a word with no match"><label class="checkline"><input type="checkbox" id="downloaded"> Downloaded only</label><ul class="model-list" id="sample-results"></ul>`+status('Illustrative records. Query and filters work together.');
 }else if(type==='sync'){
  body=`<h4>Local is not remote.</h4><p id="network-label">Network simulation: <strong>${d.online?'online':'offline'}</strong>.</p><div class="model-actions">${button('network',d.online?'Go offline':'Go online')}${button('queue','Add local change')}${button('ack','Simulate server acknowledgment','class="secondary"')}${button('sync-fail','Simulate sync failure','class="secondary"')}</div><p id="sync-totals">${d.queued} queued · ${d.confirmed} acknowledged in this simulation</p>`+status('Changing the network flag does not itself confirm a queued write.');
 }else if(type==='consent'){
  body=`<h4>A choice, not a trap.</h4><p>Example: access a single selected photo to add an attachment. No real device permission is requested here.</p><div class="model-actions">${button('allow','Allow sample access')}${button('deny','Not now','class="secondary"')}${button('revoke','Revoke sample access','class="secondary"')}</div><div id="permission-alternative"><p>You can continue without a photo.</p></div>`+status('Permission has not been chosen. No data or browser permission is accessed.');
 }else if(type==='plans'){
  body=`<h4>Make the cost readable.</h4><p>Illustrative prices only, not an offer from Prompt-Vault.</p><div class="model-actions">${button('monthly','Monthly: $5 / month','aria-pressed="true"')}${button('annual','Annual: $48 / year','aria-pressed="false"')}</div><p id="plan-total"><strong>$5 billed each month.</strong> No real payment will occur.</p><div class="model-actions">${button('purchase','Start simulated purchase')}${button('receipt','Simulate verified receipt','class="secondary"')}${button('decline','Simulate decline','class="secondary"')}</div>`+status('No entitlement. Selecting a plan does not start a purchase.');
 }else if(type==='reading'){
  body=`<h4>Let the words fit.</h4><label for="text-size">Text size <output id="size-value">18 px</output></label><input id="text-size" type="range" min="16" max="32" value="18"><label class="checkline"><input id="rtl" type="checkbox"> Inspect right-to-left layout</label><div id="reading" class="reading-sample" style="font-size:18px"><strong>Clear writing makes room.</strong><p>A longer label should reflow without hiding the action. This sample uses English text to inspect layout only, not to claim a verified translation.</p><button type="button" data-action="read-next">Continue reading →</button></div>`+status('Increase text size or change layout direction. Labels and controls should remain available.');
 }else if(type==='ai'){
  body=`<h4>A draft, not an action.</h4><label for="ai-route">Where would the model run?</label><select id="ai-route"><option value="none">No AI: manual editing</option><option value="puter">Puter.js: cloud user-pays service</option><option value="local">WebLLM / Transformers.js: supported local browser</option><option value="server">Authenticated server: cloud provider</option></select><p id="route-note">This teaching model calls no AI service.</p><label for="ai-draft">Review a suggested action</label><textarea id="ai-draft">Add a reminder to review the design tomorrow.</textarea><div class="model-actions">${button('approve','Approve sample draft')}${button('reject','Discard suggestion','class="secondary"')}${button('ai-fail','Simulate unavailable AI','class="secondary"')}</div>`+status('Suggestion only. No reminder, message, or calendar event is created.');
 }else if(type==='action'){
  body=`<h4>Small actions. Real undo.</h4><ul id="task-items" class="model-list"></ul><div class="model-actions">${button('undo-task','Undo last change','disabled')}</div>`+status('Try completing a sample item, then undoing it.');
 }else if(type==='layout'){
  body=`<h4>Hierarchy changes meaning.</h4><div class="model-actions">${button('layout-story','Story first','aria-pressed="true"')}${button('layout-proof','Evidence first','aria-pressed="false"')}${button('layout-stack','Compact stack','aria-pressed="false"')}</div><div id="sample-layout" class="model-grid"><div><p class="eyebrow">FIELD NOTES / ORIGINAL STUDY</p><h4>Show the decision.</h4><p>Explain the actual problem and your contribution, then let visitors inspect the work.</p>${button('layout-link','Inspect sample evidence')}</div><div class="sample-art" aria-label="Original typographic evidence placeholder, not a real project screenshot">01</div></div>`+status('Change the reading order without changing the factual claim.');
 }else if(type==='compare'){
  body=`<h4>Compare the same thing.</h4><p>Fictional variants used only to illustrate labeled comparison.</p><table><caption>Sample product differences</caption><thead><tr><th scope="col">Dimension</th><th scope="col">Portable</th><th scope="col">Desk</th></tr></thead><tbody><tr><th scope="row">Weight</th><td>1 kg (sample)</td><td>2 kg (sample)</td></tr><tr><th scope="row">Power</th><td>Battery</td><td>Mains</td></tr><tr><th scope="row">Warranty</th><td>Not provided</td><td>Not provided</td></tr></tbody></table><div class="model-actions">${button('pick-portable','Select Portable')}${button('pick-desk','Select Desk')}</div>`+status('No product selected. Unknown is not the same as zero or “not included”.');
 }else if(type==='motion'){
  body=`<h4>Motion follows state.</h4><div class="motion-stage"><div id="motion-block" class="motion-block" aria-hidden="true">A</div></div><div class="model-actions">${button('move','Move to B')}${button('move-back','Return to A','class="secondary"')}${button('motion-off','Disable movement','aria-pressed="false" class="secondary"')}</div>`+status('Current state: A. System reduced motion is respected; text state is always available.');
 }else if(type==='spatial'){
  body=`<h4>Does depth help?</h4><div id="spatial-stage" class="spatial-stage"><div id="prism" class="prism" role="img" aria-label="Original numbered prism. Front 1, right 2, left 3, back 4, top 5."><div class="face front">1</div><div class="face right">2</div><div class="face left">3</div><div class="face back">4</div><div class="face top">5</div></div></div><div class="model-actions">${button('rotate-left','Rotate left')}${button('rotate-right','Rotate right')}${button('flat','Use text alternative','aria-pressed="false" class="secondary"')}</div><p id="flat-description" hidden>Static equivalent: a numbered prism with front 1, right 2, left 3, back 4 and top 5. No dimensions, real product or licensed model is represented.</p>`+status('A CSS-only original object. No model, texture, GPU API or external asset is downloaded.');
 }else{
  body=`<h4>A source is not a guarantee.</h4><label for="proof-type">Evidence type</label><select id="proof-type"><option value="paper">Paper / defined study</option><option value="case">Community or Medium case</option><option value="paid">Paid advertisement</option></select><div id="proof-output"><p><strong>Study evidence:</strong> inspect the question, method, population and limitations before adapting it.</p></div>`+status('The evidence label should change how confidently you use a claim.');
 }
 $('demo').innerHTML=`<div class="model"><p class="eyebrow">${esc(family().title)} / IN-PAGE MODEL</p>${body}</div>`;
 if(type==='search')filterSample();if(type==='action')renderTasks();
}
function message(text,error=false){const el=$('model-status');if(!el)return;el.textContent=text;el.classList.toggle('error',error);}
function filterSample(){
 const query=($('sample-search')?.value||'').toLowerCase();const downloaded=$('downloaded')?.checked;
 const items=[['Design notes',true],['Research links',false],['Offline sketches',true],['Product ideas',false]].filter(([n,local])=>n.toLowerCase().includes(query)&&(!downloaded||local));
 $('sample-results').innerHTML=items.length?items.map(([n,local])=>`<li><span>${esc(n)}</span><span>${local?'Downloaded':'Online only'}</span></li>`).join(''):'<li>No matching items. Try clearing the query or filter.</li>';
 message(`${items.length} sample results${downloaded?', downloaded only':''}. Nothing was fetched from a server.`);
}
function renderTasks(){
 $('task-items').innerHTML=state.demo.items.map(i=>`<li><span>${i.done?'✓ ':''}${esc(i.text)}</span><button type="button" data-action="task" data-id="${i.id}">${i.done?'Reopen':'Complete'}</button></li>`).join('');
 $('demo').querySelector('[data-action="undo-task"]').disabled=!state.demo.undo;
}
function demoClick(event){
 const el=event.target.closest('[data-action]');if(!el)return;const action=el.dataset.action,d=state.demo;
 const setPressed=(actions)=>{for(const name of actions){const b=$('demo').querySelector(`[data-action="${name}"]`);b?.setAttribute('aria-pressed',String(name===action));}};
 if(action==='previous'||action==='next-step'){
  if($('sample-name'))d.name=$('sample-name').value;d.step=action==='previous'?Math.max(0,d.step-1):(d.step+1)%3;renderDemo();$('demo').querySelector('[data-action="next-step"]').focus();
 }else if(action==='clear-form'){$('sample-value').value='';$('sample-value').removeAttribute('aria-invalid');message('Cleared. No data was sent.');$('sample-value').focus();}
 else if(action==='save-draft'){d.saved=$('draft').value;d.draft=d.saved;message('Saved in this page’s memory only. No server or persistent storage was used.');}
 else if(action==='fail-save'){d.draft=$('draft').value;message('Simulated save failed. Your edited text is still here and is NOT saved.',true);}
 else if(action==='revert'){$('draft').value=d.saved;d.draft=d.saved;message('Restored the last locally saved version.');}
 else if(action==='network'){d.online=!d.online;$('network-label').innerHTML='Network simulation: <strong>'+(d.online?'online':'offline')+'</strong>.';el.textContent=d.online?'Go offline':'Go online';message('Network flag changed. Queued changes are not yet acknowledged.');}
 else if(action==='queue'){d.queued++;$('sync-totals').textContent=`${d.queued} queued · ${d.confirmed} acknowledged in this simulation`;message('Accepted locally. Waiting for a separate simulated server acknowledgement.');}
 else if(action==='ack'){if(!d.online){message('Offline. Keep the queued changes and try after reconnecting.',true);return;}if(!d.queued){message('There are no queued changes to acknowledge.');return;}d.confirmed+=d.queued;d.queued=0;$('sync-totals').textContent=`0 queued · ${d.confirmed} acknowledged in this simulation`;message('Simulated acknowledgement received. This is not a real remote write.');}
 else if(action==='sync-fail'){message(`Simulated sync failed. ${d.queued} queued changes are retained; no automatic retry loop runs.`,true);}
 else if(['allow','deny','revoke'].includes(action)){d.permission=action;message(action==='allow'?'Sample photo access granted within this demonstration. No device API was called.':action==='deny'?'Not now. You can continue manually without a photo.':'Sample access revoked. Existing unrelated tasks remain usable.');$('permission-alternative').textContent=action==='allow'?'A real app would open its scoped photo picker here.':'Manual alternative: continue without adding an attachment.';}
 else if(action==='monthly'||action==='annual'){d.plan=action;d.billing='idle';setPressed(['monthly','annual']);$('plan-total').textContent=action==='monthly'?'$5 billed each month (fictional example).':'$48 billed once each year (fictional example), not $4 paid monthly.';message('Plan selected. No purchase or entitlement.');}
 else if(action==='purchase'){d.billing='pending';message('Simulated purchase pending. Premium access must remain unconfirmed.');}
 else if(action==='receipt'){if(d.billing!=='pending'){message('Start a simulated purchase first; there is no pending receipt.',true);return;}d.billing='confirmed';message('Simulated receipt confirmed. This is a state exercise, not a real entitlement.');}
 else if(action==='decline'){d.billing='declined';message('Sample payment declined. No entitlement, charge or account change occurred.',true);}
 else if(action==='read-next'){message('Next reading action chosen. Large text and direction did not remove the button.');}
 else if(action==='approve'){message('Sample draft approved for review: '+$('ai-draft').value.slice(0,150)+'. No external action was executed.');}
 else if(action==='reject'){$('ai-draft').value='';message('Suggestion discarded. Nothing was sent or created.');}
 else if(action==='ai-fail'){message('AI unavailable. The draft remains editable manually and no request was sent.',true);}
 else if(action==='task'){const item=d.items.find(i=>i.id===Number(el.dataset.id));if(!item)return;d.undo={id:item.id,done:item.done};item.done=!item.done;renderTasks();$('demo').querySelector(`[data-id="${item.id}"]`)?.focus();message(item.done?'Sample task completed. Undo is available.':'Sample task reopened. Undo is available.');}
 else if(action==='undo-task'){if(!d.undo)return;const item=d.items.find(i=>i.id===d.undo.id);if(item)item.done=d.undo.done;d.undo=null;renderTasks();$('demo').querySelector('[data-action="task"]')?.focus();message('Exact previous completion state restored.');}
 else if(action.startsWith('layout-')){
  if(action==='layout-link'){message('Example evidence panel selected. This is not a link to a real client project.');return;}const grid=$('sample-layout');grid.classList.toggle('reverse',action==='layout-proof');grid.classList.toggle('stacked',action==='layout-stack');setPressed(['layout-story','layout-proof','layout-stack']);message('Composition changed. Verify both visual and assistive reading order before production use.');
 }else if(action.startsWith('pick-')){message('Selected '+(action==='pick-desk'?'Desk':'Portable')+'. Warranty remains unknown; no product order was placed.');}
 else if(action==='move'||action==='move-back'){d.moved=action==='move';$('motion-block').classList.toggle('moved',d.moved);message('Current state: '+(d.moved?'B':'A')+'. Content state changes independently of animation.');}
 else if(action==='motion-off'){const off=el.getAttribute('aria-pressed')!=='true';el.setAttribute('aria-pressed',String(off));el.textContent=off?'Enable movement':'Disable movement';$('motion-block').style.transition=off?'none':'';message(off?'Spatial transition disabled. You can still change A and B instantly.':'Movement restored unless the operating system requests reduced motion.');}
 else if(action==='rotate-left'||action==='rotate-right'){d.yaw+=action==='rotate-left'?-45:45;$('prism').style.setProperty('--yaw',d.yaw+'deg');message(`Rotation: ${d.yaw} degrees. All five face labels also have a text alternative.`);}
 else if(action==='flat'){const flat=el.getAttribute('aria-pressed')!=='true';el.setAttribute('aria-pressed',String(flat));$('spatial-stage').hidden=flat;$('flat-description').hidden=!flat;el.textContent=flat?'Show original 3D study':'Use text alternative';message(flat?'Text equivalent shown. No spatial motion required.':'Original CSS object shown; not a product model.');}
}
function demoInput(event){
 const id=event.target.id;
 if(id==='draft'){state.demo.draft=event.target.value;message(event.target.value===state.demo.saved?'Matches the last local save.':'Unsaved changes. A real app must persist before claiming Saved.');}
 if(id==='sample-search'||id==='downloaded')filterSample();
 if(id==='text-size'){$('reading').style.fontSize=event.target.value+'px';$('size-value').textContent=event.target.value+' px';message('Text size is '+event.target.value+' px. Check wrapping and the Continue button.');}
 if(id==='rtl'){$('reading').dir=event.target.checked?'rtl':'ltr';message('Direction: '+(event.target.checked?'right-to-left layout. This English example is not a validated translation.':'left-to-right.'));}
 if(id==='ai-route'){const routes={none:'Manual editing requires no model.',puter:'Puter.js sends AI requests to a cloud service with a user-pays account. It does not run inference on-device.',local:'Eligible WebLLM/Transformers.js models can run in a supported browser. Model download, hardware and licensing require checks.',server:'A cloud route needs authenticated server-side keys, consent, limits and source controls.'};$('route-note').textContent=routes[event.target.value];message('Architecture explanation only. No model or account connection is started.');}
 if(id==='proof-type'){const variants={paper:'Study: inspect methods, population and limitations. Our example is a synthesis, not the exact tested treatment.',case:'Author case report: a useful hypothesis, not consensus or a verified universal conversion improvement.',paid:'Paid advertisement: keep the commercial label clear and separate from independent research. No real sponsor is represented here.'};$('proof-output').textContent=variants[event.target.value];message('The source category affects what the claim can support.');}
}
function demoSubmit(event){
 if(event.target.id!=='demo-form')return;event.preventDefault();const input=$('sample-value'),value=input.value.trim();
 const valid=current().id.endsWith('paste-otp')?/^\d{6}$/.test(value):Boolean(value&&input.validity.valid);
 input.setAttribute('aria-invalid',String(!valid));
 if(!valid){message(current().id.endsWith('paste-otp')?'Paste or type all six sample digits.':'Enter an email format such as you@example.com. The entered value is preserved.',true);input.focus();}
 else message('Format accepted locally. No account verification, email, payment, or server request occurred.');
}
function download(name,text){const url=URL.createObjectURL(new Blob([text],{type:'text/markdown;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function bind(){
 document.querySelectorAll('[data-track]').forEach(b=>b.addEventListener('click',()=>{state.track=b.dataset.track;state.query='';state.family='all';state.savedOnly=false;selectLesson(lessons.find(l=>l.track===state.track).id);}));
 $('search').addEventListener('input',e=>{state.query=e.target.value.trim().toLowerCase();renderDirectory();});$('family').addEventListener('change',e=>{state.family=e.target.value;renderDirectory();});$('saved-only').addEventListener('change',e=>{state.savedOnly=e.target.checked;renderDirectory();});
 $('clear-search').addEventListener('click',()=>{state.query='';state.family='all';state.savedOnly=false;renderFilters();renderDirectory();});
 $('lesson-list').addEventListener('click',e=>{const b=e.target.closest('[data-lesson]');if(b)selectLesson(b.dataset.lesson,true);});
 $('save').addEventListener('click',()=>{state.saved.has(state.id)?state.saved.delete(state.id):state.saved.add(state.id);persist();progress();renderDirectory();});
 $('practiced').addEventListener('change',e=>{e.target.checked?state.done.add(state.id):state.done.delete(state.id);persist();progress();renderDirectory();});
 $('next').addEventListener('click',()=>{const rows=lessons.filter(l=>l.track===state.track);selectLesson(rows[(rows.findIndex(l=>l.id===state.id)+1)%rows.length].id);$('lesson-title').tabIndex=-1;$('lesson-title').focus();});
 document.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>selectTab(b.dataset.tab)));
 document.querySelector('.lesson-tabs').addEventListener('keydown',e=>{if(!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;e.preventDefault();const keys=['read','try','build'];let i=keys.indexOf(state.tab);i=e.key==='Home'?0:e.key==='End'?2:(i+(e.key==='ArrowRight'?1:2))%3;selectTab(keys[i],true);});
 $('go-demo').addEventListener('click',()=>selectTab('try',true));$('reset-demo').addEventListener('click',resetDemo);$('compact').addEventListener('change',e=>$('demo-shell').classList.toggle('compact',e.target.checked));
 $('demo').addEventListener('click',demoClick);$('demo').addEventListener('input',demoInput);$('demo').addEventListener('change',demoInput);$('demo').addEventListener('submit',demoSubmit);
 $('demo').addEventListener('keydown',e=>{if(e.target.id==='draft'&&(e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='s'){e.preventDefault();$('demo').querySelector('[data-action="save-draft"]').click();}});
 $('project').addEventListener('input',renderPrompt);$('prompt-mode').addEventListener('change',renderPrompt);
 $('copy-prompt').addEventListener('click',async()=>{try{await navigator.clipboard.writeText($('prompt').textContent);notify('Complete prompt copied.');}catch{const range=document.createRange();range.selectNodeContents($('prompt'));const s=window.getSelection();s?.removeAllRanges();s?.addRange(range);$('prompt').focus();notify('Prompt selected. Copy with your device’s normal copy command.');}});
 $('download-prompt').addEventListener('click',()=>download(current().id+'.md',$('prompt').textContent));
 $('download-all').addEventListener('click',()=>download('prompt-vault-100-practice-lessons.md','# Prompt-Vault: 100 worked design lessons\n\nOriginal material is MIT. Linked sources retain their rights.\n\n'+lessons.map(l=>promptFor(l,'','Build')).join('\n\n---\n\n')));
 window.addEventListener('hashchange',()=>{const id=location.hash.slice(1);if(known.has(id))selectLesson(id);});
}
bind();selectLesson(known.has(location.hash.slice(1))?location.hash.slice(1):state.id);
