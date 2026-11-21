import {Ocean} from './vendor/ocean.js';
const birdPilot=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" shape-rendering="crispEdges"><path fill="#061522" d="M14 8h20v4h6v24h-6v6H14v-6H8V16h6z"/><path fill="#bbf4e9" d="M14 12h20v4h4v18h-4v4H14v-4h-4V16h4z"/><path fill="#56b8cb" d="M14 16h20v16H14z"/><path fill="#fff0ba" d="M18 20h12v4h4v10H18z"/><path fill="#ffc759" d="M28 25h14v5H28zM16 37h6v6H12v-3h4zm12 0h6v3h5v3H28z"/><path fill="#061522" d="M27 22h3v4h-3z"/><path fill="#e8fbff" d="M14 15h4v10h-4z"/><path fill="#e76fa0" d="M9 30h8v5H5v-4h4z"/></svg>`;
const effects=['','schooler','rare','deepcut','krillion'];
const durations=[850,2100,2400,2700,3200];
export function createDiveScene(canvas){
 const mascot=document.createElement('div');mascot.className='rb-mascot';mascot.innerHTML=birdPilot;canvas.parentElement.append(mascot);
 const ocean=new Ocean(canvas,mascot);let stateKey='',drop=null,disposed=false;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 ocean.onFrame=now=>{
  if(disposed)return;
  const root=document.querySelector('.flight-game');if(!root)return;
  if(drop){const p=Math.min(1,(now-drop.start)/drop.duration);ocean.drop(drop.from,{tier:drop.effect,score:drop.points},p);root.style.setProperty('--plunge-progress',p);if(p===1){ocean.depth=ocean.target;ocean.setPhase('landed');root.classList.remove('is-plunging');root.classList.add('is-landed');ocean.goldLandAt=now;if(drop.points)ocean.burst(drop.tier===4?'#ffe37b':drop.tier===3?'#cfacff':'#69e9f5',drop.tier===4?110:45);drop=null;}};
  const readout=document.querySelector('[data-depth-readout]');if(readout)readout.textContent=Math.round(ocean.depth).toLocaleString();
  const scoreNode=document.querySelector('[data-score-readout]');if(scoreNode)scoreNode.textContent=Math.round(ocean.depth/10);
 };
 return {
  update(v,active,reveal){
   const key=[active,v.index,v.depth,v.topic?.id,reveal?.answer?.name,!!reveal,v.done].join(':');
   ocean.roundIndex=active?v.index+1:0;
   if(key!==stateKey){stateKey=key;const root=document.querySelector('.flight-game');
    if(!active){ocean.depth=0;ocean.target=0;ocean.setPhase('intro');drop=null;}
    else if(reveal){const tier=reveal.answer?.tier||0,from=v.depth-reveal.points*10;drop={from,points:reveal.points,tier,effect:effects[tier]||'miss',start:performance.now(),duration:reduced?1:durations[tier]};ocean.setPhase('plunge');root?.classList.add('is-plunging');}
    else if(v.done){drop=null;ocean.setPhase('done');ocean.depth=v.depth;ocean.target=v.depth;ocean.moveCamera(v.depth+50,900);}
    else {drop=null;ocean.setPhase('answering');ocean.round(v.depth);}
   }
   // A hint or a network status render should preserve an ongoing plunge.
   const root=document.querySelector('.flight-game');if(reveal)root?.classList.add(drop?'is-plunging':'is-landed');
  },
  attach(mount){mount.append(mascot);},
  type(){const box=document.querySelector('#answer')?.getBoundingClientRect();if(box)ocean.typeAt(box.x+Math.min(box.width-15,20+(document.querySelector('#answer').value.length*9)),box.y);},
  dispose(){disposed=true;ocean.dispose();mascot.remove();}
 };
}
