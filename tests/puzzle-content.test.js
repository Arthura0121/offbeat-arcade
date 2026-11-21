import test from 'node:test';
import assert from 'node:assert/strict';
import {bank} from '../data/bank.js';
import {createSession,play,view,restore} from '../src/engine.js';
import {resolveAnswer} from '../src/rare-engine.js';

test('the island prompt includes both archipelagos and their individual islands',()=>{
 const topic=bank.rare.find(t=>t.id==='islands');
 assert.equal(topic.prompt,'Name an island or archipelago.');
 assert.match(topic.scope,/Svalbard is an archipelago; Spitsbergen is an individual island/);
 for(const answer of ['Svalbard','Spitsbergen','Socotra'])assert.equal(resolveAnswer(topic,answer).status,'accepted');
});
test('previously saved Svalbard answers remain restorable after the scope correction',()=>{
 const previous=structuredClone(bank),islands=previous.rare.find(t=>t.id==='islands');
 islands.prompt='Name an island.';islands.answers=islands.answers.filter(a=>a.name!=='Spitsbergen');
 let s;
 for(let i=0;i<20;i++){
  const candidate=createSession(previous,'rare','unlimited',`u:a1b2c3d4:${i}`,{pace:'relaxed',theme:'world',level:'mixed'});
  if(view(previous,candidate).p.some(t=>t.id==='islands')){s=candidate;break;}
 }
 assert.ok(s);
 while(view(previous,s).topic.id!=='islands')s=play(previous,s,{type:'pass'});
 s=play(previous,s,{type:'answer',answer:'Svalbard'});
 const restored=restore(bank,s);assert.ok(restored);
 assert.equal(view(bank,restored).score,view(previous,s).score);
 assert.equal(view(bank,restored).rounds.at(-1).answer.name,'Svalbard');
});
