/* Prompt-Vault Skill Composer: original, client-only, no model keys. */
(function(){
'use strict';
var entries=[],selected=new Set(),current=null;
var el=function(id){return document.getElementById(id);};
var esc=function(s){return String(s||'').replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});};
function filtered(){
var query=el('skill-search').value.toLowerCase().trim(),src=el('skill-source').value;
return entries.filter(function(s){return (src==='All'||src===s.source)&&(!query||[s.id,s.title,s.job,s.checks,s.family,s.source].join(' ').toLowerCase().includes(query));});
}
function update(){
var shown=filtered();el('skill-count').textContent=shown.length+' of '+entries.length+' original workflows';
el('skill-selected').textContent=selected.size+' / 3 selected';
el('skill-grid').innerHTML=shown.map(function(s,i){var picked=selected.has(s.id);return '<article class="skill-item"><span class="micro">'+esc(s.source)+' / '+esc(s.family)+'</span><h3>'+esc(s.title)+'</h3><p>'+esc(s.job)+'</p><small>'+esc(s.checks)+'</small><div class="skill-item-actions"><button type="button" data-add="'+esc(s.id)+'" aria-pressed="'+picked+'">'+(picked?'✓ Added to stack':'+ Add to stack')+'</button><button type="button" data-read="'+esc(s.id)+'">Read full prompt ↗</button></div></article>';}).join('');
}
async function read(id){
if(!/^[a-z0-9-]+$/.test(id))throw Error('Invalid recipe ID');
var response=await fetch('./prompts/skills/'+id+'.md');
if(!response.ok)throw Error('Prompt is not available');
return response.text();
}
async function compose(){
if(!selected.size){el('skill-status').textContent='Choose at least one workflow from the list.';return;}
el('skill-status').textContent='Reading complete source prompts…';
try{
var brief=el('skill-brief').value.trim()||'Fill in the real project purpose, existing code, users and constraints before implementation.';
var picks=entries.filter(function(e){return selected.has(e.id);});
var content=await Promise.all(picks.map(function(s){return read(s.id);}));
var intro='# Prompt-Vault · Composed Design Workflow\n\nPROJECT / REAL USER JOB\n'+brief+'\n\n## Run order and safeguards\nExecute each selected workflow sequentially without claiming unseen tests. Preserve all existing features/data. Use original product-specific visual decisions. Cross-check motion reduction, keyboard, focus, long text and rollback. Never install paid extras or vendor restricted assets. Cap improvement cycles at four rounds. Design, implement, observe, critique and stop.\n\n';
var complete=intro+content.map(function(t,i){return '---\n\n## Workflow '+(i+1)+' of '+content.length+': '+picks[i].title+'\n\n'+t;}).join('\n\n');
el('skill-output').value=complete;
el('skill-status').textContent='Composed '+picks.length+' full original workflow'+(picks.length>1?'s':'')+'. Edit and copy it. No AI service was called.';
}catch(_){el('skill-status').textContent='Unable to load one or more prompt files. Verify the docs/prompts/skills directory on the static host.';}
}
async function openSkill(id){
var s=entries.find(function(x){return x.id===id;});if(!s)return;
current=s;el('skill-modal-title').textContent=s.title;el('skill-modal-desc').textContent=s.job;
el('skill-modal-source').textContent=s.source+' / ORIGINAL WORKFLOW';
el('skill-original').href='https://github.com/kapasainitishreddy/Prompt-Vault/blob/main/prompts/skills/'+encodeURIComponent(id)+'.md';
el('skill-modal-text').textContent='Loading original complete Markdown…';
el('skill-dialog').showModal();el('skill-modal-close').focus();
try{el('skill-modal-text').textContent=await read(id);}catch(_){el('skill-modal-text').textContent='Full prompt unavailable here. Use the GitHub source link.';}
}
function setup(){
el('skill-search').addEventListener('input',update);el('skill-source').addEventListener('change',update);
el('skill-grid').addEventListener('click',function(ev){
var add=ev.target.closest('[data-add]');
if(add){
var id=add.dataset.add;
if(selected.has(id))selected.delete(id);
else if(selected.size>=3){el('skill-status').textContent='Choose no more than three focused skills. Remove another first.';return;}
else selected.add(id);update();return;
}
var btn=ev.target.closest('[data-read]');if(btn)openSkill(btn.dataset.read);
});
el('skill-compose-button').addEventListener('click',compose);
el('skill-copy').addEventListener('click',async function(){
var value=el('skill-output').value;if(!value){el('skill-status').textContent='Compose a prompt first.';return;}
try{await navigator.clipboard.writeText(value);el('skill-status').textContent='Composed prompt copied.';}
catch(_){el('skill-output').focus();el('skill-status').textContent='Clipboard unavailable; select and copy the output manually.';}
});
el('skill-clear').addEventListener('click',function(){selected.clear();update();el('skill-output').value='';el('skill-status').textContent='Selection cleared.';});
el('skill-modal-close').addEventListener('click',function(){el('skill-dialog').close();});
el('skill-modal-copy').addEventListener('click',async function(){
var value=el('skill-modal-text').textContent;
try{await navigator.clipboard.writeText(value);this.textContent='Copied ✓';}
catch(_){el('skill-modal-text').focus();this.textContent='Select text to copy';}
});
update();
}
fetch('./data/skills.json').then(function(r){if(!r.ok)throw Error('Catalog unavailable');return r.json();}).then(function(data){
entries=Array.isArray(data.skills)?data.skills:[];
if(entries.length!==16)throw Error('Incomplete skills catalog');
setup();
}).catch(function(){el('skill-status').textContent='Skills catalog could not load. Use the GitHub source links.';el('skill-count').textContent='Catalog unavailable';});
})();