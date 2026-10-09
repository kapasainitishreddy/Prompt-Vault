import {composeBuild,composeAudit,clean} from "./remix-core.mjs";

/** Visual-first, no-login design and prompt handoff. All fetching is local static JSON.
 * A URL pasted into the form is included only as plain text inside the prompt:
 * this page NEVER crawls the user's site, uploads project data, or invokes AI.
 */
const $=id=>document.getElementById(id);
const safe=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const validColor=s=>/^#[\da-f]{6}$/i.test(String(s))?s:"#17251e";
const state={target:"website",styles:[],selected:null,flows:{website:[],app:[]},blueprints:{website:[],app:[]},concepts:{website:[],app:[]},query:"",family:"All",limit:12,variant:"balanced",output:"build",loaded:false};
const urlParams=new URLSearchParams(location.search);
const targetParam=urlParams.get("type");
const styleParam=urlParams.get("style");
const sectionParam=urlParams.get("section");
const conceptParam=urlParams.get("concept");
if(targetParam==="app"||targetParam==="website")state.target=targetParam;
const routeId=/^[a-z0-9-]+$/;
const familyWeb={technical:["terminal","schematic","grid","blueprint"],editorial:["columns","newspaper","index","minimal"],art:["poster","product","orbital","geometry","organic"],collage:["scrapbook","collage","travel","risograph"]};
const familyApp={data:["board","table","ledger","dashboard","chart","grid","inventory"],writing:["chat","diary","notebook","reader"],routes:["map","calendar","flight","flow"],terminal:["console","terminal","incident"],creative:["media","canvas","waveform","product"]};
function setAnnouncement(message){$("rx-announcement").textContent=message;}
function cssTokens(s){
 const p=s.palette;
 return "--paper:"+validColor(p.paper)+";--ink:"+validColor(p.ink)+";--accent:"+validColor(p.accent)+";--soft:"+validColor(p.secondary)+";";
}
function getName(s){return clean($("rx-name").value,90)||s.title;}
function webVisual(s,name,variant){
 const title=safe(name),purpose=safe(s.purpose.split(" with ")[0].slice(0,105));
 const header='<div class="rx-v-header"><strong>'+safe((name.length>20?name.slice(0,20):name).toUpperCase())+'</strong><span>WORK　 ABOUT　 ↗</span></div>';
 const text='<span class="rx-v-kicker">'+safe(s.family.toUpperCase())+' / STUDIO 01</span><h3 class="rx-v-title">'+title+'</h3><p class="rx-v-sub">'+purpose+'</p>';
 const call='<span class="rx-v-cta">EXPLORE THE WORK ↗</span>';
 const layout=s.layout;
 let interior;
 if(familyWeb.technical.includes(layout)){
  interior='<div class="rx-v-console"><span>&gt; design --purpose</span><strong>'+title+'</strong><span>&gt; build --accessible</span><em>✓ CONTENT BEFORE DECORATION</em></div>';
 }else if(familyWeb.editorial.includes(layout)){
  interior='<div class="rx-v-columns"><div>'+text+call+'</div><aside><span>01 / INTENT</span><span>02 / CRAFT</span><span>03 / EVIDENCE</span><span>04 / CONTACT</span></aside></div>';
 }else if(familyWeb.art.includes(layout)){
  interior='<div class="rx-v-feature"><div>'+text+call+'</div><div class="rx-v-feature-art"><i>✳</i></div></div>';
 }else if(familyWeb.collage.includes(layout)){
  interior='<div class="rx-v-collage"><div class="rx-v-collage-art"></div><div>'+text+call+'</div></div>';
 }else{
  interior='<div class="rx-v-main">'+text+call+'<div class="rx-v-art"></div></div>';
 }
 return header+interior+'<div class="rx-v-index"><span>ORIGINAL DESIGN STUDY</span><span>01 ↗</span></div>';
}
function appVisual(s,name){
 const title=safe(name),kind=s.layout;
 let body="";
 if(familyApp.data.includes(kind)){
  body='<div class="rx-device-big">08<span style="font-size:.45em"> / 12</span></div><small>EXAMPLE ACTIVITY · NOT REAL DATA</small><div class="rx-device-chart"><i></i><i></i><i></i><i></i><i></i></div><div class="rx-device-row"><b>Review activity</b><i>↗</i></div>';
 }else if(familyApp.writing.includes(kind)){
  body='<div class="rx-device-block"><b>A quiet place to start.</b><p>Let the important content have the space it deserves.</p></div><div class="rx-device-row"><span>Write one useful thought</span><i>✎</i></div><div class="rx-device-row"><span>Saved in this preview</span><i>✓</i></div>';
 }else if(familyApp.routes.includes(kind)){
  body='<div class="rx-device-route"><span>09:00 · First stop</span><span>11:30 · Next place</span><span>14:00 · Take a break</span></div><div class="rx-device-row"><span>See full journey</span><i>→</i></div>';
 }else if(familyApp.terminal.includes(kind)){
  body='<div class="rx-device-block"><small>STATUS / SAMPLE</small><b>All clear.</b><p>Inspectable states, not invented telemetry.</p></div><div class="rx-device-row"><span>Logs</span><i>↗</i></div><div class="rx-device-row"><span>Settings</span><i>↗</i></div>';
 }else if(familyApp.creative.includes(kind)){
  body='<div class="rx-device-cover"><i>✦</i><b>Form & feeling.</b></div><div class="rx-device-row"><span>Continue editing</span><i>↗</i></div>';
 }else if(kind==="progress"||kind==="focus"){
  body='<div class="rx-device-cover"><i>◌</i><b>One moment.</b></div><div class="rx-device-row"><span>Begin gently</span><i>→</i></div>';
 }else{
  body='<div class="rx-device-row"><span>✓ Write a useful brief</span><i>01</i></div><div class="rx-device-row"><span>○ Make real progress</span><i>02</i></div><div class="rx-device-row"><span>○ Review the result</span><i>03</i></div>';
 }
 return '<div class="rx-device"><div class="rx-device-status"><span>9:41</span><span>● ● ● ▰</span></div>'+
  '<div class="rx-device-content"><small>'+safe(s.family.toUpperCase())+' / ORIGINAL STUDY</small><h4>'+title+'</h4>'+body+'</div>'+
  '<div class="rx-device-tab"><span>TODAY</span><span>EXPLORE</span><span>YOU</span></div></div>';
}
function visual(s,mini=false){
 const target=s.target,variant=state.variant,name=mini?s.title:getName(s);
 const body=target==="website"?webVisual(s,name,variant):appVisual(s,name);
 return '<div class="rx-visual '+(mini?"rx-mini ":"")+(target==="app"?"rx-app ":"rx-web ")+
  'rx-v-'+safe(variant)+'" data-layout="'+safe(s.layout)+'" style="'+cssTokens(s)+'">'+body+'</div>';
}
function matching(){
 const q=state.query.toLowerCase().trim();
 return state.styles.filter(s=>s.target===state.target&&(state.family==="All"||s.family===state.family)&&(!q||[s.title,s.family,s.purpose,s.visual,s.layout,s.typography].join(" ").toLowerCase().includes(q)));
}
function renderGallery(){
 const matched=matching();
 const showing=matched.slice(0,state.limit);
 $("rx-count").textContent=matched.length+" of 24 "+(state.target==="website"?"website":"mobile app")+" designs";
 $("rx-gallery").innerHTML=showing.length?showing.map(s=>{
  return '<button type="button" class="rx-card" data-style="'+safe(s.id)+'" aria-pressed="'+String(state.selected?.id===s.id)+'" aria-label="Select '+safe(s.title)+', '+safe(s.family)+' design">'+
  visual(s,true)+'<span class="rx-card-bottom"><strong>'+safe(s.title)+'</strong><small>'+safe(s.family)+' · '+(state.target==="website"?"WEBSITE":"MOBILE")+'</small></span></button>';
 }).join(""):'<div class="rx-gallery-empty"><strong>No matching styles.</strong><p>Try a different search or clear filters.</p></div>';
 const more=$("rx-more");more.hidden=matched.length<=state.limit;more.textContent="Show more designs ("+Math.min(12,matched.length-state.limit)+" more) ↓";
}
function renderFamilies(){
 const families=[...new Set(state.styles.filter(s=>s.target===state.target).map(s=>s.family))].sort();
 $("rx-family").innerHTML='<option value="All">All directions</option>'+families.map(f=>'<option value="'+safe(f)+'">'+safe(f)+'</option>').join("");
 $("rx-family").value=state.family;
}
function renderTargetButtons(){
 document.querySelectorAll("[data-target]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.target===state.target)));
}
function selectedIndex(){
 const arr=state.styles.filter(s=>s.target===state.target);return arr.findIndex(s=>s.id===state.selected?.id)+1;
}
function renderSelected(){
 const s=state.selected;if(!s)return;
 $("rx-selected-title").textContent=s.title;
 $("rx-selected-purpose").textContent=s.purpose;
 $("rx-selected-index").textContent=String(selectedIndex()).padStart(2,"0")+" / 24";
 $("rx-typography").textContent=s.typography+" · "+s.density+" density";
 $("rx-motion").textContent=s.motion;
 $("rx-avoid").textContent=s.avoid;
 $("rx-preview-platform").textContent=state.target==="website"?"RESPONSIVE WEB":"iOS / ANDROID CONCEPT";
 $("rx-preview-stage").innerHTML=visual(s);
 $("rx-palette").innerHTML=[s.palette.paper,s.palette.ink,s.palette.accent,s.palette.secondary].map((color,i)=>
  '<span title="'+["Background","Primary text","Accent","Secondary"][i]+": "+safe(color)+'" style="background:'+validColor(color)+'"></span>').join("");
 $("rx-source").href="./styles.html#style/"+encodeURIComponent(s.id);
 document.querySelectorAll("[data-variant]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.variant===state.variant)));
}
function updateFocus(){
 const list=state.flows[state.target];
 const select=$("rx-focus");
 const desired=select.value;
 select.innerHTML='<option value="">'+(state.target==="website"?"Choose a website section":"Choose a mobile screen")+'</option>'+list.map(item=>
  '<option value="'+safe(item.id)+'">'+safe(item.title)+'</option>').join("");
 select.disabled=$("rx-scope").value!=="section";
 if(list.some(x=>x.id===desired))select.value=desired;
 else if(select.disabled)select.value="";
 else select.value=state.target==="website"?"hero":"home";
}
function updateBlueprint(){
 const select=$("rx-blueprint"),desired=select.value;
 select.innerHTML='<option value="">Let the agent inspect the product structure</option>'+
 state.blueprints[state.target].map(x=>'<option value="'+safe(x.id)+'">'+safe(x.title)+'</option>').join("");
 if(state.blueprints[state.target].some(x=>x.id===desired))select.value=desired;
}
function updateConcept(){
 const select=$("rx-concept"),desired=select.value;
 const concepts=state.concepts[state.target],families=[...new Set(concepts.map(c=>c.family))];
 select.innerHTML='<option value="">No extra UX concept</option>'+families.map(f=>{
   const options=concepts.filter(c=>c.family===f).map(c=>'<option value="'+safe(c.id)+'">'+safe(c.title)+'</option>').join("");
   return '<optgroup label="'+safe(f)+'">'+options+'</optgroup>';
 }).join("");
 if(concepts.some(c=>c.id===desired))select.value=desired;
}
function setTarget(target,chosenStyle=""){
 if(!["website","app"].includes(target)||!state.loaded)return;
 state.target=target;state.family="All";state.query="";state.limit=12;
 $("rx-search").value="";
 state.selected=state.styles.find(s=>s.target===target&&s.id===chosenStyle)||state.styles.find(s=>s.target===target);
 const selectedPosition=state.styles.filter(s=>s.target===target).findIndex(s=>s.id===state.selected?.id);
 state.limit=Math.max(12,Math.ceil((selectedPosition+1)/12)*12);
 renderTargetButtons();renderFamilies();updateFocus();updateBlueprint();updateConcept();renderGallery();renderSelected();renderPrompt();
 updateShareableUrl();
}
function chooseStyle(id){
 const style=state.styles.find(x=>x.id===id&&x.target===state.target);
 if(!style)return;
 state.selected=style;renderGallery();renderSelected();renderPrompt();updateShareableUrl();
}
function updateShareableUrl(){
 // Never put users' private project details into a shareable URL.
 const next=new URL(location.href);next.searchParams.set("type",state.target);next.searchParams.set("style",state.selected?.id||"");
 const chosen=$("rx-scope").value==="section"?$("rx-focus").value:"";
 if(chosen)next.searchParams.set("section",chosen);else next.searchParams.delete("section");
 const concept=$("rx-concept").value;
 if(concept)next.searchParams.set("concept",concept);else next.searchParams.delete("concept");
 history.replaceState(null,"",next.pathname+next.search+next.hash);
}
function projectInputs(){
 const form=$("rx-form");
 const mode=form.querySelector('input[name="mode"]:checked')?.value||"existing";
 return {mode,scope:$("rx-scope").value,name:clean($("rx-name").value,90),url:clean($("rx-url").value,350),
  goal:clean($("rx-goal").value,550),change:clean($("rx-change").value,650),preserve:clean($("rx-preserve").value,550),
  audience:clean($("rx-audience").value,250),stack:clean($("rx-stack").value,250),variant:state.variant};
}
function promptArgs(){
 const id=$("rx-focus").value;
 const blueprintId=$("rx-blueprint").value;
 return {target:state.target,style:state.selected,project:projectInputs(),
  focus:state.flows[state.target].find(x=>x.id===id)||null,
  blueprint:state.blueprints[state.target].find(x=>x.id===blueprintId)||null,
  concept:state.concepts[state.target].find(x=>x.id===$("rx-concept").value)||null};
}
function renderPrompt(){
 if(!state.loaded||!state.selected)return;
 try{
  const args=promptArgs();
  const text=state.output==="audit"?composeAudit(args):composeBuild(args);
  $("rx-prompt").value=text;
  $("rx-ready").textContent=state.output==="audit"?"Audit brief ready":"Redesign brief ready";
  $("rx-prompt-size").textContent=text.length.toLocaleString()+" characters";
  setAnnouncement("Prompt tailored to "+state.selected.title+". You can edit it before copying.");
 }catch(error){
  $("rx-ready").textContent="Check your selections";
  setAnnouncement(String(error.message||error));
 }
}
async function copyOutput(){
 if(!state.loaded)return setAnnouncement("The design catalog has not loaded. Copying is unavailable.");
 const text=$("rx-prompt").value;
 if(!text||text.startsWith("Choose a design"))return setAnnouncement("Generate a prompt first.");
 try{
  if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(text);}
  else{
   const el=$("rx-prompt");el.focus();el.select();
   if(!document.execCommand("copy"))throw Error("Clipboard unavailable");
  }
  setAnnouncement("Copied your "+(state.output==="audit"?"quality review":"design remake")+" prompt. Paste it into an AI builder with access to your project.");
 }catch(_){
  $("rx-prompt").focus();$("rx-prompt").select();
  setAnnouncement("Automatic copying is blocked here. Your prompt is selected. Press Ctrl+C (or Cmd+C) to copy.");
 }
}
function download(){
 if(!state.loaded)return setAnnouncement("The catalog must load before exporting.");
 const content=$("rx-prompt").value;if(!content)return setAnnouncement("Generate a prompt first.");
 const name=clean($("rx-name").value,60).toLowerCase().replace(/[^a-z0-9_-]+/g,"-").replace(/^-|-$/g,"")||"my-project";
 const filename=name+"-"+(state.output==="audit"?"audit":"redesign")+".md";
 const file=new Blob([content],{type:"text/markdown;charset=utf-8"});
 const url=URL.createObjectURL(file);
 const a=document.createElement("a");a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();
 URL.revokeObjectURL(url);setAnnouncement("Saved "+filename+" on this device.");
}
function setupEvents(){
 document.querySelectorAll("[data-target]").forEach(b=>b.addEventListener("click",()=>setTarget(b.dataset.target)));
 $("rx-search").addEventListener("input",e=>{state.query=e.target.value;state.limit=12;renderGallery();});
 $("rx-family").addEventListener("change",e=>{state.family=e.target.value;state.limit=12;renderGallery();});
 $("rx-clear").addEventListener("click",()=>{state.query="";state.family="All";state.limit=12;$("rx-search").value="";$("rx-family").value="All";renderGallery();});
 $("rx-more").addEventListener("click",()=>{state.limit=Math.min(24,state.limit+12);renderGallery();});
 $("rx-gallery").addEventListener("click",e=>{const b=e.target.closest("[data-style]");if(b)chooseStyle(b.dataset.style);});
 document.querySelectorAll("[data-variant]").forEach(b=>b.addEventListener("click",()=>{state.variant=b.dataset.variant;renderSelected();renderPrompt();}));
 $("rx-form").addEventListener("submit",e=>{e.preventDefault();renderPrompt();$("rx-ready").scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"center"});});
 $("rx-form").addEventListener("input",e=>{if(e.target.id==="rx-name")renderSelected();renderPrompt();});
 $("rx-form").addEventListener("change",e=>{if(e.target.id==="rx-scope")updateFocus();renderPrompt();updateShareableUrl();});
 document.querySelectorAll("[data-output]").forEach(b=>b.addEventListener("click",()=>{
  state.output=b.dataset.output;
  document.querySelectorAll("[data-output]").forEach(x=>x.setAttribute("aria-pressed",String(x===b)));
  renderPrompt();
 }));
 $("rx-prompt").addEventListener("input",()=>{$("rx-ready").textContent="Your edits are ready to copy";$("rx-prompt-size").textContent=$("rx-prompt").value.length.toLocaleString()+" characters";});
 $("rx-copy").addEventListener("click",copyOutput);
 $("rx-download").addEventListener("click",download);
}
async function init(){
 setupEvents();renderTargetButtons();
 try{
  const paths=["./data/styles.json","./data/website.json","./data/app.json","./data/guided-websites.json","./data/guided-apps.json","./data/concepts-web.json","./data/concepts-app.json"];
  const responses=await Promise.all(paths.map(path=>fetch(path,{cache:"no-cache"})));
  for(let i=0;i<responses.length;i++)if(!responses[i].ok)throw Error("Could not read "+paths[i]);
  const [styles,web,app,webBlueprints,appBlueprints,webConcepts,appConcepts]=await Promise.all(responses.map(r=>r.json()));
  if(styles.styles?.length!==48||web.sections?.length!==32||app.flows?.length!==32||webBlueprints.blueprints?.length!==20||appBlueprints.blueprints?.length!==20||webConcepts.concepts?.length!==100||appConcepts.concepts?.length!==100)throw Error("An expected style, journey or concept catalog is incomplete.");
  state.styles=styles.styles.filter(s=>routeId.test(s.id)&&["app","website"].includes(s.target)&&s.palette);
  state.flows.website=web.sections;state.flows.app=app.flows;
  state.blueprints.website=webBlueprints.blueprints;state.blueprints.app=appBlueprints.blueprints;
  state.concepts.website=webConcepts.concepts;state.concepts.app=appConcepts.concepts;
  state.loaded=true;
  if(sectionParam&&routeId.test(sectionParam)&&state.flows[state.target].some(x=>x.id===sectionParam))$("rx-scope").value="section";
  setTarget(state.target,styleParam||"");
  if($("rx-scope").value==="section"&&state.flows[state.target].some(x=>x.id===sectionParam))$("rx-focus").value=sectionParam;
  if(state.concepts[state.target].some(x=>x.id===conceptParam))$("rx-concept").value=conceptParam;
  renderPrompt();updateShareableUrl();
  setAnnouncement("48 original design directions loaded. Select a preview, describe your project, and copy a ready-to-edit prompt.");
 }catch(error){
  $("rx-count").textContent="Design library unavailable";
  $("rx-ready").textContent="Unable to load local catalog";
  setAnnouncement("Could not load the source catalogs. Try the original Style Laboratory or view the prompts on GitHub. "+String(error.message||""));
  $("rx-gallery").innerHTML='<p class="rx-failure">The design library could not load. <a href="./styles.html">Browse the original style library ↗</a></p>';
 }
}
init();
