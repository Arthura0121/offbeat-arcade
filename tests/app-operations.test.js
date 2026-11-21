import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';
import {webcrypto} from 'node:crypto';
import {bank} from '../data/bank.js';
import * as engine from '../src/engine.js';
import * as rare from '../src/rare-engine.js';
import * as prepared from '../src/prepared-deck.js';
import * as reviews from '../src/review-cache.js';
import {createOperationGate} from '../src/operation-gate.js';

// Execute the actual controller against small view/network doubles. No browser,
// cloud requests or source mutations are involved in these async ordering tests.
async function controller(){
 const listeners={},pending=[],storage=new Map();
 const classList={add(){},remove(){},toggle(){}};
 const node=()=>({classList,style:{setProperty(){}},append(){},setAttribute(){},focus(){},scrollIntoView(){},innerHTML:'',textContent:''});
 const input={...node(),value:'',dataset:{}},status=node(),main=node();
 const modal={...node(),open:false,close(){this.open=false;},showModal(){this.open=true;},addEventListener(){}};
 const document={body:{classList},hidden:false,title:'',createElement:node,querySelectorAll:()=>[],
  querySelector(selector){if(selector==='main')return main;if(selector==='#modal')return modal;if(selector==='#answer')return input;if(selector==='#game-message')return status;return node();},
  addEventListener(type,handler){(listeners[type]??=[]).push(handler);}};
 const context=vm.createContext({...engine,...rare,...prepared,...reviews,bank,createOperationGate,
  createDiveScene:()=>({attach(){},update(){},dispose(){},type(){}}),diveScreen:()=>'',AI_ENDPOINT:'https://test.invalid',
  document,window:{scrollTo(){},innerHeight:800,visualViewport:{height:800,addEventListener(){}}},
  matchMedia:()=>({matches:false}),crypto:webcrypto,performance:{now:()=>0},AbortSignal,AbortController,
  localStorage:{getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,v)},
  setTimeout:()=>1,clearTimeout(){},setInterval:()=>1,clearInterval(){},
  fetch(url,options){if(url.endsWith('/status'))return Promise.resolve({ok:true,json:async()=>({ready:true})});return new Promise((resolve,reject)=>pending.push({url,options,resolve:value=>resolve({ok:true,json:async()=>value}),reject}));}});
 const source=(await readFile(new URL('../src/app.js',import.meta.url),'utf8')).replace(/^import .*;\n/gm,'');
 vm.runInContext(source+`\nglobalThis.audit={start,beginDive,checkWithAI,updateDraft,submit,read,
  startReviewRound(){diveStarted=true;launchUntil=0;},
  state(){return {game,mode,session,aiBusy,aiMessage,message,diveStarted,draft};}};`,context);
 const click=dataset=>listeners.click[0]({target:{closest:()=>({dataset})}});
 const change=(id,value)=>listeners.change[0]({target:{id,value}});
 return {api:context.audit,pending,input,status,click,change};
}

function uncertain(message='Uncertain'){return {decision:'uncertain',message};}
function draft(){return {kind:'ai-expedition',format:2,roundId:'prepared-test',topics:bank.rare.slice(0,7)};}

test('cancel/retry ignores late review failure without resuming its replacement or restoring old text',async()=>{
 const c=await controller();c.api.start('rare',true);c.api.startReviewRound();
 c.input.value='first unlisted example';const first=c.api.checkWithAI();
 c.click({action:'cancel-check'});c.input.value='second unlisted example';const second=c.api.checkWithAI();
 c.pending[0].reject(new DOMException('Aborted','AbortError'));await first;
 assert.equal(c.api.state().aiBusy,true);assert.equal(c.input.value,'second unlisted example');
 c.pending[1].resolve(uncertain('Second review finished'));await second;
 assert.equal(c.api.state().aiBusy,false);assert.equal(c.api.state().message,'Second review finished');
});

test('a canceled review success cannot score or cache an accepted answer',async()=>{
 const c=await controller();c.api.start('rare',true);c.api.startReviewRound();
 const topic=engine.view(bank,c.api.state().session).topic;c.input.value='unlisted fixture';const request=c.api.checkWithAI();
 c.click({action:'cancel-check'});
 c.pending[0].resolve({kind:'ai-answer',decision:'accepted',topicId:topic.id,input:'unlistedfixture',canonical:'Reviewed fixture',tier:4,explanation:'Mock reference evidence.',source:'https://en.wikipedia.org/wiki/Fixture'});await request;
 assert.equal(c.api.state().session.actions.length,0);assert.equal(c.api.state().aiBusy,false);
 assert.equal(c.api.read('review-cache:'+bank.version,[]).length,0);
});

test('changing preparation settings cancels old work and prevents an old deck being applied',async()=>{
 const c=await controller();c.click({mode:'unlimited'});c.api.start('rare',true);
 c.click({source:'ai'});assert.equal(c.pending.length,1);
 c.change('dive-theme','nature');assert.equal(c.api.state().aiBusy,false);
 assert.match(c.api.state().aiMessage,/these settings/);
 const begin=c.api.beginDive();assert.equal(c.pending.length,2);assert.equal(c.api.state().aiBusy,true);
 c.pending[0].resolve(draft());await Promise.resolve();await Promise.resolve();
 assert.equal(c.api.state().aiBusy,true);assert.equal(c.api.state().session.deck,undefined);
 c.change('dive-theme','science');c.pending[1].resolve(draft());await begin;
 assert.equal(c.api.state().aiBusy,false);assert.equal(c.api.state().diveStarted,false);
 assert.equal(c.api.state().session.theme,'science');assert.equal(c.api.state().session.deck,undefined);
});

test('changing a Fivefold draft clears feedback from the previous word',async()=>{
 const c=await controller();c.api.start('word',true);c.api.updateDraft('ZZZZZ');c.api.submit({word:'ZZZZZ'});
 assert.match(c.api.state().message,/dictionary/);c.api.updateDraft('APPLE');
 assert.equal(c.api.state().draft,'APPLE');assert.equal(c.api.state().message,'');assert.equal(c.status.textContent,'');
});
