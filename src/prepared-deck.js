import {validDeck,cleanAnswer} from './rare-engine.js';
const supports=(c,name)=>!c?true:c.kind==='starts'?cleanAnswer(name).startsWith(c.value):c.kind==='contains'?cleanAnswer(name).includes(c.value):c.kind==='multiword'?name.trim().split(/\s+/).length>=2:false;
// Add only independently vetted local answers to an exactly matching composed question.
export function enrichDeck(bank,deck){return deck.map(t=>{
 const base=bank.rare.find(b=>b.id===t.baseTopicId);if(!base)return t;const c=t.constraint;let expected=base.prompt;
 if(c){if(!['starts','contains','multiword'].includes(c.kind)||c.kind!=='multiword'&&!/^[a-z]$/.test(c.value))return t;
 if(c.kind==='starts')expected=expected.replace(/[.?!]$/,'')+` whose English name starts with ${c.value.toUpperCase()}.`;
 if(c.kind==='contains')expected=expected.replace(/[.?!]$/,'')+` whose English name contains the letter ${c.value.toUpperCase()}.`;
 if(c.kind==='multiword')expected=expected.replace(/[.?!]$/,'')+' using a name of two or more words.';
 }
 if(t.prompt!==expected)return t;
 const answers=base.answers.filter(a=>supports(c,a.name)).map(a=>({...a,aliases:a.aliases.filter(n=>supports(c,n))}));
 return answers.length>=t.answers.length?{...t,answers}:t;
});}
export function readPreparedDeck(entry,theme,level,slot,now=Date.now()){
 if(!entry||!Number.isFinite(entry.savedAt)||entry.savedAt>now||now-entry.savedAt>=20*3600000||entry.theme!==theme||entry.level!==level||entry.slot!==slot)return null;
 const r=entry.result;return r?.kind==='ai-expedition'&&r.format===2&&typeof r.roundId==='string'&&r.roundId.length<100&&validDeck(r.topics)?r:null;
}
