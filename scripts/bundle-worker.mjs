import {readFile,mkdir,writeFile} from 'node:fs/promises';
const files=['data/rare-bank.js','data/bank.js','src/rare-engine.js','cloud/worker.js'];
let source=(await Promise.all(files.map(f=>readFile(f,'utf8')))).join('\n').replace(/^import .*;\n/gm,'').replace(/^export (?!default)/gm,'');
await mkdir('work',{recursive:true});await writeFile('work/offbeat-worker.js',source);console.log('Bundled Cloudflare Worker: work/offbeat-worker.js');
