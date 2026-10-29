import {test} from 'node:test';import assert from 'node:assert/strict';import {createApp} from '../server/index.js';
test('quotes and confirmations are scoped, price safe and idempotent',async()=>{
 const app=createApp({dbPath:':memory:',env:{ADMIN_TOKEN:'test-admin-token'}});
 await new Promise(r=>app.server.listen(0,'127.0.0.1',r));
 const base=`http://127.0.0.1:${app.server.address().port}`;let cookie='',csrf='';
 const call=async(route,method='GET',data,extra={})=>{
  const r=await fetch(base+'/api'+route,{method,headers:{Origin:base,'Content-Type':'application/json',Cookie:cookie,'X-CSRF-Token':csrf,...extra},body:data?JSON.stringify(data):undefined});
  return {r,data:await r.json()};
 };
 try{
  assert.equal((await call('/orders','POST',{})).r.status,401);
  let v=await call('/session','POST',{});cookie=v.r.headers.get('set-cookie').split(';')[0];csrf=v.data.csrf;
  v=await call('/quote','POST',{cart:[{id:'cuarto',quantity:2,priceCents:1}]});assert.equal(v.data.totalCents,5600);
  const body={quoteId:v.data.id,idempotencyKey:'01234567-1234-1234-1234',confirmed:false};
  assert.equal((await call('/orders','POST',body)).r.status,400);body.confirmed=true;
  v=await call('/orders','POST',body);assert.equal(v.r.status,201);assert.equal(v.data.order.totalCents,5600);
  const order=v.data.order;v=await call('/orders','POST',body);assert.equal(v.data.duplicate,true);
  assert.equal((await call('/orders')).data.length,1);
  assert.equal((await call('/orders','POST',{...body,idempotencyKey:'another-key-123456789'})).r.status,400);
  assert.equal((await call('/admin/orders')).r.status,401);
  v=await call('/admin/orders','GET',null,{Authorization:'Bearer test-admin-token'});assert.equal(v.data.analytics.count,1);assert.equal(v.data.sheets.state,'not-configured');
  assert.equal((await call('/orders','GET',null,{Cookie:''})).r.status,401);
  assert.equal((await call('/quote','POST',{cart:[{id:'cuarto',quantity:1}]},{'X-CSRF-Token':'wrong'})).r.status,403);
  assert.equal((await call('/quote','POST',{cart:[{id:'cuarto',quantity:1}]},{Origin:'https://evil.example'})).r.status,403);
  await call('/admin/status','POST',{id:order.id,status:'cancelled'},{Authorization:'Bearer test-admin-token'});
  v=await call('/admin/orders','GET',null,{Authorization:'Bearer test-admin-token'});assert.equal(v.data.analytics.count,0);
  assert.equal((await call('/admin/sync','POST',{}, {Authorization:'Bearer test-admin-token'})).data.state,'not-configured');
 }finally{await app.close();}
});
