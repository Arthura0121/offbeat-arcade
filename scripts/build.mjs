import {mkdir,cp,writeFile,readFile,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import './validate.mjs';
await mkdir('dist',{recursive:true});
for(const file of ['index.html','style.css','dive.css','assets','favicon.svg','src','data'])await cp(file,'dist/'+file,{recursive:true});
async function walk(dir){const out=[];for(const entry of await readdir(dir,{withFileTypes:true})){const p=dir+'/'+entry.name;out.push(...(entry.isDirectory()?await walk(p):[p]));}return out.sort();}
const files=await walk('dist'),hash=createHash('sha256');for(const file of files){hash.update(file);hash.update(await readFile(file));}const revision=hash.digest('hex').slice(0,12);
// One revision for the whole module graph prevents a cached old UI from mixing with new code.
for(const file of files.filter(f=>f.endsWith('.js'))){let code=await readFile(file,'utf8');code=code.replace(/\b(from\s*|import\s*)(['"])(\.{1,2}\/[^'"]+)\2/g,(_,prefix,quote,path)=>prefix+quote+path+(path.includes('?')?'&':'?')+'v='+revision+quote);await writeFile(file,code);}
let html=await readFile('dist/index.html','utf8');html=html.replace(/((?:href|src)=["'])(\.\/[^"']+\.(?:css|js))(["'])/g,(_,before,path,after)=>before+path+'?v='+revision+after);await writeFile('dist/index.html',html);
await writeFile('dist/.nojekyll','');
console.log('Static site ready in dist/. Revision '+revision+'. No player keys required.');
