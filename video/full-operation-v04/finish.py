from pathlib import Path
import json,subprocess,time,shutil
R=Path(__file__).resolve().parent
P=R.parents[1]
while not (R/'complete.json').exists():time.sleep(5)
FF=P/'video/.tools/python/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe'
out=P/'video/exports/Finance-Exception-Intelligence-Vantage-Full-Operation-Bilingual-v04.mp4'
duration=json.loads((R/'timeline.json').read_text('utf-8'))['frames']/30
plate=R/'renders/evidence-plate.mp4'
subprocess.run([str(FF),'-v','error','-y','-i',str(R/'renders/plate.mp4'),'-i',str(R/'public/voucher-header.png'),'-filter_complex',"[0:v][1:v]overlay=680:1095:enable='between(t,40,45.2)'[v]",'-map','[v]','-an','-c:v','libx264','-preset','ultrafast','-crf','19',str(plate)],check=True)
subprocess.run([str(FF),'-v','error','-y','-i',str(plate),'-i',str(R/'assets/audio/mix.wav'),'-vf','ass=captions.ass','-map','0:v','-map','1:a','-c:v','libx264','-preset','ultrafast','-crf','19','-c:a','aac','-ar','48000','-ac','2','-t',str(duration),'-movflags','+faststart',str(out)],check=True)
subprocess.run([str(FF),'-v','error','-y','-i',str(out),'-i',str(R/'assets/audio/narration.wav'),'-map','0:v','-map','1:a','-c:v','copy','-af','loudnorm=I=-16:TP=-2:LRA=7','-c:a','aac','-ar','48000','-ac','2','-t',str(duration),'-movflags','+faststart',str(out.with_name(out.stem+'-no-BGM.mp4'))],check=True)
while 'DRAFT_EXPORTED' not in (R/'draft-export.log').read_text('utf-8',errors='replace'):time.sleep(5)
D=R/'jianying/Finance-Intelligence-Operation-Bilingual-v04'
shutil.copy2(plate,D/'Resources/plate.mp4')
(D/'README.txt').write_text('Native English/Chinese captions; separate narration/music; picture split by15storyshots. Camera moves are baked into picture. After moving the folder run relocate.py to update Resources paths. Windows Jianying application opening remains unverified. Saving in Jianying may upgrade/encrypt draft data. Music attribution: Cipher, Kevin MacLeod/incompetech.com, CC BY4.0.',encoding='utf-8')
(D/'relocate.py').write_text('from pathlib import Path\nimport json\nr=Path(__file__).resolve().parent\np=r/"draft_content.json"\nd=json.loads(p.read_text("utf-8"))\nfor kind in ("videos","audios"):\n for m in d["materials"].get(kind,[]):m["path"]=str(r/"Resources"/Path(m["path"]).name)\np.write_text(json.dumps(d,ensure_ascii=False),encoding="utf-8")\n',encoding='utf-8')
shutil.make_archive(str(R/'Finance-Intelligence-Operation-Bilingual-v04-Jianying'),'zip',D.parent,D.name)
probe=next((P/'video/launch-preview/node_modules/.pnpm').glob('@remotion+compositor-win32-x64-msvc@*/node_modules/@remotion/compositor-win32-x64-msvc/ffprobe.exe'))
meta=json.loads(subprocess.check_output([str(probe),'-v','error','-show_streams','-show_format','-of','json',str(out)]))
(R/'FINAL-MEDIA.json').write_text(json.dumps(meta,indent=2))
d=json.loads((D/'draft_content.json').read_text('utf-8'))
missing=[m['path'] for k in ['videos','audios'] for m in d['materials'].get(k,[]) if not Path(m['path']).exists()]
r=subprocess.run([str(FF),'-v','error','-i',str(out),'-f','null','-'],capture_output=True)
for t in [3,7,16,23,34,41,44,51,57,64,70,77,86,98,106,116,121,131,137]:subprocess.run([str(FF),'-v','error','-y','-ss',str(t),'-i',str(out),'-frames:v','1',str(R/'renders'/f'final-{t}.jpg')],check=True)
(R/'QA.json').write_text(json.dumps({'decode_pass':r.returncode==0,'decode_errors':r.stderr.decode('utf-8',errors='replace'),'missing_media':missing,'tracks':len(d['tracks']),'segments':[len(t['segments']) for t in d['tracks']],'jianying_open_verified':False},indent=2))
print('DELIVERY_READY',flush=True)
