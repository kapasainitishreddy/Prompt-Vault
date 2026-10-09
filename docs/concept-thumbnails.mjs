/* Original Prompt-Vault thumbnail studies. No stock imagery or upstream component code. */
const esc = value => String(value == null ? '' : value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[ch]));
const palettes = ['forest','orange','cobalt','plum','clay','teal','sand'];
const webTypes = new Set(['hero','editorial','form','article','comparison','navigation','search','dashboard','workflow','commerce','trust','motion','chart','spatial','system','portfolio']);
const appTypes = new Set(['onboarding','form','workflow','navigation','dashboard','search','editor','status','chart','social','trust','ai','billing','comparison','media','spatial','motion','learning','system']);
function hash(str) {
  let a = 19;
  for (const character of String(str)) a = ((a << 5) - a + character.charCodeAt(0)) | 0;
  return Math.abs(a);
}
function trim(text,max=42) {
  const value=String(text||'');
  return esc(value.length>max?value.slice(0,max-1).trimEnd()+'…':value);
}
const strip = '<div class="pv-mini-lines"><i></i><i></i><i></i></div>';
const nav = '<div class="pv-mini-nav"><b>FIELD / STUDIO</b><span>WORK　 ABOUT　 ↗</span></div>';
function webVisual(c){
 const title=trim(c.title,43),purpose=trim(c.purpose,76),kind=c.preview;
 switch(kind){
  case 'hero':
   return nav+'<div class="pv-mini-webhero"><span class="pv-mini-eyebrow">DESIGNED TO MATTER / 001</span><strong>'+title+'</strong><p>'+purpose+'</p><em>Discover the idea ↗</em></div>';
  case 'editorial':
   return '<div class="pv-mini-edition"><span>JOURNAL / 2026</span><span>IDEAS IN CONTEXT　↗</span></div><div class="pv-mini-editorial"><div><small>01 / DISPATCH</small><strong>'+title+'</strong><span>Read the perspective ↗</span></div><div class="pv-mini-editorial-art"><b>FORM<br>&amp;<br>FUNCTION</b></div></div>';
  case 'navigation':
   return '<div class="pv-mini-nav pv-mini-nav-wide"><b>atlas<span>.</span></b><span>Products　Learn　Company</span><span>Menu ↓</span></div><div class="pv-mini-mega"><strong>Find your next destination</strong><div><span>01　Overview</span><span>02　Patterns</span><span>03　Documentation</span></div><small>'+title+'</small></div>';
  case 'search':
   return '<div class="pv-mini-search-head"><span>DISCOVER / KNOWLEDGE</span><strong>Search by what matters.</strong></div><div class="pv-mini-search-bar">⌕　Find something specific <b>↗</b></div><div class="pv-mini-search-results"><span>01 / '+title+'</span><span>02 / Related patterns</span><span>03 / Further reading</span></div>';
  case 'form':
   return '<div class="pv-mini-form-heading"><small>YOUR NEXT STEP</small><strong>'+title+'</strong></div><div class="pv-mini-form-field">Project name <span>Studio notes</span></div><div class="pv-mini-form-field">What matters most? <span>Choose an outcome ▾</span></div><div class="pv-mini-form-submit">Continue to review ↗</div><small class="pv-mini-under">An illustrative form, not a submission.</small>';
  case 'workflow':
   return '<div class="pv-mini-process-heading"><small>MAKE THE WORK CLEAR</small><strong>'+title+'</strong></div><div class="pv-mini-process"><div><b>01</b><span>Understand</span></div><div><b>02</b><span>Design</span></div><div><b>03</b><span>Verify</span></div></div><div class="pv-mini-process-foot">NEXT / RESPECT THE USER JOURNEY　→</div>';
  case 'comparison':
   return '<div class="pv-mini-comparison"><small>COMPARE THE ESSENTIALS</small><strong>'+title+'</strong><div class="pv-mini-compare-row pv-mini-compare-head"><span>CAPABILITY</span><span>OPTION A</span><span>OPTION B</span></div><div class="pv-mini-compare-row"><span>Access</span><span>Included</span><span>Optional</span></div><div class="pv-mini-compare-row"><span>Offline</span><span>Yes</span><span>—</span></div><div class="pv-mini-compare-row"><span>Recovery</span><span>Undo</span><span>Retry</span></div></div>';
  case 'dashboard': case 'chart':
   return '<div class="pv-mini-dash"><div class="pv-mini-dash-head"><span>OVERVIEW / SAMPLE</span><strong>↗</strong></div><strong>'+title+'</strong><div class="pv-mini-stat"><b>DATA</b><span>Not actual metrics</span></div><div class="pv-mini-chart"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="pv-mini-dash-ticks">MON　TUE　WED　THU　FRI　SAT　SUN</div></div>';
  case 'commerce':
   return '<div class="pv-mini-shopbar">ATELIER / OBJECTS <span>COLLECTION　 BAG ↗</span></div><div class="pv-mini-shop"><div class="pv-mini-object"><i></i></div><div><small>CURATED GOODS / DEMO</small><strong>'+title+'</strong><p>Review materials, fit and returns.</p><b>Explore item ↗</b></div></div>';
  case 'trust':
   return '<div class="pv-mini-trust"><small>YOUR DATA. YOUR CHOICE.</small><strong>'+title+'</strong><p>Clear terms, informed permission and a path to change your mind.</p><div class="pv-mini-switches"><span>Required security <i>ON</i></span><span>Optional insights <i>OFF</i></span></div><b>Review choices ↗</b></div>';
  case 'article':
   return '<div class="pv-mini-paper"><small>FIELDNOTES / ARTICLE INDEX</small><strong>'+title+'</strong><div class="pv-mini-article-abstract">'+strip+'<div class="pv-mini-dropcap">A</div></div><p>'+purpose+'</p><span>Source notes　·　Read more ↗</span></div>';
  case 'portfolio':
   return '<div class="pv-mini-portfolio"><span>SELECTED / WORK</span><strong>'+title+'</strong><div class="pv-mini-portfolio-works"><span>01<br>RESEARCH</span><span>02<br>BUILD</span><span>03<br>SHIP</span></div><small>THE WORK / THE DECISIONS / THE OUTCOME</small></div>';
  case 'motion':
   return '<div class="pv-mini-motion"><small>STUDY IN CONTINUITY</small><strong>'+title+'</strong><div class="pv-mini-motion-rail"><i>01</i><span>→</span><i>02</i><span>→</span><i>03</i></div><p>A visible cause, a meaningful change.</p><b>Replay a transition ↻</b></div>';
  case 'spatial':
   return '<div class="pv-mini-spatial"><div><small>SPATIAL / EXPERIMENT</small><strong>'+title+'</strong><p>Inspect the shape. Keep a static fallback.</p></div><div class="pv-mini-spatial-scene"><span class="pv-mini-spatial-solid"></span></div></div>';
  case 'system':
   return '<div class="pv-mini-system"><small>DESIGN LANGUAGE / COMPONENTS</small><strong>'+title+'</strong><div class="pv-mini-system-swatches"><span></span><span></span><span></span><span></span></div><div class="pv-mini-system-text">Aa　01 02 03</div><div class="pv-mini-system-actions"><i>Primary ↗</i><i>Secondary</i></div></div>';
  default:return nav+'<div class="pv-mini-webhero"><strong>'+title+'</strong><p>'+purpose+'</p></div>';
 }
}
function appVisual(c){
 const title=trim(c.title,38),kind=c.preview;
 let inside='';
 switch(kind){
  case 'onboarding':
   inside='<small>YOUR SPACE / 01</small><div class="pv-mini-app-illustration"><i></i><b>Start small.<br>Build momentum.</b></div><strong>'+title+'</strong><span>Start with a real action</span><em>Continue ↗</em>';break;
  case 'navigation':
   inside='<small>WORKSPACE / TODAY</small><strong>'+title+'</strong><div class="pv-mini-app-rows"><span>Home　　●</span><span>Explore　　↗</span><span>Settings　　⚙</span></div>';break;
  case 'editor':
   inside='<small>NOTES / NEW</small><strong>'+title+'</strong><div class="pv-mini-app-editor">Something worth writing…<i></i><i></i><i></i></div><em>Saved in this demo</em>';break;
  case 'search':
   inside='<small>LIBRARY / EXPLORE</small><strong>'+title+'</strong><div class="pv-mini-app-input">⌕　Find in your collection</div><div class="pv-mini-app-rows"><span>Recent idea　↗</span><span>Saved result　↗</span></div>';break;
  case 'dashboard':case 'chart':
   inside='<small>INSIGHT / SAMPLE DATA</small><strong>'+title+'</strong><div class="pv-mini-app-stat">Overview <b>—</b></div><div class="pv-mini-app-chart"><i></i><i></i><i></i><i></i><i></i></div><span>Meaning first, numbers with sources.</span>';break;
  case 'status':
   inside='<small>WORK / STATUS</small><strong>'+title+'</strong><div class="pv-mini-app-status"><span>● Saved on device</span><span>◯ Pending sync</span><span>↻ Recover and retry</span></div>';break;
  case 'form':
   inside='<small>STEP 02 / 04</small><strong>'+title+'</strong><div class="pv-mini-app-input">Your name　▏</div><div class="pv-mini-app-input">Choose an answer ▾</div><em>Review answers ↗</em>';break;
  case 'workflow':
   inside='<small>YOUR NEXT ACTION</small><strong>'+title+'</strong><div class="pv-mini-app-task"><i>✓</i> Define the first step</div><div class="pv-mini-app-task"><i>○</i> Complete the next step</div><em>Mark complete ↗</em>';break;
  case 'social':
   inside='<small>CONVERSATION / DEMO</small><strong>'+title+'</strong><div class="pv-mini-bubble">This conversation has context.</div><div class="pv-mini-bubble pv-mini-bubble-alt">And clear privacy controls.</div><span>Audience: selected members</span>';break;
  case 'ai':
   inside='<small>ASSISTANT / NO MODEL CONNECTED</small><strong>'+title+'</strong><div class="pv-mini-bubble">Summarize my selected note?</div><div class="pv-mini-bubble pv-mini-bubble-alt">Preview suggestion before applying.</div><em>Review before action ↗</em>';break;
  case 'billing':
   inside='<small>PREMIUM / MOCK TERMS</small><strong>'+title+'</strong><div class="pv-mini-bill"><b>Clear access</b><span>Price and renewal here</span><span>Restore purchases</span></div><em>Review terms ↗</em>';break;
  case 'media':
   inside='<small>NOW PLAYING / SAMPLE</small><strong>'+title+'</strong><div class="pv-mini-media-cover"><span>▶</span></div><div class="pv-mini-media-progress"><i></i></div><span>Captions　Audio　Speed</span>';break;
  case 'spatial':
   inside='<small>INSPECT / SPATIAL</small><strong>'+title+'</strong><div class="pv-mini-spatial-scene pv-mini-app-spatial"><span class="pv-mini-spatial-solid"></span></div><span>Static geometry demo only.</span>';break;
  case 'motion':
   inside='<small>FEEDBACK / ANIMATION</small><strong>'+title+'</strong><div class="pv-mini-app-task"><i>✓</i> Action completed</div><em>Motion off supported</em>';break;
  case 'learning':
   inside='<small>LEARN / PRACTICE</small><strong>'+title+'</strong><div class="pv-mini-app-lesson"><b>One useful idea</b><span>Practice → Feedback → Review</span></div><em>Check understanding ↗</em>';break;
  case 'trust':
   inside='<small>PRIVACY / CONTROL</small><strong>'+title+'</strong><div class="pv-mini-app-status"><span>Data stays yours</span><span>Export and deletion</span></div><em>Review choices ↗</em>';break;
  case 'comparison':
   inside='<small>COMPARE / VALUES</small><strong>'+title+'</strong><div class="pv-mini-app-rows"><span>Feature / Plan A</span><span>Feature / Plan B</span><span>Missing shown as —</span></div>';break;
  case 'system':
   inside='<small>DESIGN SYSTEM</small><strong>'+title+'</strong><div class="pv-mini-system-swatches"><span></span><span></span><span></span><span></span></div><div class="pv-mini-app-task">Aa · 24 · 16 · 12</div>';break;
  default:
   inside='<small>FLOW / REAL TASK</small><strong>'+title+'</strong><div class="pv-mini-app-task">Simple next action</div><em>Continue ↗</em>';
 }
 return '<div class="pv-mini-phone"><div class="pv-mini-notch"></div><div class="pv-mini-phone-head"><span>9:41</span><span>●●● ▰</span></div><div class="pv-mini-phone-content">'+inside+'</div><div class="pv-mini-phone-tabs"><span>⌂</span><span>◇</span><span>◎</span></div></div>';
}
export function conceptThumbnail(concept) {
 if(!concept||typeof concept.id!=='string')return '';
 const isApp=concept.track==='app';
 const kind=String(concept.preview||'');
 const safeKind=(isApp?appTypes:webTypes).has(kind)?kind:(isApp?'onboarding':'hero');
 const palette=palettes[hash(concept.id)%palettes.length];
 return '<div class="pv-thumb pv-thumb--'+(isApp?'app':'web')+' pv-thumb--'+safeKind+' pv-thumb--'+palette+'" aria-hidden="true">'+
 (isApp?appVisual(concept):webVisual(concept))+
 '</div>';
}
export const thumbnailTypeCounts = {website:webTypes.size,app:appTypes.size};
