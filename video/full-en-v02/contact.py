from pathlib import Path
from PIL import Image, ImageDraw
import sys, re
ROOT=Path(__file__).resolve().parent
final='--final' in sys.argv
files=sorted([p for p in (ROOT/'renders').glob('final-*.jpg' if final else 'review-*.png') if re.fullmatch(r'(?:final|review)-[0-9]+(?:\.[0-9]+)?',p.stem)],key=lambda p:float(p.stem.split('-')[1]))
sheet=Image.new('RGB',(1280,400*((len(files)+1)//2)), '#172127')
draw=ImageDraw.Draw(sheet)
for i,p in enumerate(files):
    im=Image.open(p).convert('RGB');im.thumbnail((640,360))
    x=(i%2)*640;y=(i//2)*400
    sheet.paste(im,(x,y+30));draw.text((x+12,y+8),p.stem,fill='white')
sheet.save(ROOT/'renders'/('final-contact-sheet.jpg' if final else 'contact-sheet.jpg'),quality=90)
print('contact',len(files))
