// A single-file copy is useful for trying the arcade without installing Node.
import {readFile,writeFile} from 'node:fs/promises';
const read=f=>readFile(new URL('../'+f,import.meta.url),'utf8');
let html=await read('index.html');
const css=await read('style.css');
const js=(await read('data/rare-bank.js')+'\n'+await read('data/bank.js')+'\n'+await read('src/rare-engine.js')+'\n'+await read('src/engine.js')+'\n'+await read('src/dive-scene.js')+'\n'+await read('src/dive-ui.js')+'\n'+await read('src/config.js')+'\n'+await read('src/app.js')).replace(/^import .*;\n/gm,'').replace(/^export /gm,'');
html=html.replace('<link rel="stylesheet" href="./style.css">',()=>'<style>\n'+css+'\n</style>');
html=html.replace('<script type="module" src="./src/app.js"></script>',()=>'<script type="module">\n'+js.replace(/<\/script/gi,'<\\/script')+'\n</script>');
html=html.replace('<link rel="icon" type="image/svg+xml" href="./favicon.svg">','');
const output=process.argv[2]||'Offbeat-play.html';
await writeFile(output,html);console.log('Standalone arcade saved to '+output);
