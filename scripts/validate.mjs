import {bank} from '../data/bank.js';
import {validateBank} from '../src/engine.js';
const errors=validateBank(bank);if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log(`Bank ${bank.version}: ${bank.rare.length} rare topics, ${bank.words.length} words, ${bank.groups.length} group puzzles validated.`);
