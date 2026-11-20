// Runs in a maintainer's environment, NEVER in the visitor's browser.
import {mkdir,writeFile} from 'node:fs/promises';
import {bank} from '../data/bank.js';
import {parseCandidate} from './candidates.mjs';
const account=process.env.CF_ACCOUNT_ID, token=process.env.CF_AI_TOKEN;
if(!/^[a-f0-9]{32}$/i.test(account||'')||!token){console.error('Add CF_ACCOUNT_ID and CF_AI_TOKEN as repository Actions secrets first. No request made.');process.exit(1);}
const example={rare:[{id:'new-topic',title:'Short title',prompt:'Name an item from a finite factual set.',scope:'Exact closed scope.',source:'https://authoritative.example/reference',answers:[{name:'Answer',tier:1,aliases:[]}]}],words:['PLANT'],groups:[{id:'new-group-puzzle',groups:[{label:'Clear link',words:['ONE','TWO','THREE','FOUR']}]}]};
const prompt=`You draft original general-audience puzzle banks for Offbeat. Return only a JSON object with rare, words, groups arrays. Propose ONE rare-answer topic with a small closed factual scope and its COMPLETE answer set, TEN common five-letter English words, and ONE grouping puzzle of four groups of four unique uppercase words. Topics must be factual, unambiguous and have at least two answers. Give authoritative HTTPS source URLs for a human to verify. Never copy a publisher's puzzles. Familiarity tiers 1-4 are suggestions for human review, not player frequency. All names, prompts, labels and aliases <=200 chars; group tiles <=22 chars. Avoid existing IDs: ${bank.rare.map(x=>x.id).concat(bank.groups.map(x=>x.id)).join(', ')}. Shape (groups array must contain exactly four groups, not the one shown in the abbreviated example): ${JSON.stringify(example)}`;
try{
  const res=await fetch(`https://api.cloudflare.com/client/v4/accounts/${account}/ai/run/@cf/meta/llama-3.1-8b-instruct`,{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify({messages:[{role:'user',content:prompt}],max_tokens:3500,temperature:0.6}),signal:AbortSignal.timeout(45000)});
  if(!res.ok)throw new Error(`Cloudflare returned HTTP ${res.status}. No retry or publication. Check free quota and token permissions in the dashboard.`);
  const payload=await res.json();if(!payload.success)throw new Error('Provider rejected the generation request. Nothing published.');
  const candidate=parseCandidate(payload.result?.response);
  await mkdir('work/candidates',{recursive:true});await writeFile('work/candidates/candidate.json',JSON.stringify(candidate,null,2)+'\n');
  console.log('Structurally valid, UNREVIEWED draft saved to work/candidates/candidate.json. Live bank unchanged.');
}catch(e){console.error(e.message==='fetch failed'?'AI request could not connect. The shipped bank is unaffected.':e.message);process.exit(1);}
