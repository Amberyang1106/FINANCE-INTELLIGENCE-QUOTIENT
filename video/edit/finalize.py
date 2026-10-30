import render_video as r
from PIL import Image
import json
for name in ['S09','S10_curve']:
 p=r.ROOT/'raw'/name/'capture.json';info=json.loads(p.read_text())
 if 'crop' in info:
  for f in info['frames']:
   src=r.ROOT/'raw'/name/f['file'];dst=src.with_name('crop'+src.name)
   Image.open(src).crop(info['crop']).save(dst,quality=96)
   f['file']=dst.name
  info['region']=info.pop('crop');p.write_text(json.dumps(info))
for sid in ['09','10']:r.render_scene(sid,r.PLANS[sid])
r.assemble()
