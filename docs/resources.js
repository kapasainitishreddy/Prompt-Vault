/* Prompt-Vault Open-source Reference Gallery. MIT.
   Original educational DOM/CSS studies, not upstream vendor source or previews. */
(function(){
'use strict';
var data=[],filter='all',query='',sort='curated',selected=null,promptValue='',lastTrigger=null;
var $=function(id){return document.getElementById(id);};
var esc=function(text){return String(text==null?'':text).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});};
var origins=Object.freeze(['website','app','motion','prompts']);
var statusNames={'unknown':'LICENSE UNCONFIRMED','verify-file':'VERIFY FILE LICENSE','verified':'LICENSE DOCUMENTED'};
var nameFor=function(item){return esc(item.title);};
var timer=null;
function toast(message){
 var node=$('resource-toast');node.textContent=message;node.hidden=false;
 clearTimeout(timer);timer=setTimeout(function(){node.hidden=true;},2600);
}
function safeUrl(link){
 try{var obj=new URL(link);return obj.protocol==='https:'?obj.href:'#';}
 catch(_){return '#';}
}
function miniTabs(options,action,selected){
 return '<div class="ref-mini-tabs" role="group" aria-label="Illustrative preview modes">'+options.map(function(o){
  return '<button type="button" data-interact="'+esc(action)+'" data-choice="'+esc(o[0])+'" aria-pressed="'+String(o[0]===selected)+'">'+esc(o[1])+'</button>';
 }).join('')+'</div>';
}
function webpageVisual(){
 return '<div class="ref-mini-dynamic" data-mode-output><div class="ref-mini-title">Made for<br>real people.</div><p class="ref-mini-copy">Design choices with purpose, not the same layout every time.</p><div class="ref-mini-rule"><span>FIELD NOTES / 001</span><span>READ THE STORY →</span></div></div>';
}
function dashboardVisual(){
 return '<div class="ref-mini-dynamic" data-mode-output><div class="ref-faux-dashboard"><div><span class="ref-faux-row"></span><strong>07</strong><span>open tasks</span></div><div><strong>Workspace</strong><span class="ref-faux-row"></span><span class="ref-faux-row short"></span><span class="ref-faux-row"></span></div></div></div>';
}
function study(item){
 var kind=item.id,p='<div class="resource-study" data-kind="'+esc(kind)+'" role="group" aria-label="Independent Prompt-Vault preview study for '+nameFor(item)+'">';
 if(kind==='ui-promptly'){
  p+='<div class="ref-mini-board"><div class="ref-mini-head"><span>PV / TWO MODES</span><span>01 / 02</span></div>';
  p+=miniTabs([['landing','Landing'],['dashboard','Dashboard']],'mode','landing');
  p+=webpageVisual()+'</div>';
 }else if(kind==='superdesign-prompts'){
  p+='<div class="ref-spec-document"><span class="ref-spec-badge">PRODUCT / DESIGN SPEC</span>';
  p+=miniTabs([['structure','Structure'],['type','Typography'],['motion','Motion']],'spec','structure');
  p+='<strong data-spec-title>Information hierarchy.</strong><p data-spec-body>Give the core job priority over visual decoration.</p><div class="ref-spec-rail"><span>NOTES 03</span><span>ITERATE WITH EVIDENCE ↗</span></div></div>';
 }else if(kind==='motion-primitives'){
  p+='<div class="ref-expand-demo"><p class="ref-art-annotation">A USER-TRIGGERED DISCLOSURE</p><button type="button" data-interact="expand" aria-expanded="false">How does this work?<span aria-hidden="true" data-expand-symbol>+</span></button><div class="ref-expand-body" hidden>It opens only when asked. The content remains readable and focus stays on the control. Try opening and closing it.</div></div>';
 }else if(kind==='uiverse-galaxy'){
  p+='<div class="ref-switch-demo" data-active="false"><div><strong>Quiet mode.</strong><small data-switch-label>Motion details are off.</small></div><button type="button" class="ref-switch" role="switch" aria-checked="false" aria-label="Enable illustrative emphasis" data-interact="toggle"><span class="ref-switch-ball" aria-hidden="true"></span></button></div>';
 }else if(kind==='magic-ui'){
  p+='<div class="ref-reveal-demo"><span class="ref-art-annotation" style="color:#b8d0b5">STORY / PRODUCT TRUTH</span><div><strong>Show the<br>difference.</strong><p>One action changes what the visitor understands.</p></div><span data-reveal-result class="ref-reveal-target" hidden>Product demonstration > endless sparkles.</span><button type="button" data-interact="reveal" aria-expanded="false">Reveal one insight ↗</button></div>';
 }else if(kind==='origin-ui'){
  p+='<form class="ref-form-demo" data-demo-form novalidate><div class="ref-mini-head"><span>FORM STUDY</span><span>01 / VALIDATION</span></div><div style="margin-top:17px"><label>Email address <input type="email" name="preview-email" placeholder="you@example.com" autocomplete="off" required></label></div><button type="submit">Check format ↗</button><p role="status" aria-live="polite" class="ref-form-status">No data will be submitted.</p></form>';
 }else if(kind==='react-native-reusables'){
  p+='<div class="ref-phone"><div class="ref-phone-top"><span>DAYBOOK / 09:41</span><span>●●●</span></div><strong>Today.</strong>'+miniTabs([['today','Today'],['saved','Saved']],'native-tab','today')+'<div data-native-content><div class="ref-phone-row"><span>◯</span> Sketch the next action</div><div class="ref-phone-row"><span>✓</span> Test an error path</div></div><span class="ref-art-annotation" style="margin:0">ILLUSTRATIVE WEB MOCK / NOT NATIVE TESTED</span></div>';
 }else if(kind==='gluestack-ui'){
  p+='<div class="ref-adaptive-board"><div class="ref-mini-head"><span>ADAPTIVE WORKSPACE</span><span>SCREEN / 01</span></div>';
  p+=miniTabs([['phone','Phone'],['tablet','Tablet']],'layout','phone');
  p+='<div class="ref-adaptive-columns" data-layout="phone"><div class="ref-adaptive-rail"><strong>Inbox</strong><span>↳ Review the handoff</span><span>↳ Approve draft</span><span>↳ Read updates</span></div><div class="ref-adaptive-detail" hidden>On a wider canvas, keep context visible instead of forcing the user to navigate back and forth.</div></div></div>';
 }else{p+='<p>Interactive study is unavailable.</p>';}
 return p+'</div>';
}
function card(item,index){
 var badge=statusNames[item.licenseStatus]||'CHECK SOURCE LICENSE';
 var target=item.targets.map(function(t){return t==='app'?'APP UI/UX':t.toUpperCase();}).join(' · ');
 return '<article class="ref-card" data-source="'+esc(item.id)+'">'+
 '<header class="ref-card-header"><span class="micro">SOURCE '+String(index+1).padStart(2,'0')+' / 08</span>'+
 '<span class="ref-license-tag" data-status="'+esc(item.licenseStatus)+'">'+esc(badge)+'</span></header>'+
 '<div class="ref-card-body"><span class="ref-card-type">'+esc(target)+'</span><h3>'+nameFor(item)+'</h3><p>'+esc(item.byline)+'</p></div>'+
 '<div class="ref-study-container">'+study(item)+'<p class="ref-study-caption">Original interactive preview · not a vendor component.</p></div>'+
 '<div class="ref-card-actions"><button type="button" class="ref-detail-button" data-open="'+esc(item.id)+'">Explore preview & prompt ↗</button>'+
 '<a href="'+esc(safeUrl(item.demo))+'" target="_blank" rel="noopener noreferrer">Official demo ↗</a>'+
 '<a href="'+esc(safeUrl(item.repo))+'" target="_blank" rel="noopener noreferrer">Source code ↗</a></div></article>';
}
function getRows(){
 var v=data.filter(function(item){
  var categoryMatch=filter==='all'||(filter==='prompts'&&item.category==='prompts')||item.targets.indexOf(filter)>=0||(filter==='website'&&item.targets.indexOf('website')>=0);
  var searchText=[item.title,item.summary,item.byline,item.category,item.bestFor,item.license].join(' ').toLowerCase();
  return categoryMatch&&searchText.indexOf(query)>=0;
 });
 if(sort==='name')v.sort(function(a,b){return a.title.localeCompare(b.title);});
 if(sort==='type')v.sort(function(a,b){return a.category.localeCompare(b.category)||a.title.localeCompare(b.title);});
 return v;
}
function paint(){
 var rows=getRows();
 $('resources-grid').innerHTML=rows.map(card).join('');
 $('resources-grid').hidden=rows.length===0;
 $('ref-no-results').hidden=rows.length!==0;
 $('resource-count').textContent=rows.length+' of '+data.length+' independent preview studies shown.';
}
function chooseFilter(next){
 if(next!=='all'&&origins.indexOf(next)<0)return;
 filter=next;
 document.querySelectorAll('#resource-filters [data-filter]').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.filter===next));});
 paint();
}
function reset(){query='';$('resource-search').value='';sort='curated';$('resource-sort').value='curated';chooseFilter('all');}
function buttonState(studyNode,clicked,kind){
 studyNode.querySelectorAll('[data-interact="'+kind+'"]').forEach(function(b){b.setAttribute('aria-pressed',String(b===clicked));});
}
function interact(event){
 var control=event.target.closest('[data-interact]');
 if(!control)return;
 var specimen=control.closest('.resource-study');
 if(!specimen)return;
 var action=control.dataset.interact,choice=control.dataset.choice;
 if(action==='mode'){
  buttonState(specimen,control,'mode');
  var old=specimen.querySelector('[data-mode-output]');
  if(old)old.outerHTML=choice==='dashboard'?dashboardVisual():webpageVisual();
 }else if(action==='spec'){
  buttonState(specimen,control,'spec');
  var title=specimen.querySelector('[data-spec-title]'),body=specimen.querySelector('[data-spec-body]');
  var topics={
    structure:['Information hierarchy.','Give the core job priority over visual decoration.'],
    type:['Type with intent.','Readable roles for headings, content, labels and data.'],
    motion:['Only what changes.','Use small feedback transitions, never automatic theater.']
  };
  var item=topics[choice]||topics.structure;
  title.textContent=item[0];body.textContent=item[1];
 }else if(action==='expand'){
  var expanding=control.getAttribute('aria-expanded')!=='true';
  control.setAttribute('aria-expanded',String(expanding));
  control.querySelector('[data-expand-symbol]').textContent=expanding?'−':'+';
  specimen.querySelector('.ref-expand-body').hidden=!expanding;
 }else if(action==='toggle'){
  var active=control.getAttribute('aria-checked')!=='true';
  control.setAttribute('aria-checked',String(active));
  specimen.querySelector('.ref-switch-demo').dataset.active=String(active);
  specimen.querySelector('[data-switch-label]').textContent=active?'Emphasis enabled for this control.':'Motion details are off.';
 }else if(action==='reveal'){
  var show=control.getAttribute('aria-expanded')!=='true';
  control.setAttribute('aria-expanded',String(show));
  specimen.querySelector('[data-reveal-result]').hidden=!show;
  control.textContent=show?'Hide insight ↗':'Reveal one insight ↗';
 }else if(action==='native-tab'){
  buttonState(specimen,control,'native-tab');
  specimen.querySelector('[data-native-content]').innerHTML=choice==='saved'
   ?'<div class="ref-phone-row"><span>★</span> Saved design study</div><div class="ref-phone-row"><span>★</span> Reference notes</div>'
   :'<div class="ref-phone-row"><span>◯</span> Sketch the next action</div><div class="ref-phone-row"><span>✓</span> Test an error path</div>';
 }else if(action==='layout'){
  buttonState(specimen,control,'layout');
  var stage=specimen.querySelector('.ref-adaptive-columns');
  stage.dataset.layout=choice==='tablet'?'tablet':'phone';
  stage.querySelector('.ref-adaptive-detail').hidden=choice!=='tablet';
 }
}
function formDemo(event){
 var form=event.target.closest('[data-demo-form]');if(!form)return;
 event.preventDefault();
 var input=form.querySelector('input'),status=form.querySelector('.ref-form-status');
 var value=input.value.trim();
 if(!value){input.setAttribute('aria-invalid','true');status.textContent='Enter an email address to check its format.';input.focus();return;}
 if(!input.validity.valid){input.setAttribute('aria-invalid','true');status.textContent='Use an email format such as you@example.com.';input.focus();return;}
 input.removeAttribute('aria-invalid');
 status.textContent='Format looks valid. Nothing was sent or saved.';
}
function tab(name){
 var names=['preview','prompt','license'];
 if(names.indexOf(name)<0)return;
 names.forEach(function(n){
  var b=$('ref-tab-'+n),isSelected=n===name;
  b.setAttribute('aria-selected',String(isSelected));b.tabIndex=isSelected?0:-1;
  $('ref-panel-'+n).hidden=!isSelected;
 });
 if(name==='prompt')loadPrompt();
}
async function loadPrompt(){
 if(!selected)return;
 if(promptValue){$('ref-prompt-text').textContent=promptValue;return;}
 var id=selected.id;
 $('ref-prompt-text').textContent='Loading complete original prompt…';
 try{
  var response=await fetch('./prompts/references/'+encodeURIComponent(id)+'.md',{cache:'no-store'});
  if(!response.ok)throw new Error('Prompt file not available');
  var value=await response.text();
  if(selected&&selected.id===id){promptValue=value;$('ref-prompt-text').textContent=value;}
 }catch(_){
  if(selected&&selected.id===id)$('ref-prompt-text').textContent='Prompt unavailable at this host. Use the Markdown source link in this panel to read it on GitHub.';
 }
}
function openItem(id,trigger){
 var item=data.find(function(v){return v.id===id;});if(!item)return;
 selected=item;promptValue='';lastTrigger=trigger||null;
 $('resource-dialog-label').textContent='DESIGN SOURCE / '+item.category.toUpperCase();
 $('resource-dialog-title').textContent=item.title;
 $('ref-detail-summary').textContent=item.summary;
 $('ref-detail-study').innerHTML=study(item);
 $('ref-detail-focus').textContent='Independent interaction exercise: '+item.focus+'. '+item.designFocus;
 $('ref-detail-license').textContent=item.license+': '+item.licenseNote;
 $('ref-detail-use').textContent='Responsible use: '+item.use;
 $('ref-detail-avoid').textContent='Avoid: '+item.doNot;
 $('ref-official-demo').href=safeUrl(item.demo);
 $('ref-official-code').href=safeUrl(item.repo);
 $('ref-source-prompt').href='https://github.com/kapasainitishreddy/Prompt-Vault/blob/main/prompts/references/'+encodeURIComponent(item.id)+'.md';
 $('ref-prompt-text').textContent='Select this tab to load the full original prompt.';
 tab('preview');
 var dlg=$('resource-dialog');
 if(typeof dlg.showModal==='function')dlg.showModal();
 else{toast('This browser cannot open the preview dialog. Visit the source links instead.');return;}
 $('resource-dialog-close').focus();
 if(location.hash!=='#reference/'+id)history.replaceState(null,'','#reference/'+id);
}
function closeItem(){
 var d=$('resource-dialog');
 if(d.open)d.close();
}
function installDialog(){
 var dlg=$('resource-dialog');
 $('resource-dialog-close').addEventListener('click',closeItem);
 dlg.addEventListener('click',function(event){if(event.target===dlg)closeItem();});
 dlg.addEventListener('close',function(){
  selected=null;promptValue='';
  if(location.hash.startsWith('#reference/'))history.replaceState(null,'',location.pathname+location.search);
  if(lastTrigger&&lastTrigger.isConnected)lastTrigger.focus();
  lastTrigger=null;
 });
 document.querySelectorAll('.ref-dialog-tabs [data-tab]').forEach(function(button){
  button.addEventListener('click',function(){tab(button.dataset.tab);});
 });
 var tabs=dlg.querySelector('.ref-dialog-tabs');
 tabs.addEventListener('keydown',function(event){
  if(['ArrowLeft','ArrowRight','Home','End'].indexOf(event.key)<0)return;
  event.preventDefault();
  var order=['preview','prompt','license'],i=order.findIndex(function(n){return $('ref-tab-'+n).getAttribute('aria-selected')==='true';});
  if(event.key==='Home')i=0;else if(event.key==='End')i=2;else i=(i+(event.key==='ArrowRight'?1:2))%3;
  tab(order[i]);$('ref-tab-'+order[i]).focus();
 });
 $('ref-copy-prompt').addEventListener('click',async function(){
  if(!selected)return;
  if(!promptValue)await loadPrompt();
  if(!promptValue){toast('Prompt not loaded; use the source link.');return;}
  try{
   if(!navigator.clipboard||!navigator.clipboard.writeText)throw new Error('Clipboard unavailable');
   await navigator.clipboard.writeText(promptValue);toast('Copied the full original prompt.');
  }catch(_){
   var pre=$('ref-prompt-text'),range=document.createRange();
   range.selectNodeContents(pre);var selection=window.getSelection();
   if(selection){selection.removeAllRanges();selection.addRange(range);}
   pre.focus();toast('Text selected. Copy manually with Ctrl/Cmd+C.');
  }
 });
}
function wire(){
 $('resource-search').addEventListener('input',function(event){query=event.target.value.trim().toLowerCase();paint();});
 $('resource-search-form').addEventListener('submit',function(event){event.preventDefault();paint();});
 $('ref-clear-search').addEventListener('click',function(){query='';$('resource-search').value='';paint();$('resource-search').focus();});
 $('resource-filters').addEventListener('click',function(event){var button=event.target.closest('[data-filter]');if(button)chooseFilter(button.dataset.filter);});
 $('resource-sort').addEventListener('change',function(event){sort=event.target.value;paint();});
 $('ref-reset').addEventListener('click',reset);
 $('resources-grid').addEventListener('click',function(event){var button=event.target.closest('[data-open]');if(button)openItem(button.dataset.open,button);});
 document.addEventListener('click',interact);
 document.addEventListener('submit',formDemo);
 installDialog();
}
async function init(){
 wire();
 try{
  var result=await fetch('./data/resources.json',{cache:'no-store'});
  if(!result.ok)throw new Error('Reference catalog failed to load');
  var payload=await result.json();
  if(!payload||!Array.isArray(payload.references)||payload.references.length!==8)throw new Error('Unexpected resource catalog shape');
  data=payload.references;
  paint();
  var hash=location.hash.match(/^#reference\/([a-z0-9-]+)$/);
  if(hash)openItem(hash[1],null);
 }catch(_){
  $('resource-count').textContent='The reference catalog could not load on this host.';
  $('resources-grid').innerHTML='<div class="ref-empty"><h3>Source list temporarily unavailable.</h3><p>Browse the <a href="https://github.com/kapasainitishreddy/Prompt-Vault/tree/main/prompts/references">original prompt collection on GitHub</a> while the local catalog is restored.</p></div>';
 }
}
init();
})();
