/* Pure, conservative configuration guards. Original MIT code. */
export function externalUrl(value){
 if(typeof value!=='string'||value.length>2048||value!==value.trim()||/[\s\\]/.test(value))return null;
 try{
  const url=new URL(value);
  if(url.protocol!=='https:'||url.username||url.password||url.port||!url.hostname.includes('.')||url.hostname==='localhost'||url.hostname.endsWith('.localhost'))return null;
  return url.href;
 }catch{return null;}
}
export function coffeeUrl(value){
 if(typeof value!=='string'||!/^https:\/\/(www\.)?buymeacoffee\.com\/[A-Za-z0-9_-]{1,80}\/?$/.test(value))return null;
 return externalUrl(value);
}
export function videoSpec(value){
 if(!value||typeof value!=='object'||value.type!=='youtube'||!/^[-_A-Za-z0-9]{11}$/.test(value.id||''))return null;
 if(typeof value.title!=='string'||!value.title.trim()||typeof value.sponsor!=='string'||!value.sponsor.trim()||typeof value.transcript!=='string'||!value.transcript.trim()||value.captionsConfirmed!==true)return null;
 return {type:'youtube',id:value.id,title:value.title.trim(),sponsor:value.sponsor.trim(),transcript:value.transcript.trim(),captionsConfirmed:true,embed:'https://www.youtube-nocookie.com/embed/'+value.id};
}
