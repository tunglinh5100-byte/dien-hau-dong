const { chromium } = require('playwright');
const gia = process.argv[2], ids = process.argv[3].split(',');
(async () => { const b = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] }); const e=[]; const p = await b.newPage({ viewport: { width: 540, height: 960 } }); p.on('pageerror', x => e.push(x.message)); p.on('console', m => { if (m.type()==='error') e.push('c:'+m.text().slice(0,150)); });
  await p.goto('http://localhost:8767/cb.html?dau='+gia+'&ds='+gia+',quannhat&cc=1&cl=1&bo=2&qd=1&cnh=1&hm=1&mau=1&live=1&sim=1&dd=0'); await p.waitForTimeout(3000); await p.click('#ctSkip').catch(()=>{}); await p.mouse.click(270,500); await p.waitForTimeout(4000);
  console.log(await p.evaluate(()=>window.__cu().gia));
  for (const [k,id] of ids.entries()) { await p.evaluate(id=>{ let i=0; while(window.__cuL(i) && window.__cuL(i)[0]!==id) i++; window.__cuVao(i); }, id); await p.waitForTimeout(id==='thayao'?7000:3500); await p.screenshot({path:gia+'_'+k+'.png'}); const c=await p.evaluate(()=>window.__cu()); console.log(id, c.st, c.cur, c.ok, c.au, c.t); }
  console.log('err', e.slice(0,8)); await b.close(); })();
