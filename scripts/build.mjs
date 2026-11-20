import {mkdir,cp,writeFile} from 'node:fs/promises';
import './validate.mjs';
await mkdir('dist',{recursive:true});
for(const file of ['index.html','style.css','favicon.svg','src','data'])await cp(file,'dist/'+file,{recursive:true});
await writeFile('dist/.nojekyll','');
console.log('Static site ready in dist/. No dependencies, keys, or server required.');
