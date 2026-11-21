import test from 'node:test';
import assert from 'node:assert/strict';
import {createOperationGate} from '../src/operation-gate.js';

test('replacement aborts and invalidates the old request without settling its replacement',()=>{
 const gate=createOperationGate(),first=gate.begin(),second=gate.begin();
 assert.equal(first.controller.signal.aborted,true);
 assert.equal(gate.isCurrent(first),false);
 assert.equal(gate.finish(first),false);
 assert.equal(gate.isCurrent(second),true);
 assert.equal(second.controller.signal.aborted,false);
});

test('cancel invalidates the token before synchronous abort listeners fire',()=>{
 const gate=createOperationGate(),operation=gate.begin();let currentAtAbort;
 operation.controller.signal.addEventListener('abort',()=>{currentAtAbort=gate.isCurrent(operation);});
 gate.cancel();assert.equal(currentAtAbort,false);assert.equal(gate.finish(operation),false);
});

test('an aborted old promise cannot settle a newly started request',async()=>{
 const gate=createOperationGate(),first=gate.begin();let settleOld;
 const pending=new Promise(resolve=>{settleOld=resolve;});
 const oldCompletion=pending.then(()=>gate.finish(first));
 gate.cancel();const retry=gate.begin();settleOld();
 assert.equal(await oldCompletion,false);assert.equal(gate.isCurrent(retry),true);
});

test('a current request timeout can still settle the operation and clear busy state',()=>{
 const gate=createOperationGate(),operation=gate.begin();operation.controller.abort();
 assert.equal(gate.isCurrent(operation),true);
 assert.equal(gate.finish(operation),true);
 assert.equal(gate.isCurrent(operation),false);
});
