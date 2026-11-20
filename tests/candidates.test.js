import test from 'node:test';import assert from 'node:assert/strict';
import {parseCandidate} from '../scripts/candidates.mjs';
const valid={rare:[{id:'test-only',title:'Test topic',prompt:'A test prompt?',scope:'A closed test scope',source:'https://example.com',answers:[{name:'One',tier:1,aliases:[]},{name:'Two',tier:2,aliases:[]}]}],words:['APPLE'],groups:[]};
test('generation produces unreviewed artifact and never changes shipped bank',()=>{const result=parseCandidate('```json\n'+JSON.stringify(valid)+'\n```');assert.equal(result.status,'UNREVIEWED_DO_NOT_PUBLISH');assert.equal(result.baseVersion,'launch-1');assert.deepEqual(result.proposed.words,[]);});
test('reject malformed model output, bad tiers and invented structural fields',()=>{for(const s of ['not JSON','{}',JSON.stringify({...valid,rare:[{...valid.rare[0],answers:[{name:'x',tier:500,aliases:[]},{name:'y',tier:2,aliases:[]}]}]})])assert.throws(()=>parseCandidate(s));});
