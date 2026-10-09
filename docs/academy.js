/* Prompt-Vault Academy: original dependency-free two-track curriculum and HTML/CSS previews. */
const byId = id => document.getElementById(id);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const goodUrl = value => /^https:\/\//.test(String(value));
const state = {data:null,track:'website',id:'saas-product',platform:'ios',device:'desktop',prompt:'design',step:0,moduleFilter:'all'};
const sourceFor = id => state.data?.sources.find(s=>s.id===id);
let messageTimeout;
function notify(message){
 const el=byId('academy-toast');if(!el)return;
 el.textContent=message;el.hidden=false;
 clearTimeout(messageTimeout);messageTimeout=setTimeout(()=>{el.hidden=true;},2800);
}
function entries(){return state.data?.[state.track]||[];}
function selected(){return entries().find(item=>item.id===state.id)||entries()[0];}
function textFor(x){return String(x??'').replace(/\s+/g,' ').trim();}
function activate(track,id) {
 state.track=track==='app'?'app':'website';
 const next=state.data?.[state.track]||[];
 state.id=next.some(item=>item.id===id)?id:(next[0]?.id||'');
 state.step=0;state.prompt='design';
 document.querySelectorAll('[data-track]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.track===state.track)));
 document.querySelectorAll('[data-prompt]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.prompt===state.prompt)));
 byId('platform-notes').hidden=state.track!=='app';
 renderBlueprintList();
 renderDetails();
 renderPreview();
 renderPrompt();
}
function renderBlueprintList(){
 const list=byId('academy-catalog'), q=textFor(byId('academy-search').value).toLowerCase();
 const arr=entries().filter(item=>[item.title,item.kind,item.job,item.lens,...item.steps.map(s=>s.name)].join(' ').toLowerCase().includes(q));
 byId('academy-count').textContent=arr.length+' / '+entries().length+' results';
 list.innerHTML=arr.length?arr.map(item=>
  '<button type="button" data-blueprint="'+esc(item.id)+'" aria-current="'+(item.id===state.id)+'"><span><small>'+esc(item.kind)+'</small>'+esc(item.title)+'</span></button>'
 ).join(''):'<p role="status">No matching guides. Try another task or clear the search.</p>';
 list.querySelectorAll('[data-blueprint]').forEach(button=>button.addEventListener('click',()=>{
  state.id=button.dataset.blueprint;state.step=0;renderBlueprintList();renderDetails();renderPreview();renderPrompt();
 }));
}
function renderDetails(){
 const x=selected();if(!x)return;
 byId('detail-kicker').textContent=state.track==='app'?'APPLICATION FLOW / '+x.kind.toUpperCase():'WEBSITE ARCHITECTURE / '+x.kind.toUpperCase();
 byId('detail-title').textContent=x.title;
 byId('detail-job').textContent=x.job;
 byId('detail-lens').textContent=x.lens;
 byId('detail-steps').innerHTML=x.steps.map(s=>
  '<li><h5>'+esc(s.name)+'</h5><p>'+esc(s.why)+'</p><span class="ac-skill">SKILL: '+esc(s.skill)+'</span><span class="ac-when">'+esc(s.decision)+'</span>'+
  '<details><summary>Copyable section prompt</summary><p>'+esc(s.microPrompt)+'</p><button class="ac-inline-copy" data-micro="'+(s.order-1)+'" type="button">Copy this step ↗</button></details></li>'
 ).join('');
 byId('detail-steps').querySelectorAll('[data-micro]').forEach(b=>b.addEventListener('click',()=>{
  copyText(x.steps[Number(b.dataset.micro)].microPrompt);
 }));
 const sl=byId('detail-source-links');
 sl.innerHTML='<strong class="ac-small">SELECTED RESEARCH</strong>'+x.sources.map(id=>{
  const s=sourceFor(id);return s?'<a rel="noopener noreferrer" target="_blank" href="'+esc(s.url)+'">'+esc(s.org)+' · '+esc(s.title)+' ↗</a>':'';
 }).join('');
 renderPlatformGuidance();
}
function renderPlatformGuidance(){
 document.querySelectorAll('[data-platform]').forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.platform===state.platform)));
 const ios='Use Apple Human Interface Guidelines: safe areas, accessible tab navigation for destinations, system text scaling, VoiceOver and contextual permissions. Review current App Store rules, relevant StoreKit purchase policy, subscription restore, data privacy, account deletion, review login and TestFlight testing. Source: https://developer.apple.com/app-store/review/guidelines/';
 const android='Use Android design and adaptive quality guidance: system back semantics, Material 3 where appropriate, resizable windows and foldables, TalkBack, runtime permission recovery, Google Play Billing and current Play payment/account/data policies. Test on real phones and representative larger displays. Source: https://developer.android.com/docs/quality-guidelines/core-app-quality';
 byId('platform-guidance').textContent=state.platform==='ios'?ios:android;
}
function currentContext(x){
 return [
  'Project archetype: '+x.title,
  'Track: '+(state.track==='app'?'iOS + Android application':'responsive website'),
  'User job: '+x.job,
  'Design lens: '+x.lens,
  'Do not invent employer/client names, research findings, revenue, testimonials, users, integrations or real store approval.'
 ].join('\n');
}
function sourceLines(x){
 return x.sources.map(id=>sourceFor(id)).filter(Boolean).map(s=>'- '+s.org+', '+s.title+': '+s.url+'\n  Applicable insight: '+s.finding+'\n  Caution: '+s.limit).join('\n');
}
function stepLines(x){
 return x.steps.map((s,i)=>String(i+1)+'. '+s.name+'\n   Why: '+s.why+'\n   Skill: '+s.skill+'\n   Decision: '+s.decision+'\n   Focused design prompt: '+s.microPrompt).join('\n');
}
function composePrompt(x,kind){
 const common=currentContext(x);
 const sequence=stepLines(x);
 const sources=sourceLines(x);
 const platform=state.track==='app'?'For iOS and Android, use platform-specific navigation, permissions, text scaling and back behavior; do not simply skin one screenshot. Check Apple App Review and current Google Play rules for any purchases or subscriptions.':'For mobile web, tablet and desktop, use semantic HTML, fluid type, keyboard navigation, reduced motion, correct metadata and realistic Core Web Vitals measurement.';
 if(kind==='design')return [
  'ROLE: Senior product designer, UX researcher and art director.',
  common,'','TASK: Plan this product with deliberate, evidence-aware composition. Do not use every possible section. Start with target audience, primary action, copy/content needs and 3 meaningfully different art directions. Name the core task and justify ordering.',
  'ORDERED EXPERIENCE BLUEPRINT:\n'+sequence,
  '','RESEARCH AND LIMITS:\n'+sources,
  '','DELIVERABLE: (1) goal-to-screen/page map, (2) inclusion/exclusion decisions, (3) 3 distinct layouts with typographic and color reasoning, (4) realistic copy and reusable tokens, (5) interaction and empty/error/loading states, (6) explicit optional motion/3D/AI decisions, (7) desktop/tablet/phone or iOS/Android variations, (8) source notes, (9) testable acceptance criteria.',
  platform,'Never assume an animation, AI assistant or 3D object is automatically needed.'
 ].join('\n\n');
 if(kind==='build')return [
  'ROLE: Senior frontend/mobile engineer implementing a research-guided design.',
  common,'','TASK: Build a functional, accessible experience that respects the existing stack. Do not replace working data/auth/purchase infrastructure without a migration plan. Preserve real product content and user paths.',
  'BUILD ORDER:\n'+sequence,'','TECHNICAL CONTRACT:',
  '- Render responsive/native layout and real user interactions, not screenshot-only markup.',
  '- Create semantic controls, keyboard focus, larger-text behavior, VoiceOver/TalkBack where applicable, reduced motion and right-to-left expansion tests.',
  '- Model loading, empty, success, error, denied permission, slow, offline, interrupted and undo/retry states where relevant.',
  '- Use semantic animations only when helpful. For spatial products, offer optional 3D with 2D/static fallback and measured device impact.',
  '- Only add AI to a bounded job. Choose explicitly: local WebLLM/Transformers.js, user-paid hosted Puter.js, or secure server API. Disclose model execution, privacy and costs; obtain consent.',
  '- Keep external dependencies optional where standard HTML/CSS/JS works. Do not silently introduce paid services.',
  '- Document upstream licenses before copying code, models or media, and keep placeholders labeled.',
  '- Produce a clear QA handoff with files changed and actual observed test outcomes.',
  platform,
  'SOURCE MATERIAL (inform the design, do not paste third-party copyrighted content):\n'+sources
 ].join('\n\n');
 return [
  'ROLE: Independent product design critic and accessibility/performance reviewer.',
  common,'','TASK: Evaluate the real rendered site/app, not its source alone. Score and report evidence by severity. Stop after four bounded review/fix rounds. Never certify tests not run.',
  'AUDIT EACH EXPERIENCE STAGE:\n'+sequence,'','REQUIRED CHECKS:',
  '- First five seconds: understandable audience, product value and next action.',
  '- Real critical task: start to completion including validation and recovery.',
  '- Correct platform conventions, navigation semantics, safe area, accessibility and all interactive controls.',
  '- Desktop/tablet/mobile web or actual iOS/Android devices, plus translated/RTL layouts where applicable.',
  '- Keyboard, assistive technology, focus order, text zoom, contrast, touch target and reduced-motion behavior.',
  '- Network loss, permission denial, empty state, slow state, failed purchase and account deletion where relevant.',
  '- Verify every factual marketing, store, billing and privacy claim. No placeholder logos, reviews, fake AI or stale compliance assumptions.',
  '- For web, measure LCP/INP/CLS from actual tools where feasible; for apps, profile performance on target devices.',
  'Return a prioritized P0/P1/P2 issue table, observed evidence, reproduction steps, smallest safe fixes and final unsolved issues.',
  'RESEARCH LIMITS:\n'+sources
 ].join('\n\n');
}
function renderPrompt(){
 const x=selected();if(!x)return;
 byId('academy-prompt').textContent=composePrompt(x,state.prompt);
}

function specialWebVisual(x){
 const title=esc(x.title);
 switch(x.kind){
 case 'Personal':case 'Portfolio':
  return '<div class="pv-special pv-work"><small>SELECTED WORK / DEMO</small><div class="pv-works"><span>01<br>INTERFACE</span><span>02<br>SYSTEMS</span><span>03<br>RESEARCH</span></div><b>Work first. Context follows.</b></div>';
 case 'Commerce':
  return '<div class="pv-special pv-commerce"><small>PRODUCT / MOCK CATALOG</small><div class="pv-product-grid"><span>OBJECT<br>01</span><span>OBJECT<br>02</span><span>OBJECT<br>03</span></div><button type="button" data-demo="secondary">Review choices ↗</button></div>';
 case 'Documentation':
  return '<div class="pv-special pv-doc"><small>QUICK START / SAMPLE</small><code>npm install your-library<br>&gt; createProject()<br>✓ read the guide first</code><button data-demo="secondary" type="button">View documentation ↗</button></div>';
 case 'Editorial':
  return '<div class="pv-special pv-edit"><small>THE READING ROOM</small><b>A thoughtful idea<br>deserves good space.</b><p>Column width, meaningful headings, readable line spacing and clear authorship.</p></div>';
 case 'Company':
  return '<div class="pv-special pv-company"><small>WHO WE HELP</small><div class="pv-works"><span>TEAMS</span><span>PARTNERS</span><span>PEOPLE</span></div><b>Route each visitor to a real next step.</b></div>';
 case 'Service':
  return '<div class="pv-special pv-services"><small>SERVICES / ILLUSTRATIVE</small><b>Explore a service, check fit, reach out.</b><button data-demo="secondary" type="button">Ask about availability ↗</button></div>';
 case 'Organization':
  return '<div class="pv-special pv-company"><small>MISSION / ACCOUNTABILITY</small><b>People first.</b><p>Show programs, eligibility and sourced impact, never invented numbers.</p></div>';
 case 'Event':
  return '<div class="pv-special pv-event"><small>SCHEDULE SAMPLE</small><b>DAY 01 → DAY 02</b><p>Real schedules must include timezone and update status.</p></div>';
 case 'Marketplace':
  return '<div class="pv-special pv-market"><small>FIND / FILTER / COMPARE</small><div class="pv-search-stub">Search a category… ⌕</div><div class="pv-works"><span>FILTER</span><span>COMPARE</span><span>CONTACT</span></div></div>';
 default:
  return '<div class="pv-special pv-product"><small>'+title.toUpperCase()+' / MOCKUP</small><div class="pv-product-shape"><span>PROTOTYPE<br>01</span></div><b>Demonstrate the actual user outcome.</b></div>';
 }
}
function specialAppVisual(x){
 switch(x.kind){
 case 'Productivity':
  return '<div class="pv-app-special pv-checks"><label><input type="checkbox" data-checked-demo> Plan a meaningful task</label><label><input type="checkbox" data-checked-demo> Make it easy to find</label><label><input type="checkbox" data-checked-demo> Recover an action</label></div>';
 case 'Education':
  return '<div class="pv-app-special pv-quiz"><small>LEARNING / SAMPLE</small><strong>One idea, one exercise</strong><button type="button" data-demo="secondary">Check understanding ✓</button></div>';
 case 'Lifestyle':
  return '<div class="pv-app-special pv-wellness"><small>GENTLE CHECK-IN</small><strong>What matters today?</strong><div><span>Rest</span><span>Focus</span><span>Reflect</span></div></div>';
 case 'Commerce':
  return '<div class="pv-app-special pv-shop"><small>MOCK PRODUCT</small><strong>Illustrative object</strong><span>IMAGE / DETAILS</span><button type="button" data-demo="secondary">Review cart ↗</button></div>';
 case 'Finance':
  return '<div class="pv-app-special pv-finance"><small>DEMO DATA / NOT ACTUAL BALANCES</small><div class="pv-spark"><span></span><span></span><span></span><span></span><span></span></div><strong>Understand every number.</strong></div>';
 case 'Social':
  return '<div class="pv-app-special pv-chat"><small>DEMO CONVERSATION</small><p>Make consent and control visible.</p><p>Reply with context, not pressure.</p></div>';
 case 'AI':
  return '<div class="pv-app-special pv-ai"><small>NOT A LIVE AI MODEL</small><strong>What could help right now?</strong><button type="button" data-demo="secondary">Inspect sources and privacy</button></div>';
 case 'Creator':
  return '<div class="pv-app-special pv-edit"><small>MOCK CREATOR TIMELINE</small><div class="pv-timeline"><span>CLIP 1</span><span>CLIP 2</span><span>AUDIO</span></div><strong>Preview before export.</strong></div>';
 case 'Travel':
  return '<div class="pv-app-special pv-journey"><small>DEMO ITINERARY</small><strong>START → ARRIVE</strong><p>Date, time zone, fees, cancellation and confirmation all matter.</p></div>';
 case 'Content':
  return '<div class="pv-app-special pv-reading"><small>YOUR LIBRARY / DEMO</small><strong>A chapter with breathing room.</strong><p>Type size, theme, progress, offline state.</p></div>';
 case 'B2B':
  return '<div class="pv-app-special pv-ops"><small>INTERNAL RECORD / EXAMPLE</small><div class="pv-works"><span>OPEN</span><span>REVIEW</span><span>DONE</span></div><strong>Every edit needs a status.</strong></div>';
 case 'Entertainment':
  return '<div class="pv-app-special pv-media"><small>DEMO PLAYBACK</small><div>▶</div><strong>Captions · Seek · Audio tracks</strong></div>';
 default:return '<div class="pv-app-special"><small>WORKING SCREEN STUDY</small><strong>Clear task, visible feedback.</strong></div>';
 }
}

function previewWebsite(x,s){
 const primary=s||x.steps[0];
 const safeTitle=esc(x.title), title=esc(primary.name);
 const why=esc(primary.why),i=state.step+1,total=x.steps.length;
 return '<div class="pv-web-demo"><div class="pv-web-header"><span>ATLAS / '+safeTitle+'</span><button type="button" data-demo="menu">MENU ↗</button></div>'+
  '<div class="pv-web-hero"><small>'+String(i).padStart(2,'0')+' / '+String(total).padStart(2,'0')+' · INTERACTIVE DESIGN STUDY</small><h3>'+title+'<br><em>with intention.</em></h3><p>'+why+'</p><button type="button" class="pv-action" data-demo="primary">See how it works ↗</button></div>'+
  '<div class="pv-web-section"><small>THE USER JOB</small><strong>'+esc(x.job.length>50?x.job.slice(0,47)+'…':x.job)+'</strong><p>'+esc(x.lens)+'</p>'+specialWebVisual(x)+'</div>'+
  '<div class="pv-web-section"><small>SKILL IN FOCUS</small><strong>'+esc(primary.skill)+'</strong><p>Example layout only. Real content and evidence must come from your project.</p></div>'+
  '<div class="pv-web-feedback" id="demo-feedback" role="status">Try MENU or See how it works.</div>'+
  '<div class="pv-web-foot"><span>ORIGINAL HTML/CSS STUDY</span><span>NO REAL PURCHASES ↗</span></div></div>';
}
function previewApp(x,s){
 const primary=s||x.steps[0], i=state.step+1, num=String(i).padStart(2,'0');
 return '<div class="pv-app-demo"><div class="pv-app-top"><span>'+esc(state.platform==='ios'?'9:41 · iOS DEMO':'9:41 · ANDROID DEMO')+'</span><span>●●● ▮</span></div>'+
  '<h3>'+esc(primary.name)+'</h3><p class="pv-step-intro">'+esc(primary.why)+'</p>'+
  '<div class="pv-app-card"><small>SCREEN '+num+' / '+String(x.steps.length).padStart(2,'0')+'</small><strong>'+esc(x.title)+'</strong><small>INTERACTIVE STUDY · MOCK DATA</small></div>'+
  ''+specialAppVisual(x)+''+
  '<button class="pv-app-next" type="button" data-demo="primary">'+(state.step===x.steps.length-1?'Try final state ✓':'Try this action ↗')+'</button>'+
  '<div class="pv-app-feedback" id="demo-feedback" role="status">Try the main action to preview feedback.</div>'+
  '<div class="pv-app-nav"><span>HOME</span><span>EXPLORE</span><span>SETTINGS</span></div></div>';
}
function renderPreview(){
 const x=selected();if(!x)return;
 state.step=Math.min(Math.max(0,state.step),x.steps.length-1);
 byId('academy-viewport').dataset.device=state.device;
 document.querySelectorAll('[data-device]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.device===state.device)));
 byId('academy-preview').innerHTML=state.track==='website'?previewWebsite(x,x.steps[state.step]):previewApp(x,x.steps[state.step]);
 byId('preview-page').textContent=String(state.step+1).padStart(2,'0')+' / '+String(x.steps.length).padStart(2,'0');
 byId('preview-back').disabled=state.step===0;
 byId('preview-next').disabled=state.step>=x.steps.length-1;
 const fb=byId('demo-feedback');
 byId('academy-preview').querySelectorAll('[data-demo]').forEach(b=>b.addEventListener('click',()=>{
  fb.textContent=b.dataset.demo==='menu'?'Menu concept: clear access to the primary sections.':'Prototype action complete. In production, verify the real result and failure state.';
 }));
}
function displayModules(){
 const arr=state.data?.craft||[];
 const filtered=arr.filter(m=>state.moduleFilter==='all'||(state.moduleFilter==='ai'?m.id.startsWith('ai-'):m.track.includes(state.moduleFilter)));
 byId('academy-modules').innerHTML=filtered.map(m=>{
  const s=sourceFor(m.source);
  return '<article class="ac-module-card"><span class="ac-card-tag">'+esc(m.track)+' / '+esc(m.id)+'</span><h3>'+esc(m.title)+'</h3><p>'+esc(m.when)+'</p><strong>TOOLS · '+esc(m.skills)+'</strong><p>'+esc(m.how)+'</p>'+
  (s?'<a target="_blank" rel="noopener noreferrer" href="'+esc(s.url)+'">Docs / research ↗</a>':'')+'</article>';
 }).join('');
}
function displayResearch(){
 const arr=state.data?.sources||[];
 byId('research-count').textContent=arr.length+' carefully scoped sources';
 byId('academy-research').innerHTML=arr.map((s,i)=>
  '<article class="ac-research-card"><small>'+String(i+1).padStart(2,'0')+' / '+esc(s.kind)+'</small><h3>'+esc(s.title)+'</h3><small>'+esc(s.org)+'</small><p>'+esc(s.finding)+'</p><p class="ac-limit">LIMIT: '+esc(s.limit)+'</p>'+
  (goodUrl(s.url)?'<a rel="noopener noreferrer" target="_blank" href="'+esc(s.url)+'">Read original source ↗</a>':'')+'</article>'
 ).join('');
}
function displayResources(){
 byId('academy-resources').innerHTML=(state.data?.openSource||[]).map(x=>
  '<article class="ac-resource"><strong>'+esc(x.name)+'</strong><span>'+esc(x.track)+' / '+esc(x.value)+'</span><small>'+esc(x.license)+'</small>'+
  (goodUrl(x.url)?'<a target="_blank" rel="noopener noreferrer" href="'+esc(x.url)+'">Upstream source ↗</a>':'')+'</article>'
 ).join('');
}
function displaySignals(){
 byId('academy-signals').innerHTML=(state.data?.marketSignals||[]).map(x=>
 '<article class="ac-signal"><span class="ac-signal-figure">'+esc(x.figure)+'</span><h4>'+esc(x.label)+'</h4><p>'+esc(x.implication)+'</p><small>LIMIT: '+esc(x.caution)+'</small></article>'
 ).join('');
}
function displayEarners(){
 byId('academy-earners').innerHTML=(state.data?.topEarners||[]).map(x=>
  '<article class="ac-earner-card"><span class="ac-rank">'+esc(x.rank).padStart(2,'0')+'</span><small>'+esc(x.year)+' / GLOBAL NON-GAME IAP</small><h3>'+esc(x.name)+'</h3><p>'+esc(x.pattern)+'</p><small>ANALYSIS, NOT EVIDENCE OF DESIGN CAUSALITY</small></article>'
 ).join('');
}
async function copyText(text){
 try{
  if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(text);}
  else{
   const t=document.createElement('textarea');t.value=text;t.style.position='fixed';t.style.left='-9999px';document.body.append(t);t.select();
   if(!document.execCommand('copy'))throw new Error('Copy is not supported here');t.remove();
  }
  notify('Prompt copied. Edit it for your own product.');
 }catch{notify('Copy unavailable here. Select the prompt text and copy manually.');}
}
function bindControls(){
 const mobileButton=document.querySelector(".mobile-menu"), mobileNav=byId("mobile-navigation");
 if(mobileButton&&mobileNav){mobileButton.addEventListener("click",()=>{const opening=mobileNav.hidden;mobileNav.hidden=!opening;mobileButton.setAttribute("aria-expanded",String(opening));});document.addEventListener("keydown",event=>{if(event.key==="Escape"&&!mobileNav.hidden){mobileNav.hidden=true;mobileButton.setAttribute("aria-expanded","false");mobileButton.focus();}});}
 document.querySelectorAll('[data-track]').forEach(button=>button.addEventListener('click',()=>activate(button.dataset.track,null)));
 document.querySelectorAll('[data-platform]').forEach(button=>button.addEventListener('click',()=>{state.platform=button.dataset.platform;renderPlatformGuidance();renderPreview();renderPrompt();}));
 document.querySelectorAll('[data-device]').forEach(button=>button.addEventListener('click',()=>{state.device=button.dataset.device;renderPreview();}));
 document.querySelectorAll('[data-prompt]').forEach(button=>button.addEventListener('click',()=>{
  state.prompt=button.dataset.prompt;
  document.querySelectorAll('[data-prompt]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.prompt===state.prompt)));
  renderPrompt();
 }));
 document.querySelectorAll('[data-module-filter]').forEach(button=>button.addEventListener('click',()=>{
  state.moduleFilter=button.dataset.moduleFilter;
  document.querySelectorAll('[data-module-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.moduleFilter===state.moduleFilter)));
  displayModules();
 }));
 byId('academy-search').addEventListener('input',renderBlueprintList);
 byId('copy-prompt').addEventListener('click',()=>copyText(byId('academy-prompt').textContent));
 byId('preview-next').addEventListener('click',()=>{state.step=Math.min(state.step+1,selected().steps.length-1);renderPreview();});
 byId('preview-back').addEventListener('click',()=>{state.step=Math.max(0,state.step-1);renderPreview();});
}
async function init(){
 bindControls();
 try {
  const response=await fetch('./data/academy.json',{cache:'no-store'});
  if(!response.ok)throw Error('HTTP '+response.status);
  const data=await response.json();
  if(!data.website?.length||!data.app?.length||!data.sources?.length)throw Error('Invalid academy catalog');
  state.data=data;
  byId('academy-figures').textContent=data.website.length+' website blueprints · '+data.app.length+' app journeys · '+data.sources.length+' sources';
  displayResearch();displayResources();displayEarners();displaySignals();displayModules();
  activate('website','saas-product');
 }catch(e){
  byId('academy-catalog').textContent='Unable to load the academy dataset.';
  byId('detail-title').textContent='Could not load the guided catalog';
  byId('detail-job').textContent='Serve this repository with a local HTTP server: python3 -m http.server 8000, then open /docs/academy.html. Check data/academy.json is reachable.';
  byId('academy-preview').textContent='Preview unavailable because catalog data could not be loaded.';
  byId('academy-prompt').textContent='The earlier static examples remain available in /docs/websites.html and /docs/apps.html.';
  byId('academy-modules').textContent='Unable to load modules.';
  byId('academy-research').textContent='Unable to load research.';
  console.error('Prompt-Vault Academy data load failed:',e);
 }
}
init();
