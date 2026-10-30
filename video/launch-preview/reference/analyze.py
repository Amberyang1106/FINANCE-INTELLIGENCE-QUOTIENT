from PIL import Image,ImageDraw
import subprocess
from pathlib import Path
root=Path("C:/Users/yangtt16/OneDrive - Lenovo/小强创新/fpa-agent-demo/video/launch-preview")
ff="C:/Users/yangtt16/OneDrive - Lenovo/小强创新/fpa-agent-demo/video/.tools/python/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe"
source="C:/Users/yangtt16/OneDrive - Lenovo/小强创新/tessel-launch.mp4"
times=[0.5,2,4.5,6.5,8,10,12,14.5,16.5,19,22,25,28,30.5]
sheet=Image.new('RGB',(1600,4*250),'#171717');d=ImageDraw.Draw(sheet)
for i,t in enumerate(times):
 p=root/'reference'/('frame'+str(t)+'.jpg')
 subprocess.run([ff,'-v','error','-y','-ss',str(t),'-i',source,'-frames:v','1','-vf','scale=800:-1',str(p)],check=True)
 im=Image.open(p);im.thumbnail((400,225));x=(i%4)*400;y=(i//4)*250;sheet.paste(im,(x,y));d.text((x+8,y+230),str(t)+'s',fill='white')
sheet.save(root/'reference'/'contact.jpg')
