#!/usr/bin/env python3
"""Tính lại số lần dự xem từ Sheet "Nhật ký live hầu đồng" (tab log) -> lv-goc.json.
Dùng: python3 tools/lv_goc.py <file_json_1> [<file_json_2> ...] > lv-goc.json
Mỗi file là kết quả get_values của dải log!B{a}:M{b} (JSON có khoá "values").
Cột: B thoiGian, C phien, D trang, E loai, F userId, G taiKhoan, H tenHienThi, ..., M quanHe.
Quy tắc (giống trang /g): chỉ tính từ 22/11/2026; phiên mới khi cách tương tác trước >= 30 phút;
ai ở trong 1 phiên (tương tác đầu -> cuối) >= 5 phút được 1 lần; chỉ người đã follow (quanHe có 'theo doi'
hoặc 'ban be' hoặc 'quan tri') được cộng dồn, người chưa follow luôn là 1. Khoá = FNV-1a 32 bit của userId (không lưu tên)."""
import json, sys, datetime
from collections import defaultdict
TU = datetime.datetime(2026, 11, 22)
# 27/11 anh Linh: không tính phiên thử /sd chiều 26/11 (bắt đầu 15:45)
BO = [(datetime.datetime(2026, 11, 26, 15, 0), datetime.datetime(2026, 11, 26, 17, 30))]
BAN = 2  # đổi số này khi muốn trang /g lấy lại số lần dự xem theo Sheet (ghi đè số trên máy live)
P = lambda s: datetime.datetime.strptime(s, '%Y-%m-%d %H:%M:%S')
def fnv(s):
    h = 0x811c9dc5
    for c in s.encode('utf8'):
        h ^= c; h = (h * 0x01000193) & 0xffffffff
    return format(h, '08x')
ev = []
for f in sys.argv[1:]:
    for r in json.load(open(f)).get('values', []):
        r = r + [''] * 12
        if r[2] != 'index' or not r[4]: continue
        try: t = P(r[0])
        except Exception: continue
        if t >= TU: ev.append((t, r[4], r[11]))
ev.sort()
ph = 0; last = None; sp = {}; fol = {}; bd = {}
for t, u, q in ev:
    if last is None or (t - last).total_seconds() >= 1800: ph += 1; bd[ph] = t
    last = t; s = sp.setdefault((u, ph), [t, t]); s[1] = t
    if any(x in q for x in ('theo doi', 'ban be', 'quan tri')) and 'chua theo doi' != q: fol[u] = 1
cnt = defaultdict(int)
bo = {p for p, t in bd.items() if any(a <= t <= b for a, b in BO)}
for (u, p), (a, b) in sp.items():
    if p not in bo and (b - a).total_seconds() >= 300: cnt[u] += 1
out = {fnv(u): [c if fol.get(u) else 1, fol.get(u, 0)] for u, c in cnt.items()}
json.dump({'tu': '2026-11-22', 'luc': datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%d %H:%M UTC'), 'phien': ph - len(bo), 'ban': BAN, 'd': out}, sys.stdout, separators=(',', ':'))
