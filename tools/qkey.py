# Tách nền xanh clip Tú (720x1280) -> clip chồng màu+alpha 360x1280 (như cl3/, bo3/)
# python3 qkey.py src out [pp] [xl=..] [xr=..] [t0=..] [t1=..] [thayao=tA,tB] [nomat]
import subprocess, numpy as np, sys
from scipy import ndimage as nd
src, out = sys.argv[1], sys.argv[2]; A = sys.argv[3:]; LUNG = 'lung' in A; CAN = 'can' in A; ROT = 0.0
def opt(k, d=None, f=float):
    for x in A:
        if x.startswith(k + '='): return f(x[len(k)+1:])
    return d
PP = 'pp' in A; XL = opt('xl', 0, int); XR = opt('xr', 720, int); T0 = opt('t0', 0.0); T1 = opt('t1', 99.0); NOMAT = 'nomat' in A
ROT = opt('rot', 0.0); TA = opt('thayao', None, lambda s: [float(v) for v in s.split(',')])
XLA = opt('axl', None, int); XRA = opt('axr', None, int); ROBE = 'robe' in A
W, H = 720, 1280; FPS = 24
def frames():
    p = subprocess.Popen(['ffmpeg', '-v', 'error', '-i', src, '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-r', str(FPS), '-'], stdout=subprocess.PIPE)
    while True:
        b = p.stdout.read(W*H*3)
        if len(b) < W*H*3: break
        yield np.frombuffer(b, np.uint8).reshape(H, W, 3)
allf = list(frames()); n0 = len(allf)
# nền: trung bình các điểm xanh
sub = np.stack(allf[::6]).astype(np.int16); dom = sub[..., 1] - np.maximum(sub[..., 0], sub[..., 2]); mask = dom > 40
if LUNG:  # phông phải sáng như phông thật: bỏ vải xanh đậm (đai lưng) khỏi mẫu phông
    gm = np.median(sub[..., 1][mask]); mask &= sub[..., 1] > gm * .8
plate = (np.where(mask[..., None], sub, 0).sum(0) / np.maximum(mask.sum(0), 1)[..., None]).astype(np.float32)
miss = mask.sum(0) < 2
if miss.any():
    for c in range(3):
        ch = plate[..., c].copy(); ch[miss] = np.nan
        for y in range(H):
            row = ch[y]; idx = np.where(~np.isnan(row))[0]
            if len(idx): ch[y] = np.interp(np.arange(W), idx, row[idx])
        plate[..., c] = ch
mg = np.nanmean(plate.reshape(-1, 3), 0); plate = np.where(np.isnan(plate), mg, plate)
plate = nd.uniform_filter(plate, (9, 9, 1)); del sub
st = np.ones((3, 3), bool); X = np.arange(W)[None, :].repeat(H, 0); Y = np.arange(H)[:, None].repeat(W, 1)
def key(f, white=False, robe=False, xl=None, xr=None):
    xl = XL if xl is None else xl; xr = XR if xr is None else xr
    f = f.astype(np.int16); r, g, b = f[..., 0], f[..., 1], f[..., 2]; d = g - np.maximum(r, b)
    dist = np.sqrt(((f - plate) ** 2).sum(-1)); a = np.clip((dist - 22) / 38.0, 0, 1); a[~(d > 25)] = 1
    a[(X < xl) | (X >= xr)] = 0
    mx = f.max(-1); mn = f.min(-1)
    if robe:  # bỏ hầu dâng (áo dài kem, da, tóc) bám hai bên áo quan đỏ
        side = np.abs(X - 360) > 105
        cream = (mn > 140) & (mx - mn < 50)
        skin = (r > 150) & (r - g > 15) & (r - g < 80) & (b > 90) & (r - b > 25)
        hair = mx < 75
        rm = side & (cream | skin | hair) & (Y < 1150)
        rm = nd.binary_opening(rm, st, iterations=1); lf, lk = nd.label(rm, st)
        if lk:
            sz = nd.sum(np.ones(rm.shape), lf, range(1, lk + 1)); rm = np.isin(lf, np.where(sz >= 2500)[0] + 1)
        a[nd.binary_dilation(rm, st, iterations=3)] = 0
    if not NOMAT:  # chiếu/đệm đỏ nâu dưới chân trong clip Tú: bỏ (trên sập đã có chiếu)
        mat = (r > 90) & (r - g > 35) & (r - b > 35) & (Y > 900) & ((mx - mn) > 45) & (g < 150)
        robe_low = nd.binary_opening(mat, st, iterations=1)
        lf, lk = nd.label(robe_low, st)
        if lk:
            # chỉ bỏ mảng đỏ chạm mép trái/phải của vùng người (đệm), giữ hoa văn đỏ trên vạt áo
            for i in range(1, lk+1):
                m = lf == i; xs = X[m]
                if m.sum() > 300 and (xs.min() < xl + 60 or xs.max() > xr - 60): a[nd.binary_dilation(m, st, iterations=3)] = 0
    if white:  # khung "áo trắng": bỏ mọi chỗ có màu (vạt áo trên đùi hầu dâng), giữ trắng + tóc, mũ
        col = ((mx - mn) > 55) & (mx > 90)
        ys = np.where((a > .5).any(1))[0]; top = ys.min() if len(ys) else 0
        col &= ~((Y < top + 170) & (np.abs(X - (xl + xr) / 2) < 90))
        a[nd.binary_dilation(col, st, iterations=2)] = 0
    fl, fk = nd.label(a > .4, st)
    if fk > 1:
        sz = nd.sum(np.ones_like(a), fl, range(1, fk+1)); keep = [i+1 for i in range(fk) if sz[i] >= (1500 if white else max(2500, sz.max() * .1))]
        a[~np.isin(fl, keep) & (fl > 0)] = 0
    a[nd.binary_fill_holes(a > .4) & (a <= .4) & ~(d > 25)] = 1
    keep = None
    if LUNG:  # vải xanh lá đậm (đai lưng) cùng màu phông: trong bóng người, chỗ tối hơn phông -> giữ nguyên, không khử xanh
        S = nd.binary_fill_holes(nd.binary_closing(np.pad(a > .4, 12), st, iterations=12))[12:-12, 12:-12]
        inner = nd.binary_erosion(S, st, iterations=2)
        lf_, lp_ = f.sum(-1), plate.sum(-1)
        keep = inner & (((dist > 26) & (lf_ < lp_ * .86)) | (dist > 55))
        keep = nd.binary_opening(keep, st, iterations=1)
        a[keep] = 1
    a = nd.uniform_filter(a.astype(np.float32), 3)
    c = f.copy(); lim = np.maximum(r, b) + 8; sp = (a < .995) | ((d > 30) & (a < 1))
    if keep is not None: sp &= ~keep
    c[..., 1] = np.where(sp, np.minimum(g, lim), g)
    c = np.clip(c, 0, 255).astype(np.uint8); c[a < .02] = 0
    return c, a
seq = []
if TA:  # thay khăn áo: khung áo trắng giữ 0,8s -> hoà sang dáng đã mặc áo (cuối clip, hầu dâng đã lui ra)
    ia, ib = int(TA[0] * FPS), int(TA[1] * FPS); ca, aa = key(allf[ia], white=True, xl=XLA, xr=XRA)
    B = [key(allf[k], robe=ROBE) for k in range(ib, n0)]
    def box(a):
        ys = np.where((a > .5).any(1))[0]; xs = np.where((a > .5).any(0))[0]; return ys.min(), ys.max(), (xs.min() + xs.max()) / 2
    ta, ba, xa = box(aa); tb, bb_, xb = box(B[0][1]); sc = (bb_ - tb) / max(1, ba - ta)
    # khung áo trắng phóng cho khớp cỡ, khớp chân với dáng đã mặc áo (clip có zoom)
    def warp(img, order):
        o = np.empty_like(img, dtype=np.float32)
        M = np.array([1 / sc, 1 / sc]); off = np.array([ba - bb_ / sc, xa - xb / sc])
        if img.ndim == 2: return nd.affine_transform(img.astype(np.float32), M, offset=off, order=order, mode='constant', cval=0)
        for c in range(3): o[..., c] = nd.affine_transform(img[..., c].astype(np.float32), M, offset=off, order=order, mode='constant', cval=0)
        return o
    ca = np.clip(warp(ca, 1), 0, 255).astype(np.uint8); aa = np.clip(warp(aa, 1), 0, 1); print('scale', round(sc, 3))
    for _ in range(int(.8 * FPS)): seq.append((ca, aa))
    nf = int(1.4 * FPS)
    for k in range(nf):
        u = (k + 1) / (nf + 1); u = u * u * (3 - 2 * u); cb, ab = B[0]
        a = aa * (1 - u) + ab * u
        c = (ca.astype(np.float32) * (aa * (1 - u))[..., None] + cb.astype(np.float32) * (ab * u)[..., None]) / np.maximum(a, 1e-3)[..., None]
        seq.append((np.clip(c, 0, 255).astype(np.uint8), a))
    seq += B
    print('loop_from', round(len(seq) / FPS - len(B) / FPS, 2))
else:
    i0, i1 = int(T0 * FPS), min(n0, int(T1 * FPS)); seq = [key(allf[k]) for k in range(i0, i1)]
if PP: seq = seq + seq[-2:0:-1]
SH = [0.0] * len(seq)
if CAN:  # cân giữa: thân (dải 30-60% chiều cao) trôi chậm về giữa khung, bỏ lệch trái/phải
    cx = []
    for c_, a_ in seq:
        m = a_ > .5; ys = np.where(m.any(1))[0]
        if not len(ys): cx.append(np.nan); continue
        t_, b_ = ys.min(), ys.max(); hh = b_ - t_; xs = np.where(m[t_ + int(.3 * hh):t_ + int(.6 * hh)])[1]
        cx.append((np.percentile(xs, 20) + np.percentile(xs, 80)) / 2 if len(xs) else np.nan)
    cx = np.array(cx); ok = ~np.isnan(cx); cx[~ok] = np.interp(np.where(~ok)[0], np.where(ok)[0], cx[ok]) if (~ok).any() else 0
    sm = nd.gaussian_filter1d(cx, FPS * 1.2, mode='nearest'); SH = list(np.clip(360 - sm, -60, 60)); print('can', round(float(np.mean(SH)), 1), round(float(np.min(SH)), 1), round(float(np.max(SH)), 1))
def bien(c, a, sh):
    if not sh and not ROT: return c, a
    th = -np.radians(ROT); co, si = np.cos(th), np.sin(th); cy0, cx0 = 1150.0, 360.0
    M = np.array([[co, -si], [si, co]]); off = np.array([cy0, cx0]) - M @ np.array([cy0, cx0 + sh])
    a2 = nd.affine_transform(np.asarray(a, np.float32), M, offset=off, order=1, mode='constant', cval=0)
    c2 = np.stack([nd.affine_transform(c[..., k].astype(np.float32), M, offset=off, order=1, mode='nearest') for k in range(3)], -1)
    c2 = np.clip(c2, 0, 255).astype(np.uint8); c2[a2 < .02] = 0; return c2, a2
enc = subprocess.Popen(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H*2}', '-r', str(FPS), '-i', '-',
    '-vf', 'scale=360:1280:flags=area', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20', '-pix_fmt', 'yuv420p',
    '-force_key_frames', 'expr:gte(t,n_forced*0.5)', '-movflags', '+faststart', out], stdin=subprocess.PIPE)
for i_, (c, a) in enumerate(seq):
    c, a = bien(c, a, SH[i_])
    enc.stdin.write(np.vstack([c, (np.clip(a, 0, 1) * 255).astype(np.uint8)[..., None].repeat(3, -1)]).tobytes())
enc.stdin.close(); enc.wait(); print('ok', out, len(seq), round(len(seq) / FPS, 2))
