/* Prompt-Vault Mobile Studio: original interactive browser counterparts to the Expo Native Kit.
   Simulations only. No remote service, AI, upload, payment, authentication or deletion. */
const $=id=>document.getElementById(id);
const esc=v=>String(v==null?"":v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const state={
 flows:[],journeys:[],journey:"tasks",flow:"onboarding",platform:"android",theme:"light",scenario:"normal",
 tab:"decisions",demo:{step:0,choice:"Personal",fields:{},flag:false,selected:[],messages:["Welcome to the sample conversation."],removed:null,notice:""},
 tasks:[{id:"a",title:"Write a useful brief",done:false},{id:"b",title:"Try a real interaction",done:false},{id:"c",title:"Review the result",done:true}],
 journeyQuery:"",patternQuery:"",ready:false
};
const records=["Morning review","Design the first screen","Share the prototype","Accessibility check"];
const findFlow=id=>state.flows.find(f=>f.id===id)||{id,title:id,job:"A task-first mobile screen.",variants:[],behavior:"Keep actions clear.",states:"normal; error; success",verify:"Exercise the core task."};
const findJourney=id=>state.journeys.find(j=>j.id===id)||state.journeys[0]||{id:"tasks",title:"Task and to-do app",job:"Capture, prioritize and finish",flows:["onboarding","home","task-management"]};
let toastHandle=0;
function toast(message){
 const el=$("ms-toast");if(!el)return;el.textContent=message;el.hidden=false;
 clearTimeout(toastHandle);toastHandle=setTimeout(()=>{el.hidden=true;},3500);
}
function resetDemo(){
 state.demo={step:0,choice:"Personal",fields:{},flag:false,selected:[],messages:["Welcome to the sample conversation."],removed:null,notice:""};
}
function option(label,action,value,selected){
 return '<button type="button" data-act="'+esc(action)+'" data-val="'+esc(value||label)+'" aria-pressed="'+(selected?"true":"false")+'">'+esc(label)+'</button>';
}
function chips(labels,choice,action){
 return '<div class="ms-app-chips">'+labels.map(x=>option(x,action,x,choice===x)).join("")+'</div>';
}
function button(label,action,secondary=false,value=""){
 return '<button type="button" class="'+(secondary?"ms-app-secondary":"ms-app-primary")+'" data-act="'+esc(action)+'" data-val="'+esc(value)+'">'+esc(label)+'</button>';
}
function row(name,sub="",action="",value=""){
 const content='<span><b>'+esc(name)+'</b>'+(sub?'<br><small>'+esc(sub)+'</small>':"")+'</span><span aria-hidden="true">↗</span>';
 return action?'<button type="button" class="ms-app-row" data-act="'+esc(action)+'" data-val="'+esc(value)+'">'+content+'</button>':
 '<div class="ms-app-row">'+content+'</div>';
}
function field(label,id,placeholder="",type="text"){
 return '<label class="ms-app-field"><span class="ms-app-label">'+esc(label)+'</span><input class="ms-app-input" data-field="'+esc(id)+'" type="'+esc(type)+'" placeholder="'+esc(placeholder)+'" value="'+esc(state.demo.fields[id]||"")+'" autocomplete="off"></label>';
}
function card(heading,body){
 return '<div class="ms-app-card"><h4>'+esc(heading)+'</h4><p>'+esc(body)+'</p></div>';
}
function note(body,isError=false){return '<div class="ms-app-note'+(isError?" error":"")+'" role="status">'+esc(body)+'</div>';}
function progress(current,total){
 return '<div class="ms-app-progress" role="progressbar" aria-valuemin="0" aria-valuemax="'+total+'" aria-valuenow="'+current+'"><span style="width:'+Math.min(100,Math.round(current/total*100))+'%"></span></div>';
}
function commonHeading(label,heading,lead){
 return '<div class="ms-app-kicker">'+esc(label)+'</div><div class="ms-app-heading">'+esc(heading)+'</div>'+(lead?'<p class="ms-app-muted">'+esc(lead)+'</p>':"");
}
function itemList(items){
 return '<div class="ms-app-stack">'+items.join("")+'</div>';
}
function taskRows(showCompleted=true){
 const found=state.tasks.filter(t=>showCompleted||!t.done);
 if(!found.length)return note("No items here yet. Create one to get started.");
 return itemList(found.map(t=>row((t.done?"✓ ":"○ ")+t.title,t.done?"Completed · tap to undo":"Open · tap to complete","toggle-task",t.id)));
}
const scenarioMessages={
 onboarding:["Example setup complete. The user can open their first task.","Setup was interrupted. Keep the choices and allow a restart."],
 authentication:["Format accepted locally. No account was created and no session exists.","Unable to sign in. No identity provider is connected; use a real provider to test recovery."],
 home:["Sample task completed. Progress is updated in this session.","Home content unavailable. Preserve the current task and show a retry."],
 navigation:["Destination selected and current location remains visible.","Destination unavailable. Keep the user on the previous accessible view."],
 search:["Matching sample results appear below the search input.","No results found. Keep the search term so it can be edited."],
 filters:["Filtered sample list is visible and resettable.","Nothing matches. Remove or clear the active filters."],
 "list-feed":["Activity detail is ready to inspect.","Could not load more activity. Keep already displayed items."],
 detail:["Item saved for this preview only.","Unable to save. Preserve the current item and allow another try."],
 "create-edit":["Example task saved in local memory.","Required title missing. Preserve all entered text for correction."],
 "multi-step-form":["Sample form reviewed. Nothing was submitted to a server.","Form is incomplete. Keep earlier answers and return to the missing field."],
 "task-management":["Task completion can be undone.","Action failed. Keep the previous task state intact."],
 calendar:["Selected example date has been displayed.","Could not load schedule. Keep the selected date visible."],
 "dashboard-data":["Static example metrics loaded; these are not measured results.","Example metrics are unavailable. Do not fabricate replacement numbers."],
 notifications:["Sample notice marked read locally.","Notification operation unavailable. No OS permission has been changed."],
 chat:["Message added to this device's sample conversation only.","Message was not sent to a recipient. Preserve it in the composer."],
 "media-library":["Sample media item selected; no content streamed.","Media unavailable. Keep the collection accessible and give a fallback."],
 "upload-capture":["Example file selected. No real upload performed.","Simulated upload failed. No file left your device."],
 checkout:["Mock order reviewed. No money has been charged.","Checkout unavailable. No payment processor has been connected."],
 paywall:["Example upgrade preview displayed. No subscription began.","Purchase flow unavailable. Existing access remains unchanged."],
 profile:["Example profile value kept in this view.","Profile was not saved remotely. Retain your typed changes."],
 "settings-privacy":["Optional preference updated in this demonstration.","Preference update failed. Preserve the original user choice."],
 permissions:["Permission choice simulated; no OS setting changed.","Permission declined. Show a manual alternative without blocking the app."],
 "offline-sync":["Example local state visible. No server sync occurred.","Sync unavailable. Keep unsent local changes and a retry path."],
 "empty-states":["First sample item created in local memory.","Creation unavailable. Continue to offer a clear first action."],
 "errors-recovery":["Simulated error resolved; no remote data was modified.","Connection example failed. Preserve local work and offer retry."],
 "undo-confirmation":["Removed item restored within the demo.","Undo unavailable. Do not claim that deletion was reversed."],
 accessibility:["Example accessibility control is reachable.","Control cannot be operated. Include keyboard and assistive input fallback."],
 "localization-rtl":["Sample language changed. Full i18n still requires native testing.","Translation missing. Use a transparent fallback instead of broken text."],
 "multi-select-bulk":["Example selection action completed locally.","Bulk action failed. Preserve selected items and allow safe retry."],
 "table-data":["Sample ordering updated with consistent column context.","Data table unavailable. Do not show values without their units."],
 "ai-assistant":["Scripted sample suggestion shown for review, not applied.","No AI provider connected. Keep manual actions available."],
 "account-deletion":["Explanation shown. No remote account exists to delete.","Deletion not executed. Never display a false completion state."]
};
function scenarioNote(){
 const [success,error]=scenarioMessages[state.flow]||["Example state confirmed locally.","An example action failed; retain entered work and retry."];
 if(state.scenario==="success")return note(success);
 if(state.scenario==="error")return note(error,true)+button("Return to normal preview","scenario-retry",true);
 return "";
}
function renderBody(id){
 const d=state.demo,choice=d.choice,step=d.step,fields=d.fields;
 switch(id){
 case "onboarding":{
  const titles=["Start with something useful.","Make it your own.","You're ready."];
  return commonHeading("WELCOME / "+String(step+1)+" OF 3",titles[Math.min(step,2)],"Understand the benefit before asking for an account.")+
   '<div class="ms-app-art" aria-hidden="true">✳</div>'+progress(step+1,3)+
   chips(["Personal","Team","Just exploring"],choice,"choose")+
   button(step===2?"Open home →":"Continue →","continue")+button("Skip introduction","go",true,"home");
 }
 case "authentication":
  return commonHeading("ACCOUNT / DEMONSTRATION","Welcome back.","There is no authentication provider connected.")+
   field("Email address","email","you@example.com","email")+field("Password","password","Not saved in demo","password")+
   button("Preview sign-in","sign-in")+button("Forgot password?","recovery",true);
 case "home":
  return commonHeading("YOUR DAY / WORKBENCH","Good morning.","One useful thing at a time.")+
   '<div class="ms-app-feature"><span>NEXT MEANINGFUL STEP</span><strong>'+esc(state.tasks.find(t=>!t.done)?.title||"Everything complete")+'</strong><small>Your progress is local sample data.</small></div>'+
   progress(state.tasks.filter(t=>t.done).length,Math.max(1,state.tasks.length))+
   button("Create a task","go",false,"create-edit")+taskRows(false);
 case "navigation":
  return commonHeading("WAYFINDING / DEMO","Find your place.","Explore one section at a time.")+
   chips(["Today","Explore","Library","You"],choice,"choose")+card(choice,"This destination was selected. Real screen navigation uses native routes.")+
   button("Open search","go",false,"search");
 case "search":{
  const q=String(fields.search||"").toLowerCase();
  const items=["Design checklist","Research notes","Sprint plan","Saved article"].filter(x=>x.toLowerCase().includes(q));
  return commonHeading("LIBRARY / DISCOVER","Find something.","Useful results, clear empty state.")+
   field("Search","search","Try notes")+
   '<div id="ms-search-results" class="ms-app-stack">'+(items.length?items.map(x=>row(x,"Sample match","go","detail")).join(""):note("Nothing matches. Try a broader search."))+'</div>';
 }
 case "filters":{
  const visible=state.tasks.filter(t=>choice==="Everything"||(choice==="Completed"?t.done:!t.done));
  return commonHeading("EXPLORE / FILTER","Make it relevant.","Keep filters visible and reversible.")+
   chips(["Everything","Active","Completed"],choice,"choose")+
   itemList(visible.length?visible.map(t=>row(t.title,t.done?"Completed":"Active","toggle-task",t.id)):[note("No items match this filter.")])+
   button("Clear filters","reset-choice",true);
 }
 case "list-feed":
  return commonHeading("LATEST / UPDATES","Your activity.","Tap an item to inspect it.")+
   itemList(records.map((x,i)=>row(x,"Sample update "+String(i+1),"go","detail")));
 case "detail":
  return commonHeading("DETAIL / 001","Release preparation.","Give the content room to breathe.")+
   '<div class="ms-app-library-cover">The work<br>is the story.</div>'+
   card("Design checklist","An example content detail with metadata, real hierarchy and a useful next action.")+
   button(d.flag?"Remove from saved":"Save this item","toggle-flag")+button("Back to activity","go",true,"list-feed");
 case "create-edit":
  return commonHeading("CREATE / TASK","Capture an idea.","Everything begins with a clear description.")+
   field("Task title","title","One thing worth finishing")+button("Save task","save-task")+
   button("See task list","go",true,"task-management");
 case "multi-step-form":{
  const titles=["What are you creating?","Who is it for?","Review your answers"];
  return commonHeading("STEP "+(step+1)+" / 3",titles[Math.min(step,2)],"Back and validation prevent lost effort.")+
   progress(step+1,3)+(step<2?field(step===0?"Project name":"Audience","answer","Enter an answer"):card("Your answer",fields.answer||"No answer entered"))+
   '<div class="ms-app-chips">'+button("← Back","back-form",true)+button(step===2?"Finish demo":"Continue →","advance-form")+'</div>';
 }
 case "task-management":
  return commonHeading("WORK / TODAY","Make progress.","Tap to complete or undo a task.")+
   progress(state.tasks.filter(t=>t.done).length,Math.max(1,state.tasks.length))+taskRows()+
   button("Add another task","go",false,"create-edit");
 case "calendar":{
  const days=Array.from({length:14},(_,i)=>String(i+1));
  return commonHeading("CALENDAR / EXAMPLE","Your schedule.","Dates are illustrative, not synced to a calendar.")+
   chips(days,choice==="Personal"?"1":choice,"choose")+card("Day "+(choice==="Personal"?"1":choice),"Sample day: "+(Number(choice)%3?"Nothing scheduled":"Example planning session, 10:00 AM"))+
   button("Create an event (demo)","toast",true,"No real calendar service is connected.");
 }
 case "dashboard-data":
  return commonHeading("INSIGHTS / SAMPLE","See the signal.","Numbers are static examples, not user analytics.")+
   '<div class="ms-app-stat-grid"><div class="ms-app-stat"><strong>08</strong><span>Projects</span></div><div class="ms-app-stat"><strong>72%</strong><span>Example goal</span></div></div>'+
   '<div class="ms-app-chart" role="img" aria-label="Illustrative bars with no real data"><i></i><i></i><i></i><i></i><i></i><i></i></div>'+
   note("Fixed, illustrative values. No real analytics collected.");
 case "notifications":
  return commonHeading("INBOX / CONTROL","Updates that matter.","Only ask for push permission when useful.")+
   row("Optional updates",d.flag?"Enabled in this view":"Disabled in this view","toggle-flag")+
   row("Draft saved","Unread · sample","toast","Marked read locally.")+
   row("Weekly review","Unread · sample","toast","Marked read locally.");
 case "chat":
  return commonHeading("MESSAGES / LOCAL","Conversation.","A sample composer, no remote service.")+
   itemList(d.messages.map((x,i)=>'<div class="ms-app-bubble'+(i===0?"":" from-me")+'">'+esc(x)+'</div>'))+
   field("Message","message","Write something")+button("Send locally","send");
 case "media-library":
  return commonHeading("LIBRARY / CONTENT","Your collection.","Reading and watching begin with useful information.")+
   '<div class="ms-app-library-cover">Stories<br>worth keeping.</div>'+
   row("The Long Read","Article · 8 min","select","The Long Read")+
   row("Chapter One","Book · 12 min","select","Chapter One")+
   row("An Audio Essay","Audio · 3 min","select","An Audio Essay")+
   (choice!=="Personal"?note("Selected: "+choice+". No media was streamed."):"");
 case "upload-capture":
  return commonHeading("CAPTURE / CONSENT","Import a file.","Device permission and upload must be handled separately.")+
   '<div class="ms-app-art" aria-hidden="true">↥</div>'+
   note(d.flag?"Example file selected. No data leaves your browser.":"No file selected. No device storage permission requested.")+
   button("Simulate selecting a file","toggle-flag");
 case "checkout":
  return commonHeading("PURCHASE / REVIEW","Review everything.","A mock checkout. No charges, taxes or SDK.")+
   card("Example order","Illustrative premium plan · $9.99 per month")+
   row("Subtotal","$9.99 · sample")+row("Tax","Not calculated · demo")+
   note("Connect an approved payment SDK and show actual renewal terms before selling.")+
   button("Simulate checkout","toast",false,"Example confirmation only. Nothing was charged.");
 case "paywall":
  return commonHeading("PREMIUM / CHOICE","Make more room.","No pressure, easy decline, visible terms.")+
   '<div class="ms-app-feature"><span>EXAMPLE SUBSCRIPTION</span><strong>$9.99 / month</strong><small>Illustrative only. No purchase integration.</small></div>'+
   row("More projects","Premium example feature")+row("Advanced exports","Premium example feature")+
   button("Preview upgrade","toast",false,"Demo only. No subscription started.")+
   button("Not now","toast",true,"You can keep exploring.")+button("Restore (demo)","toast",true,"No purchase provider connected.");
 case "profile":
  return commonHeading("PROFILE / USER CONTROL","Your space.","Decide what is visible about you.")+
   '<div class="ms-app-art" aria-hidden="true">✽</div>'+
   field("Display name","name","Your display name")+
   button("Save in this preview","toast",false,"Example profile updated locally.");
 case "settings-privacy":
  return commonHeading("PREFERENCES / PRIVACY","Made for you.","Every optional setting is reversible.")+
   row("Dark appearance",state.theme==="dark"?"Currently enabled":"Currently disabled","toggle-theme")+
   row("Optional product analytics",d.flag?"Enabled in demo":"Off by default","toggle-flag")+
   row("Export your data","Not connected","toast","No stored account data in this demo.")+
   row("Delete account","View explanation","go","account-deletion");
 case "permissions":
  return commonHeading("PERMISSIONS / TRUST","Only when needed.","Explain why you ask and provide a way to say no.")+
   card("Notification reminders","Request OS permission only after someone schedules a reminder.")+
   button("Allow (demo)","toast",false,"Simulated approval. No device setting was changed.")+
   button("Not now","toast",true,"No permissions requested.");
 case "offline-sync":
  return commonHeading("OFFLINE / RECOVERY","Your work stays visible.","This preview has no network storage.")+
   note(d.flag?"Simulated offline state; in-memory data only.":"Simulated online state; still no sync server.")+
   button(d.flag?"Return online (demo)":"Go offline (demo)","toggle-flag")+
   button("Retry sync (demo)","toast",true,"No network service is connected.");
 case "empty-states":
  return commonHeading("NEW / BEGIN","Nothing here yet.","A useful empty state points to the next task.")+
   '<div class="ms-app-art" aria-hidden="true">✳</div>'+
   card("A fresh start","Create one task. You can change it later.")+
   button("Create first task","go",false,"create-edit");
 case "errors-recovery":
  return commonHeading("RETRY / SAFETY","Make recovery clear.","Error messages should describe the problem and next action.")+
   note(d.flag?"The simulated problem is resolved.":"Example network failure. Your draft is safe.",!d.flag)+
   button("Retry simulation","toggle-flag");
 case "undo-confirmation":
  return commonHeading("RECOVER / ACTION","Mistakes are reversible.","Review before deletion and provide an undo.")+
   (state.tasks.length?row(state.tasks[0].title,"First local task"):note("No tasks remain in the demo."))+
   button("Remove first local task","remove-task")+
   (d.removed?button("Undo removal","undo-task",true):"");
 case "accessibility":
  return commonHeading("INCLUSION / CONTROLS","Comfort comes first.","Real accessible targets and perceivable states.")+
   row("Larger sample text",d.flag?"Enabled":"Default","toggle-flag")+
   '<p class="ms-app-reading" style="font-size:'+(d.flag?"25":"19")+'px">Give every person a comfortable way to read, understand and act.</p>'+
   button("Test action","toast",false,"Accessible button pressed.");
 case "localization-rtl":
  return commonHeading("LANGUAGES / LAYOUT","The interface travels.","A sample of translation direction, not production i18n.")+
   chips(["English","العربية"],choice,"choose")+
   '<div class="ms-app-card'+(choice==="العربية"?" ms-app-rtl":"")+'"><h4>'+(choice==="العربية"?"مرحباً بك":"Welcome")+'</h4><p>'+(choice==="العربية"?"مثال توضيحي باللغة العربية":"Localization influences alignment, text and format.")+'</p></div>';
 case "multi-select-bulk":
  return commonHeading("SELECTION / REVIEW","Act on many.","Count selections; make deselection easy.")+
   itemList(records.map(x=>row((d.selected.includes(x)?"☑ ":"□ ")+x,d.selected.includes(x)?"Selected":"Tap to select","select-multi",x)))+
   note(String(d.selected.length)+" selected")+
   button("Archive selection (demo)","archive")+button("Clear selected","clear-selected",true);
 case "table-data":
  return commonHeading("RECORDS / ORDER","A readable table.","Headers, labels and state must be unambiguous.")+
   chips(["Name","Status"],choice,"choose")+
   itemList((choice==="Status"?[...records].reverse():records).map((x,i)=>row(x,(i%2?"Complete":"Active")+" · example")));
 case "ai-assistant":
  return commonHeading("ASSIST / HUMAN CONTROL","Help, not autopilot.","Example is scripted. No model inference occurs.")+
   field("Ask for help","ask","Help me plan my day")+
   button("Preview scripted answer","toast",false,"Example: choose one priority, break it into steps, then review. No model was used.")+
   button("Create your own task","go",true,"create-edit");
 case "account-deletion":
  return commonHeading("ACCOUNT / EXIT","Your data, your choice.","No remote account exists in this demo.")+
   card("Data rights","Production export and deletion must call real authenticated backend endpoints.")+
   button("Preview export","toast",false,"No remote user data to export.")+
   button("Preview deletion","toast",true,"No account exists, so nothing was deleted.");
 default:
  return commonHeading("APP / DESIGN","A screen that serves.","Open another interactive flow.")+
   button("Open home","go",false,"home");
 }
}
function renderPhone(){
 const flow=findFlow(state.flow),phone=$("ms-phone"),screen=$("ms-phone-screen");
 phone.dataset.platform=state.platform;phone.dataset.theme=state.theme;phone.dataset.scenario=state.scenario;
 screen.innerHTML=renderBody(state.flow)+scenarioNote();
 $("ms-current-flow").textContent=flow.title;
 $("ms-flow-name").textContent=flow.title;
}
function renderInspector(){
 const f=findFlow(state.flow),target=$("ms-inspector-content");
 const variants=Array.isArray(f.variants)?f.variants:[];
 if(state.tab==="decisions"){
  target.innerHTML='<p class="ms-inspector-caption">THE JOB TO BE DONE</p><p><strong>'+esc(f.job)+'</strong></p>'+
   '<p class="ms-inspector-caption">WHY THIS STRUCTURE?</p><p>'+esc(f.behavior||"Put the user task first and respect the platform.")+'</p>'+
   '<p class="ms-inspector-caption">ALTERNATIVE DIRECTIONS</p><ul>'+variants.slice(0,3).map(x=>'<li>'+esc(x)+'</li>').join("")+'</ul>';
 }else if(state.tab==="build"){
  target.innerHTML='<p class="ms-inspector-caption">NATIVE IMPLEMENTATION</p>'+
   '<p>View the actual React Native component and reusable primitives. Add your own data models, persistence, permissions and integrations.</p>'+
   '<p class="ms-inspector-caption">QUICK START</p><p>1. Open native-kit. 2. Install dependencies with npm. 3. Run Expo. 4. Copy the needed component. 5. Connect real services.</p>'+
   '<p class="ms-inspector-caption">PROMPT</p><p>Copy a full source-linked Design, Build and Audit prompt below. Do not treat a prompt as production code.</p>';
 }else{
  target.innerHTML='<p class="ms-inspector-caption">VERIFY WITH EVIDENCE</p><p><strong>'+esc(f.verify||"Exercise all functional and recovery states.")+'</strong></p>'+
   '<p class="ms-inspector-caption">FAILURE / RECOVERY STATES</p><p>'+esc(f.states||"empty; loading; success; error; interrupted")+'</p>'+
   '<p>Test Android and iOS devices with TalkBack/VoiceOver, dynamic type, RTL, slow network, reduced motion and screen capture. An interactive browser demo is not a store release test.</p>';
 }
 document.querySelectorAll("[data-tab]").forEach(b=>b.setAttribute("aria-selected",String(b.dataset.tab===state.tab)));
}
function renderJourneys(){
 const target=$("ms-journeys");
 const q=state.journeyQuery.toLowerCase();
 const matches=state.journeys.filter(j=>(j.title+" "+j.job+" "+j.category).toLowerCase().includes(q));
 target.innerHTML=matches.length?matches.map(j=>
 '<button type="button" class="ms-journey" data-choose-journey="'+esc(j.id)+'" aria-current="'+(j.id===state.journey?"true":"false")+'">'+
 '<strong>'+esc(j.title)+'</strong><span>'+esc(j.category)+" · "+j.flows.length+' screens</span></button>').join(""):note("No matching journeys.");
 $("ms-journey-count").textContent=String(state.journeys.length);
}
function renderSteps(){
 const j=findJourney(state.journey),idx=j.flows.indexOf(state.flow);
 $("ms-current-journey").textContent=j.title;
 $("ms-current-job").textContent=j.job;
 $("ms-step-count").textContent=idx<0?"EXTRA PATTERN":"STEP "+String(idx+1)+" OF "+String(j.flows.length);
 $("ms-steps").innerHTML=j.flows.map((id,i)=>'<button type="button" class="ms-step'+(id===state.flow?" is-active":"")+'" data-select-flow="'+esc(id)+'" aria-current="'+(id===state.flow?"step":"false")+'">'+String(i+1).padStart(2,"0")+" "+esc(findFlow(id).title)+'</button>').join("");
 $("ms-prev").disabled=idx<=0;
 $("ms-next").textContent=idx>=j.flows.length-1?"Restart journey →":"Next screen →";
}
function renderPatterns(){
 const q=state.patternQuery.toLowerCase();
 const matches=state.flows.filter(f=>(f.title+" "+f.job+" "+f.id).toLowerCase().includes(q));
 $("ms-pattern-grid").innerHTML=matches.length?matches.map((f,i)=>
 '<button class="ms-pattern-item" type="button" data-select-flow="'+esc(f.id)+'"><span>APP / '+String(state.flows.indexOf(f)+1).padStart(2,"0")+'</span><strong>'+esc(f.title)+'</strong><small>'+esc(f.job)+'</small><b>↗</b></button>').join(""):note("No matching patterns.");
 $("ms-pattern-total").textContent=String(matches.length)+" of "+String(state.flows.length)+" patterns";
}
function renderControls(){
 document.querySelectorAll("[data-platform]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.platform===state.platform)));
 document.querySelectorAll("[data-theme]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.theme===state.theme)));
 document.querySelectorAll("[data-scenario]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.scenario===state.scenario)));
}
function renderAll(){renderJourneys();renderSteps();renderPhone();renderInspector();renderPatterns();renderControls();}
function chooseFlow(id){
 if(!state.flows.some(f=>f.id===id)){toast("Pattern was not found.");return;}
 const current=findJourney(state.journey);
 if(!current.flows.includes(id)){
  const first=state.journeys.find(j=>j.flows.includes(id));if(first)state.journey=first.id;
 }
 state.flow=id;resetDemo();state.scenario="normal";renderAll();
}
function chooseJourney(id){
 const next=state.journeys.find(j=>j.id===id);
 if(!next)return;state.journey=id;state.flow=next.flows[0]||"home";resetDemo();renderAll();
}
function valueOf(key){return String(state.demo.fields[key]||"").trim();}
function interact(action,value){
 const d=state.demo;
 switch(action){
 case "go":chooseFlow(value);return;
 case "choose":d.choice=value;break;
 case "continue":if(d.step>=2){chooseFlow("home");return;}d.step++;break;
 case "sign-in":toast(valueOf("email").includes("@")?"Demo only. No identity provider connected.":"Enter a valid email address.");break;
 case "recovery":toast("No recovery email sent; add a real identity provider.");break;
 case "toggle-flag":d.flag=!d.flag;break;
 case "toggle-theme":state.theme=state.theme==="light"?"dark":"light";break;
 case "toggle-task":state.tasks=state.tasks.map(t=>t.id===value?{...t,done:!t.done}:t);break;
 case "save-task":if(!valueOf("title")){toast("Enter a task title first.");return;}state.tasks.unshift({id:String(Date.now()),title:valueOf("title"),done:false});d.fields.title="";toast("Task created in this browser session.");break;
 case "reset-choice":d.choice="Everything";break;
 case "scenario-retry":state.scenario="normal";toast("Normal demo restored. No remote service was contacted.");break;
 case "advance-form":if(d.step<2&&!valueOf("answer")){toast("Enter a response first.");return;}if(d.step===2)toast("Example form complete, no data sent.");else d.step++;break;
 case "back-form":d.step=Math.max(0,d.step-1);break;
 case "send":if(!valueOf("message"))return;d.messages.push(valueOf("message"));d.fields.message="";break;
 case "select":d.choice=value;break;
 case "select-multi":d.selected=d.selected.includes(value)?d.selected.filter(x=>x!==value):[...d.selected,value];break;
 case "clear-selected":d.selected=[];break;
 case "archive":toast(String(d.selected.length)+" example items archived locally.");d.selected=[];break;
 case "remove-task":d.removed=state.tasks.shift()||null;toast(d.removed?"Task removed in demo. Undo available.":"No tasks left.");break;
 case "undo-task":if(d.removed){state.tasks.unshift(d.removed);d.removed=null;toast("Task restored.");}break;
 case "toast":toast(value||"Preview only. No external service was contacted.");break;
 default:toast("This interaction is not connected.");
 }
 renderPhone();renderControls();
}
async function copyPrompt(){
 const id=state.flow;
 if(!/^[a-z0-9-]+$/.test(id))return;
 const buttonEl=$("ms-copy-prompt");
 buttonEl.disabled=true;buttonEl.textContent="Loading prompt...";
 try{
  const response=await fetch("./prompts/app/flows/"+id+".md",{cache:"no-store"});
  if(!response.ok)throw Error("Could not retrieve the prompt ("+response.status+")");
  const prompt=await response.text();
  if(navigator.clipboard&&navigator.clipboard.writeText)await navigator.clipboard.writeText(prompt);
  else{const field=document.createElement("textarea");field.value=prompt;field.style.position="fixed";field.style.opacity="0";document.body.appendChild(field);field.select();
    if(!document.execCommand("copy"))throw Error("Clipboard unavailable");field.remove();}
  toast("Copied the full "+id+" build prompt.");
 }catch(e){toast("Copy failed. Open the original app atlas for source: "+String(e.message));}
 finally{buttonEl.disabled=false;buttonEl.textContent="Copy build prompt ↗";}
}
function attach(){
 $("ms-journeys").addEventListener("click",e=>{const b=e.target.closest("[data-choose-journey]");if(b)chooseJourney(b.dataset.chooseJourney);});
 $("ms-steps").addEventListener("click",e=>{const b=e.target.closest("[data-select-flow]");if(b)chooseFlow(b.dataset.selectFlow);});
 $("ms-pattern-grid").addEventListener("click",e=>{const b=e.target.closest("[data-select-flow]");if(b){chooseFlow(b.dataset.selectFlow);document.getElementById("workbench").scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});}});
 $("ms-phone-screen").addEventListener("click",e=>{const b=e.target.closest("[data-act]");if(b)interact(b.dataset.act,b.dataset.val||"");});
 $("ms-phone-screen").addEventListener("input",e=>{const id=e.target?.dataset?.field;if(id){state.demo.fields[id]=e.target.value;if(id==="search"){const q=String(e.target.value).toLowerCase();const hits=["Design checklist","Research notes","Sprint plan","Saved article"].filter(x=>x.toLowerCase().includes(q));const area=$("ms-search-results");if(area)area.innerHTML=hits.length?hits.map(x=>row(x,"Sample match","go","detail")).join(""):note("Nothing matches. Try a broader search.");}}});
 $("ms-journey-search").addEventListener("input",e=>{state.journeyQuery=e.target.value;renderJourneys();});
 $("ms-pattern-search").addEventListener("input",e=>{state.patternQuery=e.target.value;renderPatterns();});
 $("ms-prev").addEventListener("click",()=>{const j=findJourney(state.journey),i=j.flows.indexOf(state.flow);if(i>0)chooseFlow(j.flows[i-1]);});
 $("ms-next").addEventListener("click",()=>{const j=findJourney(state.journey),i=j.flows.indexOf(state.flow);chooseFlow(j.flows[i+1]||j.flows[0]);});
 document.querySelectorAll("[data-theme]").forEach(b=>b.addEventListener("click",()=>{state.theme=b.dataset.theme;renderControls();renderPhone();}));
 document.querySelectorAll("[data-platform]").forEach(b=>b.addEventListener("click",()=>{state.platform=b.dataset.platform;renderControls();renderPhone();}));
 document.querySelectorAll("[data-scenario]").forEach(b=>b.addEventListener("click",()=>{state.scenario=b.dataset.scenario;renderControls();renderPhone();}));
 document.querySelectorAll("[data-tab]").forEach(b=>b.addEventListener("click",()=>{state.tab=b.dataset.tab;renderInspector();}));
 $("ms-copy-prompt").addEventListener("click",copyPrompt);
}
async function init(){
 attach();
 try{
  const [a,b]=await Promise.all([fetch("./data/app.json",{cache:"no-store"}),fetch("./data/guided-apps.json",{cache:"no-store"})]);
  if(!a.ok||!b.ok)throw Error("Catalog files not available. Check static hosting paths.");
  const flows=await a.json(),journeys=await b.json();
  if(!Array.isArray(flows.flows)||flows.flows.length!==32||!Array.isArray(journeys.blueprints)||journeys.blueprints.length!==20)throw Error("Catalog count mismatch.");
  state.flows=flows.flows;state.journeys=journeys.blueprints;state.ready=true;renderAll();populateComposer();
  $("ms-load-status").textContent="Loaded 32 documented patterns and 20 guided journeys. Simulations are local; native source is separate.";
 }catch(err){
  $("ms-load-status").textContent="Catalog unavailable: "+String(err.message)+". The visible fallback remains. Open the original App Atlas or GitHub source.";
  toast("Catalog could not be loaded. Preview fallback remains visible.");
 }
}
init();

/* Offline, user-editable agent brief. Not AI inference and never transmits user input. */
function populateComposer(){
 const target=$("ms-compose-journey"),selected=target.value;
 target.innerHTML=state.journeys.map(j=>'<option value="'+esc(j.id)+'">'+esc(j.title)+'</option>').join("");
 target.value=state.journeys.some(j=>j.id===selected)?selected:state.journey;
}
function composePlan(){
 const idea=$("ms-compose-idea").value.trim(),id=$("ms-compose-journey").value;
 const guide=state.journeys.find(j=>j.id===id);
 if(!guide){toast("Please select an app category.");return;}
 if(idea.length<10){toast("Describe your app in at least ten characters.");return;}
 const platform=$("ms-compose-platform").value;
 const direction=$("ms-compose-style").selectedOptions[0]?.textContent||"Editorial minimalism";
 const list=guide.flows.map((id,i)=>{
  const f=findFlow(id);return String(i+1)+". "+f.title+" ["+id+"] — "+f.job;
 });
 const result=[
 "# Mobile application build brief",
 "Product intent: "+idea,
 "Target: "+({"both":"Android and iOS","android":"Android first","ios":"iOS first"}[platform]||"Android and iOS"),
 "Category: "+guide.title+" / "+guide.category,
 "Visual direction: "+direction,
 "Core user job: "+guide.job,
 "",
 "## User journey, ordered and connected",
 ...list,
 "",
 "## Design contract",
 "Create three substantially different visual directions and choose the strongest for this audience. Show wireframes for the entire connected journey, not disconnected hero cards. Build reusable design tokens (type, spacing, color, radius, elevation) and consistent light/dark themes. Explain native Android/iOS differences rather than pretending CSS phone screenshots are native.",
 "Each screen must support relevant empty, loading, error, success, offline, permission-denied and interrupted states, with recovery and undo where appropriate. Design tap targets, dynamic text, screen reader labels, keyboard behavior, locale/RTL and reduced motion.",
 "",
 "## Implementation contract",
 "Use React Native/Expo with TypeScript and compatible packages. Start from the MIT Prompt-Vault native-kit primitives. Copy selectively, not wholesale. Map the screen identifiers above to navigable routes, coherent reusable components and typed state. Implement honest real data storage, validation, authentication and authorization only if required. Never claim simulated payments, AI, uploads, permissions or deletion are connected.",
 "For any service integration, expose environment variables and server-side secrets, explicit opt-in, meaningful errors, logging without sensitive data and deterministic retry semantics.",
 "",
 "## Verification and deliverables",
 "Build, render and inspect each screen on Android and iOS; run TypeScript lint/build checks and interaction tests. Capture screenshots at phone and tablet widths, keyboard, TalkBack and VoiceOver where available. Test dark mode, text scaling, RTL, offline, recovery, deletion and payment paths if implemented. Cite observed evidence; list every untested state as unverified.",
 "Deliver: source files, installation instructions, route map, design tokens, before/after screenshots, feature/state matrix, test results and release blockers. Do not call the product production-ready without evidence.",
 "",
 "Reference architecture: https://github.com/kapasainitishreddy/Prompt-Vault/tree/main/native-kit",
 "Source flow research: https://github.com/kapasainitishreddy/Prompt-Vault/tree/main/guides/app"
 ].join("\n");
 $("ms-compose-result").value=result;
 toast("Editable project plan generated locally. Review it before using with an AI builder.");
}
async function copyPlan(){
 const value=$("ms-compose-result").value;
 if(!value||value.startsWith("Choose a category")){toast("Generate a brief first.");return;}
 try{
  if(navigator.clipboard?.writeText)await navigator.clipboard.writeText(value);
  else{const el=$("ms-compose-result");el.focus();el.select();if(!document.execCommand("copy"))throw Error("Clipboard unavailable");}
  toast("Copied the full mobile build plan.");
 }catch(e){toast("Clipboard unavailable. Select and copy the text manually.");}
}
function initComposer(){
 $("ms-compose-generate").addEventListener("click",composePlan);
 $("ms-compose-copy").addEventListener("click",copyPlan);
}
initComposer();


/* Open a selected signature composition in its existing interactive journey. */
window.addEventListener("pv:open-signature",event=>{
 const detail=event.detail||{};
 if(!state.ready){toast("The journey catalog is not available. Open the App Atlas instead.");return;}
 const journey=state.journeys.find(j=>j.id===detail.journey);
 const flow=state.flows.find(f=>f.id===detail.flow);
 if(!flow){toast("This design's interactive flow is unavailable.");return;}
 if(journey)state.journey=journey.id;
 state.flow=flow.id;resetDemo();state.scenario="normal";renderAll();
});


/* Same-origin, versioned original React Native sources for direct copy, not generated stubs. */
async function copyNativeAsset(assetId,buttonId){
 const paths={flow:"./code/FlowScreen.tsx",signatures:"./code/SignatureScreen.tsx"};
 const endpoint=paths[assetId],button=document.getElementById(buttonId);
 if(!endpoint||!button)return;
 const original=button.textContent;
 button.disabled=true;button.textContent="Loading real TSX…";
 try{
   const result=await fetch(endpoint,{cache:"no-store"});
   if(!result.ok)throw Error("HTTP "+result.status);
   const code=await result.text();
   if(code.length<2500||!code.includes("react-native"))throw Error("Incomplete source file.");
   if(navigator.clipboard?.writeText)await navigator.clipboard.writeText(code);
   else{
     const box=document.createElement("textarea");box.value=code;
     box.style.position="fixed";box.style.left="-9999px";document.body.appendChild(box);box.select();
     if(!document.execCommand("copy"))throw Error("Copy permission unavailable");box.remove();
   }
   toast("Full React Native TypeScript source copied. Install its dependencies and adapt it to your app.");
 }catch(error){toast("Couldn't copy TSX: "+String(error.message)+". Open the source link instead.");}
 finally{button.disabled=false;button.textContent=original;}
}
const nativeCopy=document.getElementById("ms-copy-native");
if(nativeCopy)nativeCopy.addEventListener("click",()=>copyNativeAsset("flow","ms-copy-native"));
const signatureCopy=document.getElementById("ms-copy-signatures");
if(signatureCopy)signatureCopy.addEventListener("click",()=>copyNativeAsset("signatures","ms-copy-signatures"));
