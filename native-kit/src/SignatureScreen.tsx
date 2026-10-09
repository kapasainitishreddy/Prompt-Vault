import React from "react";
import {Pressable,Text,View} from "react-native";

/** Sixteen original Expo-native mobile design examples.
 * All values are fictional and UI actions link into the local FlowScreen demos.
 */
export const palettes:Record<string,{bg:string,ink:string,soft:string,accent:string}>={
 literary:{bg:"#F4E8D6",ink:"#583D34",soft:"#9E4F3D",accent:"#FCECDD"},
 aviation:{bg:"#15212A",ink:"#F5F2CB",soft:"#36454B",accent:"#F1CA6F"},
 calm:{bg:"#DFEADE",ink:"#325246",soft:"#BAD2B9",accent:"#537C61"},
 learning:{bg:"#172324",ink:"#EAF5DF",soft:"#254638",accent:"#C5F4A0"},
 finance:{bg:"#E9EBE0",ink:"#253E32",soft:"#D9E3D3",accent:"#32644D"},
 fitness:{bg:"#D3E3C5",ink:"#243E30",soft:"#B7D0A5",accent:"#477552"},
 social:{bg:"#FFF6EC",ink:"#4C3D36",soft:"#E6E9DD",accent:"#AE6953"},
 commerce:{bg:"#FAEEDC",ink:"#554031",soft:"#E8D1B4",accent:"#B46B45"},
 travel:{bg:"#DEEBE0",ink:"#375748",soft:"#C7DDC7",accent:"#4D8563"},
 creator:{bg:"#FAE2CE",ink:"#6E372C",soft:"#D58E70",accent:"#9C4D3A"},
 media:{bg:"#292137",ink:"#F1E2E5",soft:"#AD6B82",accent:"#EDC5BD"},
 journal:{bg:"#EEE5D4",ink:"#4C4138",soft:"#DBCCB6",accent:"#A15E43"},
 offline:{bg:"#E2E9DF",ink:"#324C3C",soft:"#C3D6C4",accent:"#688E74"},
 assistant:{bg:"#E8EFF1",ink:"#253F4F",soft:"#C9E0E6",accent:"#466E87"},
 habits:{bg:"#EBE0C7",ink:"#574B35",soft:"#D0C69B",accent:"#746A3F"},
 b2b:{bg:"#172125",ink:"#E5F4E6",soft:"#344B41",accent:"#A9DC9A"}
};
type Theme={bg:string;ink:string;soft:string;accent:string};
const typography={fontFamily:"serif" as const};
function Title({children,c,size=38}:{children:React.ReactNode;c:Theme;size?:number}){return <Text accessibilityRole="header" style={{...typography,fontSize:size,lineHeight:size*1.07,letterSpacing:-1.2,color:c.ink}}>{children}</Text>;}
function Small({children,c}:{children:React.ReactNode;c:Theme}){return <Text style={{color:c.ink,opacity:.72,fontFamily:"monospace",fontSize:10,letterSpacing:.5}}>{children}</Text>;}
function Rule({c}:{c:Theme}){return <View style={{height:1,backgroundColor:c.ink,opacity:.25}}/>;}
function Line({left,right,c}:{left:string;right:string;c:Theme}){return <View style={{borderBottomWidth:1,borderColor:c.ink+"33",minHeight:47,alignItems:"center",justifyContent:"space-between",flexDirection:"row",gap:8}}><Text style={{color:c.ink,fontSize:14}}>{left}</Text><Small c={c}>{right}</Small></View>;}
function Box({children,c,background}:{children:React.ReactNode;c:Theme;background?:string}){return <View style={{padding:17,borderRadius:14,gap:9,backgroundColor:background||c.soft}}>{children}</View>;}
function Chart({c}:{c:Theme}){return <View accessibilityRole="image" accessibilityLabel="Illustrative bar chart with fictional values" style={{height:108,flexDirection:"row",gap:9,alignItems:"flex-end"}}>{[.35,.62,.42,.8,.65,1].map((x,i)=><View key={i} style={{flex:1,height:x*102,backgroundColor:c.accent,opacity:i===5?1:.55,borderTopLeftRadius:5,borderTopRightRadius:5}}/>)}</View>;}
const threeTasks=["Write a useful brief","Check the result","Share with your team"];
export function SignatureScreen({id,onExplore}:{id:string;onExplore:()=>void}){
 const c=palettes[id]||palettes.literary;
 let body:React.ReactNode;
 switch(id){
 case "literary":
  body=<><Small c={c}>AASTA / READING ROOM</Small><Box c={c} background={c.soft}><Text style={{color:c.accent,fontSize:11}}>FICTION / NO.019</Text><Text style={{fontFamily:"serif",fontSize:46,color:c.accent,lineHeight:48,marginVertical:35}}>The Way{"\n"}We Stayed</Text><Rule c={{...c,ink:c.accent}}/><Text style={{color:c.accent,fontFamily:"serif",letterSpacing:4,fontSize:18}}>AASTA</Text></Box><Line c={c} left="Continue reading" right="CHAPTER 07 →"/></>;break;
 case "aviation":
  body=<><Small c={c}>ARIES / TERMINAL A</Small><Title c={c} size={69}>09:41</Title><Small c={c}>TODAY'S DEPARTURES · DEMO</Small><Rule c={c}/>{[["BOARDING / GATE 04","Design review","10:15 AM"],["ON TIME / GATE 02","Write chapter","11:30 AM"]].map(x=><Box c={c} key={x[0]}><Text style={{fontSize:11,fontWeight:"800",color:c.accent}}>{x[0]}</Text><Title c={c} size={24}>{x[1]}</Title><Small c={c}>{x[2]}</Small></Box>)}</>;break;
 case "calm":
  body=<><Small c={c}>STILL / BREATHING SPACE</Small><View style={{width:194,height:194,alignSelf:"center",borderWidth:1,borderRadius:100,borderColor:c.accent,justifyContent:"center",alignItems:"center",marginVertical:10}}><View style={{width:140,height:140,borderWidth:1,borderRadius:70,borderColor:c.accent,alignItems:"center",justifyContent:"center"}}><Text style={{fontSize:74,color:c.accent}}>✳</Text></View></View><Title c={c}>You are here.</Title><Text style={{fontFamily:"serif",fontSize:16,color:c.ink}}>Just this breath. Nothing else to finish.</Text></>;break;
 case "learning":
  body=<><Small c={c}>CIRCUIT / HARDWARE LAB</Small><Title c={c}>GPU{"\n"}Architecture</Title><View style={{flexDirection:"row",flexWrap:"wrap",gap:10}}>{["SM / 01","L2 / 64 MB","HBM / →","SM / 02"].map(x=><View key={x} style={{width:"47%",borderWidth:1,borderColor:c.accent,backgroundColor:c.soft,padding:18}}><Text style={{fontFamily:"monospace",fontSize:16,color:c.accent}}>{x}</Text></View>)}</View><Line c={c} left="Lesson 02 / 08" right="CONTINUE →"/></>;break;
 case "finance":
  body=<><Small c={c}>LEDGER / OCT 2026</Small><Small c={c}>ILLUSTRATIVE BALANCE</Small><Title c={c} size={43}>$4,280.00</Title><Chart c={c}/><Line c={c} left="Expenses" right="$760 SAMPLE"/><Line c={c} left="Savings" right="$1,090 SAMPLE"/></>;break;
 case "fitness":
  body=<><Small c={c}>ACTRA / PULL SESSION</Small><Title c={c} size={93}>08<Text style={{fontSize:28,color:c.accent}}>/12</Text></Title><Small c={c}>SEATED ROW / REPS</Small><View style={{width:88,height:88,borderRadius:48,borderWidth:10,borderColor:c.accent,borderLeftColor:c.soft,alignSelf:"center",marginVertical:15}}/><Line c={c} left="Rest" right="01:30 SAMPLE"/></>;break;
 case "social":
  body=<><Small c={c}>GATHERED / GROUPS</Small><Title c={c}>The little{"\n"}things club.</Title><View style={{flexDirection:"row",gap:7}}>{["J","M","S"].map((x,i)=><View key={x} style={{width:36,height:36,borderRadius:19,alignItems:"center",justifyContent:"center",backgroundColor:["#BFCAB2","#D8B59B","#EFD4B5"][i]}}><Text style={{fontWeight:"800"}}>{x}</Text></View>)}</View><Box c={c}><Text style={{color:c.ink}}>Look what I found at the market today!</Text><Small c={c}>JULES / 9:38</Small></Box><Box c={c} background="#E5BCAE"><Text style={{color:c.ink}}>That's beautiful ✳</Text><Small c={c}>YOU / 9:40</Small></Box></>;break;
 case "commerce":
  body=<><Small c={c}>STUDIO OBJECTS / SHOP</Small><Title c={c}>Everyday,{"\n"}better.</Title><View style={{flexDirection:"row",gap:10}}>{[["◕","FORMA 01","$45"],["◐","SOFT LIGHT","$68"]].map((x,i)=><View key={x[1]} style={{flex:1,padding:10,backgroundColor:i?"#C9D2C1":"#E5CDB0",gap:8}}><Text style={{fontFamily:"serif",fontSize:70,textAlign:"center",color:c.accent}}>{x[0]}</Text><Text style={{fontSize:11,fontWeight:"800",color:c.ink}}>{x[1]}</Text><Small c={c}>{x[2]} SAMPLE</Small></View>)}</View></>;break;
 case "travel":
  body=<><Small c={c}>FIELDNOTES / DAY 02</Small><Title c={c}>Lisbon,{"\n"}slowly.</Title><Small c={c}>SATURDAY / APRIL 18</Small><Rule c={c}/>{[["09:00","Morning market"],["11:30","Museum visit"],["14:00","Café break"]].map(x=><View key={x[0]} style={{minHeight:64,flexDirection:"row",alignItems:"center",gap:20}}><Small c={c}>{x[0]}</Small><View style={{width:9,height:9,borderRadius:9,backgroundColor:c.accent}}/><Text style={{fontFamily:"serif",fontSize:23,color:c.ink}}>{x[1]}</Text></View>)}</>;break;
 case "creator":
  body=<><Small c={c}>SCRIBESTUDIO / CANVAS 01</Small><View style={{backgroundColor:c.soft,height:296,justifyContent:"center",alignItems:"center"}}><Text style={{fontFamily:"serif",fontSize:73,color:"#F5D9B3"}}>✦</Text><Text style={{fontFamily:"serif",fontSize:41,lineHeight:37,textAlign:"center",color:"#F9ECD5"}}>FORM{"\n"}&{"\n"}FEELING</Text></View><Small c={c}>TYPE / SHAPE / COLOR / LAYERS</Small></>;break;
 case "media":
  body=<><Small c={c}>NOW PLAYING / DEMO</Small><View style={{height:260,backgroundColor:c.soft,padding:19,justifyContent:"flex-end"}}><Text style={{position:"absolute",fontFamily:"serif",fontSize:130,top:-70,right:-20,color:c.accent,opacity:.6}}>◯</Text><Title c={{...c,ink:"#F9E9D9"}} size={43}>AFTER{"\n"}LIGHT</Title></View><Title c={c} size={23}>After Light</Title><Small c={c}>EXAMPLE ARTIST / NO STREAM</Small><Text style={{fontSize:25,color:c.ink,textAlign:"center"}}>⇤      ▶      ⇥</Text></>;break;
 case "journal":
  body=<><Small c={c}>UNSAID / PRIVATE</Small><Small c={c}>FRIDAY / OCTOBER 09</Small><Title c={c}>Today, I{"\n"}noticed…</Title><Text style={{fontFamily:"serif",fontSize:18,lineHeight:29,color:c.ink,marginTop:8}}>The morning felt like a page that hadn't decided what it wanted to say.</Text>{[1,2,3,4].map(x=><Rule key={x} c={c}/>)}</>;break;
 case "offline":
  body=<><Small c={c}>NOXLY / LOCAL FIRST</Small><Title c={c} size={68}>↯</Title><Title c={c}>You're{"\n"}offline.{"\n"}Still yours.</Title><Text style={{fontSize:16,lineHeight:24,color:c.ink}}>Your notes are visible. This demonstration does not provide durable storage or cloud sync.</Text><Line c={c} left="Sample notes" right="3 LOCAL"/></>;break;
 case "assistant":
  body=<><Small c={c}>ASSIST / HUMAN CONTROL</Small><Title c={c}>Make the{"\n"}next move.</Title><Box c={c}><Text style={{fontSize:15,color:c.ink}}>How should I organize my week?</Text></Box><Box c={c} background="#FFFFFF"><Small c={c}>SCRIPTED EXAMPLE / NO MODEL</Small><Title c={c} size={25}>Try three priorities.</Title><Text style={{fontSize:14,lineHeight:24,color:c.ink}}>Choose focus, make time for rest and review tomorrow.</Text></Box><Line c={c} left="Discard" right="REVIEW FIRST →"/></>;break;
 case "habits":
  body=<><Small c={c}>FRIDAY / LITTLE VICTORIES</Small><Title c={c}>Little{"\n"}victories.</Title><View style={{flexDirection:"row",alignItems:"center",gap:12}}><Title c={c} size={78}>3</Title><Small c={c}>THINGS YOU{"\n"}SHOWED UP FOR</Small></View><Rule c={c}/><Line c={c} left="✓ A short walk" right="DONE"/><Line c={c} left="✓ Water break" right="DONE"/><Line c={c} left="○ Write one page" right="NEXT"/></>;break;
 case "b2b":
  body=<><Small c={c}>STORE/READY / RELEASE 0.4.0</Small><Title c={c}>Almost{"\n"}ready.</Title><View style={{flexDirection:"row",alignItems:"center",gap:12}}><Title c={c} size={75}>8<Text style={{fontSize:24}}>/10</Text></Title><Small c={c}>SAMPLE CHECKS</Small></View><Line c={c} left="✓ Privacy URL" right="EXAMPLE"/><Line c={c} left="○ Signing key" right="REVIEW"/></>;break;
 default:body=<Title c={c}>Choose a design.</Title>;
 }
 return <View style={{gap:15}}>
  <View style={{backgroundColor:c.bg,borderRadius:23,padding:22,gap:17,borderWidth:1,borderColor:c.ink+"33",minHeight:410}}>{body}</View>
  <Pressable accessibilityRole="button" accessibilityLabel="Open matching interactive demo" onPress={onExplore} style={({pressed})=>({minHeight:52,backgroundColor:pressed?c.soft:c.ink,padding:14,borderRadius:13,justifyContent:"center",alignItems:"center"})}>
   <Text style={{fontSize:15,fontWeight:"800",color:c.bg}}>Try interactive workflow  →</Text></Pressable>
  <Text style={{fontSize:12,color:"#637568",lineHeight:19}}>Original Expo composition. Illustrative data only. Real integrations and device testing are required before release.</Text>
 </View>;
}
