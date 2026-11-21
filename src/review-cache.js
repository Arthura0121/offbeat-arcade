import {cleanAnswer,validReview} from './rare-engine.js';

const REVIEW_TTL=7*86400000,MAX_REVIEWS=150;
const plain=value=>!!value&&typeof value==='object'&&!Array.isArray(value)&&(Object.getPrototypeOf(value)===Object.prototype||Object.getPrototypeOf(value)===null);
const shortText=(value,max)=>typeof value==='string'&&value.trim().length>0&&value.length<=max;
function ordered(value,depth=0){
 if(depth>8)throw new Error('Constraint is too deeply nested');
 if(value===null||typeof value==='string'||typeof value==='boolean')return value;
 if(typeof value==='number'&&Number.isFinite(value))return value;
 if(Array.isArray(value))return value.map(item=>ordered(item,depth+1));
 if(!plain(value))throw new Error('Invalid constraint');
 return Object.fromEntries(Object.keys(value).sort().map(key=>[key,ordered(value[key],depth+1)]));
}
function fingerprint(topic){
 if(!plain(topic)||!shortText(topic.id,100)||!shortText(topic.prompt,200)||!shortText(topic.scope,400))return null;
 if(topic.baseTopicId!==undefined&&!shortText(topic.baseTopicId,100))return null;
 if(topic.constraint!==undefined&&topic.constraint!==null&&!plain(topic.constraint))return null;
 try{const key=JSON.stringify([topic.baseTopicId||topic.id,topic.prompt,topic.scope,ordered(topic.constraint??null)]);return key.length<=2500?key:null;}catch{return null;}
}
function receipt(review){
 if(!plain(review)||!shortText(review.topicId,100)||!shortText(review.input,100)||review.input!==cleanAnswer(review.input)||!validReview(review,{id:review.topicId},review.input))return null;
 // Store only the receipt fields the game uses, rather than arbitrary server or local fields.
 return {kind:review.kind,decision:review.decision,topicId:review.topicId,input:review.input,canonical:review.canonical,tier:review.tier,explanation:review.explanation,source:review.source,...(typeof review.basis==='string'&&review.basis.length<=100?{basis:review.basis}:{}),...(typeof review.evidenceQuote==='string'&&review.evidenceQuote.length<=1500?{evidenceQuote:review.evidenceQuote}:{})};
}
function activeEntries(entries,now){
 if(!Array.isArray(entries)||!Number.isFinite(now)||now<0)return [];
 const seen=new Set();
 return entries.flatMap(entry=>{
  if(!plain(entry)||!shortText(entry.topicId,100)||!shortText(entry.fingerprint,2500)||!shortText(entry.input,100)||entry.input!==cleanAnswer(entry.input)||!Number.isFinite(entry.createdAt)||entry.createdAt<0||entry.createdAt>now||now-entry.createdAt>=REVIEW_TTL)return [];
  const review=receipt(entry.review);if(!review||review.topicId!==entry.topicId||review.input!==entry.input)return [];
  return [{topicId:entry.topicId,fingerprint:entry.fingerprint,input:entry.input,createdAt:entry.createdAt,review}];
 }).sort((a,b)=>b.createdAt-a.createdAt).filter(entry=>{const key=JSON.stringify([entry.fingerprint,entry.input]);if(seen.has(key))return false;seen.add(key);return true;}).slice(0,MAX_REVIEWS);
}

// Cached judgments remain provisional personal results, not authenticated score receipts.
export function getCachedReview(entries,topic,input,now=Date.now()){
 const key=fingerprint(topic),value=typeof input==='string'&&input.length<=100?cleanAnswer(input):'';
 if(!key||!value)return null;
 const entry=activeEntries(entries,now).find(entry=>entry.fingerprint===key&&entry.input===value);
 if(!entry)return null;
 const review={...entry.review,topicId:topic.id,input:value};
 return validReview(review,topic,input)?review:null;
}
export function addCachedReview(entries,topic,input,review,now=Date.now()){
 const current=activeEntries(entries,now),key=fingerprint(topic),value=typeof input==='string'&&input.length<=100?cleanAnswer(input):'',accepted=receipt(review);
 if(!key||!value||!accepted||!validReview(accepted,topic,input)||!Number.isFinite(now)||now<0)return current;
 return [{topicId:topic.id,fingerprint:key,input:value,createdAt:now,review:accepted},...current.filter(entry=>entry.fingerprint!==key||entry.input!==value)].slice(0,MAX_REVIEWS);
}
