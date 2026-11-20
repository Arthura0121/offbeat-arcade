import {bank} from '../data/bank.js';
import {validateBank} from '../src/engine.js';
export function parseCandidate(text){
  if(typeof text!=='string'||text.length>100000)throw new Error('Candidate too large or missing');
  const cleaned=text.trim().replace(/^```(?:json)?\s*/i,'').replace(/\s*```$/,'');
  let data;try{data=JSON.parse(cleaned);}catch{throw new Error('Model did not return a JSON object. Nothing published.');}
  if(!data||!['rare','words','groups'].every(k=>Array.isArray(data[k]))||!data.rare.length)throw new Error('Expected rare, words and groups arrays and at least one rare topic');
  if(data.rare.length>5||data.words.length>100||data.groups.length>5)throw new Error('Candidate exceeds batch size');
  // Existing words need not be added again; IDs and aliases still must be unique.
  data.words=[...new Set(data.words)].filter(w=>!bank.words.includes(w));
  const errors=validateBank({version:'candidate',rare:[...bank.rare,...data.rare],words:[...bank.words,...data.words],groups:[...bank.groups,...data.groups]});
  if(errors.length)throw new Error('Candidate failed structural validation: '+errors.join('; '));
  return {status:'UNREVIEWED_DO_NOT_PUBLISH',generatedAt:new Date().toISOString(),baseVersion:bank.version,proposed:data,
    reviewRequired:['Verify every fact against independent sources; AI URLs can be invented.','Check scope completeness and aliases.','Human-set familiarity tiers; never use AI confidence as rarity.','Solve grouping puzzle independently and check alternative groupings.','Remove offensive or inappropriate content, confirm original authorship, then release under a new bank version.']};
}
