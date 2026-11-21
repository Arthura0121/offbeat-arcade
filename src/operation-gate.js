// Only the latest operation may settle shared UI state. Cancellation invalidates
// the token before abort listeners can run; timeouts can still settle normally.
export function createOperationGate(){
 let current=null,sequence=0;
 const cancel=()=>{const previous=current;current=null;previous?.controller.abort();};
 return {
  begin(){cancel();current=Object.freeze({id:++sequence,controller:new AbortController()});return current;},
  isCurrent(operation){return !!operation&&current===operation;},
  finish(operation){if(current!==operation)return false;current=null;return true;},
  cancel
 };
}
