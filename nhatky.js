// ---------- Nhật ký tương tác live: ghi lại MỌI sự kiện của người xem thật ----------
// - Lưu ngay trên máy (IndexedDB) để không mất dữ liệu khi mạng chập chờn.
// - Nếu nhatky.json có "url" (Google Apps Script web app) thì cứ 15 giây đẩy lên Google Sheet.
// - Phím L: tải file CSV toàn bộ nhật ký đang lưu trên máy.
// - Không vẽ gì lên màn hình live. Chỉ ghi người xem thật (không ghi giả lập).
(() => {
  const TRANG = (location.pathname.split('/').pop() || 'index.html').replace('.html', '') || 'index';
  const COT = ['id', 'thoiGian', 'phien', 'trang', 'loai', 'userId', 'taiKhoan', 'tenHienThi', 'noiDung', 'soLuong',
    'tenQua', 'kimCuong', 'quanHe', 'giaDangHau', 'soNguoiXem', 'anhDaiDien'];
  const pad = (n) => String(n).padStart(2, '0');
  const gioVN = (d) => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
  // phiên: mở trang = phiên mới; nếu im lặng quá 2 giờ thì coi là phiên mới (trang để chạy qua ngày)
  let phien = gioVN(new Date()).slice(0, 16), lanCuoi = Date.now();
  const doiPhien = () => { const n = Date.now(); if (n - lanCuoi > 2 * 3600e3) phien = gioVN(new Date()).slice(0, 16); lanCuoi = n; };

  // ---- IndexedDB ----
  let db = null; const cho = [];
  try {
    const rq = indexedDB.open('hd_nhatky', 1);
    rq.onupgradeneeded = () => { const s = rq.result.createObjectStore('ev', { keyPath: 'id' }); s.createIndex('gui', 'gui'); };
    rq.onsuccess = () => { db = rq.result; cho.splice(0).forEach(luu); };
  } catch (e) {}
  function luu(r) { if (!db) { if (cho.length < 5000) cho.push(r); return; }
    try { db.transaction('ev', 'readwrite').objectStore('ev').put(r); } catch (e) {} }
  function layHet(loc) { return new Promise((ok) => { if (!db) return ok([]); const out = [];
    try { const c = db.transaction('ev').objectStore('ev').openCursor();
      c.onsuccess = () => { const k = c.result; if (!k) return ok(out); if (!loc || loc(k.value)) out.push(k.value); k.continue(); };
      c.onerror = () => ok(out); } catch (e) { ok(out); } }); }

  // ---- đọc dữ liệu người dùng (TikFinity: phẳng; EulerStream: lồng trong user) ----
  const giaDangHau = () => { const el = document.getElementById('giaInfo'); return el ? el.textContent.replace(/^Đang hầu: /, '').split(' · ')[0] : ''; };
  function anh(u, d) { const p = u.profilePictureUrl || d.profilePictureUrl || (u.profilePicture && (u.profilePicture.url || u.profilePicture.urls || u.profilePicture.urlList)) || '';
    return Array.isArray(p) ? (p[0] || '') : String(p || ''); }
  function quanHe(u, d) { const f = u.followRole != null ? u.followRole : d.followRole; // 0 chưa theo dõi · 1 theo dõi · 2 bạn bè
    const t = []; if (f != null) t.push(['chua theo doi', 'theo doi', 'ban be'][+f] || ('role ' + f));
    if (u.isModerator || d.isModerator) t.push('quan tri'); if (u.isSubscriber || d.isSubscriber) t.push('dang ky'); return t.join(', '); }
  function dong(ten, d, loai) {
    d = d || {}; const u = d.user || d.fromUser || (d.common && d.common.user) || {};
    loai = String(loai || '').toLowerCase();
    let kieu = loai, noiDung = '', soLuong = '', tenQua = '', kc = '';
    if (loai.includes('chat')) { kieu = 'binh luan'; noiDung = String(d.comment || d.content || ''); }
    else if (loai.includes('like')) { kieu = 'tha tim'; soLuong = +(d.likeCount || d.count || 1); }
    else if (loai.includes('gift')) { kieu = 'qua'; const g = d.gift || d.giftDetails || {};
      tenQua = d.giftName || g.giftName || g.name || ''; kc = +(d.diamondCount || g.diamondCount || 0); soLuong = +(d.repeatCount || d.comboCount || 1); }
    else if (loai.includes('share')) kieu = 'chia se';
    else if (loai.includes('social')) { const a = JSON.stringify(d.common && d.common.displayText || d.action || d.displayType || '').toLowerCase();
      kieu = (a.includes('share') || +d.action === 3) ? 'chia se' : 'theo doi'; }
    else if (loai.includes('follow')) kieu = 'theo doi';
    else if (loai.includes('member')) kieu = 'vao live';
    const now = new Date();
    return { id: now.getTime() + '-' + Math.random().toString(36).slice(2, 8), thoiGian: gioVN(now), phien, trang: TRANG, loai: kieu,
      userId: String(u.userId || d.userId || ''), taiKhoan: String(u.uniqueId || d.uniqueId || ''), tenHienThi: String(u.nickname || d.nickname || ten || ''),
      noiDung, soLuong, tenQua, kimCuong: kc, quanHe: quanHe(u, d), giaDangHau: giaDangHau(), soNguoiXem: '', anhDaiDien: anh(u, d), gui: 0 };
  }
  function ghi(ten, d, loai) { try { doiPhien(); const r = dong(ten, d, loai);
    // quà combo: TikFinity gửi nhiều gói trong 1 combo; chỉ ghi gói cuối
    if (r.loai === 'qua' && d && d.giftType === 1 && d.repeatEnd === false) return; luu(r); } catch (e) {} }

  // ---- móc vào chỗ trang đã xử lý sự kiện người xem thật ----
  function moc() { const L = window.__hdLv; if (!L || L.__nk) return !!(L && L.__nk);
    const goc = L.ev; L.ev = function (ten, d, t) { ghi(ten, d, t); return goc.apply(this, arguments); }; L.__nk = 1; return true; }
  if (!moc()) { const iv = setInterval(() => { if (moc()) clearInterval(iv); }, 1000); }

  // ---- số người xem (chỉ có khi chạy TikFinity trên máy tính): ghi mỗi phút 1 dòng ----
  let xemCuoi = -1, xemLuc = 0;
  (function tf() { let w; try { w = new WebSocket('ws://localhost:21213/'); } catch (e) { return setTimeout(tf, 15000); }
    w.onmessage = (ev) => { let j; try { j = JSON.parse(ev.data); } catch (e) { return; }
      const t = String(j.event || j.type || '').toLowerCase(), d = j.data || {};
      if (t !== 'roomuser') return; const n = +(d.viewerCount || 0), now = Date.now();
      if (now - xemLuc < 60e3 && n === xemCuoi) return; if (now - xemLuc < 20e3) return; xemLuc = now; xemCuoi = n; doiPhien();
      const r = dong('', {}, 'nguoi xem'); r.loai = 'so nguoi xem'; r.soNguoiXem = n; luu(r); };
    w.onclose = () => setTimeout(tf, 15000); w.onerror = () => {}; })();

  // ---- đẩy lên Google Sheet ----
  let URL_GUI = '';
  fetch('nhatky.json?t=' + Date.now()).then(r => r.json()).then(j => { URL_GUI = (j && j.url) || ''; }).catch(() => {});
  let dangGui = false;
  async function guiLen() { if (!URL_GUI || dangGui || !db) return; dangGui = true;
    try { const ds = (await layHet(r => !r.gui)).slice(0, 400); if (!ds.length) return;
      await fetch(URL_GUI, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(ds.map(r => { const o = {}; COT.forEach(k => o[k] = r[k]); return o; })) });
      const tx = db.transaction('ev', 'readwrite'), st = tx.objectStore('ev'); ds.forEach(r => { r.gui = 1; st.put(r); });
    } catch (e) {} finally { dangGui = false; } }
  setInterval(guiLen, 15000);
  // dọn dữ liệu đã gửi cũ hơn 30 ngày cho nhẹ máy
  setTimeout(async () => { const han = Date.now() - 30 * 864e5; const cu = await layHet(r => r.gui && +r.id.split('-')[0] < han);
    if (cu.length) { try { const st = db.transaction('ev', 'readwrite').objectStore('ev'); cu.forEach(r => st.delete(r.id)); } catch (e) {} } }, 60e3);

  // ---- phím L: tải CSV ----
  async function taiCSV() { const ds = await layHet(); const q = (v) => '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"';
    const csv = '﻿' + COT.join(',') + '\n' + ds.map(r => COT.map(k => q(r[k])).join(',')).join('\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = 'nhat-ky-live-' + gioVN(new Date()).replace(/[: ]/g, '-') + '.csv'; document.body.appendChild(a); a.click(); a.remove(); }
  document.addEventListener('keydown', (e) => { if ((e.key === 'l' || e.key === 'L') && !/input|select|textarea/i.test(e.target.tagName)) taiCSV(); });
  window.__hdNhatKy = { taiCSV, guiLen, dem: async () => (await layHet()).length };
})();
