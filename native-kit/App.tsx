import React,{useState} from "react";
import {ScrollView,StatusBar,Text,View,useWindowDimensions} from "react-native";
import {SafeAreaProvider,SafeAreaView} from "react-native-safe-area-context";
import catalog from "./catalog.json";
import signatures from "./signatures.json";
import {SignatureScreen} from "./src/SignatureScreen";
import {KitButton,KitCard,KitChip,KitNotice,Description,Heading,KitField} from "./src/components";
import {FlowScreen,type Task} from "./src/FlowScreen";
import {themes} from "./src/tokens";

export default function App() {
 const [dark,setDark]=useState(false),[large,setLarge]=useState(false);
 const [journeyId,setJourneyId]=useState("tasks"),[flowId,setFlowId]=useState("onboarding");
 const [tab,setTab]=useState<"preview"|"showcase"|"journeys"|"patterns"|"about">("preview");
 const [signatureId,setSignatureId]=useState("literary");
 const [tasks,setTasks]=useState<Task[]>([
 {id:"1",title:"Write a useful brief",done:false},
 {id:"2",title:"Try a real interaction",done:false},
 {id:"3",title:"Review the result",done:true}]);
 const [query,setQuery]=useState("");
 const p=dark?themes.dark:themes.light;
 const journey=catalog.journeys.find(x=>x.id===journeyId)||catalog.journeys[0];
 const selected=catalog.flows.find(x=>x.id===flowId);
 const signature=signatures.find(x=>x.id===signatureId)||signatures[0];
 const flowIndex=journey.flows.indexOf(flowId);
 const screen=useWindowDimensions();
 const go=(id:string)=>{setFlowId(id);setTab("preview");};
 const chooseJourney=(id:string)=>{const next=catalog.journeys.find(x=>x.id===id)||journey;setJourneyId(id);go(next.flows[0]||"home");};
 const next=()=>go(journey.flows[flowIndex+1]||journey.flows[0]||"home");
 const openSignatureFlow=()=>{setJourneyId(signature.journey);go(signature.flow);};
 return <SafeAreaProvider><SafeAreaView style={{flex:1,backgroundColor:p.bg}}>
  <StatusBar barStyle={dark?"light-content":"dark-content"} backgroundColor={p.bg}/>
  <View style={{paddingHorizontal:20,paddingTop:12,paddingBottom:14,borderBottomWidth:1,borderBottomColor:p.border,gap:6}}>
   <Text style={{fontSize:12,fontWeight:"900",letterSpacing:2.1,color:p.accent}}>PROMPT / VAULT</Text>
   <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",gap:12}}>
    <Heading p={p} size={25}>Native Kit</Heading>
    <KitChip label={dark?"Light mode":"Dark mode"} p={p} onPress={()=>setDark(!dark)}/>
   </View>
   <Text style={{fontSize:12,color:p.sub}}>Expo · 16 signature screens · 20 journeys · 32 interactive patterns</Text>
  </View>
  <View style={{flexDirection:"row",paddingHorizontal:14,paddingVertical:10,gap:5,flexWrap:"wrap"}}>
   {(["preview","showcase","journeys","patterns","about"] as const).map(x=><View key={x} style={{flexGrow:1}}>
    <KitChip label={x[0].toUpperCase()+x.slice(1)} active={tab===x} onPress={()=>setTab(x)} p={p}/>
   </View>)}
  </View>
  <ScrollView style={{flex:1}} keyboardShouldPersistTaps="handled" contentContainerStyle={{padding:20,paddingBottom:44,gap:16}}>
   {tab==="preview"?<>
    <Heading p={p} size={large?29:24}>{journey.title}</Heading>
    <Description p={p}>{journey.job}</Description>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{gap:8,paddingVertical:6}}>
     {journey.flows.map((id,i)=><KitChip key={id} p={p} active={id===flowId}
      label={String(i+1)+". "+(catalog.flows.find(x=>x.id===id)?.title||id)} onPress={()=>go(id)}/>)}
    </ScrollView>
    <KitNotice p={p} text={flowIndex<0?"This is an extra pattern outside your selected journey. Choose a journey step to continue.":"Step "+String(flowIndex+1)+" of "+String(journey.flows.length)+" · "+(selected?.job||"Interactive example")}/>
    <View key={flowId} style={{backgroundColor:p.elevated,borderColor:p.border,borderWidth:1,borderRadius:24,padding:screen.width>500?28:18,gap:18}}>
     <FlowScreen id={flowId} p={p} tasks={tasks} setTasks={setTasks} dark={dark} setDark={setDark}
      large={large} setLarge={setLarge} onNavigate={go}/>
    </View>
    <KitButton label={flowIndex===journey.flows.length-1?"Restart journey":"Next step →"} p={p} onPress={next}/>
    <Description p={p}>Interactive previews use sample data. Sign-in, AI, billing, permissions, remote sync and account deletion are not connected.</Description>
   </>:null}
   {tab==="showcase"?<>
    <Heading p={p}>Sixteen original mobile designs</Heading>
    <Description p={p}>Distinct Expo-native screen compositions for different product jobs. Select a design, explore its source, or open its matching interactive flow.</Description>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{gap:8,paddingVertical:5}}>
      {signatures.map(x=><KitChip key={x.id} label={x.name} active={signatureId===x.id} onPress={()=>setSignatureId(x.id)} p={p}/>)}
    </ScrollView>
    <Heading p={p} size={22}>{signature.name}</Heading>
    <Description p={p}>{signature.category} · {signature.why}</Description>
    <SignatureScreen key={signature.id} id={signature.id} onExplore={openSignatureFlow}/>
   </>:null}
   {tab==="journeys"?<>
    <Heading p={p}>Choose a complete app journey</Heading>
    <Description p={p}>Pick one of 20 research-linked journeys, then interact with the connected screen flow.</Description>
    {catalog.journeys.map(j=><KitCard key={j.id} p={p} title={j.title} detail={j.category+" · "+j.flows.length+" steps · "+j.job}
     onPress={()=>chooseJourney(j.id)}/>)}
   </>:null}
   {tab==="patterns"?<>
    <Heading p={p}>All 32 mobile patterns</Heading>
    <KitField label="Search patterns" p={p} value={query} onChangeText={setQuery} placeholder="onboarding, paywall, offline…"/>
    {catalog.flows.filter(x=>(x.title+" "+x.job).toLowerCase().includes(query.toLowerCase())).map(f=>
     <KitCard key={f.id} p={p} title={f.title} detail={f.job} onPress={()=>go(f.id)}/>)}
   </>:null}
   {tab==="about"?<>
    <Heading p={p}>Build from native source</Heading>
    <Description p={p}>This demonstrates React Native Pressable, TextInput, ScrollView, state changes, accessible labels and adaptive theming.</Description>
    <KitCard title="Included" detail="Runnable Expo starter, 16 distinct native compositions, 32 interactive patterns, 20 journeys and reusable components." p={p}/>
    <KitCard title="Not included" detail="Production authentication, payment SDK, persistence, remote services, native permissions, model inference, or accessibility certification." p={p}/>
    <KitCard title="Before release" detail="Integrate real services, storage, security, store compliance and Android/iOS device QA." p={p}/>
   </>:null}
  </ScrollView>
 </SafeAreaView></SafeAreaProvider>;
}
