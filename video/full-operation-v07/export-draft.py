from pathlib import Path
import json,sys,shutil,uuid
R=Path(__file__).resolve().parent;P=R.parents[1]
sys.path[:0]=[str(R/'python-lib'),str(P/'video/.tools/python')]
import pyJianYingDraft as d
name='Finance-Intelligence-Operation-Bilingual-v07';stage=R/'renders'/('draft-stage-'+uuid.uuid4().hex);stage.mkdir(parents=True,exist_ok=True)
s=d.DraftFolder(str(stage)).create_draft(name,2560,1440,fps=30,allow_replace=False);D=stage/name;res=D/'Resources';res.mkdir(exist_ok=True)
for src,label in [(R/'renders/plate.mp4','plate.mp4'),(R/'assets/audio/narration.wav','narration.wav'),(R/'assets/audio/mix.wav','reference-mix.wav'),(R/'assets/audio/music-ducked.wav','music-ducked.wav'),(P/'video/full-en-v02/assets/audio/Cipher2.mp3','music.mp3')]:shutil.copy2(src,res/label)
for kind,label in [(d.TrackType.video,'Picture'),(d.TrackType.audio,'Narration'),(d.TrackType.audio,'Music'),(d.TrackType.text,'English'),(d.TrackType.text,'Chinese')]:s.append_track(d.TrackSpec(kind,name=label))
mat=d.VideoMaterial(str(res/'plate.mp4'))
for q in json.loads((R/'shots.json').read_text('utf-8')):
 a=round(q['start']*1e6);b=round((q['start']+q['duration'])*1e6);rng=d.Timerange(a,b-a);s.add_segment(d.VideoSegment(mat,rng,source_timerange=rng),'Picture')
for label,file,volume in [('Narration','narration.wav',1),('Music','music-ducked.wav',1)]:s.add_segment(d.AudioSegment(d.AudioMaterial(str(res/file)),d.Timerange(0,134500000),volume=volume),label)
for q in json.loads((R/'captions.json').read_text('utf-8')):
 a=round(q['start']*1e6);b=round(q['end']*1e6);rng=d.Timerange(a,b-a)
 for label,key,size,y in [('English','en',3,-.82),('Chinese','zh',2.6,-.93)]:s.add_segment(d.TextSegment(q[key],rng,style=d.TextStyle(size=size,align=1,auto_wrapping=True,max_line_width=.85),clip_settings=d.ClipSettings(transform_y=y)),label)
s.save()
(D/'README.txt').write_text('Editable story picture cuts, native bilingual subtitles, separate narration/music. Intro/cause/chapter animations are baked into picture. MP4 uses sidechain-ducked music; editable draft uses the independent ducked music stem; overall final loudness may differ slightly. Reference-mix.wav preserves the final mixed audio if required. Run relocate.py after moving this folder. Windows Jianying opening remains unverified. Music:Cipher byKevin MacLeod,incompetech.com,CCBY4.0.',encoding='utf-8')
(D/'relocate.py').write_text('from pathlib import Path\nimport json\nr=Path(__file__).resolve().parent\np=r/"draft_content.json"\nd=json.loads(p.read_text("utf-8"))\nfor kind in ("videos","audios"):\n for m in d["materials"].get(kind,[]):m["path"]=str(r/"Resources"/Path(m["path"]).name)\np.write_text(json.dumps(d,ensure_ascii=False),encoding="utf-8")\n',encoding='utf-8')
canonical=R/'jianying'/name
shutil.copytree(D,canonical,dirs_exist_ok=True)
data=json.loads((canonical/'draft_content.json').read_text('utf-8'))
for kind in ['videos','audios']:
 for m in data['materials'].get(kind,[]):m['path']=str(canonical/'Resources'/Path(m['path']).name)
(canonical/'draft_content.json').write_text(json.dumps(data,ensure_ascii=False),encoding='utf-8')
shutil.make_archive(str(R/(name+'-Jianying')),'zip',R/'jianying',name)
print('DRAFT_READY',flush=True)
