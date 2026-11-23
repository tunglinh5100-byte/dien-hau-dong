const { chromium } = require('playwright');
(async () => { const b = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] }); const p = await b.newPage({ viewport: { width: 540, height: 960 } }); const e=[]; p.on('pageerror', x => e.push(x.message));
  await p.goto('http://localhost:8767/cb.html?dau=cobe2&ds=cobe2,quannhat&qd=1&live=1&sim=1&hm=1&mau=1'); await p.waitForTimeout(3000); await p.click('#ctSkip').catch(()=>{}); await p.mouse.click(270,500); await p.waitForTimeout(3000);
  await p.evaluate(()=>{ let i=0; while(window.__cuL(i)[0]!=='thayao') i++; window.__cuVao(i); }); await p.waitForTimeout(2500);
  const ids=[]; for (let k=0;k<8;k++){ const L = await p.evaluate(()=>{ const c=window.__cu(); let i=0; while(window.__cuL(i) && window.__cuL(i)[0]!==c.st) i++; return window.__cuL(i); });
    await p.evaluate(t=>window.__cuSeek(t), L[3]-2.5); const log=[]; for(let j=0;j<8;j++){ await p.waitForTimeout(500); log.push(await p.evaluate(()=>{const c=window.__cu(); return c.st+'@'+c.t.toFixed(1)+':'+c.au; })); } console.log(L[0], log.join(' ')); }
  console.log('err', e); await b.close(); })();
