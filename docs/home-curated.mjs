/* Original Prompt-Vault front-page edit: navigable art-directed web/app studies.
 * Entirely optional enhancement; static fallbacks and links work without JS.
 */
import {sceneFor} from "./remix-scenes.mjs";
const edit=[
 ["editorial-atlas","Editorial Atlas","Magazine-like websites"],
 ["swiss-signal","Swiss Signal","High-clarity product sites"],
 ["independent-bookshop","Common Stories","Books and publishing"],
 ["airport-planner","Departure Board","Purposeful mobile tools"],
 ["library-reader","Reading Room","Immersive reader experiences"],
 ["money-ledger","Quiet Ledger","Information-rich apps"]
];
function esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
async function render(){
 const target=document.getElementById("pv-curated-grid");if(!target)return;
 try{
  const res=await fetch("./data/styles.json",{cache:"default"});
  if(!res.ok)throw Error("Styles unavailable");
  const all=(await res.json()).styles||[];
  const styles=new Map(all.map(s=>[s.id,s]));
  const cards=edit.map(([id,label,description],i)=>{
   const s=styles.get(id);if(!s)return "";
   const visual=sceneFor(s,{mini:true,variant:"balanced"});
   return '<a class="pv-curated-card" href="./remix.html?type='+encodeURIComponent(s.target)+'&style='+encodeURIComponent(s.id)+'" aria-label="Explore the '+esc(label)+' original '+(s.target==="app"?"mobile":"website")+' design and customize it">'+
    '<div class="pv-curated-shot">'+visual+'</div>'+
    '<div class="pv-curated-caption"><span>'+String(i+1).padStart(2,"0")+" / "+(s.target==="app"?"MOBILE":"WEBSITE")+'</span><h3>'+esc(label)+'</h3><p>'+esc(description)+'</p><b aria-hidden="true">↗</b></div></a>';
  }).filter(Boolean);
  if(cards.length!==edit.length)throw Error("The curated styles are incomplete");
  target.innerHTML=cards.join("");
  document.getElementById("pv-curated-count").textContent="06 SELECTED / 48 AVAILABLE";
 }catch(err){
  const note=document.getElementById("pv-curated-status");
  if(note)note.textContent="Previews unavailable here. All 48 design directions are still browsable in Remix Studio.";
 }
}
render();
