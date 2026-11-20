// Original procedural artwork. The world survives UI updates so a score moves the camera.
export function createDiveScene(canvas){
 const ctx=canvas.getContext('2d'), reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 let frame=0,last=0,depth=0,target=0,started=false,entry=0,burst=0,disposed=false,initialized=false,finished=false;
 const marks=[[0,'SURFACE'],[200,'LIGHT SCATTERS'],[1000,'THE TWILIGHT'],[2500,'NO SUNLIGHT'],[4000,'THE ABYSS'],[6000,'UNCHARTED'],[7000,'THE LAST LIGHT']];
 function draw(now){if(disposed)return;const dt=Math.min((now-last)/1000||0,.05);last=now;depth=reduced?target:depth+(target-depth)*(1-Math.exp(-dt*2.6));burst=Math.max(0,burst-dt*.5);
 const box=canvas.getBoundingClientRect(),w=box.width,h=box.height,dpr=Math.min(devicePixelRatio,2);if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);}ctx.setTransform(dpr,0,0,dpr,0,0);
 entry=reduced?(started?220:0):entry+((started?220:0)-entry)*(1-Math.exp(-dt*2));const t=reduced?0:now/1000,camera=entry+depth*.24;
 const g=ctx.createLinearGradient(0,0,0,h);g.addColorStop(0,depth<1000?'#11677a':'#0a344b');g.addColorStop(1,'#071e32');ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
 // Topographic contours and a surface that physically travels out of view.
 ctx.lineWidth=1;for(let i=0;i<14;i++){ctx.strokeStyle='#64b8bd18';ctx.beginPath();for(let y=-30;y<h+30;y+=12){const x=w*.8+Math.sin(y*.005+i*.3+camera*.0004)*100+i*22; y===-30?ctx.moveTo(x,y):ctx.lineTo(x,y);}ctx.stroke();}
 const surface=210-camera;ctx.fillStyle='#d7ede1';ctx.fillRect(0,0,w,Math.max(0,surface));ctx.fillStyle='#f8cf59';ctx.beginPath();ctx.arc(w*.79,60-camera,27,0,7);ctx.fill();
 ctx.beginPath();ctx.moveTo(0,surface);for(let x=0;x<=w;x+=8)ctx.lineTo(x,surface+Math.sin(x*.025+t)*5);ctx.lineTo(w,0);ctx.lineTo(0,0);ctx.fillStyle='#d7ede1';ctx.fill();
 // Expedition launch: a small original research boat.
 ctx.save();ctx.translate(w*.23,surface-10);ctx.fillStyle='#102d3b';ctx.beginPath();ctx.moveTo(-48,-10);ctx.lineTo(52,-10);ctx.lineTo(30,12);ctx.lineTo(-33,12);ctx.closePath();ctx.fill();ctx.fillRect(-12,-38,38,28);ctx.fillStyle='#f8cf59';ctx.fillRect(-5,-31,9,10);ctx.fillRect(10,-31,9,10);ctx.fillStyle='#102d3b';ctx.fillRect(-20,-76,3,68);ctx.fillStyle='#f57758';ctx.fillRect(-17,-76,30,17);ctx.restore();
 // Distant shoals and drifting luminous plankton, seeded deterministically.
 for(let i=0;i<52;i++){let x=(i*197.31+t*(3+i%3))%w,y=((i*97.7-camera*(.2+i%4*.12)-t*(5+i%4))%(h+60)+h+60)%(h+60);ctx.fillStyle=i%6===0?'#f8cf5970':'#9adfdc45';ctx.fillRect(x,y, i%6===0?3:1.5, i%6===0?3:1.5);}
 for(let i=0;i<9;i++){const x=((i*173-t*(10+i%3*5))% (w+90)+w+90)%(w+90)-40,y=((i*211+330-camera*.5)%(h+300)+h+300)%(h+300);ctx.save();ctx.translate(x,y);ctx.fillStyle='#79bfc12b';ctx.beginPath();ctx.ellipse(0,0,12+i%3*3,4,0,0,7);ctx.fill();ctx.beginPath();ctx.moveTo(10,0);ctx.lineTo(19,-6);ctx.lineTo(19,6);ctx.fill();ctx.restore();}
 marks.forEach(([m,label])=>{const y=260+m*.24-camera;if(y<180||y>h-30||!started)return;ctx.strokeStyle='#9fd3ca44';ctx.setLineDash([3,7]);ctx.beginPath();ctx.moveTo(24,y);ctx.lineTo(w-24,y);ctx.stroke();ctx.setLineDash([]);ctx.fillStyle='#99c2bf';ctx.font='10px monospace';ctx.fillText(String(m).padStart(4,'0')+' M / '+label,28,y-9);});
 // A translucent jelly above the abyss; a broad ray deeper down.
 const ex=w*.9+Math.sin(t*.2)*24,ey=h*.63+Math.sin(t*.5)*14;
 ctx.save();ctx.translate(ex,ey);ctx.strokeStyle='#91d6d33b';ctx.fillStyle='#91d6d317';ctx.lineWidth=2;
 if(depth<2500){ctx.beginPath();ctx.ellipse(0,0,34,28,0,Math.PI,Math.PI*2);ctx.lineTo(34,5);ctx.lineTo(-34,5);ctx.fill();ctx.stroke();for(let j=0;j<5;j++){ctx.beginPath();ctx.moveTo(-24+j*12,5);ctx.bezierCurveTo(-40+j*12+Math.sin(t+j)*10,35,j*12,55,-25+j*12,88);ctx.stroke();}}
 else {ctx.beginPath();ctx.moveTo(-85,Math.sin(t)*12);ctx.quadraticCurveTo(-25,-55,0,-15);ctx.quadraticCurveTo(25,-55,85,Math.sin(t)*12);ctx.quadraticCurveTo(22,26,0,16);ctx.quadraticCurveTo(-22,26,-85,Math.sin(t)*12);ctx.fill();ctx.stroke();ctx.beginPath();ctx.moveTo(0,16);ctx.quadraticCurveTo(30,60,10,105);ctx.stroke();}ctx.restore();
 // A brass diving bell with a bird pilot, articulated fins and a breathing bubble trail.
 const bx=w*(started?(w<600?.73:.78):(w<600?.76:.31)),by=finished?-200:started?(w<600?205:h*.34):(w<600?198:h*.79);ctx.save();ctx.translate(bx,by+Math.sin(t*2)*5);if(w<600)ctx.scale(.65,.65);ctx.rotate(started?Math.min((target-depth)*.0005,.22):-.06);
 ctx.strokeStyle='#f7da76';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(0,-54);ctx.lineTo(0,-78);ctx.stroke();ctx.fillStyle='#facb4e';ctx.beginPath();ctx.ellipse(0,0,48,52,0,0,7);ctx.fill();ctx.fillStyle='#b78233';ctx.fillRect(-48,29,96,14);ctx.fillStyle='#092d43';ctx.beginPath();ctx.arc(0,-4,33,0,7);ctx.fill();ctx.strokeStyle='#fff0a4';ctx.lineWidth=4;ctx.stroke();ctx.fillStyle='#e7eed6';ctx.beginPath();ctx.ellipse(1,5,16,20,0,0,7);ctx.fill();ctx.fillStyle='#f4a14b';ctx.beginPath();ctx.moveTo(13,0);ctx.lineTo(28,6);ctx.lineTo(13,10);ctx.fill();ctx.fillStyle='#092d43';ctx.fillRect(7,-6,4,5);ctx.strokeStyle='#799fa6';ctx.lineWidth=3;ctx.beginPath();ctx.arc(-6,-7,22,3.4,4.7);ctx.stroke();ctx.fillStyle='#f57758';ctx.save();ctx.translate(-53,25);ctx.rotate(Math.sin(t*7)*.2);ctx.fillRect(-20,-6,22,12);ctx.restore();ctx.fillStyle='#f8cf59';ctx.fillRect(44,21,16,10);ctx.restore();
 for(let i=0;i<8;i++){const p=((t*.3+i*.14)%1);ctx.strokeStyle='#c0efdf66';ctx.lineWidth=1;ctx.beginPath();ctx.arc(bx-40-p*25,by-p*170,2+p*5,0,7);ctx.stroke();}
 if(burst>0&&!reduced){for(let i=0;i<32;i++){const a=i*2.4,r=(1-burst)*250;ctx.fillStyle=i%2?'#facb4e':'#b7f0da';ctx.globalAlpha=burst;ctx.fillRect(bx+Math.cos(a)*r,by+Math.sin(a)*r,4,4);}ctx.globalAlpha=1;}
 const readout=document.querySelector('[data-depth-readout]');if(readout)readout.textContent=Math.round(depth).toLocaleString();frame=requestAnimationFrame(draw);
 }
 frame=requestAnimationFrame(draw);
 return {update(v,active,celebrate){if(v.depth>target&&celebrate)burst=1;if(!initialized||v.depth<target){depth=v.depth;entry=active?220:0;initialized=true;}target=v.depth;started=active;finished=v.done;},dispose(){disposed=true;cancelAnimationFrame(frame);}};
}
