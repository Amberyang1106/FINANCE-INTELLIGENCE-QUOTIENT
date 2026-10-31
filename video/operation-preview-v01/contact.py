from pathlib import Path
from PIL import Image,ImageDraw
p=Path(__file__).resolve().parent/'renders'
ts=[2.8,5.8,8.8,12.7,14.6,19.1,21.3,22.6,25.3,27.5,29.5]
w,h=640,360
out=Image.new('RGB',(w*3,(h+28)*4),'#071015');draw=ImageDraw.Draw(out)
for i,t in enumerate(ts):
 f=p/('final-'+str(t)+'.jpg')
 im=Image.open(f).convert('RGB');im.thumbnail((w,h))
 x=(i%3)*w;y=(i//3)*(h+28);out.paste(im,(x,y));draw.text((x+12,y+h+6),str(t)+'s / frame '+str(round(t*30)),fill='white')
out.save(p/'contact-final.jpg',quality=92)
