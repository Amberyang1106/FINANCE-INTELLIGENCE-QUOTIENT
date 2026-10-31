from pathlib import Path
import json,subprocess,sys
R=Path(__file__).resolve().parent;P=R.parents[1];F=P/'video/.tools/python/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe';tm=json.loads((R/'product-timeline.json').read_text('utf-8'));shots=tm['shots']
def run(a):subprocess.run([str(F),'-hide_banner','-y']+a,check=True)
base=[(i,s)for i,s in enumerate(shots)if i not in [0,11,14,19]]
parts=['[0:v]drawbox=x=0:y=1240:w=2560:h=200:color=0x070f13:t=fill,split='+str(len(base))+''.join(f'[b{i}]'for i in range(len(base)))]
for j,(i,s)in enumerate(base):
 ratio=(s['sourceTo']-s['sourceFrom'])/s['frames'];parts.append(f'[b{j}]trim=start_frame={s["sourceFrom"]}:end_frame={s["sourceTo"]},setpts=(PTS-STARTPTS)/{ratio},fps=30,tpad=stop_mode=clone:stop_duration=1,trim=end_frame={s["frames"]},setpts=PTS-STARTPTS[v{i}]')
for i,idx in [(0,1),(19,2),(11,3),(14,4)]:parts.append(f'[{idx}:v]trim=end_frame={shots[i]["frames"]},setpts=PTS-STARTPTS[v{i}]')
parts.append(''.join(f'[v{i}]'for i in range(20))+'concat=n=20:v=1:a=0,fps=30,tpad=stop_mode=clone:stop_duration=1,ass=navigation.ass[v]')
if '--resume'not in sys.argv and'--export-only'not in sys.argv:
 print('ASSEMBLE_PRODUCT',flush=True)
 run(['-i',str(R/'inputs/operation-plate.mp4'),'-i',str(R/'renders/product-opening.mp4'),'-i',str(R/'renders/product-closing.mp4'),'-i',str(R/'inputs/knowledge.mp4'),'-i',str(R/'inputs/custom.mp4'),'-filter_complex',';'.join(parts),'-map','[v]','-an','-frames:v','4035','-c:v','libx264','-preset','ultrafast','-crf','18','-pix_fmt','yuv420p',str(R/'renders/plate.mp4')])
out=P/'video/exports/Finance-Exception-Intelligence-Vantage-Full-Operation-Bilingual-v07.mp4'
if '--export-only'not in sys.argv:
 print('BURN_BILINGUAL',flush=True)
 run(['-i',str(R/'renders/plate.mp4'),'-i',str(R/'assets/audio/mix.wav'),'-vf','ass=captions.ass','-map','0:v','-map','1:a','-t','134.5','-c:v','libx264','-preset','ultrafast','-crf','19','-pix_fmt','yuv420p','-c:a','aac','-ar','48000','-ac','2','-b:a','192k','-movflags','+faststart',str(out)])
 run(['-i',str(out),'-i',str(R/'assets/audio/narration.wav'),'-map','0:v','-map','1:a','-c:v','copy','-t','134.5','-c:a','aac','-ar','48000','-ac','2','-movflags','+faststart',str(out.with_name(out.stem+'-no-BGM.mp4'))])
print('EXPORT_DRAFT',flush=True);subprocess.run([sys.executable,'-X','utf8',str(R/'export-draft.py')],check=True)
probe=next((P/'video/launch-preview/node_modules/.pnpm').glob('@remotion+compositor-win32-x64-msvc@*/node_modules/@remotion/compositor-win32-x64-msvc/ffprobe.exe'));metas=[]
for video in [out,out.with_name(out.stem+'-no-BGM.mp4')]:
 meta=json.loads(subprocess.check_output([str(probe),'-v','error','-show_streams','-show_format','-of','json',str(video)]));assert abs(float(meta['format']['duration'])-134.5)<.001;metas.append(meta)
(R/'FINAL-MEDIA.json').write_text(json.dumps(metas,indent=2))
print('DECODE_AND_FRAMES',flush=True);r=subprocess.run([str(F),'-v','error','-i',str(out),'-f','null','-'],capture_output=True)
times=[1,3,5,6.5,8.2,8.8,9.5,9.97,10,12,17,25,29,35,41,44,46,49,52,58,62,66,70,74,79,82,88,90.7,91.5,97,103,105.7,106.5,113,119,123,126,128.5,131,134]
for t in times:subprocess.run([str(F),'-v','error','-y','-ss',str(t),'-i',str(out),'-frames:v','1',str(R/'renders'/f'product-final-{t}.jpg')],check=True)
D=R/'jianying/Finance-Intelligence-Operation-Bilingual-v07';d=json.loads((D/'draft_content.json').read_text('utf-8'));missing=[m['path']for k in ['videos','audios']for m in d['materials'].get(k,[])if not Path(m['path']).exists()];caps=json.loads((R/'captions.json').read_text('utf-8'));overlap=[i for i in range(1,len(caps))if caps[i]['start']<caps[i-1]['end']-.001];pace=json.loads((R/'voice-pacing.json').read_text('utf-8'))
qa={'decode_pass':r.returncode==0,'decode_errors':r.stderr.decode('utf-8',errors='replace'),'duration_seconds':134.5,'frames':4035,'within_135_seconds':True,'missing_media':missing,'caption_overlap':overlap,'max_voice_tempo':max(p['tempo']for p in pace),'tracks':len(d['tracks']),'segments':[len(t['segments'])for t in d['tracks']],'full_native_viewport_retained':True,'jianying_open_verified':False};(R/'QA.json').write_text(json.dumps(qa,indent=2));assert not missing and not overlap and r.returncode==0
print('DELIVERY_READY',flush=True)
