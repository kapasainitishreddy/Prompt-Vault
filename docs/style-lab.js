/* Prompt-Vault Style Laboratory | MIT | original CSS/DOM specimens */
(function(){
'use strict';
var data=[],target='website',category='All',query='',sort='curated',selected=null,variation=0,originalTitle='',lastTrigger=null,promptText='',saved=new Set();
var $=function(id){return document.getElementById(id);};
var escapeText=function(value){return String(value==null?'':value).replace(/[&<>"']/g,function(ch){if(ch==='&')return '&amp;';if(ch==='<')return '&lt;';if(ch==='>')return '&gt;';if(ch.charCodeAt(0)===34)return '&quot;';return '&#39;';});};
try{var stored=JSON.parse(localStorage.getItem('pv-style-saved')||'[]');if(Array.isArray(stored))saved=new Set(stored);}catch(_){}
function styleVars(s){var p=s.palette;return '--s-bg:'+p.paper+';--s-ink:'+p.ink+';--s-hot:'+p.accent+';--s-soft:'+p.secondary+';';}
function region(){return target==='app'?'App UI/UX':'Website';}
function rows(s,v){
 var name=escapeText(originalTitle||s.title),entry=escapeText(s.purpose.split(' with ')[0].slice(0,80));
 var layout= v===0?s.layout:(v===1?(s.target==='website'?'demo':'workspace'):(s.target==='website'?'index':'flow'));
 var front='<span class="spec-id">'+(s.target==='app'?'WORKSPACE / 01':'STUDIO / NO. 01')+'</span>';
 var badge='<span class="spec-badge">'+escapeText(s.family.toUpperCase())+'</span>';
 var heading='<h3 class="spec-title">'+name+'</h3><p class="spec-deck">'+entry+'</p>';
 var link='<span class="spec-action" aria-hidden="true">'+(s.target==='app'?'CONTINUE →':'EXPLORE THE WORK ↗')+'</span>';
 var lines='<span class="spec-line"></span><span class="spec-line"></span><span class="spec-line short"></span>';
 var shape='<div class="spec-art" aria-hidden="true"><i></i><i></i><i></i><i></i><span>01</span></div>';
 var ledger='<div class="spec-list"><span><b>01</b> Principle <i>↗</i></span><span><b>02</b> Practice <i>↗</i></span><span><b>03</b> Evidence <i>↗</i></span></div>';
 var bullets='<div class="spec-grid-mini"><b>DISCOVER</b><b>MAKE</b><b>VERIFY</b><b>REPEAT</b></div>';
 if(s.target==='website'){
   var main;
   if(['columns','newspaper','index','minimal'].includes(layout))main='<div class="spec-hero-columns"><div>'+heading+link+'</div><div>'+lines+ledger+'</div></div>';
   else if(['terminal','schematic','grid','blueprint'].includes(layout))main='<div class="spec-terminal"><span>&gt; design --intent</span><strong>'+name+'</strong><span>&gt; verify --real-tasks</span><span class="spec-terminal-success">✓ ACCESSIBLE BY DEFAULT</span></div>';
   else if(['poster','product','orbital','geometry','organic'].includes(layout))main='<div class="spec-hero-product"><div>'+heading+link+'</div>'+shape+'</div>';
   else if(['scrapbook','collage','travel','risograph'].includes(layout))main='<div class="spec-collage">'+shape+'<div>'+heading+link+'</div></div>';
   else if(layout==='demo')main='<div class="spec-workbench"><div class="spec-work-panel"><span class="spec-label">TRY THE PRODUCT</span>'+ledger+'</div><div>'+heading+link+'</div></div>';
   else if(layout==='index')main='<div class="spec-index"><span>01 / COMPOSITION</span><span>02 / CONTENT</span><span>03 / INTERACTION</span>'+heading+'</div>';
   else main='<div class="spec-hero-default"><div>'+heading+link+'</div>'+bullets+'</div>';
   return '<div class="specimen style-web" data-look="'+escapeText(s.visual)+'" data-layout="'+escapeText(layout)+'" style="'+styleVars(s)+'"><div class="spec-browser"><div class="spec-top">'+front+badge+'</div><div class="spec-content">'+main+'</div><div class="spec-foot"><span>INTENTION / NOT TEMPLATE</span><span>↗</span></div></div></div>';
 }
 var appBody;
 if(['board','table','ledger','dashboard','chart','grid','inventory'].includes(layout))appBody='<div class="spec-app-rows"><div class="spec-app-number">02 / 04</div>'+ledger+'<div class="spec-app-stat"><span>STATUS</span><strong>Ready</strong></div></div>';
 else if(['chat','diary','notebook','reader'].includes(layout))appBody='<div class="spec-app-chat"><span>ONE CLEAR THOUGHT</span><div>Keep the words useful, the actions familiar.</div><div>Save the draft, then let the user decide.</div></div>';
 else if(['map','calendar','flight','flow'].includes(layout))appBody='<div class="spec-app-calendar">'+Array(24).fill('<i></i>').join('')+'</div>';
 else if(['console','terminal','incident'].includes(layout))appBody='<div class="spec-terminal"><span>&gt; current status</span><strong>All systems visible</strong><span>&gt; inspect log</span><span class="spec-terminal-success">✓ NO FAKE TELEMETRY</span></div>';
 else if(['media','canvas','waveform','product'].includes(layout))appBody=shape+'<div class="spec-list"><span>Draft 001<i>↗</i></span><span>Review next<i>↗</i></span></div>';
 else if(layout==='workspace')appBody='<div class="spec-app-rows"><div class="spec-app-stat"><span>TODAY</span><strong>Start here</strong></div>'+ledger+'</div>';
 else appBody='<div class="spec-app-rows">'+ledger+'<div class="spec-app-stat"><span>NEXT STEP</span><strong>Focus first</strong></div></div>';
 return '<div class="specimen style-app" data-look="'+escapeText(s.visual)+'" data-layout="'+escapeText(layout)+'" style="'+styleVars(s)+'"><div class="spec-phone"><div class="spec-phone-top"><span>09:41</span><span>•••</span></div><div class="spec-app-main"><span class="spec-label">'+escapeText(s.family.toUpperCase())+' / SAMPLE UI</span><h3 class="spec-app-title">'+name+'</h3><p class="spec-deck">'+entry+'</p>'+appBody+'</div><div class="spec-app-nav"><span>Today</span><span>Explore</span><span>Profile</span></div></div></div>';
}
function card(s,index){
 var isSaved=saved.has(s.id);return '<article class="style-card '+(index%9===0?'style-wide':'')+'" data-id="'+escapeText(s.id)+'"><div class="style-card-preview">'+rows(s,0)+'<span class="style-card-stamp">'+escapeText(s.family.toUpperCase())+' / '+String(index+1).padStart(2,'0')+'</span><button type="button" class="style-save" data-save="'+escapeText(s.id)+'" aria-pressed="'+isSaved+'" aria-label="'+(isSaved?'Remove saved ':'Save ')+escapeText(s.title)+'">'+(isSaved?'★':'☆')+'</button></div><div class="style-card-info"><div><span class="micro">'+escapeText(s.target.toUpperCase())+' / '+escapeText(s.density.toUpperCase())+'</span><h3>'+escapeText(s.title)+'</h3><p>'+escapeText(s.purpose)+'</p></div><button type="button" data-open="'+escapeText(s.id)+'" class="style-open">Explore variations ↗</button></div></article>';
}
function categories(){
 var set=new Set(data.filter(function(s){return s.target===target;}).map(function(s){return s.family;}));
 var all=['All'].concat(Array.from(set).sort());
 $('style-categories').innerHTML=all.map(function(f){var count=f==='All'?data.filter(function(s){return s.target===target;}).length:data.filter(function(s){return s.target===target&&s.family===f;}).length;return '<button type="button" data-family="'+escapeText(f)+'" aria-pressed="'+String(f===category)+'">'+escapeText(f)+' <span>'+count+'</span></button>';}).join('');
}
function results(){
 var term=query.toLocaleLowerCase().trim();
 return data.filter(function(s){return s.target===target&&(category==='All'||s.family===category)&&(!term||[s.title,s.family,s.visual,s.purpose,s.layout,s.motion].join(' ').toLocaleLowerCase().includes(term))&&(!$('style-only-saved').checked||saved.has(s.id));}).sort(function(a,b){return sort==='az'?a.title.localeCompare(b.title):sort==='za'?b.title.localeCompare(a.title):0;});
}
function refresh(){
 var items=results();
 $('style-count').textContent=items.length+' of '+data.filter(function(s){return s.target===target;}).length+' '+region()+' styles';
 $('style-grid').innerHTML=items.map(card).join('');
 $('style-empty').hidden=Boolean(items.length);
 $('style-grid').hidden=!items.length;
}
function chooseTarget(next){target=next;category='All';document.querySelectorAll('[data-target]').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.target===target));});categories();refresh();}
function save(id){if(saved.has(id))saved.delete(id);else saved.add(id);try{localStorage.setItem('pv-style-saved',JSON.stringify(Array.from(saved)));}catch(_){}refresh();}
function updateDetail(){
 if(!selected)return;
 $('style-stage').innerHTML=rows(selected,variation);
 $('style-variant-note').textContent=selected.variants[variation]||'An original design direction.';
 document.querySelectorAll('#style-variants [data-variation]').forEach(function(b){b.setAttribute('aria-pressed',String(Number(b.dataset.variation)===variation));});
}
function openStyle(s,trigger){
 selected=s;variation=0;originalTitle='';lastTrigger=trigger;promptText='';
 $('style-detail-title').textContent=s.title;
 $('style-detail-sub').textContent=s.purpose;
 $('style-detail-type').textContent=s.target.toUpperCase()+' / '+s.family.toUpperCase();
 $('style-detail-purpose').textContent=s.purpose;
 $('style-detail-typography').textContent=s.typography+' · '+s.density+' density';
 $('style-detail-motion').textContent=s.motion;
 $('style-detail-avoid').textContent=s.avoid;
 $('style-brand').value='';
 $('style-prompt').textContent='Loading the original Markdown…';
 $('style-source').href='https://github.com/kapasainitishreddy/Prompt-Vault/blob/main/prompts/styles/'+encodeURIComponent(s.id)+'.md';
 updateDetail();
 $('style-dialog').showModal();
 $('style-close').focus();
 history.replaceState(null,'','#style/'+s.id);
}
async function loadPrompt(){
 if(!selected||promptText)return;
 var id=selected.id;
 try{var r=await fetch('./prompts/styles/'+id+'.md');if(!r.ok)throw new Error('File not available');var value=await r.text();if(selected&&selected.id===id){promptText=value;$('style-prompt').textContent=value;}}catch(_){$('style-prompt').textContent='The original prompt could not be loaded. Open the GitHub source link instead.';}
}
async function copyPrompt(){
 await loadPrompt();
 if(!promptText){$('style-prompt').focus();$('style-copy').textContent='Select from GitHub';return;}
 try{await navigator.clipboard.writeText(promptText);$('style-copy').textContent='Copied ✓';}catch(_){$('style-prompt').focus();$('style-copy').textContent='Select prompt to copy';}
}
function start(){
 document.querySelectorAll('[data-target]').forEach(function(b){b.addEventListener('click',function(){chooseTarget(b.dataset.target);});});
 $('style-search').addEventListener('input',function(e){query=e.target.value;refresh();});
 $('style-sort').addEventListener('change',function(e){sort=e.target.value;refresh();});
 $('style-only-saved').addEventListener('change',refresh);
 $('style-categories').addEventListener('click',function(e){var b=e.target.closest('[data-family]');if(b){category=b.dataset.family;categories();refresh();}});
 $('style-grid').addEventListener('click',function(e){
   var saveButton=e.target.closest('[data-save]');
   if(saveButton){save(saveButton.dataset.save);return;}
   var open=e.target.closest('[data-open]');
   if(open){var s=data.find(function(x){return x.id===open.dataset.open;});if(s)openStyle(s,open);}
 });
 $('style-close').addEventListener('click',function(){$('style-dialog').close();});
 $('style-dialog').addEventListener('close',function(){
   selected=null;promptText='';
   if(location.hash.startsWith('#style/'))history.replaceState(null,'',location.pathname+location.search);
   if(lastTrigger&&lastTrigger.isConnected)lastTrigger.focus();
 });
 $('style-variants').addEventListener('click',function(e){var b=e.target.closest('[data-variation]');if(!b)return;variation=Number(b.dataset.variation);updateDetail();});
 $('style-brand').addEventListener('input',function(e){originalTitle=e.target.value.trim().slice(0,60);updateDetail();});
 $('style-copy').addEventListener('click',copyPrompt);
 $('style-show-prompt').addEventListener('click',function(){
   $('style-prompt-section').hidden=!$('style-prompt-section').hidden;
   $('style-show-prompt').setAttribute('aria-expanded',String(!$('style-prompt-section').hidden));
   if(!$('style-prompt-section').hidden)loadPrompt();
 });
 $('style-replay').addEventListener('click',function(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var body=$('style-stage').querySelector('.specimen');
  if(body&&body.animate){body.getAnimations().forEach(function(a){a.cancel();});body.animate([{opacity:.6,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:320,easing:'ease-out'});}
 });
 $('style-mobile').addEventListener('click',function(){
  var active=$('style-stage').classList.toggle('is-compact');
  this.setAttribute('aria-pressed',String(active));
  this.textContent=active?'Desktop preview':'Mobile preview';
 });
 chooseTarget('website');
 if(location.hash.startsWith('#style/')){var id=location.hash.slice(7);var s=data.find(function(x){return x.id===id;});if(s){chooseTarget(s.target);openStyle(s,null);}}
}
fetch('./data/styles.json').then(function(r){if(!r.ok)throw Error('Catalog unavailable');return r.json();}).then(function(obj){
 data=Array.isArray(obj.styles)?obj.styles.filter(function(s){return /^[a-z0-9-]+$/.test(s.id)&&['website','app'].includes(s.target)&&s.palette;}):[];
 if(data.length!==48)throw Error('Style catalog is incomplete');
 start();
}).catch(function(){$('style-grid').textContent='Style catalog unavailable. Open the complete source prompts on GitHub.';$('style-count').textContent='Unable to load';});
})();