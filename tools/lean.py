import subprocess,numpy as np,sys
for f in sys.argv[1:]:
    b=subprocess.run(['ffmpeg','-v','error','-i',f,'-vf','fps=2','-f','rawvideo','-pix_fmt','gray','-'],capture_output=True).stdout
    F=np.frombuffer(b,np.uint8).reshape(-1,1280,360)[:,640:]>128
    ang=[]
    for a in F:
        ys=np.where(a.any(1))[0]
        if not len(ys): continue
        t,bo=ys.min(),ys.max();H=bo-t
        # trục: tâm hàng từng dải (bỏ tay: dùng trung vị của điểm giữa trái-phải trong dải lõi)
        pts=[]
        for y in range(t+int(.15*H),bo-int(.1*H),6):
            xs=np.where(a[y])[0]
            if len(xs)>10: pts.append((y,(np.percentile(xs,20)+np.percentile(xs,80))/2))
        p=np.array(pts); k=np.polyfit(p[:,0],p[:,1],1)[0]; ang.append(np.degrees(np.arctan(k)))
    ang=np.array(ang); print(f.split('/')[-1],'lean deg (+ = đầu lệch phải) median %.1f'%(-np.median(ang)), 'p25 %.1f p75 %.1f'%(-np.percentile(ang,75),-np.percentile(ang,25)))
