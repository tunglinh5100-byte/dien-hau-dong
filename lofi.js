/* Nhạc nền "lofi trà đạo" tự tạo bằng WebAudio (không dùng file, không bản quyền):
   nhịp lofi 72 BPM, hợp âm ấm, giai điệu ngũ cung kiểu đàn tranh có nhấn và luyến, tiếng rè đĩa than. */
(function (root) {
  function makeLofi(ac, out) {
    const BPM = 72, BEAT = 60 / BPM, BAR = BEAT * 4;
    const mf = m => 440 * Math.pow(2, (m - 69) / 12);
    // Fmaj7 – Em7 – Dm7 – Cmaj7 (đi xuống, rất lofi) ; giai điệu ngũ cung Đô: C D E G A
    const CHORDS = [[53, 57, 60, 64], [52, 55, 59, 62], [50, 53, 57, 60], [48, 52, 55, 59]], ROOT = [41, 40, 38, 36];
    const PENTA = [60, 62, 64, 67, 69, 72, 74, 76, 79, 81];
    const bus = ac.createGain(); bus.gain.value = .55; const warm = ac.createBiquadFilter(); warm.type = 'lowpass'; warm.frequency.value = 5200; bus.connect(warm); warm.connect(out);
    // âm vang nhẹ: vài đường trễ phản hồi
    const rvIn = ac.createGain(); rvIn.gain.value = .22; [.137, .211, .293].forEach((t, i) => { const d = ac.createDelay(1); d.delayTime.value = t; const fb = ac.createGain(); fb.gain.value = .38 - i * .06; const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 2600; rvIn.connect(d); d.connect(lp); lp.connect(fb); fb.connect(d); lp.connect(bus); });
    let noiseBuf = null; const noise = () => { if (!noiseBuf) { noiseBuf = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate); const ch = noiseBuf.getChannelData(0); for (let i = 0; i < ch.length; i++) ch[i] = Math.random() * 2 - 1; } const s = ac.createBufferSource(); s.buffer = noiseBuf; return s; };
    function env(g, t, a, peak, dec) { g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(peak, t + a); g.gain.exponentialRampToValueAtTime(0.0001, t + a + dec); }
    function pad(notes, t, dur) { notes.forEach((m, i) => { [-6, 6].forEach(det => { const o = ac.createOscillator(), g = ac.createGain(), f = ac.createBiquadFilter(); o.type = 'triangle'; o.frequency.value = mf(m); o.detune.value = det; f.type = 'lowpass'; f.frequency.value = 1100;
      g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(.026, t + .8); g.gain.setValueAtTime(.026, t + dur - .6); g.gain.linearRampToValueAtTime(0.0001, t + dur + .4); o.connect(f); f.connect(g); g.connect(bus); o.start(t); o.stop(t + dur + .5); }); }); }
    function bass(m, t, dur) { const o = ac.createOscillator(), g = ac.createGain(); o.type = 'sine'; o.frequency.value = mf(m); env(g, t, .02, .16, dur); o.connect(g); g.connect(bus); o.start(t); o.stop(t + dur + .1); }
    function kick(t) { const o = ac.createOscillator(), g = ac.createGain(); o.frequency.setValueAtTime(120, t); o.frequency.exponentialRampToValueAtTime(42, t + .18); env(g, t, .005, .32, .32); o.connect(g); g.connect(bus); o.start(t); o.stop(t + .45); }
    function snare(t) { const n = noise(), f = ac.createBiquadFilter(), g = ac.createGain(); f.type = 'bandpass'; f.frequency.value = 1700; f.Q.value = .8; env(g, t, .004, .045, .14); n.connect(f); f.connect(g); g.connect(bus); g.connect(rvIn); n.start(t, Math.random()); n.stop(t + .25); }
    function hat(t, v) { const n = noise(), f = ac.createBiquadFilter(), g = ac.createGain(); f.type = 'highpass'; f.frequency.value = 7500; env(g, t, .002, v, .045); n.connect(f); f.connect(g); g.connect(bus); n.start(t, Math.random()); n.stop(t + .08); }
    // đàn tranh: gảy (tam giác + họa âm), nhấn từ dưới lên khi bắt đầu, rung cuối nốt dài
    function tranh(m, t, dur, nhan) { const f0 = mf(m), o = ac.createOscillator(), o2 = ac.createOscillator(), g = ac.createGain(), g2 = ac.createGain(), lp = ac.createBiquadFilter();
      o.type = 'triangle'; o2.type = 'sine'; lp.type = 'lowpass'; lp.frequency.setValueAtTime(5200, t); lp.frequency.exponentialRampToValueAtTime(1500, t + .5);
      if (nhan) { o.frequency.setValueAtTime(f0 * .94, t); o.frequency.exponentialRampToValueAtTime(f0, t + .12); } else o.frequency.setValueAtTime(f0, t);
      o2.frequency.value = f0 * 2.003; env(g, t, .004, .16, Math.max(.6, dur * 1.6)); env(g2, t, .003, .05, .35);
      if (dur > BEAT * .9) { const l = ac.createOscillator(), lg = ac.createGain(); l.frequency.value = 5.2; lg.gain.setValueAtTime(0, t); lg.gain.linearRampToValueAtTime(f0 * .012, t + dur * .6); l.connect(lg); lg.connect(o.frequency); l.start(t); l.stop(t + dur * 2); }
      o.connect(lp); o2.connect(g2); lp.connect(g); g.connect(bus); g.connect(rvIn); g2.connect(bus); o.start(t); o2.start(t); o.stop(t + dur * 2 + .4); o2.stop(t + .5); }
    function crackle(t0, t1) { const n = noise(), f = ac.createBiquadFilter(), g = ac.createGain(); f.type = 'lowpass'; f.frequency.value = 3000; g.gain.value = .006; n.loop = true; n.connect(f); f.connect(g); g.connect(bus); n.start(t0); n.stop(t1);
      for (let t = t0; t < t1; t += .25 + Math.random() * .9) { const p = noise(), pg = ac.createGain(), hp = ac.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 3500; pg.gain.value = .004 + Math.random() * .006; p.connect(hp); hp.connect(pg); pg.connect(bus); p.start(t, Math.random(), .004); } }
    let next = null, bar = 0, lastNote = 64;
    function phrase(t, ci) { const chord = CHORDS[ci], steps = [];
      const kieu = Math.random(); // 0: nghỉ, 1: câu ngắn, 2: luyến nhanh kiểu đàn tranh
      if (kieu < .2) return; const n = kieu < .75 ? 3 + Math.floor(Math.random() * 3) : 6;
      let pos = Math.floor(Math.random() * 2) * 2; for (let i = 0; i < n && pos < 16; i++) { steps.push(pos); pos += kieu >= .75 ? 1 : 1 + Math.floor(Math.random() * 3); }
      let idx = PENTA.indexOf(lastNote); if (idx < 0) idx = 2;
      steps.forEach((s, i) => { idx = Math.max(0, Math.min(PENTA.length - 1, idx + (kieu >= .75 ? (i < 3 ? 1 : -1) : Math.floor(Math.random() * 5) - 2)));
        let m = PENTA[idx]; if (i === steps.length - 1) { const tones = PENTA.filter(p => chord.some(c => (c - p) % 12 === 0)); if (tones.length) m = tones.reduce((a, b) => Math.abs(b - m) < Math.abs(a - m) ? b : a); }
        const swing = s % 2 ? BEAT * .5 * .16 : 0, st = t + s * BEAT / 4 * 2 / 2 + swing, dur = (i === steps.length - 1 ? 2 : 1) * BEAT * .5;
        tranh(m, st, dur, i === steps.length - 1 || Math.random() < .25); lastNote = m; }); }
    function scheduleBar(t) { const ci = bar % 4; pad(CHORDS[ci], t, BAR); bass(ROOT[ci], t, BEAT * 1.6); bass(ROOT[ci] + (Math.random() < .5 ? 7 : 12), t + BEAT * 2.5, BEAT * 1.2);
      if (bar >= 1) { for (let b = 0; b < 4; b++) { const tb = t + b * BEAT; if (b === 0 || b === 2) kick(tb); if (b === 2 && Math.random() < .3) kick(tb + BEAT * .75); if (b === 1 || b === 3) snare(tb); hat(tb, .010); hat(tb + BEAT * .5 + BEAT * .5 * .16, .006); } }
      if (bar >= 2) phrase(t, ci); bar++; }
    return { schedule(until) { if (next === null) next = ac.currentTime + .1; while (next < until) { scheduleBar(next); crackle(next, next + BAR); next += BAR; } }, bus };
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = makeLofi; else root.makeLofi = makeLofi;
})(typeof window !== 'undefined' ? window : globalThis);
