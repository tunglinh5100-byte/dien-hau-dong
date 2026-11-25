# Sửa clip đã tách nền (360x1280: trên màu, dưới alpha):
#  lo  = lấp lỗ bên trong (lá cờ bị trong suốt một phần)
#  vun = bỏ mảnh vụn nhỏ rời (khói xanh còn sót)
# python3 tools/qfix.py vao.mp4 ra.mp4 [lo] [vun=400]
import subprocess, numpy as np, sys
from scipy import ndimage as nd
src, out = sys.argv[1], sys.argv[2]; A = sys.argv[3:]
LO = 'lo' in A; VUN = next((int(x[4:]) for x in A if x.startswith('vun=')), 0)
W, H = 360, 640
p = subprocess.Popen(['ffmpeg', '-v', 'error', '-i', src, '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], stdout=subprocess.PIPE)
e = subprocess.Popen(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H*2}', '-r', '24', '-i', '-',
    '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out], stdin=subprocess.PIPE)
n = 0
while True:
    b = p.stdout.read(W*H*2*3)
    if len(b) < W*H*2*3: break
    f = np.frombuffer(b, np.uint8).reshape(H*2, W, 3).copy(); c = f[:H]; a = f[H:, :, 0].astype(np.float32)
    if VUN:
        lb, k = nd.label(a > 4)
        if k:
            sz = nd.sum(np.ones_like(a), lb, range(1, k+1)); bo = np.isin(lb, np.where(sz < VUN)[0] + 1)
            a[bo] = 0; c[bo] = 0
    if LO:
        full = nd.binary_fill_holes(a > 128); hole = full & (a < 250) & (c.max(-1) > 50)
        a[hole] = 255
    f[H:] = np.clip(a, 0, 255).astype(np.uint8)[..., None]
    e.stdin.write(f.tobytes()); n += 1
e.stdin.close(); e.wait(); print('ok', out, n)
