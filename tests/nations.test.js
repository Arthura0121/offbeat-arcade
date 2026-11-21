import test from 'node:test';
import assert from 'node:assert/strict';
import {expandedRare} from '../data/rare-bank.js';
import {cleanAnswer,resolveAnswer} from '../src/rare-engine.js';

// Factual roster source: https://research.un.org/en/unmembers/currentmembers (20 Nov 2026).
const nations=expandedRare.find(t=>t.id==='nations');
test('prepared UN member-state bank has 193 distinct countries and unambiguous aliases',()=>{
 assert.equal(nations.answers.length,193);
 const names=nations.answers.flatMap(answer=>[answer.name,...answer.aliases].map(cleanAnswer));
 assert.equal(new Set(names).size,names.length);
 assert.equal(nations.source,'https://research.un.org/en/unmembers/currentmembers');
 assert.equal(nations.finite,true);
});
test('previously missing members and UN common-name variants resolve locally',()=>{
 for(const name of ['Albania','Algeria','Andorra','Argentina','Bangladesh','Bolivia (Plurinational State of)','Brunei Darussalam','Congo',"Côte d'Ivoire",'Czech Republic',"Democratic People's Republic of Korea",'Democratic Republic of the Congo','Iran (Islamic Republic of)',"Lao People's Democratic Republic",'Micronesia (Federated States of)','Naoero','Netherlands (Kingdom of the)','Republic of Korea','Republic of Moldova','Russian Federation','Syrian Arab Republic','Türkiye','United Republic of Tanzania','Venezuela (Bolivarian Republic of)','Viet Nam','South Sudan','The Bahamas','The Gambia','United States of America','United Kingdom of Great Britain and Northern Ireland'])assert.equal(resolveAnswer(nations,name).status,'accepted',name);
});
test('territories, observer states and non-member states are not accepted as UN members',()=>{
 for(const name of ['Taiwan','Kosovo','Vatican City','Holy See','Palestine','Greenland','Puerto Rico','Hong Kong','Scotland','England'])assert.notEqual(resolveAnswer(nations,name).status,'accepted',name);
});
test('launch country names, ratings and aliases remain intact',()=>{
 const launch=[['United States',1,'USA','US','United States of America'],['United Kingdom',1,'UK','Britain'],['France',1],['Germany',1],['Japan',1],['China',1],['India',1],['Canada',1],['Australia',1],['Italy',1],['Spain',1],['Mexico',1],['Brazil',1],['Kenya',2],['Ghana',3],['Peru',2],['Nepal',3],['Bhutan',4],['Belize',4],['Comoros',4],['Djibouti',4],['Kiribati',4],['Tuvalu',4],['Nauru',4],['Palau',4],['Vanuatu',4],['Lesotho',4],['Eswatini',4,'Swaziland'],['Sao Tome and Principe',4],['Timor-Leste',4,'East Timor'],['Suriname',4],['Cabo Verde',4,'Cape Verde'],['Seychelles',3],['San Marino',4],['Liechtenstein',4]];
 for(const [name,tier,...aliases] of launch){const answer=nations.answers.find(answer=>answer.name===name);assert.ok(answer,name);assert.equal(answer.tier,tier,name);for(const alias of aliases)assert.ok(answer.aliases.includes(alias),alias);}
});
