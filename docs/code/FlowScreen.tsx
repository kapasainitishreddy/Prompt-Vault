import React,{useState} from "react";
import {Alert,Text,View} from "react-native";
import {Description,Heading,KitButton,KitCard,KitChip,KitField,KitNotice,KitProgress,KitToggle} from "./components";
import type {Palette} from "./tokens";

export type Task={id:string;title:string;done:boolean};
export type FlowProps={id:string;p:Palette;tasks:Task[];setTasks:(next:Task[])=>void;
dark:boolean;setDark:(v:boolean)=>void;large:boolean;setLarge:(v:boolean)=>void;onNavigate:(id:string)=>void};
const examples=["Morning review","Design the first screen","Share the prototype","Accessibility check"];
const initialMessage="Welcome. This is a local conversation demo.";

export function FlowScreen({id,p,tasks,setTasks,dark,setDark,large,setLarge,onNavigate}:FlowProps){
 const [value,setValue]=useState(""),[query,setQuery]=useState(""),[choice,setChoice]=useState("Everything");
 const [step,setStep]=useState(0),[flag,setFlag]=useState(false),[notice,setNotice]=useState("");
 const [selected,setSelected]=useState<string[]>([]);
 const [messages,setMessages]=useState([initialMessage]);
 const [removed,setRemoved]=useState<Task|null>(null),[error,setError]=useState(true);
 const say=(s:string)=>setNotice(s);
 const row=(label:string,detail?:string,onPress?:()=>void)=><KitCard key={label} title={label} detail={detail} p={p} onPress={onPress}/>;
 const chips=(items:string[],current:string,change:(v:string)=>void)=>
  <View style={{flexDirection:"row",flexWrap:"wrap",gap:8}}>
   {items.map(x=><KitChip key={x} p={p} label={x} active={x===current} onPress={()=>change(x)}/>)}
  </View>;
 const add=()=>{if(!value.trim()){say("Enter a title first.");return;}
  setTasks([{id:String(Date.now()),title:value.trim(),done:false},...tasks]);setValue("");
  say("Saved to demo memory. Open Tasks to view it.");};
 const toggle=(id:string)=>setTasks(tasks.map(t=>t.id===id?{...t,done:!t.done}:t));
 const remove=()=>{if(!tasks.length)return;setRemoved(tasks[0]);setTasks(tasks.slice(1));say("Removed locally. Undo is available.");};
 let title="Interactive native pattern",hint="The example is local-only.",body:React.ReactNode=null;
 switch(id){
 case "onboarding":
  title="First meaningful action";hint="Show a useful action. Never force a long introduction.";
  body=<><KitProgress p={p} value={(step+1)/3}/>
   <Heading p={p} size={23}>{["Discover your workspace","Choose a starting goal","Ready when you are"][step]}</Heading>
   <Description p={p}>{["Explore without signing in.","You can change this later.","Your first task is one tap away."][step]}</Description>
   {chips(["Personal","Team","Just exploring"],choice,setChoice)}
   <KitButton label={step===2?"Open home":"Continue"} p={p} onPress={()=>step===2?onNavigate("home"):setStep(step+1)}/>
   <KitButton label="Skip introduction" secondary p={p} onPress={()=>onNavigate("home")}/></>;break;
 case "authentication":
  title="Account entry";hint="Prototype only. No login provider or session is connected.";
  body=<><KitField label="Email address" value={value} onChangeText={setValue} placeholder="you@example.com" p={p}/>
   <KitButton label="Preview sign-in response" p={p} onPress={()=>say(value.includes("@")?"Sign-in simulation. Connect real identity provider for production.":"Enter a valid email address.")}/>
   <KitButton label="Account recovery (demo)" secondary p={p} onPress={()=>say("No email sent; add a real recovery backend.")}/></>;break;
 case "home":
  title="Good morning.";hint="A dashboard should answer: what do I do next?";
  body=<><KitCard title="Today" detail={String(tasks.filter(t=>!t.done).length)+" open tasks"} p={p}>
   <KitProgress p={p} value={tasks.length?tasks.filter(t=>t.done).length/tasks.length:1}/></KitCard>
   <KitButton label="Create a task" p={p} onPress={()=>onNavigate("create-edit")}/>
   {tasks.slice(0,3).map(t=>row((t.done?"✓ ":"○ ")+t.title,"Tap to update",()=>toggle(t.id)))}</>;break;
 case "navigation":
  title="Find your place";hint="Navigation should keep the current section obvious.";
  body=<>{chips(["Today","Discover","Library","You"],choice,setChoice)}
   <KitCard title={choice} detail={"Selected the "+choice+" destination in this demonstration."} p={p}/>
   <KitButton p={p} label="Explore search" onPress={()=>onNavigate("search")}/></>;break;
 case "search":
  title="Find what matters";hint="Use searchable content and a useful no-results state.";
  body=<><KitField label="Search" value={query} onChangeText={setQuery} placeholder="Try design or notes" p={p}/>
   {["Design checklist","Research notes","Sprint plan","Saved article"].filter(x=>x.toLowerCase().includes(query.toLowerCase())).map(x=>row(x,"Example search result",()=>onNavigate("detail")))}
   {!["Design checklist","Research notes","Sprint plan","Saved article"].some(x=>x.toLowerCase().includes(query.toLowerCase()))?<KitNotice text="Nothing matches. Try a broader term." p={p}/>:null}</>;break;
 case "filters":
  title="Keep filters reversible";hint="Filters must preserve state and allow clearing.";
  body=<>{chips(["Everything","Active","Completed"],choice,setChoice)}
   {tasks.filter(t=>choice==="Everything"||(choice==="Completed"?t.done:!t.done)).map(t=>row(t.title,t.done?"Complete":"Active",()=>toggle(t.id)))}
   <KitButton label="Clear filters" secondary p={p} onPress={()=>setChoice("Everything")}/></>;break;
 case "list-feed":
  title="Recent activity";hint="Readable rows and useful metadata, not visual noise.";
  body=<>{examples.map((x,i)=>row(x,"Example update "+String(i+1),()=>onNavigate("detail")))}</>;break;
 case "detail":
  title="Design checklist";hint="Focused summary, context and one clear action.";
  body=<><KitCard p={p} title="Release preparation" detail="A helpful overview and the next meaningful step. This is sample content."/>
   <KitButton label={flag?"Remove saved item":"Save item"} p={p} onPress={()=>{setFlag(!flag);say(!flag?"Saved locally in this view.":"Removed from saves.");}}/>
   <KitButton label="Return to activity" secondary p={p} onPress={()=>onNavigate("list-feed")}/></>;break;
 case "create-edit":
  title="Capture a thought";hint="Prevent empty submissions and confirm the action.";
  body=<><KitField label="Task title" p={p} value={value} onChangeText={setValue} placeholder="One thing worth completing"/>
   <KitButton label="Save task" p={p} onPress={add}/>
   <KitButton label="Open task list" p={p} secondary onPress={()=>onNavigate("task-management")}/></>;break;
 case "multi-step-form":
  title="One thing at a time";hint="Back, review, validation and progress all matter.";
  body=<><KitProgress p={p} value={(step+1)/3}/><Description p={p}>Step {step+1} of 3</Description>
   <Heading p={p} size={22}>{["What are you creating?","Who is it for?","Review"][step]}</Heading>
   {step<2?<KitField label={step===0?"Project name":"Audience"} p={p} value={value} onChangeText={setValue}/>:<KitCard title="Your answer" detail={value||"None"} p={p}/>}
   <View style={{flexDirection:"row",gap:8}}><View style={{flex:1}}>
    <KitButton label="Back" secondary disabled={step===0} p={p} onPress={()=>setStep(Math.max(0,step-1))}/>
   </View><View style={{flex:1}}><KitButton label={step===2?"Finish demo":"Next"} p={p} onPress={()=>{
    if(!value.trim()){say("Enter a response.");return;}step===2?say("Example form finished locally."):setStep(step+1);}}/></View></View></>;break;
 case "task-management":
  title="Finish a real task";hint="Completion is reversible and progress is visible.";
  body=<><KitProgress value={tasks.length?tasks.filter(t=>t.done).length/tasks.length:1} p={p}/>
   {tasks.map(t=>row((t.done?"✓ ":"○ ")+t.title,t.done?"Complete":"Tap to complete",()=>toggle(t.id)))}
   <KitButton label="Add task" p={p} onPress={()=>onNavigate("create-edit")}/></>;break;
 case "calendar":
  title="Your schedule";hint="Date selection has a readable list alternative.";
  body=<><View style={{flexDirection:"row",flexWrap:"wrap",gap:8}}>
   {Array.from({length:14},(_,i)=><KitChip key={i} label={String(i+1)} active={step===i} onPress={()=>setStep(i)} p={p}/>)}</View>
   <KitCard title={"Day "+String(step+1)} detail={step%3===0?"Example meeting at 10:00":"No sample event on this date."} p={p}/></>;break;
 case "dashboard-data":
  title="Meaningful metrics";hint="Fixed demonstration metrics, never invented customer data.";
  body=<><View style={{flexDirection:"row",gap:8}}>{["8","3","72%"].map((v,i)=><View key={v} style={{flex:1}}>
   <KitCard title={v} detail={["Projects","Notes","Goal"][i]} p={p}/></View>)}</View>
   <KitProgress value={0.72} p={p}/><KitNotice text="All values are static, illustrative numbers." p={p}/></>;break;
 case "notifications":
  title="Stay in control";hint="Don't ask for notifications before showing their value.";
  body=<><KitToggle p={p} label="Optional updates" detail="Demo preference only, not OS notifications." value={flag} onChange={setFlag}/>
   {["Draft saved","Weekly review ready"].map(x=>row(x,"Unread · example",()=>say("Marked read: "+x)))}</>;break;
 case "chat":
  title="Conversation";hint="Local message composer. No messaging backend.";
  body=<>{messages.map((x,i)=><KitCard key={i} title={i===0?"Demo":"You"} detail={x} p={p}/>)}
   <KitField label="Message" p={p} value={value} onChangeText={setValue} placeholder="Write a message"/>
   <KitButton label="Send locally" p={p} onPress={()=>{if(value.trim()){setMessages([...messages,value.trim()]);setValue("");}}}/></>;break;
 case "media-library":
  title="A personal library";hint="Content-first design. No streaming or licensed media loaded.";
  body=<>{["The Long Read","Chapter One","An Audio Essay"].map((x,i)=>row(x,["Article · 8 min","Book · 12 min","Audio · 3 min"][i],()=>setChoice(x)))}
   <KitCard title={"Selected: "+choice} detail="A content selection example. No media is downloaded." p={p}/></>;break;
 case "upload-capture":
  title="Capture thoughtfully";hint="A permission-aware import concept, not a device upload.";
  body=<><KitCard title="Files" detail="None selected. No camera or storage access." p={p}/>
   <KitButton label="Simulate file selection" p={p} onPress={()=>{setFlag(true);say("Sample file selected. Nothing was uploaded.");}}/>
   {flag?<KitProgress value={0.65} p={p}/>:null}</>;break;
 case "checkout":
  title="Review your order";hint="No payment processor, tax calculation or receipt is connected.";
  body=<><KitCard title="Example order" detail="Illustrative plan $9.99/month. Taxes and renewal terms must be supplied by the real store." p={p}/>
   <KitButton label="Simulate checkout" p={p} onPress={()=>say("Example confirmation only. No money was charged.")}/></>;break;
 case "paywall":
  title="Premium without pressure";hint="Benefits, terms, close path and restore purchases must be honest.";
  body=<><KitCard title="Example premium" detail="More projects and exports · mock $9.99 per month." p={p}/>
   <KitButton label="Preview premium" p={p} onPress={()=>say("No subscription started. Wire native IAP in production.")}/>
   <KitButton label="Restore purchase (demo)" secondary p={p} onPress={()=>say("No real purchase account connected.")}/></>;break;
 case "profile":
  title="Your public profile";hint="People should control what others can see.";
  body=<><KitField label="Display name" p={p} value={value} onChangeText={setValue} placeholder="Your name"/>
   <KitButton label="Save locally" p={p} onPress={()=>say(value.trim()?"Saved for this view.":"Enter a name first.")}/></>;break;
 case "settings-privacy":
  title="Your settings";hint="Preferences must be reversible and understandable.";
  body=<><KitToggle label="Dark mode" value={dark} onChange={setDark} p={p}/>
   <KitToggle label="Larger text" value={large} onChange={setLarge} p={p}/>
   <KitToggle label="Optional analytics (simulation)" value={flag} onChange={setFlag} p={p}/></>;break;
 case "permissions":
  title="Ask only when needed";hint="Educational sheet. No real OS permission is requested.";
  body=<><KitCard title="Notifications" detail="Ask when someone schedules a reminder. Basic features should work without access." p={p}/>
   <KitButton label="Allow (simulation)" p={p} onPress={()=>say("Simulated permission granted. No OS setting changed.")}/>
   <KitButton label="Not now" secondary p={p} onPress={()=>say("Preference respected.")}/></>;break;
 case "offline-sync":
  title="Protect people's work";hint="Local demo only. No network sync or durable storage.";
  body=<><KitToggle label="Simulate offline" value={flag} onChange={setFlag} p={p}/>
   <KitNotice text={flag?"Example offline state. Data remains only in app memory.":"Example online state. There is still no connected server."} p={p}/>
   <KitButton label="Simulate retry" p={p} onPress={()=>say("Retry simulated. No server contacted.")}/></>;break;
 case "empty-states":
  title="A useful empty canvas";hint="Give an obvious next step, not a decorative illustration alone.";
  body=<><KitCard title="Nothing here yet" detail="Create your first task; you can edit it later." p={p}/>
   <KitButton label="Add first task" p={p} onPress={()=>onNavigate("create-edit")}/></>;break;
 case "errors-recovery":
  title="Recover gracefully";hint="Explain the problem, keep drafts, and provide a recovery action.";
  body=<>{error?<KitNotice text="Example network error. Your local draft is safe." p={p}/>:
    <KitCard title="Back on track" detail="The sample error was cleared." p={p}/>}
   <KitButton label="Toggle error simulation" p={p} onPress={()=>{setError(!error);say(error?"Error cleared.":"Error restored for testing.");}}/></>;break;
 case "undo-confirmation":
  title="Destructive actions with undo";hint="People make mistakes. Offer a reversible path.";
  body=<>{tasks.slice(0,2).map(t=>row(t.title,t.done?"Complete":"Open"))}
   <KitButton label="Remove first task" danger disabled={!tasks.length} p={p} onPress={remove}/>
   <KitButton label="Undo removal" secondary disabled={!removed} p={p} onPress={()=>{
    if(removed){setTasks([removed,...tasks]);setRemoved(null);say("Restored.");}}}/></>;break;
 case "accessibility":
  title="Read comfortably";hint="Correct labels, scalable type, status labels and large targets.";
  body=<><KitToggle label="Larger sample text" value={large} onChange={setLarge} p={p}/>
   <Text style={{fontSize:large?23:16,color:p.text,lineHeight:large?33:24}}>Readable text without relying on color alone.</Text>
   <KitButton label="Test accessible action" p={p} onPress={()=>say("Button activated.")}/></>;break;
 case "localization-rtl":
  title="Language affects layout";hint="A localized greeting, not a complete right-to-left implementation.";
  body=<>{chips(["English","العربية"],choice,setChoice)}
   <KitCard title={choice==="العربية"?"مرحبا بك":"Welcome"}
    detail={choice==="العربية"?"مثال للغة العربية":"Simple sample localization."} p={p}/></>;break;
 case "multi-select-bulk":
  title="Select with confidence";hint="Show the count and make clearing obvious.";
  body=<>{examples.map(x=><KitToggle key={x} label={x} p={p} value={selected.includes(x)}
   onChange={v=>setSelected(v?[...selected,x]:selected.filter(y=>y!==x)}/>)}
   <KitButton label={"Archive "+selected.length+" (demo)"} disabled={!selected.length} p={p}
    onPress={()=>{say("Archived "+String(selected.length)+" sample items locally.");setSelected([]);}}/>
   <KitButton label="Clear selection" secondary p={p} onPress={()=>setSelected([])}/></>;break;
 case "table-data":
  title="Make rows scannable";hint="Meaningful labels, consistent units and predictable sorting.";
  body=<>{chips(["Name","Status"],choice,setChoice)}
   {(choice==="Status"?[...examples].reverse():examples).map((x,i)=>row(x,(i%2?"Complete":"In progress")+" · sample"))}</>;break;
 case "ai-assistant":
  title="AI with human oversight";hint="Scripted example. No model is connected or called.";
  body=<><KitField label="Ask for help" p={p} value={value} onChangeText={setValue} placeholder="Help plan my day"/>
   <KitButton label="Preview scripted suggestion" p={p}
    onPress={()=>say("Example only: choose one priority, split it into two steps and review. Not generated by AI.")}/>
   <KitButton label="Apply a task yourself" p={p} secondary onPress={()=>onNavigate("create-edit")}/></>;break;
 case "account-deletion":
  title="Make leaving straightforward";hint="No account or remotely stored personal data in this demo.";
  body=<><KitCard title="Your data choices" detail="Production export and deletion must call actual backend endpoints and show status." p={p}/>
   <KitButton label="Preview export explanation" p={p} onPress={()=>say("No remote user records to export in this kit.")}/>
   <KitButton label="Preview deletion flow" danger p={p}
    onPress={()=>Alert.alert("Demonstration only","No account exists to delete. Nothing was changed.",[{text:"Understood"}])}/></>;break;
 default:
  title="Pattern unavailable";body=<KitButton label="Open home" p={p} onPress={()=>onNavigate("home")}/>;
 }
 return <View style={{gap:14}}>
  <Heading p={p} size={large?34:29}>{title}</Heading>
  <Description p={p}>{hint}</Description>
  {body}
  {notice?<KitNotice p={p} text={notice}/>:null}
 </View>;
}
