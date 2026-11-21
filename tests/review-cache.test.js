import test from 'node:test';
import assert from 'node:assert/strict';
import {addCachedReview,getCachedReview} from '../src/review-cache.js';

const now=1800000000000,week=7*86400000;
const topic={id:'ai-first-0',baseTopicId:'nations',prompt:'Name a UN member state.',scope:'English common names.',constraint:null};
const review={kind:'ai-answer',decision:'accepted',topicId:topic.id,input:'albania',canonical:'Albania',tier:2,explanation:'The reference directly confirms membership.',source:'https://en.wikipedia.org/wiki/Albania',basis:'ai-with-reference'};
const cache=()=>addCachedReview([],topic,'Albania',review,now);

test('cached accepted reviews normalize input and rebind equivalent remix IDs',()=>{
 const entries=cache(),next={...topic,id:'ai-another-3'};
 const hit=getCachedReview(entries,next,'  Ál-bania! ',now+1);
 assert.equal(hit.topicId,next.id);assert.equal(hit.input,'albania');assert.equal(hit.canonical,'Albania');
 assert.equal(entries[0].review.topicId,topic.id);
 assert.equal(getCachedReview(entries,next,'Albania',now+1).tier,2);
});
test('review cache separates base topic, prompt, scope, constraints and player answer',()=>{
 const entries=cache();
 for(const changed of [{baseTopicId:'islands'},{prompt:'Name an island country.'},{scope:'Names of at least two words.'},{constraint:{kind:'starts',value:'a'}}])assert.equal(getCachedReview(entries,{...topic,...changed},'Albania',now+1),null);
 assert.equal(getCachedReview(entries,topic,'Algeria',now+1),null);
 const withoutBase={...topic};delete withoutBase.baseTopicId;
 const ownReceipt={...review,topicId:withoutBase.id};
 const own=addCachedReview([],withoutBase,'Albania',ownReceipt,now);
 assert.ok(getCachedReview(own,withoutBase,'Albania',now));
 assert.equal(getCachedReview(own,{...withoutBase,id:'different'},'Albania',now),null);
});
test('constraint property order does not affect semantic matching',()=>{
 const a={...topic,constraint:{kind:'starts',value:'a'}},b={...topic,id:'second',constraint:{value:'a',kind:'starts'}};
 const entries=addCachedReview([],a,'Albania',review,now);
 assert.ok(getCachedReview(entries,b,'ALBANIA',now+10));
});
test('cache expires at seven days, rejects future entries and never refreshes on read',()=>{
 const entries=cache(),before=structuredClone(entries);
 assert.ok(getCachedReview(entries,topic,'Albania',now+week-1));
 assert.equal(getCachedReview(entries,topic,'Albania',now+week),null);
 assert.equal(getCachedReview(entries,topic,'Albania',now-1),null);
 assert.deepEqual(entries,before);
});
test('uncertain, mismatched and malformed receipts are not cached or reused',()=>{
 for(const changed of [{decision:'uncertain'},{topicId:'another'},{input:'algeria'},{canonical:''},{tier:5},{source:'https://example.com/Albania'},{explanation:''}]){
  const invalid={...review,...changed};
  assert.deepEqual(addCachedReview([],topic,'Albania',invalid,now),[]);
  assert.equal(getCachedReview([{...cache()[0],review:invalid}],topic,'Albania',now),null);
 }
 for(const entries of [null,{},'bad',[null], [{...cache()[0],createdAt:NaN}],[{...cache()[0],input:'ALBANIA'}],[{...cache()[0],fingerprint:''}]])assert.equal(getCachedReview(entries,topic,'Albania',now),null);
 assert.equal(getCachedReview(cache(),null,'Albania',now),null);
 assert.deepEqual(addCachedReview([],topic,'Albania',review,NaN),[]);
});
test('review cache keeps the newest 150 entries, replaces duplicates and prunes expiry',()=>{
 let entries=[];
 for(let i=0;i<160;i++){const input='answer'+i;entries=addCachedReview(entries,topic,input,{...review,input,canonical:input},now+i);}
 assert.equal(entries.length,150);assert.equal(getCachedReview(entries,topic,'answer0',now+200),null);
 assert.ok(getCachedReview(entries,topic,'answer159',now+200));
 const replaced=addCachedReview(entries,topic,'answer159',{...review,input:'answer159',canonical:'Updated answer'},now+201);
 assert.equal(replaced.length,150);assert.equal(getCachedReview(replaced,topic,'answer159',now+201).canonical,'Updated answer');
 assert.deepEqual(addCachedReview(replaced,topic,'Albania',{...review,decision:'uncertain'},now+week+1000),[]);
});
