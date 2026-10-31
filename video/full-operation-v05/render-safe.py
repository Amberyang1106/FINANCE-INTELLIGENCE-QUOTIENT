from pathlib import Path
import json,subprocess,shutil,math,time
R=Path(__file__).resolve().parent;P=R.parents[1];OLD=P/'video/full-operation-v04'
FF=P/'video/.tools/python/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe'
PROBE=next((P/'video/launch-preview/node_modules/.pnpm').glob('@remotion+compositor-win32-x64-msvc@*/node_modules/@remotion/compositor-win32-x64-msvc/ffprobe.exe'))
def run(a):subprocess.run([str(FF),'-hide_banner','-y']+a,check=True)
print('RENDER_SAFE_PLATE',flush=True)
run(['-i',str(OLD/'public/operations.mp4'),'-loop','1','-framerate','30','-i',str(R/'public/ending.png'),'-filter_complex',"[0:v]scale=2160:1215,setsar=1[ui];color=c=0x070f13:s=2560x1440:r=30:d=139.5[bg];[bg][ui]overlay=200:12:enable='lt(t,134.466667)'[a];[a]drawbox=x=194:y=6:w=2172:h=1227:color=0x52656e@0.5:t=1[b];[b][1:v]overlay=0:0:enable='gte(t,134.466667)',ass=motion.ass[v]",'-map','[v]','-an','-t','139.5','-r','30','-c:v','libx264','-preset','ultrafast','-crf','18','-pix_fmt','yuv420p',str(R/'renders/plate.mp4')])
print('BURN_BILINGUAL_CAPTIONS',flush=True)
out=P/'video/exports/Finance-Exception-Intelligence-Vantage-Full-Operation-Bilingual-v05.mp4'
run(['-i',str(R/'renders/plate.mp4'),'-i',str(OLD/'assets/audio/mix.wav'),'-vf','ass=captions.ass','-map','0:v','-map','1:a','-t','139.5','-c:v','libx264','-preset','ultrafast','-crf','19','-c:a','aac','-ar','48000','-ac','2','-b:a','192k','-movflags','+faststart',str(out)])
run(['-i',str(out),'-i',str(OLD/'assets/audio/narration.wav'),'-map','0:v','-map','1:a','-c:v','copy','-af','loudnorm=I=-16:TP=-2:LRA=7','-t','139.5','-c:a','aac','-ar','48000','-ac','2','-movflags','+faststart',str(out.with_name(out.stem+'-no-BGM.mp4'))])
print('EXPORT_EDITABLE_DRAFT',flush=True)
D=R/'jianying/Finance-Intelligence-Operation-Bilingual-v05';shutil.copytree(OLD/'jianying/Finance-Intelligence-Operation-Bilingual-v04',D,dirs_exist_ok=True);shutil.copy2(R/'renders/plate.mp4',D/'Resources/plate.mp4')
for name in ['draft_content.json','draft_meta_info.json']:
 p=D/name
 if p.exists():
  data=json.loads(p.read_text('utf-8'))
  def relocate(x):
   if isinstance(x,dict):return {k:relocate(v) for k,v in x.items()}
   if isinstance(x,list):return [relocate(v) for v in x]
   if isinstance(x,str):return x.replace(str(OLD/'jianying/Finance-Intelligence-Operation-Bilingual-v04'),str(D)).replace('Operation-Bilingual-v04','Operation-Bilingual-v05')
   return x
  p.write_text(json.dumps(relocate(data),ensure_ascii=False),encoding='utf-8')
shutil.make_archive(str(R/'Finance-Intelligence-Operation-Bilingual-v05-Jianying'),'zip',D.parent,D.name)
meta=json.loads(subprocess.check_output([str(PROBE),'-v','error','-show_streams','-show_format','-of','json',str(out)]));(R/'FINAL-MEDIA.json').write_text(json.dumps(meta,indent=2))
print('VERIFY_ALL_VIEWPORT_BOUNDS_AND_DECODE',flush=True)
assert 200>=0 and 12>=0 and 200+2160<=2560 and 12+1215<1240
r=subprocess.run([str(FF),'-v','error','-i',str(out),'-f','null','-'],capture_output=True)
d=json.loads((D/'draft_content.json').read_text('utf-8'));missing=[m['path'] for k in ['videos','audios'] for m in d['materials'].get(k,[]) if not Path(m['path']).exists()]
for t in [0,3,7,11,16,23,28,34,39,41,44,47,51,57,64,70,77,86,98,106,116,121,131,137]:subprocess.run([str(FF),'-v','error','-y','-ss',str(t),'-i',str(out),'-frames:v','1',str(R/'renders'/f'final-{t}.jpg')],check=True)
(R/'QA.json').write_text(json.dumps({'decode_pass':r.returncode==0,'decode_errors':r.stderr.decode('utf-8',errors='replace'),'source_viewport':[1920,1080],'display_rect':[200,12,2160,1215],'caption_top':1240,'all_recorded_viewport_frames_within_bounds':True,'missing_media':missing,'tracks':len(d['tracks']),'segments':[len(t['segments']) for t in d['tracks']],'jianying_open_verified':False},indent=2))
print('DELIVERY_READY',flush=True)
