/* Dựng website daomau.adela.com.vn từ web/seo.json (chạy trên Cloudflare Pages: Build command = node build.js).
   - Gắn tiêu đề, mô tả, từ khóa, ảnh chia sẻ vào web/index.html và web/le.html
   - Tạo trang riêng cho từng giá: /gia/<slug>/
   - Tạo sitemap.xml, robots.txt
   Không cần cài thêm gói nào. Chạy lại nhiều lần vẫn ra cùng kết quả. */
const fs = require('fs'), path = require('path'), vm = require('vm');
const R = __dirname, doc = f => fs.readFileSync(path.join(R, f), 'utf8'), ghi = (f, s) => { fs.mkdirSync(path.dirname(path.join(R, f)), { recursive: true }); fs.writeFileSync(path.join(R, f), s); };
const seo = JSON.parse(doc('web/seo.json')), w = {};
for (const f of ['web/gia.js', 'bangtin.js', 'bangtin-en.js']) vm.runInNewContext(doc(f), { window: w });
const S = seo.site, DOM = (S.domain || '').replace(/\/$/, ''), esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const abs = u => /^https?:/.test(u || '') ? u : DOM + (u || '');
const slugOf = g => (seo.gia[g.id] && seo.gia[g.id].slug) || g.id;
function dau(o, url, img, them) {
  return `<!--SEO-->
<title>${esc(o.title)}</title>
<meta name="description" content="${esc(o.description)}">
${o.keywords ? `<meta name="keywords" content="${esc(o.keywords)}">\n` : ''}<link rel="canonical" href="${esc(url)}">
<meta property="og:type" content="website"><meta property="og:site_name" content="${esc(S.name)}">
<meta property="og:title" content="${esc(o.title)}"><meta property="og:description" content="${esc(o.description)}">
<meta property="og:url" content="${esc(url)}"><meta property="og:image" content="${esc(abs(img))}">
<meta name="twitter:card" content="summary_large_image">
${S.googleVerify ? `<meta name="google-site-verification" content="${esc(S.googleVerify)}">\n` : ''}${them || ''}<!--/SEO-->`;
}
const thay = (s, a, b, moi) => { const i = s.indexOf(a), j = s.indexOf(b); if (i < 0 || j < 0) throw new Error('thiếu dấu ' + a); return s.slice(0, i) + moi + s.slice(j + b.length); };

/* 1. Trang chủ */
{ let s = doc('web/index.html'); const h = seo.pages.home.en;
  const ld = `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebSite', name: S.name, url: DOM + '/web/', inLanguage: ['en', 'vi'], description: h.description, publisher: { '@type': 'Organization', name: 'ADELA Building JSC', url: 'https://adela.com.vn' } })}</script>\n`;
  s = thay(s, '<!--SEO-->', '<!--/SEO-->', dau(h, DOM + '/web/', S.ogImage, ld));
  s = thay(s, '<!--DS-->', '<!--/DS-->', '<!--DS--><nav class="tat-ca" aria-label="All spirits"><b data-t="tatca">All spirits · Các giá hầu</b><div>' + w.DM_GIA.map(g => `<a href="../gia/${slugOf(g)}/">${esc(g.vi)}<small> · ${esc(g.en)}</small></a>`).join('') + '</div></nav><!--/DS-->');
  s = s.replace(/const TIKTOK_URL = '[^']*';/, `const TIKTOK_URL = '${String(S.tiktok || '').replace(/'/g, '')}';`);
  s = s.replace(/<script id="seo-chu">[\s\S]*?<\/script>/, `<script id="seo-chu">window.DM_SEO = ${JSON.stringify({ en: seo.pages.home.en, vi: seo.pages.home.vi })};</script>`);
  ghi('web/index.html', s); }

/* 2. Phòng lễ */
{ let s = doc('web/le.html'); const r = seo.pages.room.en;
  s = thay(s, '<!--SEO-->', '<!--/SEO-->', dau({ title: r.title.replace('{gia}', 'Đạo Mẫu'), description: r.description.replace('{gia}', 'a hầu đồng') }, DOM + '/web/le.html', S.ogImage, '<meta name="robots" content="noindex, follow">\n'));
  s = s.replace(/<script id="seo-chu">[\s\S]*?<\/script>/, `<script id="seo-chu">window.DM_SEO_ROOM = ${JSON.stringify(seo.pages.room)};</script>`);
  ghi('web/le.html', s); }

/* 3. Trang từng giá */
const CSS = `:root{--nen:#160807;--nen2:#241010;--vang:#e6b552;--vang2:#f6dc96;--chu:#f6ecdf;--mo:#c9b8a6;--vien:rgba(230,181,82,.28);--serif:'Noto Serif',Georgia,serif;--sans:'Be Vietnam Pro',system-ui,-apple-system,'Segoe UI',sans-serif}*{box-sizing:border-box}body{margin:0;background:var(--nen);color:var(--chu);font:16px/1.65 var(--sans);-webkit-font-smoothing:antialiased}a{color:inherit}.wrap{max-width:980px;margin:0 auto;padding:0 20px}header{border-bottom:1px solid var(--vien)}header .wrap{display:flex;align-items:center;justify-content:space-between;height:58px}header a{text-decoration:none;font:700 18px var(--serif);color:var(--vang2)}.vt{display:grid;grid-template-columns:320px 1fr;gap:36px;padding:40px 0}.vt img{width:100%;border-radius:18px;border:1px solid var(--vien);display:block}h1{font:700 clamp(30px,5vw,46px)/1.15 var(--serif);margin:0 0 4px}.ten2{color:var(--vang2);font-weight:500;margin:0 0 16px}.mo{font-size:18px;color:#eadccd}.nut{display:inline-block;margin:18px 0 0;background:var(--vang);color:#2a1206;text-decoration:none;font-weight:600;padding:13px 22px;border-radius:12px}h2{font:700 24px var(--serif);color:var(--vang2);margin:32px 0 10px}ul.tich{padding:0;list-style:none;margin:0}ul.tich li{padding:10px 0 10px 22px;position:relative;border-bottom:1px solid rgba(230,181,82,.12)}ul.tich li::before{content:'✦';position:absolute;left:0;color:var(--vang)}.nguon{color:var(--mo);font-size:13px;font-style:italic;margin-top:10px}.luu{color:var(--mo);font-size:14px;border-top:1px solid var(--vien);margin-top:36px;padding:20px 0 40px}.khac{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}.khac a{text-decoration:none;font-size:13.5px;border:1px solid var(--vien);border-radius:999px;padding:6px 12px;color:var(--mo)}.khac a:hover{color:var(--vang2);border-color:var(--vang)}@media(max-width:720px){.vt{grid-template-columns:1fr;gap:20px;padding:24px 0}.vt img{max-width:300px;margin:0 auto}}`;
const urls = [DOM + '/web/'];
for (const g of w.DM_GIA) {
  const o = seo.gia[g.id] || { en: {}, vi: {} }, en = o.en || {}, vi = o.vi || {}, slug = slugOf(g), url = `${DOM}/gia/${slug}/`; urls.push(url);
  const tEn = (w.BANG_TIN_EN || {})[g.id] || [], tVi = (w.BANG_TIN || {})[g.id] || [], nEn = (w.BANG_TIN_EN || {})['nguon_' + g.id], nVi = (w.BANG_TIN || {})['nguon_' + g.id];
  const meta = { title: en.title || g.vi, description: en.description || g.moEn, keywords: [en.keywords, vi.keywords].filter(Boolean).join(', ') };
  const ld = `<script type="application/ld+json">${JSON.stringify([{ '@context': 'https://schema.org', '@type': 'Article', headline: meta.title, description: meta.description, image: abs(`/web/img/${g.id}.webp`), inLanguage: ['en', 'vi'], about: [g.vi, g.en, 'Đạo Mẫu', 'Vietnamese Mother Goddess worship'], publisher: { '@type': 'Organization', name: 'ADELA Building JSC', url: 'https://adela.com.vn' }, mainEntityOfPage: url }, { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Đạo Mẫu', item: DOM + '/' }, { '@type': 'ListItem', position: 2, name: g.vi, item: url }] }])}</script>\n`;
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
${dau(meta, url, `/web/img/${g.id}.webp`, ld)}
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif:wght@600;700&family=Be+Vietnam+Pro:wght@400;500;600&display=swap" rel="stylesheet">
<style>${CSS}</style>
</head>
<body>
<header><div class="wrap"><a href="../../">Đạo Mẫu</a><a href="../../web/#gia" style="font:500 14px var(--sans);color:var(--mo)">All spirits · Các giá hầu</a></div></header>
<main class="wrap">
<article class="vt">
<img src="../../web/img/${g.id}.webp" alt="${esc(g.vi + ' – ' + g.en)}" width="480" height="640">
<div>
<h1>${esc(g.vi)}</h1>
<p class="ten2">${esc(g.en)}</p>
<p class="mo">${esc(en.intro || g.moEn)}</p>
<p class="mo" lang="vi" style="font-size:16px;color:var(--mo)">${esc(vi.intro || g.moVi)}</p>
<a class="nut" href="../../web/le.html?gia=${g.id}">Enter the ritual · Vào giá hầu →</a>
${tEn.length ? `<h2>The legend</h2><ul class="tich">${tEn.map(t => `<li>${esc(t)}</li>`).join('')}</ul>${nEn ? `<p class="nguon">Source: ${esc(nEn)}</p>` : ''}` : ''}
${tVi.length ? `<h2 lang="vi">Sự tích ${esc(g.vi)}</h2><ul class="tich" lang="vi">${tVi.map(t => `<li>${esc(t)}</li>`).join('')}</ul>${nVi ? `<p class="nguon">Nguồn: ${esc(nVi)}</p>` : ''}` : ''}
<h2>Other spirits · Các giá khác</h2>
<div class="khac">${w.DM_GIA.filter(x => x.id !== g.id).map(x => `<a href="../${slugOf(x)}/">${esc(x.vi)}</a>`).join('')}</div>
</div>
</article>
<p class="luu">This site introduces Đạo Mẫu as cultural heritage. We do not accept gifts or donations, do not tell fortunes and do not offer spiritual services. · Website giới thiệu tín ngưỡng thờ Mẫu như một di sản văn hóa, KHÔNG nhận quà, KHÔNG xem bói, KHÔNG cung cấp dịch vụ tâm linh. © ADELA Building JSC</p>
</main>
</body>
</html>
`;
  ghi(`gia/${slug}/index.html`, html);
}

/* 4. sitemap.xml, robots.txt */
const hom = new Date().toISOString().slice(0, 10);
ghi('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${u}</loc><lastmod>${hom}</lastmod></url>`).join('\n')}\n</urlset>\n`);
ghi('robots.txt', `User-agent: *\nAllow: /web/\nAllow: /gia/\nDisallow: /web/admin.html\nDisallow: /dk.html\nDisallow: /g/\nDisallow: /tn/\nSitemap: ${DOM}/sitemap.xml\n`);
console.log('Xong: trang chủ, phòng lễ,', w.DM_GIA.length, 'trang giá, sitemap.xml, robots.txt');
