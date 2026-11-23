import subprocess, numpy as np, sys
def meas(path, n=8):
    d=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',path])); res=[]
    for k in range(n):
        t=d*(k+.5)/n
        raw=subprocess.check_output(['ffmpeg','-v','error','-ss',str(t),'-i',path,'-frames:v','1','-vf','crop=360:640:0:640,format=gray','-f','rawvideo','-'])
        a=np.frombuffer(raw,np.uint8).reshape(640,360); ys,xs=np.where(a>128)
        if len(ys)<50: continue
        top=ys.min(); bot=np.percentile(ys,99.5); cx=np.median(xs[ys>bot-60]) if (ys>bot-60).any() else np.median(xs)
        res.append((top,bot,cx))
    return [round(float(x),1) for x in np.median(np.array(res),axis=0)]
for p in sys.argv[1:]: print(p.split('/')[-1], meas(p))
