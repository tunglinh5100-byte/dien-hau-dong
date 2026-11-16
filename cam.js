// ---------- /gc: trang /g đầy đủ + ô camera trước của điện thoại + người xem thật qua EulerStream ----------
// Chỉ chạy khi link có ?cam=1 (link /gc). Link /g không tải file này nên không bị ảnh hưởng.
// - Ô camera: kéo để di chuyển, chạm 2 lần để đổi cỡ nhỏ/lớn. Vị trí được nhớ trên máy.
// - Điện thoại không có TikFinity nên kết nối người xem thật qua EulerStream (dùng chung kênh/key với trang dt).
(() => {
  const Q = new URLSearchParams(location.search);
  if (Q.get('cam') !== '1') return;
  const LS = { get: k => { try { return localStorage.getItem(k) || ''; } catch (e) { return ''; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} } };

  // ---- ô camera ----
  const css = document.createElement('style');
  css.textContent = `
#camBox{position:fixed;z-index:2147483000;width:30vw;max-width:260px;aspect-ratio:3/4;border-radius:18px;overflow:hidden;
  border:3px solid #f2cf72;box-shadow:0 6px 24px rgba(0,0,0,.55);background:#120806;touch-action:none;user-select:none;-webkit-user-select:none}
#camBox.lon{width:44vw;max-width:380px}
#camBox video{width:100%;height:100%;object-fit:cover;transform:scaleX(-1);display:block;pointer-events:none}
#camBox .msg{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:10px;color:#f6e9d6;font:600 13px/1.35 system-ui,sans-serif}
#camGo{position:fixed;inset:0;z-index:2147483600;background:rgba(20,6,4,.94);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:22px;
  font:16px/1.4 system-ui,-apple-system,sans-serif;color:#f6e9d6;text-align:center}
#camGo h2{margin:0;color:#f2cf72;font-size:22px}
#camGo button:disabled{opacity:.55}
#camGo button{border:0;border-radius:16px;padding:18px 26px;font-size:20px;font-weight:800;color:#fff;background:linear-gradient(#c0392b,#8e1f16);border:2px solid #f2cf72;width:100%;max-width:340px}
#camGo input{width:100%;max-width:340px;height:46px;min-height:0;flex:none;box-sizing:border-box;margin:0;padding:11px 12px;border-radius:10px;border:1px solid #6b3a2a;background:#2c120d;color:#fff;font-size:15px}
#camGo small{opacity:.75;font-size:13px;max-width:340px}
#camGo .lnk{background:none;border:0;color:#f2cf72;text-decoration:underline;font-size:14px;font-weight:600;padding:4px;width:auto}`;
  document.head.appendChild(css);

  const box = document.createElement('div'); box.id = 'camBox';
  const v = document.createElement('video'); v.setAttribute('playsinline', ''); v.muted = true; v.autoplay = true;
  const msg = document.createElement('div'); msg.className = 'msg'; msg.textContent = 'Đang mở camera…';
  box.appendChild(v); box.appendChild(msg);
  const dat = (x, y) => { // giữ trong màn hình
    const r = box.getBoundingClientRect(), W = innerWidth, H = innerHeight;
    x = Math.max(4, Math.min(W - r.width - 4, x)); y = Math.max(4, Math.min(H - r.height - 4, y));
    box.style.left = x + 'px'; box.style.top = y + 'px'; return [x, y]; };
  const viTriMacDinh = () => { // góc phải, nửa dưới (khoảng trống dưới khung điện, tránh ô bình luận TikTok bên trái)
    const r = box.getBoundingClientRect(); dat(innerWidth - r.width - innerWidth * 0.05, innerHeight * 0.58); };
  const gan = () => {
    document.body.appendChild(box);
    if (LS.get('gc_lon') === '1') box.classList.add('lon');
    const p = LS.get('gc_pos').split(',').map(Number);
    requestAnimationFrame(() => { if (p.length === 2 && p.every(isFinite)) dat(p[0] * innerWidth, p[1] * innerHeight); else viTriMacDinh(); });
  };
  if (document.body) gan(); else document.addEventListener('DOMContentLoaded', gan);

  // kéo để di chuyển, chạm 2 lần để đổi cỡ
  let keo = null, lanCham = 0;
  box.addEventListener('pointerdown', e => { const r = box.getBoundingClientRect(); keo = { dx: e.clientX - r.left, dy: e.clientY - r.top, moved: false }; box.setPointerCapture(e.pointerId); e.preventDefault(); e.stopPropagation(); });
  box.addEventListener('pointermove', e => { if (!keo) return; keo.moved = true; dat(e.clientX - keo.dx, e.clientY - keo.dy); e.stopPropagation(); });
  box.addEventListener('pointerup', e => { if (!keo) return; e.stopPropagation();
    const r = box.getBoundingClientRect(); LS.set('gc_pos', (r.left / innerWidth).toFixed(4) + ',' + (r.top / innerHeight).toFixed(4));
    if (!keo.moved) { const n = Date.now(); if (n - lanCham < 380) { box.classList.toggle('lon'); LS.set('gc_lon', box.classList.contains('lon') ? '1' : '0'); requestAnimationFrame(() => { const q = box.getBoundingClientRect(); dat(q.left, q.top); }); } lanCham = n; }
    keo = null; });
  // chặn chạm 2 lần của trang (thoát chế độ live) khi chạm vào ô camera
  ['touchend', 'dblclick', 'click'].forEach(ev => box.addEventListener(ev, e => e.stopPropagation()));
  addEventListener('resize', () => { const r = box.getBoundingClientRect(); dat(r.left, r.top); });

  let stream = null;
  async function moCam() {
    try {
      if (stream && stream.getVideoTracks().some(t => t.readyState === 'live')) return;
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 720 }, height: { ideal: 960 } }, audio: false });
      v.srcObject = stream; await v.play().catch(() => {}); msg.style.display = 'none';
      stream.getVideoTracks().forEach(t => t.addEventListener('ended', () => setTimeout(moCam, 800)));
    } catch (e) { msg.style.display = 'flex'; msg.textContent = 'Chưa mở được camera. Vào Cài đặt › Safari › Camera › Cho phép, rồi tải lại trang.'; }
  }
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') setTimeout(moCam, 300); });

  // ---- người xem thật qua EulerStream (giống trang dt) ----
  let ws = null, retry = 0, ok = false;
  const H = () => window.__hd;
  const nameOf = (o) => { const u = (o && (o.user || o.fromUser || (o.common && o.common.user))) || null;
    if (u) return u.nickname || u.uniqueId || u.displayId || null; if (o && (o.nickname || o.uniqueId)) return o.nickname || o.uniqueId; return null; };
  function handle(type, d) {
    const h = H(); if (!h) return; const name = nameOf(d); if (!name) return; const nm = String(name).slice(0, 24); const t = String(type || '').toLowerCase();
    if (window.__hdLv) window.__hdLv.ev(nm, d, t);
    if (t.includes('chat')) { const c = d.comment || d.content || ''; if (c && window.__hdLenh && window.__hdLenh(d, c)) return; if (c) h.say(nm, c); }
    else if (t.includes('like')) { h.person(nm); h.like(Math.max(1, Math.min(50, +(d.count || d.likeCount || 1))), nm); }
    else if (t.includes('gift')) { const g = d.gift || d.giftDetails || {}, gt = d.giftType != null ? d.giftType : g.giftType; if (gt === 1 && d.repeatEnd !== undefined && !d.repeatEnd) return; const dc = +(g.diamondCount || d.diamondCount || 1); h.gift(nm, dc >= 99 ? 'big' : 'loc'); }
    else if (t.includes('social')) { const a = JSON.stringify(d.common && d.common.displayText || d.action || d.displayType || '').toLowerCase(); if (a.includes('share') || +d.action === 3) h.shareLive(nm); else h.follow(nm); }
    else if (t.includes('member')) { if (!h.S.people.find(p => p.name === nm)) { h.person(nm); h.addComment(nm, 'đã vào phiên live'); } }
  }
  function ketNoi() {
    const u = LS.get('hd_live_user').replace(/^@/, '').trim(), k = LS.get('hd_live_key').trim();
    if (!u || !k) return;
    try { ws = new WebSocket('wss://ws.eulerstream.com?uniqueId=' + encodeURIComponent(u) + '&apiKey=' + encodeURIComponent(k)); } catch (e) { setTimeout(ketNoi, 10000); return; }
    ws.onopen = () => { retry = 0; ok = true; };
    ws.onmessage = (ev) => { let j; try { j = JSON.parse(ev.data); } catch (e) { return; }
      (Array.isArray(j.messages) ? j.messages : [j]).forEach(m => { const type = m.type || m.event || m.name; let d = m.data || null; if (!d && m.json) { try { d = JSON.parse(m.json); } catch (e) {} } if (type) handle(type, d || m); }); };
    ws.onclose = (e) => { ok = false; ws = null; if (e.code === 4401 || e.code === 4403) return; retry++; setTimeout(ketNoi, Math.min(30, 5 * retry) * 1000); };
    ws.onerror = () => {};
  }
  // trang /g thử TikFinity (chỉ có trên máy tính) và tắt cờ "người xem thật" khi thất bại: giữ cờ bật khi Euler đang nối
  setInterval(() => { const h = H(); if (ok && h && h.S) h.S.real = true; }, 1500);

  // ---- màn hình bắt đầu: cần 1 lần chạm để iPhone cho bật camera + nhạc ----
  const go = document.createElement('div'); go.id = 'camGo';
  go.innerHTML = '<h2>Điện Hầu Đồng Live + Camera</h2>' +
    '<small>Bật LIVE trên TikTok (chia sẻ màn hình) trước, rồi quay lại trang này và bấm nút. Ô camera kéo được đi chỗ khác, chạm 2 lần để đổi cỡ.</small>' +
    '<button id="camStart" type="button">▶ Mở điện + camera</button>' +
    '<button class="lnk" id="camCfgTog" type="button">Cài đặt kênh (EulerStream)</button>' +
    '<div id="camCfg" style="display:none;flex-direction:column;gap:8px;width:100%;align-items:center">' +
    '<input id="camU" placeholder="ID kênh TikTok đang live, vd: @linhxo" autocomplete="off" autocapitalize="off">' +
    '<input id="camK" type="password" placeholder="API key EulerStream" autocomplete="off">' +
    '<small>Chỉ nhập một lần, máy tự nhớ (dùng chung với trang hầu đồng điện thoại).</small></div>';
  const ganGo = () => {
    document.body.appendChild(go);
    const iu = go.querySelector('#camU'), ik = go.querySelector('#camK'), cfg = go.querySelector('#camCfg');
    iu.value = LS.get('hd_live_user'); ik.value = LS.get('hd_live_key');
    if (!iu.value || !ik.value) cfg.style.display = 'flex';
    go.querySelector('#camCfgTog').addEventListener('click', () => { cfg.style.display = cfg.style.display === 'none' ? 'flex' : 'none'; });
    // chờ trang tải xong video các giá (màn "Bắt đầu canh đàn" của /g) rồi mới cho bấm
    const nut = go.querySelector('#camStart');
    const sanSang = () => { const ct = document.getElementById('ctGo'); return !document.getElementById('choTai') || (ct && !ct.disabled); };
    const capNhat = () => { if (!nut.isConnected) return clearInterval(iv); const t = document.getElementById('ctTxt');
      if (sanSang()) { nut.disabled = false; nut.textContent = '▶ Mở điện + camera'; } else { nut.disabled = true; nut.textContent = '⏳ ' + (t ? t.textContent : 'Đang tải video…'); } };
    const iv = setInterval(capNhat, 400); capNhat();
    nut.addEventListener('click', () => {
      if (nut.disabled) return;
      LS.set('hd_live_user', iu.value.trim()); LS.set('hd_live_key', ik.value.trim());
      go.remove(); moCam();
      document.body.classList.add('livemode'); scrollTo(0, 0);
      const ct = document.getElementById('ctGo'), bS = document.getElementById('bSound');
      if (ct) ct.click(); // bắt đầu canh đàn ngay trong lúc chạm → iPhone cho phát nhạc
      else if (bS) { if (bS.classList.contains('on')) bS.click(); bS.click(); } // trang đã tự bắt đầu: bật lại nhạc trong lúc chạm
      try { if (navigator.wakeLock) navigator.wakeLock.request('screen').catch(() => {}); document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && navigator.wakeLock) navigator.wakeLock.request('screen').catch(() => {}); }); } catch (e) {}
      try { const de = document.documentElement; (de.requestFullscreen || de.webkitRequestFullscreen || (() => {})).call(de); } catch (e) {}
      ketNoi();
    });
  };
  if (document.body) ganGo(); else document.addEventListener('DOMContentLoaded', ganGo);
})();
