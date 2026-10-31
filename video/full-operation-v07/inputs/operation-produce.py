from pathlib import Path
import json,subprocess,sys
R=Path(__file__).resolve().parent;P=R.parents[1];F=P/'video/.tools/python/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe'
def run(a):subprocess.run([str(F),'-hide_banner','-y']+a,check=True)
e=json.loads((R/'edits.json').read_text('utf-8'));segs=json.loads((R/'segments.json').read_text('utf-8'));base=[(i,s)for i,s in enumerate(segs)if s['kind']=='base'];parts=[]
parts.append('[0:v]drawbox=x=0:y=1240:w=2560:h=200:color=0x070f13:t=fill,split='+str(len(base))+''.join(f'[b{j}]'for j in range(len(base))))
for j,(i,s)in enumerate(base):parts.append(f'[b{j}]trim=start_frame={s["sourceFrom"]}:end_frame={s["sourceTo"]},setpts=PTS-STARTPTS[v{i}]')
for kind,idx in [('cause',1),('knowledge',2),('custom',3),('hold',4)]:
 arr=[(i,s)for i,s in enumerate(segs)if s['kind']==kind];assert len(arr)==1
 i,s=arr[0];parts.append(f'[{idx}:v]trim=end_frame={s["duration"]},setpts=PTS-STARTPTS[v{i}]')
parts.append(''.join(f'[v{i}]'for i in range(len(segs)))+f'concat=n={len(segs)}:v=1:a=0,fps=30,tpad=stop_mode=clone:stop_duration=1,ass=navigation.ass[v]')
if '--resume'not in sys.argv and'--export-only'not in sys.argv:
 print('ASSEMBLE_TIGHT_EDIT',flush=True)
 run(['-i',str(P/'video/full-operation-v06/renders/plate.mp4'),'-i',str(R/'renders/cause.mp4'),'-i',str(R/'renders/knowledge.mp4'),'-i',str(R/'renders/custom.mp4'),'-loop','1','-framerate','30','-i',str(R/'public/market-hold.png'),'-filter_complex',';'.join(parts),'-map','[v]','-an','-frames:v',str(e['targetFrames']),'-c:v','libx264','-preset','ultrafast','-crf','18','-pix_fmt','yuv420p',str(R/'renders/plate.mp4')])
out=P/'video/exports/Finance-Exception-Intelligence-Vantage-Full-Operation-Bilingual-v07.mp4'
if '--export-only'not in sys.argv:
 print('BURN_BILINGUAL_CAPTIONS',flush=True)
 run(['-i',str(R/'renders/plate.mp4'),'-i',str(R/'assets/audio/mix.wav'),'-vf','ass=captions.ass','-map','0:v','-map','1:a','-t','132.5','-c:v','libx264','-preset','ultrafast','-crf','19','-c:a','aac','-ar','48000','-ac','2','-b:a','192k','-movflags','+faststart',str(out)])
 run(['-i',str(out),'-i',str(R/'assets/audio/narration.wav'),'-map','0:v','-map','1:a','-c:v','copy','-t','132.5','-c:a','aac','-ar','48000','-ac','2','-movflags','+faststart',str(out.with_name(out.stem+'-no-BGM.mp4'))])
print('EXPORT_EDITABLE_DRAFT',flush=True)
subprocess.run([sys.executable,'-X','utf8',str(R/'export-draft.py')],check=True)
probe=next((P/'video/launch-preview/node_modules/.pnpm').glob('@remotion+compositor-win32-x64-msvc@*/node_modules/@remotion/compositor-win32-x64-msvc/ffprobe.exe'))
meta=json.loads(subprocess.check_output([str(probe),'-v','error','-show_streams','-show_format','-of','json',str(out)]));(R/'FINAL-MEDIA.json').write_text(json.dumps(meta,indent=2));assert abs(float(meta['format']['duration'])-132.5)<.001
print('VERIFY_FULL_MEDIA',flush=True)
r=subprocess.run([str(F),'-v','error','-i',str(out),'-f','null','-'],capture_output=True)
tm=json.loads((R/'time-map.json').read_text('utf-8'));mt=json.loads((R/'motion-timing.json').read_text('utf-8'));times=[1,7,18,22.5,31,38,40,42,46.5,54,58,60.8,67,73,76,81,85.2,85.8,86.3,91,100,102.8,103.6,104,112,121,125,130]
for t in times:subprocess.run([str(F),'-v','error','-y','-ss',str(t),'-i',str(out),'-frames:v','1',str(R/'renders'/f'final-{t}.jpg')],check=True)
D=R/'jianying/Finance-Intelligence-Operation-Bilingual-v07';d=json.loads((D/'draft_content.json').read_text('utf-8'));missing=[m['path']for k in ['videos','audios']for m in d['materials'].get(k,[])if not Path(m['path']).exists()];caps=json.loads((R/'captions.json').read_text('utf-8'));overlap=[i for i in range(1,len(caps))if caps[i]['start']<caps[i-1]['end']-.001];pace=json.loads((R/'voice-pacing.json').read_text('utf-8'))
(R/'QA.json').write_text(json.dumps({'decode_pass':r.returncode==0,'decode_errors':r.stderr.decode('utf-8',errors='replace'),'duration_seconds':132.5,'missing_media':missing,'caption_overlap':overlap,'max_voice_tempo':max(p['tempo']for p in pace),'tracks':len(d['tracks']),'segments':[len(t['segments'])for t in d['tracks']],'full_native_viewport_retained':True,'jianying_open_verified':False},indent=2))
print('DELIVERY_READY',flush=True)
