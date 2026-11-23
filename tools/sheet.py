import subprocess,numpy as np,sys
from PIL import Image,ImageDraw
D,ts,out=sys.argv[1],[float(x) for x in sys.argv[2].split(',')],sys.argv[3]
names=sys.argv[4].split(',')
rows=[]
for n in names:
    row=[]
    for t in ts:
        b=subprocess.run(['ffmpeg','-v','error','-ss',str(t),'-i',f'{D}/{n}.mp4','-frames:v','1','-f','rawvideo','-pix_fmt','rgb24','-'],capture_output=True).stdout
        im=np.frombuffer(b,np.uint8).reshape(1280,360,3).astype(float)
        c,a=im[:640],im[640:,:,:1]/255; bg=np.full_like(c,200); o=(c*a+bg*(1-a)).astype(np.uint8)
        I=Image.fromarray(o); d=ImageDraw.Draw(I); d.line([(180,0),(180,640)],fill=(255,0,0)); row.append(I.resize((180,320)))
    rows.append(row)
W=Image.new('RGB',(180*len(ts),320*len(rows)))
for i,r in enumerate(rows):
    for j,I in enumerate(r): W.paste(I,(j*180,i*320))
W.save(out)
