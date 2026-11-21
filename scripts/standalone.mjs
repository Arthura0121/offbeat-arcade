// Bundle the same modules and licensed assets into one portable HTML file.
import {readFile,writeFile} from 'node:fs/promises';
const read=f=>readFile(new URL('../'+f,import.meta.url),'utf8');
let html=await read('index.html');
const font=await readFile(new URL('../assets/fonts/VT323-Regular.ttf',import.meta.url));
const css=(await read('style.css')+'\n'+await read('dive.css')).replace("./assets/fonts/VT323-Regular.ttf",'data:font/ttf;base64,'+font.toString('base64'));
const assets={};for(const n of ['krill','krill-gold','schooler','rare','deepcut','tooclever'])assets[n]='data:image/svg+xml,'+encodeURIComponent(await read('assets/ocean/'+n+'.svg'));
const files=['data/rare-bank.js','data/bank.js','src/rare-engine.js','src/engine.js','src/vendor/seascape.js','src/vendor/ocean.js','src/dive-scene.js','src/dive-ui.js','src/config.js','src/review-cache.js','src/prepared-deck.js','src/app.js'];
let js='globalThis.__offbeatModules={};\n/* '+await read('assets/ocean/LICENSE.txt')+' */\n/* '+await read('assets/fonts/OFL.txt')+' */\n';
for(const file of files){
 let code=await read(file);const exported=[...code.matchAll(/^export (?:const|class|function) (\w+)/gm)].map(m=>m[1]);
 code=code.replace(/^import .*;\n/gm,'').replace(/^export /gm,'');
 if(file==='src/vendor/ocean.js')code=code.replace("new URL('../../assets/ocean/'+name+'.svg',import.meta.url).href",'('+JSON.stringify(assets)+')[name]');
 if(file==='src/dive-ui.js')code=code.replace(/const icon=t=>[^\n]+/,`const icon=t=>'<img src="'+(${JSON.stringify(assets)})[['','schooler','rare','deepcut','krill-gold'][t]]+'" alt="">';`);
 js+='\n'+(exported.length?'var '+exported.join(',')+';':'')+'\n{'+code+'\n'+exported.map(n=>'globalThis.__offbeatModules.'+n+'='+n+';').join('')+'}\n'+exported.map(n=>n+'=globalThis.__offbeatModules.'+n+';').join('');
}
html=html.replace('<link rel="stylesheet" href="./dive.css">','').replace('<link rel="stylesheet" href="./style.css">',()=>'<style>\n'+css+'\n</style>');
html=html.replace('<script type="module" src="./src/app.js"></script>',()=>'<script type="module">\n'+js.replace(/<\/script/gi,'<\\/script')+'\n</script>');
html=html.replace('<link rel="icon" type="image/svg+xml" href="./favicon.svg">','');
const output=process.argv[2]||'Offbeat-play.html';await writeFile(output,html);console.log('Standalone arcade saved to '+output);
