import {RARE_RULES,validDeck,rareView,rareMove} from './rare-engine.js';
export const GAMES = ['rare','word','groups'];
export const TITLES = {rare:'Rarebird',word:'Fivefold',groups:'Common Ground'};
export const TIERS = [null,{name:'Familiar',points:10},{name:'Uncommon',points:25},{name:'Hidden gem',points:50},{name:'Rarebird',points:100}];
export function normalize(value) {
  return String(value).normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');
}
export function hash(s) { let h=2166136261; for(const c of s) h=Math.imul(h^c.charCodeAt(0),16777619); return h>>>0; }
export function shuffle(items, seed) {
  let x=hash(String(seed))||1; const out=[...items];
  for(let i=out.length-1;i>0;i--) { x^=x<<13; x^=x>>>17; x^=x<<5; const j=(x>>>0)%(i+1); [out[i],out[j]]=[out[j],out[i]]; }
  return out;
}
export const utcDay = (date=new Date()) => date.toISOString().slice(0,10);
export function puzzle(bank, game, mode, key, options={}) {
  if(!GAMES.includes(game)||!['daily','unlimited'].includes(mode)) throw new Error('Unknown game');
  let seed, n;
  if(mode==='daily') {
    if(!/^\d{4}-\d{2}-\d{2}$/.test(key)||utcDay(new Date(key+'T00:00:00Z'))!==key) throw new Error('Invalid date');
    n=Math.floor(Date.parse(key)/86400000); seed=bank.version+':'+key;
  } else {
    if(!/^u:[a-f0-9]{8}:\d{1,9}$/.test(key)) throw new Error('Invalid practice key');
    const [,salt,count]=key.split(':'); n=Number(count); seed=bank.version+':'+salt;
  }
  const list=shuffle(game==='word'?bank.words:game==='groups'?bank.groups:bank.rare,seed+':'+game);
  // Daily word/group order is fixed for the bank release. Practice traverses a shuffled bag.
  const stable=mode==='daily'?shuffle(game==='word'?bank.words:game==='groups'?bank.groups:bank.rare,bank.version+':daily:'+game):list;
  let rarePool=bank.rare;
  if(game==='rare'&&mode==='unlimited'){const preferred=bank.rare.filter(t=>(!options.theme||options.theme==='mixed'||t.theme===options.theme)&&(!options.level||options.level==='mixed'||t.level===options.level));const themed=bank.rare.filter(t=>!options.theme||options.theme==='mixed'||t.theme===options.theme);rarePool=preferred.length>=7?preferred:themed.length>=7?themed:bank.rare;}
  if(game==='rare'){const pool=shuffle(rarePool,seed+':'+n);if(mode==='daily'){const used=new Set();return ['easy','easy','mixed','easy','mixed','hard','easy'].map(level=>{const t=pool.find(t=>!used.has(t.id)&&t.level===level)||pool.find(t=>!used.has(t.id));used.add(t.id);return t;});}return pool.slice(0,7);}
  return stable[((n%stable.length)+stable.length)%stable.length];
}
export function gradeWord(guess, answer) {
  const marks=Array(5).fill('absent'), pool=answer.split('');
  for(let i=0;i<5;i++) if(guess[i]===answer[i]) {marks[i]='correct';pool[i]=null;}
  for(let i=0;i<5;i++) if(marks[i]!=='correct') {const at=pool.indexOf(guess[i]);if(at!==-1){marks[i]='present';pool[at]=null;}}
  return marks;
}
export class GameError extends Error {}
export function createSession(bank,game,mode,key,options={}) {
  puzzle(bank,game,mode,key);
  if(game==='rare'){if(options.deck&&(mode!=='unlimited'||!validDeck(options.deck)))throw new Error('Invalid AI deck');return {version:bank.version,game,mode,key,rules:RARE_RULES,pace:options.pace==='relaxed'?'relaxed':'classic',level:['easy','mixed','hard'].includes(options.level)?options.level:'mixed',theme:['mixed','nature','world','culture','science'].includes(options.theme)?options.theme:'mixed',...(options.deck?{deck:options.deck,roundId:options.roundId}:{}),actions:[]};}
  return {version:bank.version,game,mode,key,actions:[]};
}
export function view(bank,session) {
  const p=puzzle(bank,session.game,session.mode,session.key,session), actions=session.actions;
  if(session.game==='rare') return rareView(session.deck||p,session);
  if(session.game==='word') {
    const rows=actions.map(x=>({word:x.word,marks:gradeWord(x.word,p)}));
    const won=rows.at(-1)?.word===p;
    return {p,rows,won,done:won||rows.length===6,score:won?(7-rows.length)*100:0};
  }
  const solved=[],misses=[];
  for(const x of actions){const i=p.groups.findIndex(g=>g.words.every(w=>x.words.includes(w)));if(i>=0)solved.push(i);else misses.push(x.words);}
  return {p,solved,misses,won:solved.length===4,done:solved.length===4||misses.length===4,score:solved.length*100};
}
export function play(bank,session,action) {
  const v=view(bank,session);
  if(v.done) throw new GameError('This puzzle is complete. Try unlimited for another round.');
  let next;
  if(session.game==='rare') {try{return rareMove(v.p,session,action);}catch(e){throw new GameError(e.message);}} else if(session.game==='word') {
    const word=typeof action.word==='string'?action.word.trim().toUpperCase():'';
    if(!/^[A-Z]{5}$/.test(word)) throw new GameError('Enter five letters.');
    if(!bank.words.includes(word)) throw new GameError('Not in our starter dictionary. Try another five-letter word.');
    if(session.actions.some(x=>x.word===word)) throw new GameError('You already tried that word.');
    next={word};
  } else {
    const words=action.words;
    const remaining=v.p.groups.flatMap((g,i)=>v.solved.includes(i)?[]:g.words);
    if(!Array.isArray(words)||words.length!==4||new Set(words).size!==4||!words.every(x=>remaining.includes(x))) throw new GameError('Select four different unsolved words.');
    if(session.actions.some(x=>x.words.every(w=>words.includes(w)))) throw new GameError('You already tried this group. No mistake used.');
    next={words:[...words].sort()};
  }
  return {...session,actions:[...session.actions,next]};
}
export function restore(bank, raw) {
  // Persist actions only; recompute every result. Never trust saved scores or solved flags.
  if(!raw||raw.version!==bank.version||!Array.isArray(raw.actions)||raw.actions.length>21) return null;
  try {
    if(raw.game==='rare'&&raw.rules!==RARE_RULES)return null;
    let s=createSession(bank,raw.game,raw.mode,raw.key,raw);
    for(const a of raw.actions) s=play(bank,s,a);
    return s;
  } catch { return null; }
}
export function validateBank(bank) {
  const errors=[];
  const text=x=>typeof x==='string'&&x.trim().length>0&&x.length<=200;
  if(!text(bank.version)||!Array.isArray(bank.rare)||bank.rare.length<7||!Array.isArray(bank.words)||!bank.words.length||!Array.isArray(bank.groups)||!bank.groups.length) return ['Missing bank fields'];
  const ids=new Set();
  for(const r of bank.rare) {
    if(!text(r.id)||ids.has(r.id)) errors.push('Duplicate/missing rare ID');ids.add(r.id);
    if(!text(r.prompt)||!text(r.title)||!text(r.scope)||!/^https:\/\//.test(r.source)||!Array.isArray(r.answers)||r.answers.length<2) {errors.push('Invalid rare topic '+r.id);continue;}
    const aliases=new Map();
    for(const a of r.answers){
      if(!text(a.name)||!Number.isInteger(a.tier)||!TIERS[a.tier]||!Array.isArray(a.aliases)||!a.aliases.every(text)) {errors.push('Invalid answer in '+r.id);continue;}
      for(const s of [a.name,...a.aliases]){const n=normalize(s);if(!n||aliases.has(n))errors.push('Ambiguous/duplicate alias '+s+' in '+r.id);aliases.set(n,a.name);}
    }
  }
  if(new Set(bank.words).size!==bank.words.length||bank.words.some(w=>typeof w!=='string'||!/^[A-Z]{5}$/.test(w))) errors.push('Invalid/duplicate five-letter word');
  ids.clear();
  for(const p of bank.groups){
    if(!text(p.id)||ids.has(p.id))errors.push('Duplicate/missing group ID');ids.add(p.id);
    if(!Array.isArray(p.groups)||p.groups.length!==4) {errors.push('Expected four groups in '+p.id);continue;}
    const words=p.groups.flatMap(g=>g.words||[]);
    if(words.length!==16||new Set(words.map(normalize)).size!==16)errors.push('Expected 16 unique tiles in '+p.id);
    for(const g of p.groups)if(!text(g.label)||!Array.isArray(g.words)||g.words.length!==4||!g.words.every(w=>text(w)&&w.length<=22&&w===w.toUpperCase()))errors.push('Invalid group in '+p.id);
  }
  return errors;
}
