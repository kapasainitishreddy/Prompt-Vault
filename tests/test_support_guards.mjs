import test from 'node:test';
import assert from 'node:assert/strict';
import {coffeeUrl,externalUrl,videoSpec} from '../docs/support-core.mjs';
test('only a real coffee account-shaped URL is allowed',()=>{
 assert.equal(coffeeUrl('https://www.buymeacoffee.com/some-creator'),'https://www.buymeacoffee.com/some-creator');
 for(const u of [null,'','https://buymeacoffee.com','https://buymeacoffee.com.evil.invalid/x','http://buymeacoffee.com/x','https://me:pw@buymeacoffee.com/x','javascript:alert(1)','https://buymeacoffee.com:443/x','https://buymeacoffee.com/x/../../y','https://buymeacoffee.com/x?next=evil','https://buymeacoffee.com/x#x'])assert.equal(coffeeUrl(u),null,String(u));
});
test('external destinations reject credentials, scripts and invalid URLs',()=>{
 assert.equal(externalUrl('https://example.com/about'),'https://example.com/about');
 for(const u of ['javascript:alert(1)','https://user:pass@example.com','//example.com','http://example.com','https://example.com:3000','https://localhost/x'])assert.equal(externalUrl(u),null,u);
});
test('video remains off unless metadata, disclosure and accessibility supplied',()=>{
 assert.equal(videoSpec(null),null);assert.equal(videoSpec({type:'youtube',id:'abcdefghijk'}),null);
 const v={type:'youtube',id:'abcdefghijk',title:'A sponsor demo',sponsor:'Example Co',transcript:'A complete demonstration transcript.',captionsConfirmed:true};
 assert.deepEqual(videoSpec(v),{...v,embed:'https://www.youtube-nocookie.com/embed/abcdefghijk'});
 for(const bad of [{...v,id:'not-valid'},{...v,transcript:''},{...v,captionsConfirmed:false},{...v,sponsor:''}])assert.equal(videoSpec(bad),null);
});
