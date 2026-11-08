/* Lịch vạn niên cho trang "Xem giờ trình ký": âm lịch (thuật toán Hồ Ngọc Đức), can chi,
   12 thần trực ngày/giờ (hoàng đạo / hắc đạo), xung hợp theo tuổi, 64 quẻ Kinh Dịch.
   Nội dung mang tính giải trí, tham khảo. */
(function (root) {
  const PI = Math.PI, fl = Math.floor, TZ = 7;
  const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
  const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
  const THU = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
  const GIO = CHI.map((c, i) => ({ chi: i, ten: c, tu: (i * 2 + 23) % 24, den: (i * 2 + 1) % 24 })); // Tý 23h–1h, Sửu 1h–3h…

  // ---------- Âm lịch ----------
  function jdFromDate(dd, mm, yy) { const a = fl((14 - mm) / 12), y = yy + 4800 - a, m = mm + 12 * a - 3;
    let jd = dd + fl((153 * m + 2) / 5) + 365 * y + fl(y / 4) - fl(y / 100) + fl(y / 400) - 32045;
    if (jd < 2299161) jd = dd + fl((153 * m + 2) / 5) + 365 * y + fl(y / 4) - 32083; return jd; }
  function newMoon(k) { const T = k / 1236.85, T2 = T * T, T3 = T2 * T, dr = PI / 180;
    let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
    Jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
    const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
    const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
    const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
    let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
    C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
    C1 = C1 - 0.0004 * Math.sin(dr * 3 * Mpr);
    C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
    C1 = C1 - 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
    C1 = C1 - 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
    C1 = C1 + 0.0010 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
    const deltat = T < -11 ? 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3 : -0.000278 + 0.000265 * T + 0.000262 * T2;
    return Jd1 + C1 - deltat; }
  const newMoonDay = (k) => fl(newMoon(k) + 0.5 + TZ / 24);
  function sunLong(jdn) { const T = (jdn - 2451545.0) / 36525, T2 = T * T, dr = PI / 180;
    const M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
    const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
    let DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
    DL = DL + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
    let L = (L0 + DL) * dr; L = L - PI * 2 * fl(L / (PI * 2)); return L; }
  const sunLongDay = (dayNumber) => fl(sunLong(dayNumber - 0.5 - TZ / 24) / PI * 6);
  function lunarMonth11(yy) { const off = jdFromDate(31, 12, yy) - 2415021, k = fl(off / 29.530588853);
    let nm = newMoonDay(k); if (sunLongDay(nm) >= 9) nm = newMoonDay(k - 1); return nm; }
  function leapMonthOffset(a11) { const k = fl((a11 - 2415021.076998695) / 29.530588853 + 0.5);
    let last = 0, i = 1, arc = sunLongDay(newMoonDay(k + i));
    do { last = arc; i++; arc = sunLongDay(newMoonDay(k + i)); } while (arc !== last && i < 14); return i - 1; }
  function amLich(dd, mm, yy) { const dayNumber = jdFromDate(dd, mm, yy), k = fl((dayNumber - 2415021.076998695) / 29.530588853);
    let monthStart = newMoonDay(k + 1); if (monthStart > dayNumber) monthStart = newMoonDay(k);
    let a11 = lunarMonth11(yy), b11 = a11, lunarYear;
    if (a11 >= monthStart) { lunarYear = yy; a11 = lunarMonth11(yy - 1); } else { lunarYear = yy + 1; b11 = lunarMonth11(yy + 1); }
    const lunarDay = dayNumber - monthStart + 1, diff = fl((monthStart - a11) / 29); let lunarLeap = 0, lunarMonth = diff + 11;
    if (b11 - a11 > 365) { const lmd = leapMonthOffset(a11); if (diff >= lmd) { lunarMonth = diff + 10; if (diff === lmd) lunarLeap = 1; } }
    if (lunarMonth > 12) lunarMonth -= 12; if (lunarMonth >= 11 && diff < 4) lunarYear -= 1;
    return { d: lunarDay, m: lunarMonth, y: lunarYear, nhuan: lunarLeap }; }

  // ---------- 12 thần trực (hoàng đạo / hắc đạo) ----------
  const THAN = [
    ['Thanh Long', 1, 'mọi việc hanh thông, trình là dễ gật', 6],
    ['Minh Đường', 1, 'có quý nhân nâng đỡ, sếp dễ thông cảm', 5],
    ['Thiên Hình', 0, 'dễ bị bắt lỗi, soát kỹ từng chữ', 0],
    ['Chu Tước', 0, 'dễ khẩu thiệt, sếp hỏi vặn nhiều', 0],
    ['Kim Quỹ', 1, 'hợp trình đề xuất chi tiền, ngân sách', 5],
    ['Kim Đường', 1, 'sáng suốt, hồ sơ rõ ràng dễ duyệt', 5],
    ['Bạch Hổ', 0, 'sếp dễ nóng, tránh trình việc khó', 0],
    ['Ngọc Đường', 1, 'văn thư giấy tờ thuận, hợp ký nhất', 6],
    ['Thiên Lao', 0, 'hồ sơ dễ bị giữ lại, chờ lâu', 0],
    ['Huyền Vũ', 0, 'dễ thất lạc, thiếu giấy tờ', 0],
    ['Tư Mệnh', 1, 'việc nhỏ thường ngày trình thuận', 4],
    ['Câu Trận', 0, 'vướng thủ tục, dễ bị trả về sửa', 0]];
  // Thanh Long khởi ở chi nào: theo chi ngày (cho giờ) và theo chi tháng (cho ngày) — cùng một bảng
  const KHOI = { 0: 8, 6: 8, 1: 10, 7: 10, 2: 0, 8: 0, 3: 2, 9: 2, 4: 4, 10: 4, 5: 6, 11: 6 };
  const thanTai = (chiGoc, chi) => THAN[(chi - KHOI[chiGoc] + 12) % 12];

  // ---------- Quan hệ chi ----------
  const XUNG = (a, b) => (a - b + 12) % 12 === 6;
  const LUC_HOP = (a, b) => (a + b) % 12 === 1;           // Tý-Sửu, Dần-Hợi, Mão-Tuất, Thìn-Dậu, Tỵ-Thân, Ngọ-Mùi
  const TAM_HOP = (a, b) => a !== b && (a - b + 12) % 4 === 0; // Thân-Tý-Thìn, Dần-Ngọ-Tuất, Hợi-Mão-Mùi, Tỵ-Dậu-Sửu
  const HAI = (a, b) => (a + b) % 12 === 7;               // Tý-Mùi, Sửu-Ngọ, Dần-Tỵ, Mão-Thìn, Thân-Hợi, Dậu-Tuất
  function quanHe(ngay, tuoi) {
    if (LUC_HOP(ngay, tuoi)) return { diem: 2, ten: 'lục hợp', loi: 'ngày lục hợp với tuổi, rất thuận' };
    if (TAM_HOP(ngay, tuoi)) return { diem: 1, ten: 'tam hợp', loi: 'ngày tam hợp với tuổi, thuận' };
    if (XUNG(ngay, tuoi)) return { diem: -2, ten: 'xung', loi: 'ngày xung tuổi, nên hoãn việc lớn' };
    if (HAI(ngay, tuoi)) return { diem: -1, ten: 'tương hại', loi: 'ngày hại tuổi, dễ bị làm khó' };
    if (ngay === tuoi) return { diem: 0, ten: 'trùng tuổi', loi: 'ngày trùng tuổi, bình thường' };
    return { diem: 0, ten: 'bình hòa', loi: 'ngày bình hòa với tuổi' }; }

  // ---------- Một ngày ----------
  const VN = (ms) => { const d = new Date((ms === undefined ? Date.now() : ms) + TZ * 3600e3); return { dd: d.getUTCDate(), mm: d.getUTCMonth() + 1, yy: d.getUTCFullYear(), wd: d.getUTCDay(), h: d.getUTCHours(), mi: d.getUTCMinutes() }; };
  function ngay(dd, mm, yy) {
    const jd = jdFromDate(dd, mm, yy), al = amLich(dd, mm, yy), wd = (jd + 1) % 7;
    const canN = (jd + 9) % 10, chiN = (jd + 1) % 12;
    const chiT = (al.m + 1) % 12, canT = (al.y * 12 + al.m + 3) % 10;
    const than = thanTai(chiT, chiN);
    const tamNuong = [3, 7, 13, 18, 22, 27].includes(al.d), nguyetKy = [5, 14, 23].includes(al.d);
    let sao = than[1] ? 4 : 2; if (than[3] >= 6) sao = 5; if (tamNuong || nguyetKy) sao -= 1;
    const gio = GIO.map(g => { const t = thanTai(chiN, g.chi); return Object.assign({}, g, { than: t[0], tot: !!t[1], loi: t[2], hang: t[3] }); });
    return { dd, mm, yy, wd, thu: THU[wd], al, jd, canN, chiN, canChi: CAN[canN] + ' ' + CHI[chiN],
      thang: CAN[canT] + ' ' + CHI[chiT], nam: CAN[(al.y + 6) % 10] + ' ' + CHI[(al.y + 8) % 12],
      than: than[0], hoangDao: !!than[1], loiNgay: than[2], tamNuong, nguyetKy, sao: Math.max(1, Math.min(5, sao)), gio }; }
  const homNay = (ms) => { const v = VN(ms); return Object.assign(ngay(v.dd, v.mm, v.yy), { gioHienTai: v.h, phut: v.mi }); };
  const gioCuaGioDong = (h) => fl(((h + 1) % 24) / 2); // giờ đồng hồ → chi giờ
  const GIO_HC = [4, 5, 6, 7, 8]; // giờ hành chính: Thìn 7–9, Tỵ 9–11, Ngọ 11–13, Mùi 13–15, Thân 15–17
  const khung = (g) => g.tu + 'h–' + g.den + 'h';
  const ngayStr = (n) => n.thu + ' ' + n.dd + '/' + n.mm;

  // ---------- Đọc tuổi trong bình luận ----------
  const bo = s => String(s || '').toLowerCase();
  const khongDau = s => bo(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
  const CHI_KD = ['ty', 'suu', 'dan', 'mao|meo', 'thin', 'ty', 'ngo', 'mui', 'than', 'dau', 'tuat', 'hoi'];
  const CAN_KD = ['giap', 'at', 'binh', 'dinh', 'mau', 'ky', 'canh', 'tan', 'nham', 'quy'];
  function timChi(raw) { // ưu tiên chữ có dấu để phân biệt Tý / Tỵ
    const s = bo(raw); const m = s.match(/(?:^|[^a-zà-ỹ])(tý|tí|tỵ|tị|sửu|dần|mão|mẹo|thìn|ngọ|mùi|thân|dậu|tuất|hợi)(?![a-zà-ỹ])/);
    if (m) { const w = m[1]; const map = { 'tý': 0, 'tí': 0, 'tỵ': 5, 'tị': 5, 'sửu': 1, 'dần': 2, 'mão': 3, 'mẹo': 3, 'thìn': 4, 'ngọ': 6, 'mùi': 7, 'thân': 8, 'dậu': 9, 'tuất': 10, 'hợi': 11 }; return map[w]; }
    const k = ' ' + khongDau(raw).replace(/[^a-z0-9 ]/g, ' ') + ' ';
    const n = k.match(/ (?:tuoi|con|nam) (ty|ti|suu|dan|mao|meo|thin|ngo|mui|than|dau|tuat|hoi) /) || k.match(/ (suu|dan|mao|meo|thin|ngo|mui|tuat|hoi) /);
    if (n) { const w = n[1]; if (w === 'ty' || w === 'ti') return 0; return CHI_KD.findIndex(x => x.split('|').includes(w)); }
    return null; }
  function docTuoi(raw, namNay) {
    namNay = namNay || VN().yy; const k = ' ' + khongDau(raw).replace(/[^a-z0-9 ]/g, ' ') + ' ';
    let y = null, m;
    if ((m = k.match(/ (19[3-9]\d|20[0-2]\d) /))) y = +m[1];
    else if ((m = k.match(/ (?:sinh|tuoi|nam|doi|con|em|toi|minh|cho) (?:nam )?(\d{2}) /)) || (m = k.match(/^ (\d{2}) $/)) || (m = k.match(/ (\d{2}) (?:tuoi|ak|a|nhe|ha|oi) /))) { const v = +m[1]; y = v <= (namNay % 100) - 10 ? 2000 + v : 1900 + v; }
    if (y && y >= 1930 && y <= namNay - 12) return { nam: y, can: (y + 6) % 10, chi: (y + 8) % 12 };
    const chi = timChi(raw); if (chi === null || chi < 0) return null;
    const cm = k.match(/ (giap|at|binh|dinh|mau|ky|canh|tan|nham|quy) (ty|ti|suu|dan|mao|meo|thin|ngo|mui|than|dau|tuat|hoi) /);
    if (cm) { const can = CAN_KD.indexOf(cm[1]); // can + chi → năm gần nhất trước tuổi 18
      for (let yy = namNay - 18; yy >= namNay - 18 - 59; yy--) if ((yy + 6) % 10 === can && (yy + 8) % 12 === chi) return { nam: yy, can, chi }; }
    return { nam: null, can: null, chi }; }
  const tenTuoi = (t) => t.can !== null && t.can !== undefined ? CAN[t.can] + ' ' + CHI[t.chi] + (t.nam ? ' (' + t.nam + ')' : '') : CHI[t.chi];

  // ---------- Câu trả lời ----------
  const SAO = n => '★★★★★'.slice(0, n) + '☆☆☆☆☆'.slice(0, 5 - n);
  const LOI_SAO = ['', 'Nên hoãn, để hôm khác', 'Hơi kém, chỉ trình việc nhỏ', 'Bình thường, việc lớn cân nhắc', 'Khá tốt, trình được, chuẩn bị kỹ', 'Rất đẹp, mạnh dạn trình cả việc lớn'];
  function dongHoGioTot(n) { // giờ tốt kế tiếp trong giờ hành chính
    const nowMin = n.gioHienTai * 60 + n.phut; const cur = gioCuaGioDong(n.gioHienTai), g = n.gio[cur];
    if (GIO_HC.includes(cur) && g.tot) return 'Đang trong giờ tốt ' + g.ten + ', trình ngay!';
    for (const c of GIO_HC) { const gg = n.gio[c]; if (gg.tot && gg.tu * 60 > nowMin) { const con = gg.tu * 60 - nowMin; return 'Giờ tốt kế tiếp: ' + gg.ten + ', còn ' + (con >= 60 ? fl(con / 60) + ' tiếng ' : '') + (con % 60) + ' phút'; } }
    return 'Hết giờ tốt hành chính hôm nay, hẹn mai'; }
  function traLoiGio(name, n) {
    const hc = GIO_HC.map(c => n.gio[c]);
    const tot = hc.filter(g => g.tot).sort((a, b) => b.hang - a.hang || a.chi - b.chi), xau = hc.filter(g => !g.tot);
    const best = tot.slice(0, 2), tranh = xau[0];
    const lines = [
      'Ngày ' + n.canChi + ' · ' + n.al.d + '/' + n.al.m + (n.al.nhuan ? ' nhuận' : '') + ' ' + n.nam,
      (n.hoangDao ? '✦ Ngày hoàng đạo ' : '✧ Ngày hắc đạo ') + n.than + (n.tamNuong ? ' · phạm Tam Nương' : '') + (n.nguyetKy ? ' · Nguyệt Kỵ' : ''),
      ...best.map(g => '✓ ' + g.ten + ' ' + khung(g) + ': ' + g.loi),
      ...(tranh ? ['✗ Tránh ' + tranh.ten + ' ' + khung(tranh) + ': ' + tranh.loi] : []),
      '⏳ ' + dongHoGioTot(n)];
    const g0 = best[0];
    const speak = name + ' ơi. Hôm nay ngày ' + n.canChi + '. ' + (g0 ? 'Giờ đẹp nhất để trình ký là giờ ' + g0.ten + ', từ ' + g0.tu + ' giờ đến ' + g0.den + ' giờ. ' : 'Giờ hành chính hôm nay không có giờ hoàng đạo, nên trình việc nhỏ. ') + (tranh ? 'Tránh giờ ' + tranh.ten + '.' : '');
    return { loai: 'gio', ten: name, tieuDe: 'GIỜ TỐT TRÌNH KÝ HÔM NAY', sao: n.sao, ketLuan: LOI_SAO[n.sao], lines, speak }; }
  function chamTuoi(n, t) { const q = quanHe(n.chiN, t.chi); return { q, sao: Math.max(1, Math.min(5, n.sao + q.diem)) }; }
  function traLoiTuoi(name, n, t) {
    const { q, sao } = chamTuoi(n, t);
    const gioTot = GIO_HC.map(c => n.gio[c]).filter(g => g.tot && !XUNG(g.chi, t.chi) && !HAI(g.chi, t.chi))
      .map(g => Object.assign({}, g, { cong: LUC_HOP(g.chi, t.chi) ? 2 : TAM_HOP(g.chi, t.chi) ? 1 : 0 })).sort((a, b) => b.cong - a.cong || b.hang - a.hang).slice(0, 2);
    const gioXau = GIO_HC.map(c => n.gio[c]).find(g => XUNG(g.chi, t.chi) || HAI(g.chi, t.chi)) || GIO_HC.map(c => n.gio[c]).find(g => !g.tot);
    let toi = null; // ngày tốt gần nhất trong 7 ngày tới cho tuổi này
    if (sao < 4) for (let i = 1; i <= 7; i++) { const d = new Date(Date.UTC(n.yy, n.mm - 1, n.dd + i)), nn = ngay(d.getUTCDate(), d.getUTCMonth() + 1, d.getUTCFullYear()); if (chamTuoi(nn, t).sao >= 4) { toi = nn; break; } }
    const lines = [
      'Tuổi ' + tenTuoi(t) + ' · ngày ' + n.canChi + ' (' + (n.hoangDao ? 'hoàng đạo' : 'hắc đạo') + ')',
      '☯ ' + q.loi.charAt(0).toUpperCase() + q.loi.slice(1),
      ...gioTot.map(g => '✓ Giờ ' + g.ten + ' ' + khung(g) + (g.cong === 2 ? ' (lục hợp tuổi)' : g.cong === 1 ? ' (tam hợp tuổi)' : '') + ': ' + g.loi),
      ...(gioXau ? ['✗ Tránh ' + gioXau.ten + ' ' + khung(gioXau) + (XUNG(gioXau.chi, t.chi) ? ' (xung tuổi)' : HAI(gioXau.chi, t.chi) ? ' (hại tuổi)' : '') + ': ' + gioXau.loi] : []),
      ...(toi ? ['📅 Ngày đẹp gần nhất: ' + ngayStr(toi) + ' (' + toi.canChi + ')'] : [])];
    const g0 = gioTot[0];
    const speak = name + ', tuổi ' + tenTuoi(t).replace(/\(|\)/g, '') + '. Hôm nay ' + q.loi + '. ' + LOI_SAO[sao] + '. ' + (g0 ? 'Nên trình vào giờ ' + g0.ten + ', ' + g0.tu + ' giờ đến ' + g0.den + ' giờ.' : 'Hôm nay không có giờ hợp tuổi trong giờ hành chính.') + (toi ? ' Ngày đẹp gần nhất là ' + ngayStr(toi) + '.' : '');
    return { loai: 'tuoi', ten: name, tieuDe: 'TUỔI ' + tenTuoi(t).toUpperCase() + ' TRÌNH KÝ HÔM NAY', sao, ketLuan: LOI_SAO[sao], lines, speak }; }

  // ---------- 64 quẻ (tên đọc ra quẻ trên / quẻ dưới) ----------
  const BAT_QUAI = { 'Thiên': [1, 1, 1], 'Trạch': [1, 1, 0], 'Hỏa': [1, 0, 1], 'Lôi': [1, 0, 0], 'Phong': [0, 1, 1], 'Thủy': [0, 1, 0], 'Sơn': [0, 0, 1], 'Địa': [0, 0, 0] }; // hào dưới → trên
  const THUAN = { 'Càn': 'Thiên', 'Khôn': 'Địa', 'Khảm': 'Thủy', 'Ly': 'Hỏa', 'Chấn': 'Lôi', 'Cấn': 'Sơn', 'Tốn': 'Phong', 'Đoài': 'Trạch' };
  const QUE = `Thuần Càn|c|cương kiện, tự tin trình, sếp nể năng lực
Thuần Khôn|c|nhu thuận, mềm mỏng theo ý sếp là xong
Thủy Lôi Truân|h|khó lúc khởi đầu, hồ sơ còn vướng, đừng vội
Sơn Thủy Mông|b|còn mờ, hỏi kỹ ý sếp trước khi trình
Thủy Thiên Nhu|b|là chờ đợi, kiên nhẫn đợi sếp rảnh
Thiên Thủy Tụng|h|tranh cãi, tránh tranh luận, trình sau
Địa Thủy Sư|b|ra quân, đi cùng trưởng phòng sẽ dễ hơn
Thủy Địa Tỷ|c|thân cận, quan hệ tốt, trình là được
Phong Thiên Tiểu Súc|b|tích nhỏ, trình việc nhỏ trước
Thiên Trạch Lý|b|dẫm đuôi hổ, lễ phép, cẩn trọng từng chữ
Địa Thiên Thái|c|thông suốt, trên dưới hòa hợp, ký ngay
Thiên Địa Bĩ|h|bế tắc, sếp chưa thông, để hôm khác
Thiên Hỏa Đồng Nhân|c|đồng lòng, được đồng nghiệp ủng hộ
Hỏa Thiên Đại Hữu|c|có lớn, đề xuất lớn cũng dễ duyệt
Địa Sơn Khiêm|c|khiêm tốn, nói nhỏ nhẹ, sếp quý
Lôi Địa Dự|c|vui vẻ, trình lúc sếp đang vui
Trạch Lôi Tùy|b|đi theo, thuận ý sếp, đừng cãi
Sơn Phong Cổ|h|hư hỏng, soát lại lỗi cũ trước khi trình
Địa Trạch Lâm|c|thời cơ đến gần, trình ngay
Phong Địa Quan|b|quan sát, xem sắc mặt sếp đã
Hỏa Lôi Phệ Hạp|b|có vướng mắc, phải gỡ dứt điểm
Sơn Hỏa Bí|b|trang sức, trình bày đẹp, slide gọn
Sơn Địa Bác|h|bóc mòn, dễ bị gạch, chưa nên trình
Địa Lôi Phục|c|trở lại, hồ sơ cũ trình lại sẽ được
Thiên Lôi Vô Vọng|b|thật thà, đừng tô vẽ số liệu
Sơn Thiên Đại Súc|c|tích lớn, chuẩn bị kỹ, trình việc lớn
Sơn Lôi Di|b|nuôi dưỡng, trình sau bữa trưa
Trạch Phong Đại Quá|h|quá tầm, chia nhỏ đề xuất
Thuần Khảm|h|hiểm trở, nhiều rủi ro, chưa nên trình
Thuần Ly|c|sáng rõ, trình bày rõ ràng là qua
Trạch Sơn Hàm|c|cảm ứng, sếp dễ đồng cảm
Lôi Phong Hằng|b|bền bỉ, kiên trì trình lần nữa
Thiên Sơn Độn|h|lui, tạm lui chờ thời
Lôi Thiên Đại Tráng|b|mạnh mẽ, nhưng đừng ép sếp
Hỏa Địa Tấn|c|tiến lên, trình là thăng tiến
Địa Hỏa Minh Di|h|ánh sáng bị che, công chưa được ghi nhận
Phong Hỏa Gia Nhân|b|người nhà, nhờ trợ lý sếp nói giúp
Hỏa Trạch Khuê|h|chia lìa, ý kiến trái chiều, thống nhất trước
Thủy Sơn Kiển|h|khó đi, nhiều cửa ải, chưa nên
Lôi Thủy Giải|c|cởi gỡ, vướng mắc được gỡ, ký được
Sơn Trạch Tổn|b|giảm bớt, cắt bớt ngân sách sẽ dễ duyệt
Phong Lôi Ích|c|có ích, đề xuất có lợi, sếp gật
Trạch Thiên Quải|b|quyết đoán, nói thẳng, rõ ràng
Thiên Phong Cấu|b|gặp gỡ, gặp sếp tình cờ thì trình nhanh
Trạch Địa Tụy|c|tụ họp, trình trong cuộc họp
Địa Phong Thăng|c|đi lên, từng bước sẽ được duyệt
Trạch Thủy Khốn|h|khốn cùng, thiếu căn cứ, bổ sung đã
Thủy Phong Tỉnh|b|giếng nước, giữ nề nếp, đúng quy trình
Trạch Hỏa Cách|b|đổi mới, đổi cách trình bày
Hỏa Phong Đỉnh|c|vững vàng, việc lớn thành, ký đẹp
Thuần Chấn|b|sấm động, sếp có thể gắt, giữ bình tĩnh
Thuần Cấn|b|dừng lại, rà soát thêm
Phong Sơn Tiệm|c|tiến dần, từng bước chắc chắn
Lôi Trạch Quy Muội|h|sai thứ tự, qua đúng cấp trước
Lôi Hỏa Phong|c|thịnh vượng, thời điểm vàng, trình ngay
Hỏa Sơn Lữ|b|lữ khách, sếp đi công tác thì ký online
Thuần Tốn|b|gió nhẹ, mềm mỏng, gợi ý khéo
Thuần Đoài|c|vui vẻ, nụ cười mở đường
Phong Thủy Hoán|b|tan rã, xóa hiểu lầm trước
Thủy Trạch Tiết|b|tiết chế, đề xuất vừa phải
Phong Trạch Trung Phu|c|thành tín, sếp tin tưởng
Lôi Sơn Tiểu Quá|b|việc nhỏ được, việc lớn chưa
Thủy Hỏa Ký Tế|c|đã xong, ký là thành
Hỏa Thủy Vị Tế|b|chưa xong, còn bước cuối`.split('\n').map((l, i) => { const [ten, cls, y] = l.split('|'); const w = ten.split(' ');
    let tren, duoi; if (w[0] === 'Thuần') tren = duoi = THUAN[w[1]]; else { tren = w[0]; duoi = w[1]; }
    const hao = BAT_QUAI[duoi].concat(BAT_QUAI[tren]); const ngan = w[0] === 'Thuần' ? w[1] : w.slice(2).join(' ');
    return { so: i + 1, ten, ngan, cls, y, hao }; });
  const hash = s => { let h = 2166136261; for (const ch of String(s)) { h ^= ch.codePointAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
  function traLoiQue(name, n) {
    const q = QUE[hash(khongDau(name) + '|' + n.dd + '/' + n.mm + '/' + n.yy) % 64];
    const sao = q.cls === 'c' ? 5 : q.cls === 'b' ? 3 : 2, ket = q.cls === 'c' ? 'Cát, trình được' : q.cls === 'b' ? 'Bình, cẩn trọng' : 'Hung, nên chờ';
    const lines = ['Quẻ số ' + q.so + ': ' + q.ten, '☯ Quẻ ' + q.ngan + ': ' + q.y, '⚖ ' + ket + ' · ngày ' + n.canChi];
    return { loai: 'que', ten: name, tieuDe: 'QUẺ TRÌNH KÝ CỦA ' + name.toUpperCase(), sao, ketLuan: ket, lines, que: q,
      speak: name + ' gieo được quẻ ' + q.ten + '. Quẻ ' + q.ngan + ', ' + q.y + '.' }; }

  const API = { CAN, CHI, THU, GIO, THAN, QUE, amLich, ngay, homNay, VN, docTuoi, tenTuoi, quanHe, traLoiGio, traLoiTuoi, traLoiQue, gioCuaGioDong, GIO_HC, khung, SAO, dongHoGioTot };
  if (typeof module !== 'undefined' && module.exports) module.exports = API; else root.LICH = API;
})(typeof window !== 'undefined' ? window : globalThis);
