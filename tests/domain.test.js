import {test} from 'node:test';
import assert from 'node:assert/strict';
import {quote,analytics} from '../public/js/domain.js';
import fs from 'node:fs';
const menu=JSON.parse(fs.readFileSync(new URL('../public/catalog.json',import.meta.url)));
test('authoritative integer prices, merged quantities and validation',()=>{
 assert.equal(quote([{id:'cuarto',quantity:2,priceCents:1},{id:'papas',quantity:1}],menu).totalCents,7100);
 assert.equal(quote([{id:'cuarto',quantity:1},{id:'cuarto',quantity:2}],menu).items[0].quantity,3);
 for(const cart of [[],[{id:'unknown',quantity:1}],[{id:'cuarto',quantity:0}],[{id:'cuarto',quantity:1.5}],[{id:'cuarto',quantity:21}]])assert.throws(()=>quote(cart,menu));
 assert.throws(()=>quote([{id:'cuarto',quantity:1}],menu.map(p=>({...p,available:false}))));
});
test('analytics excludes cancelled orders and uses Bolivia time',()=>{
 const q=quote([{id:'cuarto',quantity:2}],menu),o={...q,status:'confirmed',timestamp:'2026-10-29T02:00:00Z'};
 const s=analytics([o,{...o,status:'cancelled'}]);
 assert.equal(s.count,1);assert.equal(s.totalCents,5600);assert.equal(s.products['Cuarto de pollo'],2);
 assert.equal(s.dates['2026-10-28'],5600);assert.equal(s.hours['22'],1);
});
