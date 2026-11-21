import test from 'node:test';
import assert from 'node:assert/strict';
import {bank} from '../data/bank.js';
import {enrichDeck,readPreparedDeck} from '../src/prepared-deck.js';
import {composeTopic} from '../cloud/worker.js';
import {validDeck} from '../src/rare-engine.js';
test('AI decks gain vetted country answers only for exactly matching constraints',()=>{
 const base=bank.rare.find(t=>t.id==='nations');
 for(const constraint of [null,{kind:'starts',value:'a'},{kind:'contains',value:'a'},{kind:'multiword'}]){
  const t=composeTopic({topic:base,constraint},'ai-countries');const small={...t,answers:t.answers.slice(0,3)};
  const [full]=enrichDeck(bank,[small]);assert.equal(full.answers.length,t.answers.length);assert.deepEqual(full.answers,t.answers);
  const changed={...small,prompt:small.prompt+' Except Albania.'};assert.deepEqual(enrichDeck(bank,[changed]),[changed]);
 }
});
test('prepared AI decks expire and remain matched to settings',()=>{
 const topics=bank.rare.slice(0,7),result={kind:'ai-expedition',format:2,roundId:'round-test',topics};assert.ok(validDeck(topics));
 const e={savedAt:1000,theme:'mixed',level:'easy',slot:0,result};assert.equal(readPreparedDeck(e,'mixed','easy',0,2000),result);
 assert.equal(readPreparedDeck(e,'nature','easy',0,2000),null);assert.equal(readPreparedDeck(e,'mixed','hard',0,2000),null);
 assert.equal(readPreparedDeck(e,'mixed','easy',1,2000),null);assert.equal(readPreparedDeck(e,'mixed','easy',0,1000+20*3600000),null);
 assert.equal(readPreparedDeck(e,'mixed','easy',0,999),null);
});
