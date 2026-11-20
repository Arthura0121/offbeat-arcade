// Rarebird v2: seven rounds, visible answer checks, hints, timed or relaxed play.
export const RARE_RULES='dive-2';
export const ROUND_COUNT=7;
export const RARE_TIERS=[null,{name:'Familiar',points:10},{name:'Uncommon',points:25},{name:'Hidden gem',points:50},{name:'Rarebird',points:100}];
export const cleanAnswer=value=>String(value??'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');
export function editDistance(a,b){const d=Array.from({length:a.length+1},()=>Array(b.length+1).fill(0));for(let i=0;i<=a.length;i++)d[i][0]=i;for(let j=0;j<=b.length;j++)d[0][j]=j;for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]!==b[j-1]));return d[a.length][b.length];}
export function resolveAnswer(topic,input){
 const value=cleanAnswer(input);if(!value)return {status:'empty'};
 const exact=topic.answers.find(a=>[a.name,...a.aliases].some(x=>cleanAnswer(x)===value||cleanAnswer(x)===cleanAnswer(String(input).trim().replace(/^the\s+/i,''))));if(exact)return {status:'accepted',answer:exact};
 // Offer, never silently apply, a unique typo correction. Short aliases never fuzzy-match.
 if(value.length>=4&&value.length<=80){const candidates=topic.answers.filter(a=>[a.name,...a.aliases].some(x=>{const n=cleanAnswer(x);return n.length>=4&&Math.abs(n.length-value.length)<=1&&editDistance(n,value)<=1;}));if(candidates.length===1)return {status:'suggestion',answer:candidates[0]};}
 return {status:'unknown'};
}
const text=(s,max=200)=>typeof s==='string'&&s.trim().length>0&&s.length<=max;
export function validTopic(t){
 if(!t||!text(t.id,100)||!text(t.title)||!text(t.prompt)||!text(t.scope,400)||!Array.isArray(t.answers)||t.answers.length<3||t.answers.length>100)return false;
 const seen=new Set();
 for(const a of t.answers){if(!a||!text(a.name,100)||!Number.isInteger(a.tier)||!RARE_TIERS[a.tier]||!Array.isArray(a.aliases)||a.aliases.length>12||!a.aliases.every(x=>text(x,100)))return false;for(const x of [a.name,...a.aliases]){const n=cleanAnswer(x);if(!n||seen.has(n))return false;seen.add(n);}}
 return true;
}
export function validDeck(deck){return Array.isArray(deck)&&deck.length===7&&deck.every(validTopic)&&new Set(deck.map(t=>t.id)).size===7;}
export function validReview(review,topic,answer){return !!review&&review.kind==='ai-answer'&&review.decision==='accepted'&&review.topicId===topic.id&&review.input===cleanAnswer(answer)&&text(review.canonical,100)&&Number.isInteger(review.tier)&&!!RARE_TIERS[review.tier]&&text(review.explanation,500)&&/^https:\/\/en\.wikipedia\.org\/wiki\//.test(review.source||'');}
export function rareView(topics,s){
 const rounds=[];let hinted=false,lives=3;
 for(const a of s.actions){if(a.type==='hint'){hinted=true;continue;}const topic=topics[rounds.length];let answer=null,basis='bank';if(a.type==='answer'){const match=resolveAnswer(topic,a.answer);answer=match.status==='accepted'?match.answer:{name:a.review.canonical,tier:a.review.tier,aliases:[]};basis=match.status==='accepted'?'bank':'ai';}if(a.type==='timeout')lives--;const points=answer?Math.min(RARE_TIERS[answer.tier].points,hinted?25:100):0;rounds.push({topic,answer,points,hinted,basis,reason:a.type,review:a.review||null});hinted=false;}
 const score=rounds.reduce((n,r)=>n+r.points,0),done=rounds.length===7||lives===0;
 return {p:topics,rounds,score,depth:score*10,lives,hinted,done,won:rounds.length===7&&lives>0,index:rounds.length,topic:topics[rounds.length]};
}
export function rareMove(topics,s,action){
 const v=rareView(topics,s);if(v.done)throw new Error('Your dive is complete. Start another expedition.');
 if(!action||typeof action!=='object')throw new Error('Choose an answer or pass this round.');
 let move;
 if(action.type==='hint'){if(v.hinted)throw new Error('Your hint is already open.');move={type:'hint'};}
 else if(['pass','timeout'].includes(action.type))move={type:action.type};
 else if(action.type==='answer'){
  if(!text(action.answer,100))throw new Error('Type an answer first.');
  const match=resolveAnswer(v.topic,action.answer);
  if(match.status==='accepted')move={type:'answer',answer:match.answer.name};
  else if(validReview(action.review,v.topic,action.answer))move={type:'answer',answer:action.answer,review:action.review};
  else throw new Error(match.status==='suggestion'?`Did you mean ${match.answer.name}? Confirm the suggestion, or ask AI to check your answer.`:'Not in our bank yet. Ask AI to check it, try another answer, or pass. No penalty.');
 }else throw new Error('Unknown round action.');
 return {...s,actions:[...s.actions,move]};
}
