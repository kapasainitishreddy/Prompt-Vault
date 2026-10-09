/* Prompt-Vault Atlas. Original dependency-free accessible static gallery. MIT. */
const ROOT = 'https://github.com/kapasainitishreddy/Prompt-Vault/blob/main/';
const TRACKS = {
  websites: { file: './data/website.json', dataKey: 'sections', type: 'website', folder: 'website', promptFolder: 'sections', name: 'Website', source: 'prompts/website/sections/' },
  apps: { file: './data/app.json', dataKey: 'flows', type: 'app', folder: 'app', promptFolder: 'flows', name: 'App UI/UX', source: 'prompts/app/flows/' },
  motion: { file: './data/motion.json', dataKey: 'recipes', type: 'motion', folder: 'motion', promptFolder: '', name: 'Motion', source: 'prompts/motion/' }
};
const byId = id => document.getElementById(id);
const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const safeKey = id => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id);
const motionPrefersReduced = () => Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
const loadStorage = () => { try { return new Set(JSON.parse(localStorage.getItem('pv-atlas-saves') || '[]')); } catch { return new Set(); } };
const persistSaved = saved => { try { localStorage.setItem('pv-atlas-saves', JSON.stringify([...saved])); } catch { /* bookmarks remain in this session */ } };
let saved = loadStorage();
let current = null;
let promptValue = '';
let toastTimer;
const toast = text => { const el = byId('toast'); if (!el) return; el.textContent = text; el.hidden = false; window.clearTimeout(toastTimer); toastTimer = window.setTimeout(() => { el.hidden = true; }, 2700); };
const groups = {
  websites: {
    'Marketing': ['announcement-bar','navigation','hero','product-showcase','features','benefits-story','how-it-works','interactive-demo','social-proof','metrics','testimonials','case-study','comparison','pricing','faq','integrations','use-cases','call-to-action'],
    'Editorial': ['gallery','portfolio','articles','events','timeline'],
    'Commerce': ['storefront','product-detail','checkout'],
    'Forms & utility': ['newsletter','contact','footer','search','error-404','documentation']
  },
  apps: {
    'Core journeys': ['onboarding','home','navigation','search','filters','list-feed','detail','create-edit','multi-step-form','task-management','calendar'],
    'Information & media': ['dashboard-data','notifications','chat','media-library','upload-capture','table-data','ai-assistant'],
    'Accounts & payment': ['authentication','checkout','paywall','profile','settings-privacy','permissions','account-deletion'],
    'Quality & recovery': ['offline-sync','empty-states','errors-recovery','undo-confirmation','accessibility','localization-rtl','multi-select-bulk']
  },
  motion: {
    'Reveal & storytelling': ['editorial-entrance','text-scramble','ascii-sweep','dissolve-reveal','scroll-chapters','progress-line'],
    'Interaction feedback': ['button-press','todo-completion','reorder-list','form-feedback','upload-progress','status-feedback'],
    'Navigation & continuity': ['tab-content','modal-drawer','matched-detail','gallery-transition','page-transition'],
    'Spatial & playful': ['frosted-glass','image-comparison','data-transition','cursor-companion','magnetic-hover','subtle-particles']
  }
};
const groupFor = (page, id) => Object.entries(groups[page] || {}).find(([,list]) => list.includes(id))?.[0] || 'Other';
const tones = ['sand','ink','acid','coral','cream','blue','lavender'];
const webVisuals = {
  'announcement-bar':['ink','banner','Notice / Fieldnotes','A small announcement, precisely placed.'],
  navigation:['cream','navigation','INDEX / STUDIO','Work    Ideas    Studio    Contact'],
  hero:['coral','hero','NOT THE SAME.','A bold editorial declaration'],
  'product-showcase':['sand','product','OBJECT / STUDY','Form follows a true story'],
  features:['acid','features','Three decisions.','Each earns its place'],
  'benefits-story':['cream','editorial','THE SPACE BETWEEN','A story with breathing room'],
  'how-it-works':['blue','steps','FROM A TO B.','Purposeful steps, none hidden'],
  'interactive-demo':['ink','terminal','LIVE WORKBENCH','Try a real thing'],
  'social-proof':['sand','proof','THE RECEIPTS','Evidence, not fantasy'],
  metrics:['blue','metrics','THE SIGNAL','Use numbers responsibly'],
  testimonials:['lavender','quote','WHAT PEOPLE SAY','Only genuine voices belong here'],
  'case-study':['cream','editorial','THE CASE / 07','Problem → intervention → proof'],
  comparison:['sand','table','COMPARE WELL','Apples with apples'],
  pricing:['acid','pricing','CLEAR CHOICES','No hidden surprises'],
  faq:['cream','faq','THE QUESTIONS','Nothing to hide'],
  integrations:['blue','nodes','CONNECT THE DOTS','Only real connections'],
  'use-cases':['coral','features','MADE FOR THE JOB','Roles, not stereotypes'],
  gallery:['sand','gallery','THE COLLECTION','A deliberately paced archive'],
  portfolio:['ink','editorial','SELECTED / WORK','Work with a point of view'],
  articles:['cream','list','FROM THE JOURNAL','Notes on seeing differently'],
  storefront:['coral','gallery','OBJECTS / GOODS','The collection, curated'],
  'product-detail':['sand','product','FORM / NO. 08','Look closely'],
  newsletter:['acid','form','A LETTER FOR YOU','One good thing each month'],
  contact:['cream','form','LET’S TALK.','A real way to get in touch'],
  'call-to-action':['ink','hero','YOUR MOVE.','One clear next step'],
  footer:['blue','footer','END NOTE.','Every useful destination'],
  search:['cream','search','LOOK CLOSER','Find exactly the thing'],
  checkout:['acid','pricing','LAST LOOK','The true total, clearly'],
  'error-404':['coral','404','404','Find your way back'],
  documentation:['ink','terminal','THE MANUAL','Useful before decorative'],
  events:['lavender','steps','WHAT’S NEXT','Schedule / all local times'],
  timeline:['sand','steps','THEN / NOW','Progress, with dates']
};
const appVisuals = {
  onboarding:['#d5e69e','onboarding','First things first','Begin with a useful action'],
  authentication:['#d9dfea','form','Welcome back','Enter your account'],
  home:['#d1dfd0','home','Good morning.','Your next step awaits'],
  navigation:['#e5dbba','navigation','Workspace','Today | Search | You'],
  search:['#d8e7e8','search','Find anything','Search notes and tasks'],
  filters:['#e8dcc6','filter','Explore','Two filters applied'],
  'list-feed':['#dbe4d1','list','Activity','Recent work in order'],
  detail:['#dfd7ea','detail','Project notes','The complete picture'],
  'create-edit':['#eadcc8','editor','Untitled idea','Start writing something'],
  'multi-step-form':['#d3e3de','form','A few details','Step 02 of 04'],
  'task-management':['#d9e6ab','tasks','Today’s list','The important things'],
  calendar:['#d8e2e9','calendar','October','Focus time first'],
  'dashboard-data':['#d5e6db','chart','Overview','Decisions from real data'],
  notifications:['#e8e0c8','list','Inbox','Everything in its place'],
  chat:['#d9e4d5','chat','Conversation','Clear, useful replies'],
  'media-library':['#e4d4cc','media','Library','Your selected work'],
  'upload-capture':['#d7e7df','progress','New upload','12 of 20 files'],
  checkout:['#e8e0bb','checkout','Review order','Transparent totals'],
  paywall:['#e7dccd','paywall','Make more room','Know what premium costs'],
  profile:['#dbdfef','profile','Your space','Edit what you share'],
  'settings-privacy':['#dae7d2','settings','Preferences','Your data, your call'],
  permissions:['#ece2c8','permission','Make it yours','Ask only when needed'],
  'offline-sync':['#d4e5e2','sync','Offline ready','Work is kept locally'],
  'empty-states':['#ede8db','empty','A fresh start','Here is your next step'],
  'errors-recovery':['#ead3c8','error','Can’t connect','Your draft is still here'],
  'undo-confirmation':['#e7daca','undo','Undo available','Mistakes are recoverable'],
  accessibility:['#d5dfed','settings','Display & access','Make it comfortable'],
  'localization-rtl':['#d9e3d5','rtl','أهلاً بك','Interface direction matters'],
  'multi-select-bulk':['#e5e6c9','tasks','Select items','3 selected'],
  'table-data':['#d8e1e7','table','Records','Find the exact value'],
  'ai-assistant':['#dfdce8','chat','Co-pilot','Evidence with every suggestion'],
  'account-deletion':['#e7ddd1','settings','Account control','Your data choices']
};
const motionTone = id => ({'frosted-glass':'blue','dissolve-reveal':'coral','ascii-sweep':'cream','cursor-companion':'lavender','subtle-particles':'cream','text-scramble':'acid','reorder-list':'coral','button-press':'blue','todo-completion':'acid','scroll-chapters':'lavender'}[id] || tones[id.length % tones.length]);
const l = (content, cls='scene-line') => `<div class="${cls}" style="--w:${content}%"></div>`;
function websiteScene(item,variation=0){
  const [baseTone,baseKind,title,sub] = webVisuals[item.id] || [tones[item.id.length % tones.length],'editorial',item.title,item.job];
  const tone=variation===0?baseTone:variation===1?tones[(tones.indexOf(baseTone)+2)%tones.length]:tones[(tones.indexOf(baseTone)+4)%tones.length];
  const kind=variation===0?baseKind:variation===1?(baseKind==='editorial'?'features':'editorial'):(baseKind==='product'?'gallery':'product');
  const top = `<div class="scene-top"><span>COMMON GROUND / 001</span><span>MENU ↗</span></div>`;
  const heading = `<div class="scene-title">${escape(title)}</div>`;
  const end = `<div class="scene-end"><span>SPECIMEN • ${escape(item.id.replaceAll('-',' '))}</span><span>↗</span></div>`;
  const bars=`<div class="scene-bars" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div>`;
  const rows = values=>`<div class="scene-list">${values.map((v,i)=>`<div class="scene-list-row"><span>0${i+1} / ${escape(v)}</span><span>↗</span></div>`).join('')}</div>`;
  let inside='';
  switch(kind){
    case 'banner': inside=`<div class="scene-rule"></div><div class="scene-quote">A small thing, at the right moment.</div><div class="scene-lineup" aria-hidden="true"><span></span><span></span><span></span><span></span></div>`;break;
    case 'navigation': inside=`<div class="scene-rule"></div><div class="scene-number">INDEX</div>${rows(['About','Projects','Contact'])}`;break;
    case 'hero':inside=`${heading}<div class="scene-disc" aria-hidden="true"></div><div class="scene-sub">${escape(sub)}</div><div class="scene-mini-btn" aria-hidden="true"></div>`;break;
    case 'product':inside=`<div class="scene-stack" aria-hidden="true"><span></span><span></span><span></span></div><div class="scene-sub">${escape(sub)}</div>`;break;
    case 'features':inside=`${heading}${rows(['Essential structure','Purposeful motion','Readable interface'])}`;break;
    case 'steps':inside=`${heading}${rows(['Discover','Make','Test','Improve'])}`;break;
    case 'terminal':inside=`<div class="scene-panel" style="background:#28352f;color:#deeba4;flex:1;font: .58rem/1.8 monospace"><div>&gt; design --purpose user<br>&gt; render --mobile<br><span style="color:#a8c4b3">✓ interfaces are for people</span></div><div>_</div></div>`;break;
    case 'proof':inside=`${heading}<div class="scene-quote">Proof is stronger than a placeholder.</div>${l(90)}${l(70)}`;break;
    case 'metrics':inside=`${heading}<div class="scene-sub">ILLUSTRATIVE DATA • NOT REAL STATS</div>${bars}`;break;
    case 'quote':inside=`<div class="scene-quote">“A real story deserves the space to speak.”</div><div class="scene-sub">SAMPLE TYPOGRAPHY, NOT A TESTIMONIAL</div>`;break;
    case 'table':inside=`${heading}${rows(['Dimension / clarity','Dimension / task','Dimension / access'])}`;break;
    case 'pricing':inside=`${heading}<div class="scene-cols"><div class="scene-panel"><span>START</span><strong class="scene-price">FREE</strong><span class="scene-sub">DEMO PLAN</span></div><div class="scene-panel"><span>GROW</span><strong class="scene-price">—</strong><span class="scene-sub">NO QUOTE</span></div></div>`;break;
    case 'faq':inside=`${heading}${rows(['How does it work?','What is included?','Where to begin?'])}`;break;
    case 'nodes':inside=`${heading}<div class="scene-lineup" style="margin:auto 0"><span></span><span></span><span></span><span></span></div><div class="scene-sub">SAMPLE SYSTEM MAP</div>`;break;
    case 'gallery':inside=`${heading}<div class="scene-cols"><div class="scene-panel" style="background:#c7a78d"><span>01 / FORM</span><strong>OBJECT</strong></div><div class="scene-panel" style="background:#9891ad"><span>02 / STUDY</span><strong>IMAGE</strong></div></div>`;break;
    case 'editorial':inside=`${heading}<div class="scene-rule"></div><div class="scene-sub">${escape(sub)}</div><div style="display:flex;gap:12px;margin:auto 0"><span class="scene-stack" style="min-height:80px;flex:1"><span></span><span></span><span></span></span><span style="flex:1">${l(86)}${l(95)}${l(72)}${l(59)}</span></div>`;break;
    case 'list':inside=`${heading}${rows(['01 / A new thought','02 / A closer look','03 / Notes on craft'])}`;break;
    case 'form':inside=`${heading}<div class="scene-sub">${escape(sub)}</div><div class="scene-field"></div><div class="scene-mini-btn" aria-hidden="true"></div>`;break;
    case 'footer':inside=`<div class="scene-number" style="font-size:3.1rem">THE END.</div>${rows(['Work','Company','Terms'])}`;break;
    case 'search':inside=`${heading}<div class="scene-field" style="height:37px;padding:9px;font-size:.66rem">Search for an idea… ↗</div>${rows(['Editorial','Systems'])}`;break;
    case '404':inside=`<div class="scene-404">404.</div><div class="scene-sub">${escape(sub)}</div>`;break;
    default:inside=`${heading}<div class="scene-sub">${escape(sub)}</div>${rows(['Study','Design','Make'])}`;
  }
  return `<div class="scene scene-website" data-tone="${tone}">${top}${inside}${end}</div>`;
}
function appScene(item,variation=0){
  const [baseBg,baseKind,title,sub] = appVisuals[item.id] || ['#e4e4d2','home',item.title,item.job];
  const bg=variation===0?baseBg:variation===1?'#e1e6e8':'#d8e6a6';
  const kind=variation===0?baseKind:variation===1?(baseKind==='list'?'chart':'list'):(baseKind==='form'?'tasks':'form');
  let center='';
  const taskRows = ['Write the brief','Check the details','Test the flow'].map((x,i)=>`<div class="app-row"><span>${i===0?'☑':'□'} ${escape(x)}</span><span>↗</span></div>`).join('');
  const bars = `<div class="app-chart" aria-label="Illustrative chart"><i></i><i></i><i></i><i></i><i></i></div><p>SAMPLE DATA · NOT USER METRICS</p>`;
  switch(kind){
    case 'onboarding':center=`<div class="app-pill">01 OF 03</div><div class="app-note">Start with the real job.<br>Skip what you don't need.</div><div class="app-row">Continue <span>→</span></div>`;break;
    case 'form':center=`<div class="app-row">Name <span>↵</span></div><div class="app-row">Email <span>↵</span></div><div class="app-pill">Review and continue →</div>`;break;
    case 'home':center=`<div class="app-pill">NEXT UP</div>${taskRows}`;break;
    case 'navigation':center=`<div class="app-row">Today <span>01</span></div><div class="app-row">Library <span>↗</span></div><div class="app-row">Your space <span>↗</span></div>`;break;
    case 'search':center=`<div class="app-row">⌕ Type to find…</div><div class="app-pill">Recent</div><div class="app-row">Project one</div><div class="app-row">Research notes</div>`;break;
    case 'filter':center=`<div class="app-pill">Today ✕</div><div class="app-pill">Active ✕</div>${taskRows}`;break;
    case 'list':center=`${taskRows}`;break;
    case 'detail':center=`<div class="app-note">An honest overview and the most useful next action.</div><div class="app-row">Details <span>→</span></div><div class="app-row">Related work <span>↗</span></div>`;break;
    case 'editor':center=`<div class="app-note" style="height:62px">An idea begins here…<br><br>Write what matters.</div><div class="app-pill">Draft saved locally</div>`;break;
    case 'tasks':center=`${taskRows}`;break;
    case 'calendar':center=`<div class="app-calendar">${Array(25).fill('<span></span>').join('')}</div>`;break;
    case 'chart':center=bars;break;
    case 'chat':center=`<div class="app-bubbles"><span>What changed today?</span><span>Three updates. Want the summary?</span><span>Yes, with sources.</span></div>`;break;
    case 'media':center=`<div class="app-calendar">${Array(15).fill('<span></span>').join('')}</div>`;break;
    case 'progress':center=`<div class="app-pill">Uploading sample</div><div class="app-loader"></div><p>Progress is only real when measured.</p>`;break;
    case 'checkout':center=`<div class="app-row">Sample item <span>—</span></div><div class="app-row">Taxes <span>—</span></div><div class="app-row"><b>Total</b><b>Demo</b></div>`;break;
    case 'paywall':center=`<div class="app-pill">FREE / PRO</div><div class="app-note">Know what you pay and how to cancel.</div><div class="app-row">Compare the plans →</div>`;break;
    case 'profile':center=`<div class="app-avatar">A</div><div class="app-row">Your profile <span>✎</span></div><div class="app-row">Public details <span>→</span></div>`;break;
    case 'settings':center=`<div class="app-row">Reduce motion <span>●</span></div><div class="app-row">Privacy <span>→</span></div><div class="app-row">Your data <span>→</span></div>`;break;
    case 'permission':center=`<div class="app-note">This feature needs permission. You can say no.</div><div class="app-row">Maybe later <span>→</span></div>`;break;
    case 'sync':center=`<div class="app-pill">● AVAILABLE OFFLINE</div><div class="app-row">3 local changes <span>↻</span></div><div class="app-row">Review conflicts <span>→</span></div>`;break;
    case 'empty':center=`<div class="app-avatar" style="font-size:1.5rem">✳</div><div class="app-note">Nothing here yet.<br>Make the first thing.</div>`;break;
    case 'error':center=`<div class="app-pill" style="background:#edc9b8">CONNECTION LOST</div><div class="app-note">Your draft is still here.</div><div class="app-row">Try again <span>↗</span></div>`;break;
    case 'undo':center=`<div class="app-note">Task removed.</div><div class="app-pill">UNDO LAST ACTION ↶</div>`;break;
    case 'rtl':center=`<div dir="rtl" class="app-row">المهام <span>←</span></div><div dir="rtl" class="app-row">الإعدادات <span>←</span></div><p>RTL is more than reversed text.</p>`;break;
    case 'table':center=`<div class="app-row">Name <span>Value</span></div>${Array(3).fill(0).map((_,i)=>`<div class="app-row">Item ${i+1}<span>—</span></div>`).join('')}`;break;
    default:center=taskRows;
  }
  return `<div class="scene scene-app" style="--app-bg:${bg};--tilt:${item.id.length%2?'-5deg':'4deg'}"><div class="app-phone-ground" aria-hidden="true">✳</div><div class="app-frame"><div class="app-mini-top"><span>EXAMPLE</span><span>◔ ◔ ▰</span></div><h4>${escape(title)}</h4><p>${escape(sub)}</p>${center}<div class="app-tabs"><span>⌂ Home</span><span>⌕ Find</span><span>◯ You</span></div></div></div>`;
}
function motionScene(item){
 const tone=motionTone(item.id);
 const symbol={'ascii-sweep':'░▒▓','frosted-glass':'FROST','dissolve-reveal':'FADE','text-scramble':'A→Z','cursor-companion':'✳','button-press':'PRESS','todo-completion':'✓','reorder-list':'↕','progress-line':'━━━━','page-transition':'NEXT','magnetic-hover':'↗','subtle-particles':'· ✳ ·','data-transition':'▂▅▇','modal-drawer':'▣'}[item.id] || 'MOVE';
 return `<div class="scene scene-motion" data-tone="${tone}" data-motion-kind="${item.id==='cursor-companion'?'dot':'default'}"><div class="motion-art"><span>${escape(symbol)}</span><i class="motion-ornament" aria-hidden="true"></i></div></div>`;
}
function renderScene(item,track,variation=0){return track==='websites'?websiteScene(item,variation):track==='apps'?appScene(item,variation):motionScene(item);}
function sceneCard(item,page,index){
 const id=escape(item.id);const key=`${page}:${item.id}`;const fav=saved.has(key);
 const group=groupFor(page,item.id);
 return `<article class="pattern-card" data-id="${id}"><div class="card-thumb"><span class="card-top-stamp">${escape(group)} / ${String(index+1).padStart(2,'0')}</span>${renderScene(item,page)}<button class="card-save" type="button" data-save="${id}" aria-pressed="${fav}" aria-label="${fav?'Remove':'Save'} ${escape(item.title)} ${fav?'from':'to'} favorites">${fav?'★':'☆'}</button></div><div class="card-copy"><span class="card-label micro">${escape(page==='websites'?'WEB / SECTION':page==='apps'?'APP / FLOW':'MOTION / RECIPE')} · ${String(index+1).padStart(2,'0')}</span><h3>${escape(item.title)}</h3><p>${escape(item.job||item.purpose||'Purposeful design.')}</p><div class="card-actions"><button type="button" class="card-open" data-open="${id}">View original preview ↗</button><span class="card-type">${page==='motion'?'PLAYABLE':'PROMPT INCLUDED'}</span></div></div></article>`;
}
const fetching = async url => {const response = await fetch(url,{cache:'default'});if(!response.ok) throw new Error(`${response.status} while loading ${url}`);return response.json();};
async function loadData(page){const type=TRACKS[page];const data=await fetching(type.file);const rows=data[type.dataKey];if(!Array.isArray(rows)||rows.length===0)throw new Error(`Missing ${type.dataKey} in catalog`);return rows.filter(x=>x&&safeKey(x.id)&&x.title);}
let viewRows=[];
let pageNow='home';
let filters={query:'',group:'All',onlySaved:false,sort:'curated'};
function getFiltered(){let out=viewRows.filter(item => { const q=filters.query.toLowerCase().trim();const search=(item.title+' '+(item.job||item.purpose||'')+' '+item.id+' '+(item.reference||'')+' '+groupFor(pageNow,item.id)).toLowerCase();return (!q||search.includes(q))&&(filters.group==='All'||groupFor(pageNow,item.id)===filters.group)&&(!filters.onlySaved||saved.has(pageNow+':'+item.id));}); if(filters.sort==='az')out.sort((a,b)=>a.title.localeCompare(b.title));if(filters.sort==='za')out.sort((a,b)=>b.title.localeCompare(a.title));return out;}
function renderGallery(){const gallery=byId('gallery');if(!gallery)return;const rows=getFiltered(); gallery.innerHTML=rows.map(item=>sceneCard(item,pageNow,viewRows.indexOf(item))).join('');byId('result-count').textContent=`${rows.length} of ${viewRows.length} concepts`;byId('nothing-found').hidden=rows.length!==0;gallery.hidden=rows.length===0;}
function renderFilters(){const control=byId('filter-controls');if(!control)return;const list=[['All',viewRows.length],...Object.entries(groups[pageNow]).map(([name, ids])=>[name,ids.length])];control.innerHTML=list.map(([name,c])=>`<button type="button" data-group="${escape(name)}" aria-pressed="${String(filters.group===name)}"><span>${escape(name)}</span><span>${c}</span></button>`).join('');}
function setGroup(name){filters.group=name;renderFilters();renderGallery();}
function remember(id){const key=pageNow+':'+id;if(saved.has(key))saved.delete(key);else saved.add(key);persistSaved(saved);renderGallery();toast(saved.has(key)?'Added to saved ideas':'Removed from saved ideas');}
function promptPath(track,id){const type=TRACKS[track];return './prompts/'+type.folder+'/'+(type.promptFolder?type.promptFolder+'/':'')+id+'.md';}
function sourceUrl(track,id){return ROOT+TRACKS[track].source+id+'.md';}
function chooseVariant(number){if(!current||current.track==='motion')return;const variants=current.item.variants||[];current.variation=number;byId('detail-render').innerHTML=renderScene(current.item,current.track,number);byId('variant-buttons').querySelectorAll('button').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===number)));byId('variant-description').textContent=variants[number]||'Original exploratory composition.';}
function selectTab(tab){const tabs=['preview','prompt','method'];for(const name of tabs){const selected=name===tab;const button=byId('tab-'+name);button.setAttribute('aria-selected',String(selected));button.tabIndex=selected?0:-1;byId('panel-'+name).hidden=!selected;}if(tab==='prompt')loadPrompt();}
function openDetail(track,item){current={track,item,variation:0};promptValue='';const dlg=byId('detail-dialog');if(!dlg?.showModal)return;byId('detail-number').textContent='THE ATLAS / '+track.toUpperCase();byId('detail-category').textContent=groupFor(track,item.id)+' / '+TRACKS[track].name;byId('detail-title').textContent=item.title;byId('detail-desc').textContent=item.job||item.purpose||'';byId('detail-source').href=sourceUrl(track,item.id);byId('detail-render').innerHTML=renderScene(item,track);const strip=byId('variant-strip');strip.hidden=track==='motion';const variants=item.variants||[];byId('variant-buttons').innerHTML=track==='motion'?'':[0,1,2].map((n)=>`<button type="button" aria-pressed="${n===0}" data-variant="${n}">${String.fromCharCode(65+n)}</button>`).join('');byId('variant-description').textContent=track==='motion'?'Play to inspect the motion study.':(variants[0]||'First composition study.');byId('detail-render').classList.remove('mobile-size');byId('size-desktop').setAttribute('aria-pressed','true');byId('size-mobile').setAttribute('aria-pressed','false');byId('replay-button').textContent=track==='motion'?'Play effect ↻':'Replay ↻';byId('prompt-text').textContent='Loading the original prompt…';byId('method-detail').innerHTML=methodHtml(item,track);selectTab('preview');dlg.showModal();byId('dialog-close').focus();history.replaceState(null,'','#'+encodeURIComponent(track)+'/'+encodeURIComponent(item.id));}
function methodHtml(item,track){
 const parts=track==='motion'?[['What it is for',item.purpose],['Trigger',item.trigger],['Motion contract',item.recipe],['Reduced motion fallback',item.fallback],['Avoid',item.reject],['Reference only',item.reference+' · external rights are separate.']]:track==='apps'?[['The real user job',item.job],['Interaction contract',item.behavior],['Suggested meaningful motion',item.motion],['States that must work',item.states],['Check before shipping',item.verify],['Never default to',item.reject]]:[['The communication job',item.job],['Interaction contract',item.behavior],['Motion with a reason',item.motion],['Edge states',item.states],['Acceptance test',item.verify],['Avoid the template',item.reject]];
 return parts.map(([label,value])=>`<article><span class="micro">${escape(label)}</span><h3>${escape(label)}</h3><p>${escape(value||'No details provided.')}</p></article>`).join('');
}
async function loadPrompt(){if(!current||promptValue)return;const {track,item}=current;try{const res=await fetch(promptPath(track,item.id));if(!res.ok)throw new Error('Prompt file not available on this host');const text=await res.text();if(current?.item.id!==item.id||current?.track!==track)return;promptValue=text;byId('prompt-text').textContent=text;}catch(e){const fallback = `# ${item.title}\n\nThis preview's full prompt could not be loaded locally.\n\nUse the original MIT source prompt: ${sourceUrl(track,item.id)}\n\nPurpose: ${item.job||item.purpose}`;byId('prompt-text').textContent=fallback;toast('Prompt unavailable locally; the GitHub source link remains available.');}}
async function copyPrompt(){if(!current)return;await loadPrompt();if(!promptValue){toast('Full prompt not loaded; open the source link instead.');return;}try{await navigator.clipboard.writeText(promptValue);toast('Complete prompt copied.');}catch{byId('prompt-text').focus();toast('Clipboard blocked. Select text in the prompt panel to copy.');}}
function replayMotion(){if(!current)return;const root=byId('detail-render');if(!root)return;const element=root.querySelector('.motion-art')||root.querySelector('.scene-title')||root.querySelector('.app-frame');if(!element)return;if(motionPrefersReduced()||document.body.classList.contains('motion-off')){toast('Reduced motion is on; the final state is always visible.');return;}
 const id=current.item.id; const options={duration:480,easing:'cubic-bezier(.22,.7,.18,1)'};
 let frames=[{opacity:.2,transform:'translateY(22px)'},{opacity:1,transform:'translateY(0)'}];
 if(['button-press','magnetic-hover','todo-completion','status-feedback','reorder-list'].includes(id)){frames=[{transform:'scale(1)'},{transform:'scale(.89)',offset:.28},{transform:'scale(1.04)',offset:.6},{transform:'scale(1)'}];options.duration=420;}
 else if(['matched-detail','page-transition','modal-drawer','tab-content','gallery-transition'].includes(id)){frames=[{opacity:.45,transform:'translateX(-46px)'},{opacity:1,transform:'translateX(0)'}];}
 else if(['frosted-glass','dissolve-reveal','image-comparison'].includes(id)){frames=[{filter:'blur(14px)',opacity:.25},{filter:'blur(0px)',opacity:1}];options.duration=620;}
 else if(['ascii-sweep','text-scramble','subtle-particles'].includes(id)){frames=[{filter:'contrast(3)',opacity:.1,transform:'translateY(6px)'},{filter:'contrast(1)',opacity:1,transform:'translateY(0)'}];options.duration=720;}
 else if(['progress-line','upload-progress','data-transition','scroll-chapters'].includes(id)){frames=[{transform:'scaleX(.2)',opacity:.4},{transform:'scaleX(1)',opacity:1}];options.duration=690;}
 if(typeof element.animate==='function'){element.getAnimations().forEach(a=>a.cancel());element.animate(frames,options);} else toast('Motion not supported here; the original design stays usable.');
}
function installDialogHandlers(){
 const dlg=byId('detail-dialog');if(!dlg)return;
 byId('dialog-close').addEventListener('click',()=>dlg.close());
 dlg.addEventListener('close',()=>{current=null;promptValue='';if(location.hash.includes('/'))history.replaceState(null,'',location.pathname+location.search);});
 dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close();});
 ['preview','prompt','method'].forEach(name=>byId('tab-'+name).addEventListener('click',()=>selectTab(name)));
 byId('copy-prompt').addEventListener('click',copyPrompt);
 byId('size-desktop').addEventListener('click',()=>setSize(false));byId('size-mobile').addEventListener('click',()=>setSize(true));
 byId('replay-button').addEventListener('click',replayMotion);byId('variant-buttons').addEventListener('click',e=>{const b=e.target.closest('[data-variant]');if(b)chooseVariant(Number(b.dataset.variant));});
 dlg.querySelector('.dialog-tabs').addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const keys=['preview','prompt','method'];let i=keys.findIndex(name=>byId('tab-'+name).getAttribute('aria-selected')==='true');if(event.key==='Home')i=0;else if(event.key==='End')i=2;else i=(i+(event.key==='ArrowRight'?1:2))%3;selectTab(keys[i]);byId('tab-'+keys[i]).focus();});
}
function setSize(mobile){byId('detail-render').classList.toggle('mobile-size',mobile);byId('size-mobile').setAttribute('aria-pressed',String(mobile));byId('size-desktop').setAttribute('aria-pressed',String(!mobile));}
function attachGalleryEvents(container,rows,track){container.addEventListener('click',event=>{const save=event.target.closest('[data-save]');if(save){remember(save.dataset.save);return;}const open=event.target.closest('[data-open]');if(open){const match=rows.find(x=>x.id===open.dataset.open);if(match)openDetail(track,match);}});}
function initMobileNav(){const button=document.querySelector('.mobile-menu');const nav=byId('mobile-navigation');button?.addEventListener('click',()=>{const expanding=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(expanding));nav.hidden=!expanding;});}
async function initHome(){const gallery=byId('featured-gallery');if(!gallery)return;try{const [web,app]=await Promise.all([loadData('websites'),loadData('apps')]);const featured=[['websites',web.find(x=>x.id==='hero')],['websites',web.find(x=>x.id==='pricing')],['apps',app.find(x=>x.id==='task-management')],['apps',app.find(x=>x.id==='calendar')],['websites',web.find(x=>x.id==='portfolio')],['apps',app.find(x=>x.id==='offline-sync')]].filter(([,x])=>Boolean(x));gallery.innerHTML=featured.map(([track,item],i)=>sceneCard(item,track,i)).join('');gallery.addEventListener('click',e=>{const btn=e.target.closest('[data-open],[data-save]');if(!btn)return;const node=btn.closest('.pattern-card');const track=featured.find(([t,item])=>item.id===node.dataset.id)?.[0];if(!track)return;const item=featured.find(([t,item])=>t===track&&item.id===node.dataset.id)?.[1];if(btn.dataset.save){const key=track+':'+btn.dataset.save;if(saved.has(key))saved.delete(key);else saved.add(key);persistSaved(saved);btn.setAttribute('aria-pressed',String(saved.has(key)));btn.textContent=saved.has(key)?'★':'☆';btn.setAttribute('aria-label',(saved.has(key)?'Remove':'Save')+' '+item.title+(saved.has(key)?' from':' to')+' favorites');toast('Saved ideas updated');}else if(item)openDetail(track,item);});}catch(err){gallery.innerHTML=`<div class="loading-catalog">Could not load the featured studies. <a href="./websites.html">Browse the atlas</a> or try again online.</div>`;}}
async function initCatalog(page){pageNow=page;const input=byId('search-pattern');try{viewRows=await loadData(page);renderFilters();renderGallery();if(location.hash){const match=/^#(websites|apps|motion)\/([a-z0-9-]+)$/.exec(decodeURIComponent(location.hash));if(match?.[1]===page){const item=viewRows.find(x=>x.id===match[2]);if(item)openDetail(page,item);}}}catch(err){byId('gallery').innerHTML=`<div class="loading-catalog">The catalog could not load. Host the <code>docs/</code> directory, including its <code>data/</code> folder, and reload. <a href="${ROOT}catalog">Browse the source</a>.</div>`;byId('result-count').textContent='Catalog unavailable';return;}
 input.addEventListener('input',()=>{filters.query=input.value;renderGallery();});
 byId('sort-pattern').addEventListener('change',e=>{filters.sort=e.target.value;renderGallery();});
 byId('favorites-only').addEventListener('change',e=>{filters.onlySaved=e.target.checked;renderGallery();});
 byId('filter-controls').addEventListener('click',e=>{const btn=e.target.closest('[data-group]');if(btn)setGroup(btn.dataset.group);});
 byId('reset-filters').addEventListener('click',()=>{filters={query:'',group:'All',onlySaved:false,sort:'curated'};input.value='';byId('favorites-only').checked=false;byId('sort-pattern').value='curated';renderFilters();renderGallery();});
 attachGalleryEvents(byId('gallery'),viewRows,page);
}
initMobileNav();installDialogHandlers();
const page=document.body.dataset.page;
if(page==='home')initHome();else if(TRACKS[page])initCatalog(page);
