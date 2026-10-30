import render_video as r
from PIL import Image,ImageDraw
import subprocess,json
out=r.ROOT/'exports'/'FPA-Agent-Vantage-Overview-zh-CN-v01.mp4'
qa=r.EDIT/'qa';qa.mkdir(exist_ok=True)
times=[3,15,26,40,61,72,84,96,109,124,137,149,160,168]
thumbs=[]
for i,t in enumerate(times):
 p=qa/('frame-%03d.jpg'%t)
 subprocess.run([r.FF,'-v','error','-y','-ss',str(t),'-i',str(out),'-frames:v','1','-q:v','2',str(p)],check=True)
 im=Image.open(p);im.thumbnail((480,270));thumbs.append((t,im.copy()))
sheet=Image.new('RGB',(1920,4*300),'#070f13');d=ImageDraw.Draw(sheet)
for i,(t,im) in enumerate(thumbs):
 x=(i%4)*480;y=(i//4)*300;sheet.paste(im,(x,y));d.text((x+10,y+274),str(t)+'s',fill='white')
sheet.save(qa/'contact-sheet.jpg',quality=94)
Image.open(qa/'frame-015.jpg').save(r.ROOT/'exports'/'cover.jpg',quality=94)
result=subprocess.run([r.FF,'-v','error','-i',str(out),'-f','null','-'],capture_output=True,text=True)
(qa/'decode-check.json').write_text(json.dumps({'returncode':result.returncode,'errors':result.stderr,'bytes':out.stat().st_size},indent=2))
print('QA DONE',flush=True)
