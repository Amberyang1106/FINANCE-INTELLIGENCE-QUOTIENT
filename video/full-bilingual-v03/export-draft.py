from pathlib import Path
import sys,zipfile
R=Path(__file__).resolve().parent
with zipfile.ZipFile(next((R/'vendor-wheels').glob('pymediainfo*.whl'))) as z:z.extractall(R/'python-lib')
sys.path[:0]=[str(R/'python-lib'),str(R.parents[1]/'video/.tools/python')]
p=R/'python-lib/pyJianYingDraft/__init__.py'
s=p.read_text('utf-8').replace('if ISWIN:', 'if False:')
p.write_text(s,encoding='utf-8')
import pyJianYingDraft as d
print('DRAFT_IMPORT_OK')

import json,time,shutil
while 'REMOTION_RENDER_COMPLETE' not in (R/'render.log').read_text('utf-8',errors='replace'):time.sleep(10)
name='Finance-Intelligence-Bilingual-v03'
stage=R/'jianying'
stage.mkdir(exist_ok=True)
folder=d.DraftFolder(str(stage))
script=folder.create_draft(name,2560,1440,fps=30,allow_replace=True)
resources=stage/name/'Resources'
resources.mkdir(exist_ok=True)
for src,label in [(R/'renders/plate.mp4','plate.mp4'),(R/'assets/audio/narration.wav','narration.wav'),(R.parents[1]/'video/full-en-v02/assets/audio/Cipher2.mp3','music.mp3')]:shutil.copy2(src,resources/label)
for kind,label in [(d.TrackType.video,'Picture'),(d.TrackType.audio,'Narration'),(d.TrackType.audio,'Music'),(d.TrackType.text,'English'),(d.TrackType.text,'Chinese')]:script.append_track(d.TrackSpec(kind,name=label))
plate=d.VideoMaterial(str(resources/'plate.mp4'))
shots=json.loads((R/'shots.json').read_text('utf-8'))
for q in shots:
 rng=d.Timerange(round(q['start']*1e6),round(q['duration']*1e6))
 script.add_segment(d.VideoSegment(plate,rng,source_timerange=rng),'Picture')
for label,file,vol in [('Narration','narration.wav',1),('Music','music.mp3',.045)]:
 mat=d.AudioMaterial(str(resources/file))
 script.add_segment(d.AudioSegment(mat,d.Timerange(0,138000000),volume=vol),label)
for q in json.loads((R/'captions.json').read_text('utf-8')):
 rng=d.Timerange(round(q['start']*1e6),round(q['end']*1e6)-round(q['start']*1e6))
 for label,key,size,y in [('English','en',3.0,-.82),('Chinese','zh',2.6,-.93)]:
  script.add_segment(d.TextSegment(q[key],rng,style=d.TextStyle(size=size,align=1,auto_wrapping=True,max_line_width=.85),clip_settings=d.ClipSettings(transform_y=y)),label)
script.save()
print('DRAFT_EXPORTED',stage/name)
