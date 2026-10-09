import React from "react";
import {Pressable,Text,TextInput,View} from "react-native";
import type {Palette} from "./tokens";
export function Heading({children,p,size=30}:{children:React.ReactNode;p:Palette;size?:number}){
return <Text accessibilityRole="header" style={{fontSize:size,fontWeight:"800",letterSpacing:-.6,color:p.text,lineHeight:size*1.16}}>{children}</Text>;}
export function Description({children,p}:{children:React.ReactNode;p:Palette}){
return <Text style={{fontSize:15,lineHeight:23,color:p.sub}}>{children}</Text>;}
export function KitButton({label,onPress,p,secondary=false,danger=false,disabled=false}:{
label:string;onPress:()=>void;p:Palette;secondary?:boolean;danger?:boolean;disabled?:boolean}){
const color=danger?p.danger:secondary?p.surface:p.accent;
return <Pressable accessibilityRole="button" accessibilityLabel={label} accessibilityState={{disabled}} disabled={disabled} onPress={onPress}
style={({pressed})=>({minHeight:48,paddingHorizontal:18,paddingVertical:13,alignItems:"center",justifyContent:"center",borderRadius:14,
borderWidth:1,borderColor:secondary?p.border:color,backgroundColor:pressed?p.elevated:color,opacity:disabled?0.5:1})}>
<Text style={{fontSize:15,fontWeight:"700",color:pressed?p.text:secondary?p.text:danger?"#FFFFFF":p.accentText}}>{label}</Text></Pressable>;}
export function KitCard({title,detail,onPress,p,children}:{
title?:string;detail?:string;onPress?:()=>void;p:Palette;children?:React.ReactNode}){
const inner=<View style={{backgroundColor:p.surface,borderWidth:1,borderColor:p.border,borderRadius:20,padding:16,gap:8}}>
{title?<Text style={{color:p.text,fontSize:18,fontWeight:"700"}}>{title}</Text>:null}
{detail?<Description p={p}>{detail}</Description>:null}{children}</View>;
return onPress?<Pressable accessibilityRole="button" accessibilityLabel={title||detail||"Open item"} onPress={onPress}>{inner}</Pressable>:inner;}
export function KitField({label,p,value,onChangeText,placeholder,secureTextEntry,multiline}:{
label:string;p:Palette;value:string;onChangeText:(v:string)=>void;placeholder?:string;secureTextEntry?:boolean;multiline?:boolean}){
return <View style={{gap:6}}><Text style={{fontSize:13,fontWeight:"700",color:p.text}}>{label}</Text>
<TextInput accessibilityLabel={label} value={value} onChangeText={onChangeText} placeholder={placeholder}
placeholderTextColor={p.sub} secureTextEntry={secureTextEntry} multiline={multiline}
style={{minHeight:48,maxHeight:160,textAlignVertical:"top",fontSize:16,color:p.text,backgroundColor:p.surface,borderRadius:14,borderColor:p.border,borderWidth:1,paddingHorizontal:14,paddingVertical:12}}/></View>;}
export function KitToggle({label,detail,value,onChange,p}:{
label:string;detail?:string;value:boolean;onChange:(v:boolean)=>void;p:Palette}){
return <Pressable accessibilityRole="switch" accessibilityState={{checked:value}} accessibilityLabel={label}
onPress={()=>onChange(!value)} style={{flexDirection:"row",minHeight:56,alignItems:"center",justifyContent:"space-between",gap:12,paddingVertical:8}}>
<View style={{flex:1}}><Text style={{color:p.text,fontSize:16,fontWeight:"600"}}>{label}</Text>
{detail?<Description p={p}>{detail}</Description>:null}</View>
<View style={{width:50,height:30,borderRadius:18,backgroundColor:value?p.accent:p.border,padding:4,alignItems:value?"flex-end":"flex-start",justifyContent:"center"}}>
<View style={{width:22,height:22,borderRadius:11,backgroundColor:value?p.accentText:p.surface}}/></View></Pressable>;}
export function KitChip({label,active=false,onPress,p}:{label:string;active?:boolean;onPress:()=>void;p:Palette}){
return <Pressable accessibilityRole="button" accessibilityState={{selected:active}} onPress={onPress}
style={{minHeight:44,borderRadius:100,borderWidth:1,borderColor:active?p.accent:p.border,backgroundColor:active?p.accent:p.surface,paddingVertical:11,paddingHorizontal:15,justifyContent:"center"}}>
<Text style={{fontSize:13,fontWeight:"700",color:active?p.accentText:p.text}}>{label}</Text></Pressable>;}
export function KitProgress({value,p}:{value:number;p:Palette}){
const amount=Math.max(0,Math.min(1,value));
return <View accessibilityRole="progressbar" accessibilityValue={{min:0,max:100,now:Math.round(amount*100)}}
style={{height:9,backgroundColor:p.faint,borderRadius:8,overflow:"hidden"}}>
<View style={{width:`${amount*100}%` as const,height:9,backgroundColor:p.accent,borderRadius:8}}/></View>;}
export function KitNotice({text,p}:{text:string;p:Palette}){
return <View accessibilityRole="alert" style={{borderWidth:1,borderColor:p.border,backgroundColor:p.faint,padding:14,borderRadius:14}}>
<Text style={{color:p.text,lineHeight:21}}>{text}</Text></View>;}
