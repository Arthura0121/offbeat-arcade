import test from 'node:test';
import assert from 'node:assert/strict';
import {bank} from '../data/bank.js';
import {normalize,puzzle,gradeWord,createSession,play,view,restore,validateBank,utcDay} from '../src/engine.js';
const session=(g,m='daily',k='2026-11-19')=>createSession(bank,g,m,k);
test('starter bank has unique IDs, aliases, tiles and valid words',()=>assert.deepEqual(validateBank(bank),[]));
test('daily puzzles are deterministic and UTC date rolls over globally',()=>{
  for(const g of ['rare','word','groups'])assert.deepEqual(puzzle(bank,g,'daily','2026-11-19'),puzzle(structuredClone(bank),g,'daily','2026-11-19'));
  assert.equal(utcDay(new Date('2026-11-19T19:01:00-05:00')),'2026-11-20');
  assert.throws(()=>puzzle(bank,'word','daily','2026-02-30'));
});
test('practice word/group bags do not repeat until exhausted',()=>{
  for(const g of ['word','groups']){
    const count=g==='word'?bank.words.length:bank.groups.length;
    const values=Array.from({length:count},(_,i)=>puzzle(bank,g,'unlimited',`u:ab123456:${i}`));
    assert.equal(new Set(values.map(x=>x.id||x)).size,count);
  }
});
test('duplicate letters use exact matches first and never overcount',()=>{
  assert.deepEqual(gradeWord('ALLEY','APPLE'),['correct','present','absent','present','absent']);
  assert.deepEqual(gradeWord('EERIE','SHEEP'),['present','present','absent','absent','absent']);
  assert.deepEqual(gradeWord('GEESE','SHEEP'),['absent','present','correct','present','absent']);
});
test('word dictionary, duplicate guess, win lock and six-guess loss',()=>{
  let s=session('word');const answer=view(bank,s).p;
  assert.throws(()=>play(bank,s,{word:'ZZZZZ'}),/dictionary/);
  const guesses=bank.words.filter(w=>w!==answer).slice(0,6);
  s=play(bank,s,{word:guesses[0]});assert.throws(()=>play(bank,s,{word:guesses[0]}),/already/);
  for(const w of guesses.slice(1))s=play(bank,s,{word:w});
  assert.equal(view(bank,s).done,true);assert.equal(view(bank,s).won,false);assert.equal(view(bank,s).score,0);
  const won=play(bank,session('word'),{word:answer});assert.equal(view(bank,won).score,600);
  assert.throws(()=>play(bank,won,{word:guesses[0]}),/complete/);
});
test('all group puzzles solve correctly, reject duplicate and solved tiles',()=>{
  for(let i=0;i<bank.groups.length;i++){
    let s=session('groups','unlimited',`u:11111111:${i}`);const p=view(bank,s).p;
    assert.throws(()=>play(bank,s,{words:Array(4).fill(p.groups[0].words[0])}),/different/);
    s=play(bank,s,{words:p.groups[0].words});
    assert.throws(()=>play(bank,s,{words:p.groups[0].words}),/unsolved/);
    for(const g of p.groups.slice(1))s=play(bank,s,{words:g.words});
    assert.equal(view(bank,s).won,true);assert.equal(view(bank,s).score,400);
  }
});
test('four distinct wrong groups lose, repeated group does not use a mistake',()=>{
  let s=session('groups');const p=view(bank,s).p;
  const wrong=p.groups.map(g=>g.words[0]);s=play(bank,s,{words:wrong});
  assert.throws(()=>play(bank,s,{words:wrong.toReversed()}),/already/);assert.equal(view(bank,s).misses.length,1);
  for(let i=1;i<4;i++)s=play(bank,s,{words:p.groups.map(g=>g.words[i])});
  assert.equal(view(bank,s).done,true);assert.equal(view(bank,s).won,false);
});
test('saved-state replay rejects tampering, malformed input and post-win moves',()=>{
  const s=session('word');const won=play(bank,s,{word:view(bank,s).p});
  for(const raw of [null,{}, {...s,version:'old'}, {...s,actions:[{word:'ZZZZZ'}]}, {...s,key:'../../etc'}, {...won,actions:[...won.actions,{word:'APPLE'}]}, {...s,actions:Array(1000).fill({})}])assert.equal(restore(bank,raw),null);
});
test('bank checker rejects ambiguous aliases and repeated tiles',()=>{
  const b=structuredClone(bank);b.rare[0].answers[1].aliases.push(b.rare[0].answers[0].name);b.groups[0].groups[1].words[0]=b.groups[0].groups[0].words[0];
  const e=validateBank(b);assert.ok(e.some(x=>x.includes('alias')));assert.ok(e.some(x=>x.includes('unique tiles')));
});
