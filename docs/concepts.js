/* Prompt-Vault Concept Field Guide. Static original research-linked concept browser. */
const $=id=>document.getElementById(id);
const escapeHTML=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
const safeUrl=value=>typeof value==='string'&&/^https:\/\/[a-z0-9.-]+(?:\/[\w.\-~:/?#\[\]@!$&'()*+,;=%]*)?$/i.test(value);
const clean=value=>String(value??'').trim();
const state={data:{website:[],app:[],sources:[],resources:[]},track:'website',selected:null,query:'',family:'all',savedOnly:false,saved:new Set(),prompt:'design',device:'desktop',direction:'focus',scenario:'normal',researchQuery:'',researchType:'all',researchLimit:10,resourceQuery:'',resourceKind:'all',resourceLimit:12};
let toastTimeout;
try{state.saved=new Set(JSON.parse(localStorage.getItem('pv-concept-saves')||'[]'));}catch{}
const showToast=message=>{const el=$('concept-toast');el.textContent=message;el.hidden=false;clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>el.hidden=true,2600);};
const activeData=()=>state.data[state.track]||[];
const allConcepts=()=>[...state.data.website,...state.data.app];
const conceptById=id=>allConcepts().find(x=>x.id===id);
const current=()=>conceptById(state.selected)||activeData()[0];
const sourcesFor=x=>(x?.sources||[]).map(id=>state.data.sources.find(s=>s.id===id)).filter(Boolean);
function createLink(source){
 return safeUrl(source.url)?'<a href="'+escapeHTML(source.url)+'" target="_blank" rel="noopener noreferrer">Original source / full citation ↗</a>':'<span>Source URL not available</span>';
}
function collectionFilters(){
 const families=[...new Set(activeData().map(x=>x.family))].sort((a,b)=>a.localeCompare(b));
 $('concept-family').innerHTML='<option value="all">All families</option>'+families.map(x=>'<option value="'+escapeHTML(x)+'">'+escapeHTML(x)+'</option>').join('');
 $('concept-family').value=families.includes(state.family)?state.family:'all';
}
function visibleConcepts(){
 const needle=state.query.toLowerCase();
 return activeData().filter(x=>(state.family==='all'||state.family===x.family)&&(!state.savedOnly||state.saved.has(x.id))&&
 (!needle||[x.title,x.family,x.purpose,x.useWhen,x.avoidWhen,...x.skills].join(' ').toLowerCase().includes(needle)));
}
function renderConceptList(){
 const arr=visibleConcepts(),list=$('concept-list');
 $('result-count').textContent=arr.length+' of '+activeData().length+' patterns';
 if(!arr.length){list.innerHTML='<p class="cf-purpose">No matching pattern. Remove a filter or try a related task.</p>';return;}
 list.innerHTML=arr.map(x=>'<button type="button" data-concept="'+escapeHTML(x.id)+'" aria-current="'+String(x.id===current()?.id)+'"><small>'+escapeHTML(x.family)+(state.saved.has(x.id)?' · SAVED':'')+'</small><strong>'+escapeHTML(x.title)+'</strong></button>').join('');
 list.querySelectorAll('[data-concept]').forEach(b=>b.addEventListener('click',()=>chooseConcept(b.dataset.concept)));
}
function renderSources(){
 const c=current();if(!c)return;
 $('current-sources').innerHTML=sourcesFor(c).map(s=>
 '<details><summary>'+escapeHTML(s.title)+' · '+escapeHTML(s.type)+'</summary><div>'+
 '<p><strong>Applicable insight:</strong> '+escapeHTML(s.insight)+'</p>'+
 '<p class="cf-source-limit"><strong>Limit:</strong> '+escapeHTML(s.limitation)+'</p>'+
 createLink(s)+'</div></details>'
 ).join('');
}
function renderDetail(){
 const c=current();if(!c)return;
 $('current-family').textContent=(c.track==='app'?'APP':'WEBSITE')+' / '+c.family;
 $('current-index').textContent='CONCEPT '+String(activeData().indexOf(c)+1).padStart(3,'0')+' / '+activeData().length;
 $('current-title').textContent=c.title;
 $('current-purpose').textContent=c.purpose;
 $('current-when').textContent=c.useWhen;
 $('current-avoid').textContent=c.avoidWhen;
 $('current-skills').textContent=c.skills.join(' · ');
 $('current-success').textContent=c.successSignal;
 $('current-access').textContent=c.accessibility;
 $('current-recovery').textContent=c.recovery;
 const saved=state.saved.has(c.id);
 $('save-concept').textContent=saved?'Saved · remove bookmark':'Save this concept';
 $('save-concept').setAttribute('aria-pressed',String(saved));
 renderSources();renderPrompt();renderSpecimen();
}
function chooseConcept(id,writeHash=true){
 const c=conceptById(id);if(!c)return;
 state.selected=c.id;state.scenario='normal';
 if(c.track!==state.track){state.track=c.track;state.family='all';state.query='';$('concept-search').value='';collectionFilters();}
 document.querySelectorAll('[data-track]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.track===state.track)));
 if(writeHash){history.replaceState(null,'','#'+encodeURIComponent(c.id));}
 renderConceptList();renderDetail();
}
function chooseTrack(track){
 state.track=track==='app'?'app':'website';state.selected=activeData()[0]?.id||null;state.family='all';state.query='';state.scenario='normal';
 $('concept-search').value='';collectionFilters();
 document.querySelectorAll('[data-track]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.track===state.track)));
 chooseConcept(state.selected);
}
function promptText(){
 const c=current();if(!c)return '';
 const intro=[
 'ROLE: Expert product designer, frontend/native engineer and independent UX researcher.',
 'DESIGN TRACK: '+(c.track==='app'?'Native iOS/App Store and Android/Google Play application':'Responsive website'),
 'CONCEPT: '+c.title,
 'USER JOB: '+c.purpose,
 'WHEN THIS FITS: '+c.useWhen,
 'WHEN THIS FAILS: '+c.avoidWhen,
 'RELATED SKILLS: '+c.skills.join(', '),
 'PRODUCT CONTEXT: '+(clean($('project-brief').value)||'[Describe the actual product, target users, audience, stack and primary task; do not invent these.]')
 ].join('\n');
 const shared=[
 'EVIDENCE REFERENCES (guidance for reasoning, NOT proof of product outcomes):',
 ...sourcesFor(c).map(s=>'- '+s.title+' ('+s.url+')\n  Insight: '+s.insight+'\n  Limitation: '+s.limitation),
 'REQUIRED ACCESSIBILITY: '+c.accessibility,
 'REQUIRED RECOVERY STATES: '+c.recovery,
 'SUCCESS QUESTION TO TEST: '+c.successSignal,
 'Do not invent customer data, product functionality, testimonials, revenue, compliance certification or platform approvals.',
 'Do not copy unlicensed upstream code, assets, screenshots, branding or design trade dress. Make the final design original.'
 ].join('\n');
 if(state.prompt==='design')return [
 intro,'TASK: Propose three materially different interface compositions that serve the user job, not three recolors of one component. Identify where this pattern appears in the whole page/flow, what comes before it, what follows it, what may be omitted, and why.',
 'For each direction specify content hierarchy, interaction affordances, platform/window behavior, motion decisions, expected empty/loading/error/success states, and respectful localization. Compare three directions against audience understanding and task completion. Recommend one with a stated tradeoff.',
 shared,
 'DELIVER: context assumptions; job map; screen/section placement; three compositions; chosen composition; design tokens; realistic copy placeholders labeled as sample; interactive state diagram; keyboard/touch and assistive-tech tests; measurable acceptance criteria.'
 ].join('\n\n');
 if(state.prompt==='build')return [
 intro,'TASK: Implement the concept in the existing project without silently replacing working backend/auth/data, navigation or payment logic. Include working interactions, not a static mockup. Prefer native semantic controls and avoid dependencies with unverified licensing.',
 'Build responsive desktop/tablet/phone for web or authentic platform-specific navigation/back behavior, large text, VoiceOver/TalkBack and adaptive layouts for native apps. Use Three.js/WebGPU/AI only when it materially supports this task and provide a safe fallback.',
 'If AI is involved: choose local vs hosted deliberately, explain data transfer and costs, keep API keys server-side, validate untrusted model output and obtain approval before consequential tool actions.',
 'If stores or payments are involved: check current Apple/Google policies, eligibility, entitlements, restore, cancellation, disclosure and error paths. Never mark a simulated purchase as real.',
 shared,
 'DELIVER: changed files; actual implemented states; observable behavior; small tests; honest test output and explicit not-yet-tested areas. Take actual device/browser screenshots only if your execution environment supports it.'
 ].join('\n\n');
 return [
 intro,'TASK: Independently audit the real rendered implementation. Observe the user task before code inspection. Check first-pass clarity, navigation, explicit action, recovery, device adaptation, contrast, focus/keyboard, screen-reader semantics, RTL, reduced motion, performance and honest product claims.',
 'Do not mark a check passed without actual observation. Use no more than four bounded implementation/review rounds. Prioritize P0/P1 defects with reproduction steps. Test disabled/empty/loading/error/offline/permission-denied/success states where relevant, including user data integrity.',
 shared,
 'DELIVER: tested environment and dates; source of evidence (screenshots/test commands/device); P0/P1/P2 findings; remediation ordered by harm; post-fix observed outcomes; any untested item listed as pending. Do not claim accessibility certification or store approval.'
 ].join('\n\n');
}
function renderPrompt(){ $('concept-prompt').textContent=promptText(); }
function statusText(c){
 if(state.scenario==='error')return 'Illustrative failure: this action could not complete. Your entered work remains available. Use Retry or return safely.';
 if(state.scenario==='success')return 'Illustrative success state. The sample action is acknowledged locally; no real data was changed.';
 return c.track==='app'?'Try an action or switch the scenario to inspect recovery.':'Try a sample action or menu, then inspect the success/error state.';
}
function webContent(c){
 const title=escapeHTML(c.title),purpose=escapeHTML(c.purpose),purposeShort=escapeHTML(c.useWhen),mode=c.preview;
 const rows='<div class="cs-rows"><div><strong>Intended outcome</strong><span>Clear</span></div><div><strong>Recovery path</strong><span>Visible</span></div><div><strong>User control</strong><span>Enabled</span></div></div>';
 switch(mode){
 case 'hero':case 'editorial':return '<h4>Content has a job.</h4><p>'+purpose+'</p><div class="cs-soft"><strong>THE REAL USER QUESTION</strong><p>'+purposeShort+'</p></div>';
 case 'navigation':return '<h4>Choose a real destination</h4><div class="cs-rows"><div><strong>Overview</strong><button data-demo="navigate" type="button">View</button></div><div><strong>Details</strong><button data-demo="navigate" type="button">View</button></div><div><strong>Support</strong><button data-demo="navigate" type="button">View</button></div></div>';
 case 'search':return '<h4>Find one thing</h4><form class="cs-form" data-demo-form="search"><label for="cs-query">Search sample records</label><input id="cs-query" name="query" placeholder="Type a term" required><button type="submit">Search locally</button></form>'+rows;
 case 'form':return '<h4>Simple, repairable input</h4><form class="cs-form" data-demo-form="form"><label for="cs-input">Short project title</label><input id="cs-input" name="title" required maxlength="50" placeholder="e.g. My new idea"><button type="submit">Review entry</button></form><p>No submission or storage takes place.</p>';
 case 'commerce':return '<h4>Compare before deciding</h4><div class="cs-rows"><div><strong>Item A</strong><span>Sample / available</span></div><div><strong>Item B</strong><span>Sample / unavailable</span></div></div><button data-demo="cart" type="button">Review sample cart</button>';
 case 'comparison':return '<h4>Same dimensions, clear gaps</h4><table class="cs-comparison"><thead><tr><th scope="col">Attribute</th><th scope="col">A</th><th scope="col">B</th></tr></thead><tbody><tr><th scope="row">Supported</th><td>Yes</td><td>Unknown</td></tr><tr><th scope="row">Source</th><td>Sample</td><td>Sample</td></tr></tbody></table>';
 case 'dashboard':case 'chart':return '<h4>Every number needs a source.</h4><div class="cs-spark" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div><p>Demonstration values only, not real results.</p>'+rows;
 case 'trust':return '<h4>Trust should be inspectable.</h4><div class="cs-soft"><strong>ILLUSTRATIVE, NOT VERIFIED</strong><p>Publish genuine policies and traceable claims here.</p></div><button data-demo="consent" type="button">Review sample choices</button>';
 case 'article':return '<h4>A useful reading rhythm</h4><p>'+purpose+'</p><p>Use descriptive headings, cited sources, readable width and explicit caveats. Deep links should preserve context.</p>';
 case 'portfolio':return '<h4>Actual work carries the story</h4><div class="cs-rows"><div>Case / Problem</div><div>Decision / Tradeoff</div><div>Result / Source</div></div><p>Illustrative structure. Do not claim real clients.</p>';
 case 'spatial':return '<h4>Spatial context</h4><div class="cs-spatial" aria-label="Decorative CSS geometry, not a loaded 3D model"><span>CSS DEMO</span></div><p>Actual products need real licensed models, orbit controls and a static accessible fallback.</p>';
 case 'motion':return '<h4>A state should feel connected</h4><div class="cs-space">State A → State B</div><button data-demo="motion" type="button">Replay a sample change</button>';
 case 'system':return '<h4>Reusable tokens and states</h4><div class="cs-tokens" aria-label="Three sample palette surfaces"><span>Surface</span><span>Accent</span><span>Detail</span></div><p>Contrast and disabled/focus states require verification.</p>';
 case 'workflow':return '<h4>Finish a complete job</h4>'+rows+'<button data-demo="complete" type="button">Complete demo step</button>';
 default:return '<h4>'+title+'</h4><p>'+purpose+'</p>'+rows;
 }
}
function appContent(c){
 const purpose=escapeHTML(c.purpose),mode=c.preview;
 switch(mode){
 case 'onboarding':return '<div class="cs-app-screen"><small>STEP / FIRST VALUE</small><strong>One useful action</strong><p class="cs-app-blurb">No required account in this sample.</p></div>';
 case 'navigation':return '<div class="cs-rows"><div>Home <strong>Current</strong></div><div>Explore <span>Browse</span></div><div>Settings <span>Control</span></div></div>';
 case 'editor':return '<form class="cs-form" data-demo-form="editor"><label for="cs-draft">My draft (preview only)</label><input name="draft" id="cs-draft" placeholder="Write a short idea" required><button type="submit">Save locally in demo</button></form>';
 case 'form':return '<form class="cs-form" data-demo-form="app-form"><label for="cs-title">Entry label</label><input id="cs-title" name="entry" required placeholder="Required value"><button type="submit">Continue sample</button></form>';
 case 'dashboard':case 'chart':return '<div class="cs-app-screen"><small>ILLUSTRATIVE DATA</small><strong>Source, units, freshness</strong><div class="cs-spark" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div></div>';
 case 'search':return '<form class="cs-form" data-demo-form="search"><label for="cs-query">Find sample records</label><input id="cs-query" name="query" required placeholder="Enter query"><button type="submit">Search</button></form>';
 case 'social':return '<div class="cs-rows"><div>Member A <span>Demo</span></div><div>Reply <span>Not sent</span></div></div><p class="cs-app-blurb">Audience and moderation must be explicit.</p>';
 case 'trust':return '<div class="cs-app-screen"><small>PRIVACY / CHOICE</small><strong>Control your data</strong><p class="cs-app-blurb">No information is transferred by this preview.</p></div>';
 case 'ai':return '<div class="cs-ai"><strong>AI action proposal / sample</strong><textarea aria-label="Illustrative AI request">Summarize this sample note</textarea><small>No real model is connected; approval is required before changing data.</small></div><button type="button" class="cs-app-button" data-demo="ai">Preview suggestion</button>';
 case 'billing':return '<div class="cs-app-screen"><small>DEMO BILLING / NO REAL PRICE</small><strong>Plan terms first</strong><p class="cs-app-blurb">Currency, renewal, restore and cancellation must be visible.</p></div><button data-demo="billing" type="button" class="cs-app-button">Review demo terms</button>';
 case 'media':return '<div class="cs-visual">MEDIA STUDY</div><p class="cs-app-blurb">Captions, seek controls, pause and data rights belong in the real player.</p>';
 case 'spatial':return '<div class="cs-spatial"><span>CSS DEMO</span></div><p class="cs-app-blurb">A static illustration, not a production 3D/AR viewer.</p>';
 case 'learning':return '<div class="cs-app-screen"><small>LEARN → PRACTICE → FEEDBACK</small><strong>Try a safe example</strong></div><div class="cs-rows"><div>One question <span>Unanswered</span></div></div>';
 case 'status':return '<div class="cs-app-screen"><small>LOCAL STATE / MOCK</small><strong>Draft available</strong><p class="cs-app-blurb">Offline • Pending sync • Retry</p></div>';
 case 'motion':return '<div class="cs-app-screen"><strong>Motion shows orientation</strong></div><button class="cs-app-button" data-demo="motion" type="button">Replay demo feedback</button>';
 case 'system':return '<div class="cs-tokens"><span>Type</span><span>Space</span><span>Color</span></div><p class="cs-app-blurb">Platform behavior stays native.</p>';
 default:return '<div class="cs-app-screen"><small>ACTIVE STEP</small><strong>'+escapeHTML(c.title)+'</strong><p class="cs-app-blurb">'+purpose+'</p></div>';
 }
}
function specimen(){
 const c=current();if(!c)return '';
 const f=state.scenario==='error'?'Error: sample action failed; retry or return without losing input.':state.scenario==='success'?'Success: this locally simulated action completed.':statusText(c);
 if(c.track==='website')return '<div class="cs-web"><div class="cs-nav"><strong>FIELDNOTES / DEMO</strong><button type="button" data-demo="menu" aria-expanded="false">MENU</button></div><div class="cs-menu" hidden><a href="#make-prompt">Prompt</a><a href="#research">Sources</a></div>'+
 '<div class="cs-hero"><small>WEBSITE PATTERN / SAMPLE</small><h3>'+escapeHTML(c.title)+'</h3><p>'+escapeHTML(c.purpose)+'</p><button data-demo="primary" type="button">Try a sample action</button></div>'+
 '<div class="cs-body">'+webContent(c)+'</div><p class="cs-state" id="specimen-status" role="status">'+escapeHTML(f)+'</p><div class="cs-stamp">ORIGINAL SPECIMEN · NO REAL TRANSACTIONS</div></div>';
 return '<div class="cs-app"><div class="cs-app-top"><span>9:41 / NATIVE UI STUDY</span><span>DEMO</span></div><h3>'+escapeHTML(c.title)+'</h3><p class="cs-app-blurb">'+escapeHTML(c.purpose)+'</p>'+appContent(c)+
 '<button type="button" class="cs-app-button" data-demo="primary">Try sample action</button><div class="cs-app-foot"><button type="button" data-demo="tab-home" aria-current="true">HOME</button><button type="button" data-demo="tab-explore">EXPLORE</button><button type="button" data-demo="tab-settings">SETTINGS</button></div><p id="specimen-status" class="cs-state" role="status">'+escapeHTML(f)+'</p></div>';
}
function renderSpecimen(){
 const c=current();if(!c)return;
 $('specimen').innerHTML=specimen();
 $('specimen-stage').dataset.device=state.device;
 $('specimen-stage').dataset.direction=state.direction;
 document.querySelectorAll('[data-device]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.device===state.device)));
 document.querySelectorAll('[data-direction]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.direction===state.direction)));
 document.querySelectorAll('[data-scenario]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.scenario===state.scenario)));
 $('specimen').querySelectorAll('form[data-demo-form]').forEach(form=>form.addEventListener('submit',event=>{
  event.preventDefault();if(!form.reportValidity())return;state.scenario='success';
  $('specimen-status').textContent='Sample '+form.dataset.demoForm+' completed locally. No data was sent or saved.';
  document.querySelectorAll('[data-scenario]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.scenario==='success')));
 }));
 $('specimen').querySelectorAll('[data-demo]').forEach(b=>b.addEventListener('click',()=>{
  const kind=b.dataset.demo;
  if(kind==='menu'){const menu=$('specimen').querySelector('.cs-menu');menu.hidden=!menu.hidden;b.setAttribute('aria-expanded',String(!menu.hidden));return;}
  if(kind.startsWith('tab-')){$('specimen').querySelectorAll('[data-demo^="tab-"]').forEach(z=>z.setAttribute('aria-current',String(z===b)));$('specimen-status').textContent='Prototype destination: '+kind.slice(4)+'. This is illustrative navigation only.';return;}
  if(state.scenario==='error'){$('specimen-status').textContent='Retry attempted locally. No network request was made.';return;}
  state.scenario='success';$('specimen-status').textContent='Demo '+kind+' action completed locally. No production integration.';
  document.querySelectorAll('[data-scenario]').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.scenario==='success')));
 }));
}
function researchFiltered(){
 const q=state.researchQuery.toLowerCase();
 return state.data.sources.filter(s=>(state.researchType==='all'||s.type===state.researchType)&&(!q||[s.title,s.type,s.insight,s.limitation,...(s.tags||[])].join(' ').toLowerCase().includes(q)));
}
function renderResearch(){
 const all=researchFiltered(),arr=all.slice(0,state.researchLimit);
 $('research-count').textContent=all.length+' matching records';
 $('research-list').innerHTML=arr.map(s=>'<article class="cf-evidence-entry"><div><small>'+escapeHTML(s.type)+' · '+escapeHTML(s.year)+'</small><h3>'+escapeHTML(s.title)+'</h3>'+createLink(s)+'</div><div><p><strong>What it informs:</strong> '+escapeHTML(s.insight)+'</p><p class="cf-evidence-limit"><strong>What it does not prove:</strong> '+escapeHTML(s.limitation)+'</p></div></article>').join('')||'<p>No matching research source.</p>';
 $('research-more').hidden=arr.length===all.length;
}
function resourceFiltered(){
 const q=state.resourceQuery.toLowerCase();
 return state.data.resources.filter(r=>(state.resourceKind==='all'||r.kind===state.resourceKind)&&(!q||[r.name,r.kind,r.purpose,r.licenseNotes].join(' ').toLowerCase().includes(q)));
}
function renderResources(){
 const all=resourceFiltered(),arr=all.slice(0,state.resourceLimit);
 $('resource-count').textContent=all.length+' matching references';
 $('resource-list').innerHTML=arr.map(r=>{
 const restriction=r.licenseStatus==='restricted',stateName=restriction?'RESTRICTED / SOURCE-VISIBLE':r.licenseStatus==='verified-permissive'?'PERMISSIVE CODE CLAIM / CHECK PACKAGE':r.licenseStatus==='reference'?'REFERENCE / VERIFY RIGHTS':'LICENSE NOT VERIFIED';
 return '<article class="cf-resource-entry"><div><h3>'+escapeHTML(r.name)+'</h3><span>'+escapeHTML(r.kind)+'</span></div><div><a href="'+escapeHTML(r.url)+'" rel="noopener noreferrer" target="_blank">Upstream code ↗</a></div><p>'+escapeHTML(r.purpose)+'</p><div><small class="cf-license-state'+(restriction?' cf-restricted':'')+'">'+stateName+'</small><p>'+escapeHTML(r.licenseNotes)+'</p>'+(safeUrl(r.licenseSource)?'<a href="'+escapeHTML(r.licenseSource)+'" target="_blank" rel="noopener noreferrer">License evidence ↗</a>':'')+'</div></article>';
 }).join('')||'<p>No matching library.</p>';
 $('resource-more').hidden=arr.length===all.length;
}
function toastCopy(value){
 if(navigator.clipboard?.writeText){navigator.clipboard.writeText(value).then(()=>showToast('Copied to clipboard.')).catch(()=>fallbackCopy(value));}
 else fallbackCopy(value);
}
function fallbackCopy(value){
 try{const t=document.createElement('textarea');t.value=value;t.style.cssText='position:fixed;left:-9999px;';document.body.append(t);t.select();if(!document.execCommand('copy'))throw Error('copy');t.remove();showToast('Copied to clipboard.');}
 catch{showToast('Copy unavailable. Select the prompt and copy manually.');}
}
function bind(){
 const menuButton=document.querySelector('.mobile-menu'),mobileMenu=$('mobile-navigation');
 if(menuButton&&mobileMenu){menuButton.addEventListener('click',()=>{mobileMenu.hidden=!mobileMenu.hidden;menuButton.setAttribute('aria-expanded',String(!mobileMenu.hidden));});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!mobileMenu.hidden){mobileMenu.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.focus();}});}
 document.querySelectorAll('[data-track]').forEach(b=>b.addEventListener('click',()=>chooseTrack(b.dataset.track)));
 $('concept-search').addEventListener('input',e=>{state.query=e.target.value;renderConceptList();});
 $('concept-family').addEventListener('change',e=>{state.family=e.target.value;renderConceptList();});
 $('concept-saved-only').addEventListener('change',e=>{state.savedOnly=e.target.checked;renderConceptList();});
 $('reset-concept-filters').addEventListener('click',()=>{state.query='';state.family='all';state.savedOnly=false;$('concept-search').value='';$('concept-family').value='all';$('concept-saved-only').checked=false;renderConceptList();});
 $('save-concept').addEventListener('click',()=>{const id=current()?.id;if(!id)return;if(state.saved.has(id))state.saved.delete(id);else state.saved.add(id);try{localStorage.setItem('pv-concept-saves',JSON.stringify([...state.saved]));}catch{}renderDetail();renderConceptList();});
 $('copy-link').addEventListener('click',()=>toastCopy(location.origin+location.pathname+'#'+encodeURIComponent(current()?.id||'')));
 document.querySelectorAll('[data-prompt]').forEach(b=>b.addEventListener('click',()=>{state.prompt=b.dataset.prompt;document.querySelectorAll('[data-prompt]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));renderPrompt();}));
 $('project-brief').addEventListener('input',renderPrompt);
 $('copy-concept-prompt').addEventListener('click',()=>toastCopy($('concept-prompt').textContent));
 document.querySelectorAll('[data-device]').forEach(b=>b.addEventListener('click',()=>{state.device=b.dataset.device;renderSpecimen();}));
 document.querySelectorAll('[data-direction]').forEach(b=>b.addEventListener('click',()=>{state.direction=b.dataset.direction;renderSpecimen();}));
 document.querySelectorAll('[data-scenario]').forEach(b=>b.addEventListener('click',()=>{state.scenario=b.dataset.scenario;renderSpecimen();}));
 $('research-search').addEventListener('input',e=>{state.researchQuery=e.target.value;state.researchLimit=10;renderResearch();});
 $('research-type').addEventListener('change',e=>{state.researchType=e.target.value;state.researchLimit=10;renderResearch();});
 $('research-more').addEventListener('click',()=>{state.researchLimit+=10;renderResearch();});
 $('resource-search').addEventListener('input',e=>{state.resourceQuery=e.target.value;state.resourceLimit=12;renderResources();});
 $('resource-kind').addEventListener('change',e=>{state.resourceKind=e.target.value;state.resourceLimit=12;renderResources();});
 $('resource-more').addEventListener('click',()=>{state.resourceLimit+=12;renderResources();});
 window.addEventListener('hashchange',()=>{const id=decodeURIComponent(location.hash.replace(/^#/,''));if(conceptById(id))chooseConcept(id,false);});
}
async function loadJSON(url){
 const res=await fetch(url,{cache:'no-cache'});if(!res.ok)throw Error(url+': HTTP '+res.status);return res.json();
}
async function init(){
 bind();
 try{
  const [website,app,research,newResources,academy]=await Promise.all([
   loadJSON('./data/concepts-web.json'),
   loadJSON('./data/concepts-app.json'),
   loadJSON('./data/deep-research.json'),
   loadJSON('./data/deep-resources.json'),
   loadJSON('./data/academy.json')
  ]);
  state.data.website=website.concepts;state.data.app=app.concepts;state.data.sources=research.sources;
  const base=(academy.openSource||[]).filter(x=>safeUrl(x.url)).map(x=>({name:x.name,url:x.url,kind:x.track,purpose:x.value,licenseStatus:'unverified',licenseNotes:x.license||'Review upstream license and media rights',licenseSource:null}));
  const known=new Map(base.map(x=>[x.url.toLowerCase(),x]));
  for(const x of newResources.resources){known.set(x.url.toLowerCase(),x);}
  state.data.resources=[...known.values()].sort((a,b)=>a.name.localeCompare(b.name));
  const sourceIds=new Set(state.data.sources.map(x=>x.id)),all=allConcepts();
  if(all.length!==200||all.some(x=>!x.sources.every(id=>sourceIds.has(id))))throw Error('Concept data incomplete or source links invalid.');
  $('concept-total').textContent=all.length;
  $('research-total').textContent=state.data.sources.length;
  $('paper-count').textContent=state.data.sources.filter(s=>s.type==='peer-reviewed').length+' journal papers / '+state.data.sources.length+' source records';
  $('library-count').textContent=state.data.resources.length+' source links';
  const researchTypes=[...new Set(state.data.sources.map(s=>s.type))].sort();
  $('research-type').innerHTML+=[...researchTypes].map(s=>'<option value="'+escapeHTML(s)+'">'+escapeHTML(s)+'</option>').join('');
  const categories=[...new Set(state.data.resources.map(r=>r.kind))].sort();
  $('resource-kind').innerHTML+=[...categories].map(x=>'<option value="'+escapeHTML(x)+'">'+escapeHTML(x)+'</option>').join('');
  collectionFilters();renderResearch();renderResources();
  let requested='';try{requested=decodeURIComponent(location.hash.slice(1));}catch{}
  const initial=conceptById(requested)||state.data.website[0];chooseConcept(initial.id,false);
 }catch(error){
  $('concept-list').textContent='Unable to load concept files. Serve the repository with a local HTTP server.';
  $('current-title').textContent='Catalog unavailable';
  $('current-purpose').textContent='Check that docs/data/*.json exists, then run python3 -m http.server 8000 from the repo root.';
  $('specimen').textContent='Previews unavailable until the catalogs load.';
  $('concept-prompt').textContent='Original blueprint prompts remain in docs/academy.html.';
  $('research-list').textContent='Research data could not load.';
  $('resource-list').textContent='Resource data could not load.';
  console.error('Concept atlas failed to load',error);
 }
}
init();
