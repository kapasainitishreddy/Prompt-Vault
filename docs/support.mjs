/* Original, opt-in support surface. No account, invoice or analytics integration. MIT. */
import {coffeeUrl,externalUrl,videoSpec} from './support-core.mjs';
const $=id=>document.getElementById(id);
function link(label,url,sponsored=false){const a=document.createElement('a');a.textContent=label;a.href=url;a.target='_blank';a.rel=sponsored?'sponsored noopener noreferrer':'noopener noreferrer';return a;}
function activeSponsors(items){
 const valid=Array.isArray(items)?items.filter(s=>s&&s.approved===true&&typeof s.name==='string'&&s.name.trim()&&externalUrl(s.url)):[];
 if(!valid.length)return;
 const list=document.createElement('ul');list.className='sponsor-list';
 for(const sponsor of valid){const li=document.createElement('li');const label=document.createElement('strong');label.className='paid-label';label.textContent='Paid advertisement';li.append(label,link(sponsor.name.trim(),externalUrl(sponsor.url),true));list.append(li);}
 $('sponsors').replaceChildren(list);
}
function prepareVideo(raw){
 const video=videoSpec(raw);if(!video)return;
 const host=$('video-area');host.hidden=false;$('video-state').hidden=true;
 const paid=document.createElement('strong');paid.className='paid-label';paid.textContent='Paid advertisement · '+video.sponsor;
 const title=document.createElement('h3');title.textContent=video.title;
 const disclosure=document.createElement('p');disclosure.textContent='Loading the player connects to YouTube. No request to YouTube is made by this page until you choose Load video. Playback does not autoplay.';
 const actions=document.createElement('div');actions.className='support-links';const load=document.createElement('button');load.type='button';load.className='button';load.textContent='Load video player';
 const unload=document.createElement('button');unload.type='button';unload.className='quiet';unload.textContent='Unload player';unload.hidden=true;
 const frameHost=document.createElement('div');const status=document.createElement('p');status.className='boundary';status.setAttribute('role','status');status.textContent='Player not loaded.';
 const transcript=document.createElement('details');const summary=document.createElement('summary');summary.textContent='Read the complete transcript';const text=document.createElement('p');text.textContent=video.transcript;transcript.append(summary,text);
 load.addEventListener('click',()=>{if(frameHost.childElementCount)return;const frame=document.createElement('iframe');frame.title=video.title+' (paid advertisement)';frame.src=video.embed;frame.referrerPolicy='no-referrer';frame.setAttribute('allow','encrypted-media; picture-in-picture; fullscreen');frame.setAttribute('sandbox','allow-scripts allow-same-origin allow-presentation');frame.allowFullscreen=true;frameHost.append(frame);status.textContent='Player requested from YouTube. Press its Play control when ready. Captions are available in the player; transcript is below.';load.hidden=true;unload.hidden=false;unload.focus();});
 unload.addEventListener('click',()=>{frameHost.replaceChildren();load.hidden=false;unload.hidden=true;status.textContent='Player unloaded. Playback stopped.';load.focus();});
 actions.append(load,unload);host.append(paid,title,disclosure,actions,frameHost,status,transcript);
}
try{
 const response=await fetch('./support-config.json',{cache:'no-store'});if(!response.ok)throw new Error('Configuration unavailable');const config=await response.json();
 const url=coffeeUrl(config.coffeeUrl);
 if(url){$('coffee-state').hidden=true;const a=link('Buy the creator a coffee ↗',url);a.className='button';$('coffee-action').append(a);$('coffee-action').hidden=false;}
 activeSponsors(config.sponsors);prepareVideo(config.video);
}catch{ $('coffee-state').textContent='Support configuration is unavailable. No payment or video integration has been activated.'; }
