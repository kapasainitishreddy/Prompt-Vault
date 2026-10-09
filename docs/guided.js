/* Prompt-Vault Guided Atlas: original 40-specimen two-track browser. MIT.
   No third-party UI code, no paid API or automatic AI model calls. */
const $ = id => document.getElementById(id);
const esc = value => String(value == null ? '' : value).replace(/[&<>"']/g, ch => ({
  '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
}[ch]));
const root = 'https://github.com/kapasainitishreddy/Prompt-Vault/blob/main/';
const state = {
  plans:{website:[],app:[]}, parts:{website:[],app:[]}, research:[],
  track:'website', selected:'', variant:0, device:'desktop', platform:'ios', selectedStep:0,
  demo:'idle', query:'', category:'all', savedOnly:false, saved:new Set(), fullPrompt:'', fullOpen:false
};
try { const v=JSON.parse(localStorage.getItem('pv-guided-saved')||'[]'); if(Array.isArray(v)) state.saved=new Set(v); }catch(_){}
let toastTimer;
function note(message) {
 const el=$('ga-toast');el.textContent=message;el.hidden=false;clearTimeout(toastTimer);
 toastTimer=setTimeout(()=>{el.hidden=true;},2700);
}
function getPlans(){return state.plans[state.track]||[];}
function getPlan(){return getPlans().find(x=>x.id===state.selected)||getPlans()[0];}
function targetSteps(b){return b?(state.track==='website'?b.sections:b.flows):[];}
function currentPart(){const parts=state.parts[state.track];return parts.find(x=>x.id===targetSteps(getPlan())[state.selectedStep]);}
function trackTitle(){return state.track==='website'?'WEBSITE':'APP UI/UX';}
function groupOf(p){return p.group||p.category||'Product';}
function keyFor(p){return state.track+':'+p.id;}
function validId(s){return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(s||''));}
function saved(){try{localStorage.setItem('pv-guided-saved',JSON.stringify([...state.saved]));}catch(_){}}
function hrefForStep(id) {
 if(!validId(id))return root+'prompts/';
 return root + (state.track==='website'?'prompts/website/sections/':'prompts/app/flows/')+encodeURIComponent(id)+'.md';
}
function srcForStep(id) {
 if(!validId(id))return '#';
 return './prompts/'+(state.track==='website'?'website/sections/':'app/flows/')+encodeURIComponent(id)+'.md';
}
function srcForPlan(b) {
 if(!b||!validId(b.id))return '#';
 return './prompts/guided/'+(state.track==='website'?'website/':'app/')+encodeURIComponent(b.id)+'.md';
}
function hrefForPlan(b) {
 return root+'guides/'+(state.track==='website'?'website/':'app/')+encodeURIComponent(b.id)+'.md';
}
function restoreUrl() {
 const hash=location.hash.match(/^#(website|app)\/([a-z0-9-]+)$/);
 if(hash){state.track=hash[1];state.selected=hash[2];}
}
function updateUrl() {
 const p=getPlan();if(!p)return;
 const h='#'+state.track+'/'+p.id;
 if(location.hash!==h)history.replaceState(null,'',location.pathname+location.search+h);
}
function paintTrack(){
 document.querySelectorAll('[data-track]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.track===state.track)));
 $('ga-platform-tools').hidden=state.track!=='app';
 const desktop=document.querySelector('[data-device="desktop"]');
 const mobile=document.querySelector('[data-device="mobile"]');
 if(desktop)desktop.setAttribute('aria-pressed',String(state.device==='desktop'));
 if(mobile)mobile.setAttribute('aria-pressed',String(state.device==='mobile'));
 document.querySelectorAll('[data-platform]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.platform===state.platform)));
}
function paintFilters(){
 const groups=[...new Set(getPlans().map(groupOf))].sort();
 $('ga-filter').innerHTML='<option value="all">All categories</option>'+groups.map(g=>'<option value="'+esc(g)+'">'+esc(g)+'</option>').join('');
 if(!groups.includes(state.category))state.category='all';
 $('ga-filter').value=state.category;
 $('ga-search').value=state.query;
 $('ga-saved-only').checked=state.savedOnly;
}
function listed(){
 const q=state.query.toLowerCase();
 return getPlans().filter(p=>{
  const content=[p.id,p.title,p.goal||p.job,p.group,p.category,p.thesis,(p.skills||[]).join(' ')].join(' ').toLowerCase();
  return (!q||content.includes(q))&&(state.category==='all'||groupOf(p)===state.category)&&(!state.savedOnly||state.saved.has(keyFor(p)));
 });
}
function paintList(){
 const items=listed();
 $('ga-dir-count').textContent=items.length+' / '+getPlans().length+' plans';
 $('ga-list-status').textContent=items.length?'Choose a plan':'No matches. Clear the filters.';
 $('ga-directory-items').innerHTML=items.length?items.map((p,i)=>
  '<button type="button" data-plan="'+esc(p.id)+'" aria-current="'+String(p.id===state.selected)+'"><span class="ga-dir-number">'+String(i+1).padStart(2,'0')+'</span><span>'+esc(p.title)+'<small>'+esc(groupOf(p))+'</small></span></button>'
 ).join(''):'<p class="ga-loading">No matches. Choose another category or clear saved-only.</p>';
}
function paintFavorite(){
 const b=getPlan();if(!b)return;
 const on=state.saved.has(keyFor(b));
 $('ga-favorite').setAttribute('aria-pressed',String(on));
 $('ga-favorite').textContent=on?'★ Saved':'☆ Save';
}
function paintVariants(){
 const descriptions=['A · Type-led editorial. Distinct first fold and honest reading order.',
 'B · Demonstration-led. Make the real action or product evidence the focal point.',
 'C · Information-led. Indexed details and structured pathways before decoration.'];
 document.querySelectorAll('[data-variant]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.variant)===state.variant)));
 $('ga-variant-note').textContent=descriptions[state.variant];
}
function paintSteps(){
 const b=getPlan();if(!b)return;
 const steps=targetSteps(b);
 $('ga-step-count').textContent=steps.length+' considered stages';
 $('ga-steps').innerHTML=steps.map((id,i)=>{
  const p=state.parts[state.track].find(x=>x.id===id);
  const title=p?.title||id.replace(/-/g,' ');
  return '<li><button type="button" data-step="'+i+'" aria-current="'+String(i===state.selectedStep)+'"><span>'+String(i+1).padStart(2,'0')+'</span><span>'+esc(title)+'</span><span>↗</span></button></li>';
 }).join('');
 paintStepDetail();
}
function paintStepDetail(){
 const b=getPlan(),steps=targetSteps(b),id=steps[state.selectedStep];
 const part=currentPart(),i=state.selectedStep;
 $('ga-step-label').textContent=(state.track==='website'?'SELECTED WEBSITE SECTION':'SELECTED APP SCREEN/STATE')+' / '+String(i+1).padStart(2,'0');
 $('ga-step-name').textContent=part?.title||id||'Select a stage';
 $('ga-step-why').textContent=part?.job||('This stage is part of the '+(b?.title||'current')+' flow. Keep it only when real user content supports it.');
 $('ga-step-source').href=hrefForStep(id);
 document.querySelectorAll('[data-step]').forEach(el=>el.setAttribute('aria-current',String(Number(el.dataset.step)===state.selectedStep)));
}
function selectedSource(id){return state.research.find(x=>x.id===id);}
function paintResearch(b){
 const all=b.sourceIds||[];
 $('ga-research-links').innerHTML=all.map(id=>{
  const s=selectedSource(id);
  if(!s)return '<article><strong>'+esc(id)+'</strong><p>Source record not found. Verify the publisher before relying on it.</p></article>';
  return '<article><a href="'+esc(s.url)+'" target="_blank" rel="noopener noreferrer">'+esc(s.title)+' ↗</a><p>'+esc(s.summary)+'</p><small>'+esc(s.publisher)+' · '+esc(s.year)+' · Scope: '+esc(s.limitation)+'</small></article>';
 }).join('');
}
function paintInsights(b){
 $('ga-thesis').textContent=b.thesis;
 $('ga-ai').textContent=b.ai;
 $('ga-three').textContent=b.threeD;
 $('ga-skills').innerHTML=(b.skills||[]).map(x=>'<span>'+esc(String(x).trim())+'</span>').join('');
 const guide=state.track==='website'?'website':'app';
 $('ga-ai-guide').href=root+'guides/'+guide+'/AI-INTEGRATION.md';
 $('ga-three-guide').href=root+'guides/'+guide+'/'+(guide==='website'?'3D-AND-MOTION.md':'MOTION-AND-3D.md');
}
function showPlan(){
 const b=getPlan();if(!b){$('ga-selected-title').textContent='No blueprints found.';return;}
 state.selected=b.id;updateUrl();
 $('ga-selected-track').textContent=trackTitle()+' / '+esc(groupOf(b)).toUpperCase();
 $('ga-selected-title').textContent=b.title;
 $('ga-selected-job').textContent=b.goal||b.job;
 $('ga-full-github').href=hrefForPlan(b);
 $('ga-full-text').textContent='Select Read Markdown to load the complete blueprint.';
 $('ga-full-text').hidden=true;$('ga-view-full').textContent='Read Markdown';$('ga-view-full').setAttribute('aria-expanded','false');
 state.fullPrompt='';state.fullOpen=false;
 paintList();paintFavorite();paintTrack();paintVariants();paintSteps();paintInsights(b);paintResearch(b);paintPreview();
}
function sitePreview(b,part){
 const title=esc(b.title);
 const focus=esc(part?.title||'Explore the product');
 const group=esc(groupOf(b));
 const goal=esc(b.goal||'Understand the next useful action');
 const short=goal.length>95?goal.slice(0,92)+'…':goal;
 const counter=String(state.selectedStep+1).padStart(2,'0');
 const heroCopy=state.variant===0?'<div class="ga-spec-copy"><div class="ga-spec-copy-main"><span class="ga-spec-tag">'+group+' / '+counter+'</span><h4 class="ga-spec-title">'+title+'<span style="color:var(--spec-accent)">.</span></h4><p class="ga-spec-body">'+short+'</p><button type="button" class="ga-spec-button" data-next-step>See next section ↗</button></div></div>':'<div class="ga-spec-copy"><span class="ga-spec-tag">FIELD NOTE '+counter+'</span><div class="ga-spec-copy-main"><h4 class="ga-spec-title">'+title+'</h4><p class="ga-spec-body">'+short+'</p><button type="button" class="ga-spec-button" data-next-step>Explore the next stage ↗</button></div></div>';
 const art='<div class="ga-spec-art" aria-label="Original typography and information hierarchy illustration"><span>'+group.toUpperCase()+' / STUDY '+counter+'</span><strong>'+focus+'</strong><span>Content → evidence → action</span></div>';
 return '<div class="ga-web-specimen" data-sector="'+group+'" data-variant="'+state.variant+'">'+
  '<div class="ga-spec-top"><span class="ga-spec-name">'+title+'</span><span>PUBLIC SITE / DEMONSTRATION</span></div>'+
  '<div class="ga-web-composition">'+heroCopy+art+'</div>'+
  '<div class="ga-spec-step-strip">Now studying: '+focus+'. The complete section prompt has behavior and recovery guidance.</div>'+
  '<div class="ga-spec-bottom"><span>'+counter+' / '+String(targetSteps(b).length).padStart(2,'0')+' INFORMATION STAGES</span><span>NO FAKE PROOF · REAL JOBS</span></div></div>';
}
function appPreview(b,part){
 const title=esc(b.title),index=String(state.selectedStep+1).padStart(2,'0');
 const currentName=esc(part?.title||'Choose an action');
 const stateName=state.demo==='error'?'Needs attention':state.demo==='done'?'Action confirmed':'Ready when you are';
 const stageCopy=state.demo==='error'?'Example failure. The action was not saved. Choose Retry or Reset.':
  state.demo==='done'?'Illustrative local UI state confirmed. Nothing was sent to a real backend.':
  'Tap the button to simulate this step. Test an error path too.';
 const layout=state.variant;
 const ticker=layout===0?'FOCUS / NEXT ACTION':layout===1?'LIVE WORKBENCH / DEMO':'INDEX / WORKFLOW';
 const mini=(targetSteps(b).slice(0,3)).map((x,i)=>{
  const s=state.parts.app.find(p=>p.id===x);
  return '<span>'+String(i+1).padStart(2,'0')+' · '+esc(s?.title||x)+'</span>';
 }).join('');
 return '<div class="ga-app-scene" data-variant="'+layout+'">'+
  '<div class="ga-device" data-platform="'+state.platform+'" role="group" aria-label="Original illustrative '+(state.platform==='ios'?'iOS':'Android')+' app shell; not a native screenshot">'+
   '<div class="ga-device-top"><span>9:41</span><span>●●●</span></div>'+
   '<div class="ga-device-inner"><span class="ga-device-kicker">'+esc(groupOf(b)).toUpperCase()+' / '+index+'</span><h4>'+title+'</h4>'+
   '<div class="ga-device-screen"><span class="ga-app-screen-label">'+esc(ticker)+'</span><strong class="ga-app-preview-message">'+esc(stateName)+'</strong><span class="ga-app-preview-sub" role="status" aria-live="polite">'+esc(stageCopy)+'</span></div>'+
   '<div class="ga-app-actions"><button type="button" data-demo="done" aria-pressed="'+String(state.demo==='done')+'">'+(state.demo==='error'?'Retry step':'Try success')+'</button>'+
   '<button type="button" data-demo="error" aria-pressed="'+String(state.demo==='error')+'">Try error</button><button type="button" data-demo="idle" aria-pressed="'+String(state.demo==='idle')+'">Reset</button></div></div>'+
   '<div class="ga-device-nav"><b>Today</b><span>Explore</span><span>Settings</span></div><div class="ga-device-home" aria-hidden="true"></div>'+
  '</div><div class="ga-app-context"><div><span class="ga-eyebrow">NOW REVIEWING / '+index+'</span><h5>'+currentName+'</h5><p>'+esc(part?.job||b.job)+'</p></div><div class="ga-app-steps">'+mini+'</div><p class="ga-eyebrow">This is an HTML state demo, not a real StoreKit, Play Billing or OS implementation.</p></div></div>';
}
function paintPreview(){
 const b=getPlan();if(!b)return;
 $('ga-preview-title').textContent=state.track==='website'?'Responsive website composition':'Native-inspired interaction study';
 $('ga-preview-shell').dataset.device=state.device;
 $('ga-preview').innerHTML=state.track==='website'?sitePreview(b,currentPart()):appPreview(b,currentPart());
}
function stepTo(idx,restore){
 const steps=targetSteps(getPlan());if(idx<0||idx>=steps.length)return;
 state.selectedStep=idx;state.demo='idle';
 paintStepDetail();paintPreview();
 if(restore){const button=$('ga-steps').querySelector('[data-step="'+idx+'"]');button?.focus();}
}
function setTrack(name){
 if(name!=='website'&&name!=='app')return;
 state.track=name;state.selected=getPlans()[0]?.id||'';
 state.selectedStep=0;state.demo='idle';state.variant=0;state.query='';state.category='all';state.savedOnly=false;
 paintFilters();showPlan();
}
function choosePlan(id,focus){
 if(!getPlans().some(x=>x.id===id))return;
 state.selected=id;state.selectedStep=0;state.demo='idle';state.variant=0;
 showPlan();
 if(focus){const button=$('ga-directory-items').querySelector('[data-plan="'+id+'"]');button?.focus();}
}
async function fetchText(uri){
 if(uri==='#')throw new Error('Invalid prompt path');
 const response=await fetch(uri);if(!response.ok)throw new Error('HTTP '+response.status);
 return response.text();
}
async function getFull(){
 const b=getPlan();if(!b)return '';
 if(state.fullPrompt)return state.fullPrompt;
 const id=b.id;
 const text=await fetchText(srcForPlan(b));
 if(getPlan()?.id===id)state.fullPrompt=text;
 return text;
}
async function copy(text){
 if(!text){note('No prompt text available.');return;}
 try{
  if(!navigator.clipboard?.writeText)throw new Error('clipboard permission unavailable');
  await navigator.clipboard.writeText(text);
  note('Copied the complete prompt to clipboard.');
 }catch(_){
  const pre=$('ga-full-text');pre.hidden=false;pre.textContent=text;pre.focus();
  const selection=window.getSelection(),range=document.createRange();range.selectNodeContents(pre);
  selection?.removeAllRanges();selection?.addRange(range);
  note('Prompt selected. Copy manually with Ctrl/Cmd+C.');
 }
}
async function onCopyFull(){
 try{note('Loading full prompt…');await copy(await getFull());}
 catch(_){note('Prompt unavailable on this host. Open its GitHub source.');}
}
async function onCopyStep(){
 const id=targetSteps(getPlan())[state.selectedStep];
 try{note('Loading section prompt…');await copy(await fetchText(srcForStep(id)));}
 catch(_){note('Step prompt unavailable on this host. Open the source link.');}
}
async function onReadFull(){
 if(state.fullOpen){state.fullOpen=false;$('ga-full-text').hidden=true;$('ga-view-full').textContent='Read Markdown';$('ga-view-full').setAttribute('aria-expanded','false');return;}
 $('ga-full-text').hidden=false;$('ga-full-text').textContent='Loading original blueprint…';
 try{
  const text=await getFull();
  if(!state.fullOpen&&$('ga-full-text').hidden===false){$('ga-full-text').textContent=text;}
  state.fullOpen=true;$('ga-view-full').setAttribute('aria-expanded','true');$('ga-view-full').textContent='Hide Markdown';
 }catch(_){$('ga-full-text').textContent='Markdown is not available on this host. Use the GitHub source link.';}
}
function bind(){
 const mobile=document.querySelector('.mobile-menu'),nav=$('mobile-navigation');
 mobile?.addEventListener('click',()=>{const isOpen=mobile.getAttribute('aria-expanded')!=='true';mobile.setAttribute('aria-expanded',String(isOpen));nav.hidden=!isOpen;});
 document.querySelectorAll('[data-track]').forEach(b=>b.addEventListener('click',()=>setTrack(b.dataset.track)));
 $('ga-search').addEventListener('input',e=>{state.query=e.target.value.trim();paintList();});
 $('ga-filter').addEventListener('change',e=>{state.category=e.target.value;paintList();});
 $('ga-saved-only').addEventListener('change',e=>{state.savedOnly=e.target.checked;paintList();});
 $('ga-reset').addEventListener('click',()=>{state.query='';state.category='all';state.savedOnly=false;paintFilters();paintList();});
 $('ga-directory-items').addEventListener('click',e=>{const b=e.target.closest('[data-plan]');if(b)choosePlan(b.dataset.plan,true);});
 $('ga-favorite').addEventListener('click',()=>{const b=getPlan();if(!b)return;const key=keyFor(b);if(state.saved.has(key))state.saved.delete(key);else state.saved.add(key);saved();paintFavorite();paintList();});
 document.querySelectorAll('[data-variant]').forEach(b=>b.addEventListener('click',()=>{state.variant=Number(b.dataset.variant);paintVariants();paintPreview();}));
 document.querySelectorAll('[data-device]').forEach(b=>b.addEventListener('click',()=>{state.device=b.dataset.device;paintTrack();paintPreview();}));
 document.querySelectorAll('[data-platform]').forEach(b=>b.addEventListener('click',()=>{state.platform=b.dataset.platform;paintTrack();paintPreview();}));
 $('ga-steps').addEventListener('click',e=>{const b=e.target.closest('[data-step]');if(b)stepTo(Number(b.dataset.step),true);});
 $('ga-preview').addEventListener('click',e=>{
   const next=e.target.closest('[data-next-step]');
   if(next){stepTo((state.selectedStep+1)%targetSteps(getPlan()).length,false);return;}
   const demo=e.target.closest('[data-demo]');if(demo){state.demo=demo.dataset.demo;paintPreview();$('ga-preview').querySelector('[data-demo="'+state.demo+'"]')?.focus();}
 });
 $('ga-copy-full').addEventListener('click',onCopyFull);
 $('ga-copy-step').addEventListener('click',onCopyStep);
 $('ga-view-full').addEventListener('click',onReadFull);
}
async function init(){
 bind();restoreUrl();
 try{
  const src=['./data/guided-websites.json','./data/guided-apps.json','./data/evidence-atlas.json','./data/website.json','./data/app.json'];
  const responses=await Promise.all(src.map(async url=>{const r=await fetch(url);if(!r.ok)throw new Error('Missing '+url);return r.json();}));
  const [web,apps,research,webParts,appParts]=responses;
  if(web.count!==20||apps.count!==20||web.blueprints.length!==20||apps.blueprints.length!==20)throw new Error('Expected 20 + 20 blueprints');
  state.plans={website:web.blueprints,app:apps.blueprints};
  state.parts={website:webParts.sections,app:appParts.flows};
  state.research=research.sources;
  if(!getPlans().some(p=>p.id===state.selected))state.selected=getPlans()[0].id;
  paintFilters();showPlan();
 }catch(error){
  $('ga-dir-count').textContent='Unavailable';
  $('ga-directory-items').innerHTML='<p class="ga-loading">This host did not provide the blueprint catalogs. <a href="https://github.com/kapasainitishreddy/Prompt-Vault/tree/main/guides">Read the full guides on GitHub ↗</a>.</p>';
  $('ga-selected-title').textContent='Blueprint data unavailable';
  $('ga-selected-job').textContent='Serve the docs folder from a local HTTP server or the deployed static host, not file://.';
  $('ga-preview').textContent='Preview unavailable; full Markdown guides remain in the repository.';
  console.error('Guided Atlas catalog load failed:',error);
 }
}

function initCapabilities(){
 const routes={
  skip:["NO AI / DEFAULT","Use direct navigation, useful search and clear forms when they solve the job better than a chatbot."],
  puter:["CLOUD / PUTER.JS","AI requests run in Puter's cloud with a user-pays account and network connection. This is not private on-device inference."],
  webllm:["BROWSER-LOCAL / WEBLLM","On supported WebGPU browsers, download an approved model with consent. Expect hardware, memory and model-license limitations."],
  transformers:["BROWSER-LOCAL / TRANSFORMERS.JS","Run supported text, vision or embedding pipelines on device, subject to model license, browser capability and available memory."],
  server:["CLOUD / AUTHENTICATED BACKEND","Use scoped server-side AI with private keys, explicit consent, request limits, cited retrieval and human review of consequential actions."]
 };
 const buttons=[...document.querySelectorAll('[data-ai-route]')];
 buttons.forEach(b=>b.addEventListener('click',()=>{
  const v=routes[b.dataset.aiRoute];if(!v)return;
  buttons.forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
  $('ga-ai-route-label').textContent=v[0];
  $('ga-ai-route-summary').textContent=v[1];
 }));
 let yaw=-25;
 const cube=$('ga-css3d-box');
 const status=$('ga-cube-status');
 document.querySelectorAll('[data-cube-action]').forEach(b=>b.addEventListener('click',()=>{
  if(b.dataset.cubeAction==='reset')yaw=-25;
  else yaw+=b.dataset.cubeAction==='left'?-45:45;
  cube.style.setProperty('--ga-yaw',yaw+'deg');
  status.textContent='Illustrative 3D object rotated '+Math.abs(yaw)+' degrees '+(yaw<0?'to the left':yaw>0?'to the right':'facing front')+'. Static text and numbered faces remain available.';
 }));
}
initCapabilities();
init();
