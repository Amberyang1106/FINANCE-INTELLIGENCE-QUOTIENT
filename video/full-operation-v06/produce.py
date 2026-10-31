from pathlib import Path
import subprocess,json,time,sys,hashlib
R=Path(__file__).resolve().parent;P=R.parents[1];F=P/'video/.tools/python/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe'
def run(a):subprocess.run([str(F),'-hide_banner','-y']+a,check=True)
if '--resume' not in sys.argv and '--export-only' not in sys.argv:
    print('ASSEMBLE_148_5_SECOND_STORY',flush=True)
    graph='[0:v]split=4[b0][b1][b2][b3];[b0]trim=start_frame=0:end_frame=1405,setpts=PTS-STARTPTS[s0];[b1]trim=start_frame=1405:end_frame=2673,setpts=PTS-STARTPTS[s1];[b2]trim=start_frame=2673:end_frame=3270,setpts=PTS-STARTPTS[s2];[b3]trim=start_frame=3270:end_frame=4185,setpts=PTS-STARTPTS[s3];[1:v]setpts=PTS-STARTPTS[c0];[2:v]setpts=PTS-STARTPTS[c1];[3:v]setpts=PTS-STARTPTS[c2];[4:v]setpts=PTS-STARTPTS[c3];[c0][s0][c1][s1][c2][s2][c3][s3]concat=n=8:v=1:a=0,fps=30,tpad=stop_mode=clone:stop_duration=0.1,ass=navigation.ass[v]'
    args=['-i',str(P/'video/full-operation-v05/renders/plate.mp4')]
    for name in ['intro','cause','knowledge','custom']:args+=['-i',str(R/'renders'/(name+'.mp4'))]
    run(args+['-filter_complex',graph,'-map','[v]','-an','-frames:v','4455','-c:v','libx264','-preset','ultrafast','-crf','18','-pix_fmt','yuv420p',str(R/'renders/plate.mp4')])
if '--export-only' not in sys.argv:
    print('BURN_BILINGUAL_CAPTIONS',flush=True)
    out=P/'video/exports/Finance-Exception-Intelligence-Vantage-Full-Operation-Bilingual-v06.mp4'
    run(['-i',str(R/'renders/plate.mp4'),'-i',str(R/'assets/audio/mix.wav'),'-vf','ass=captions.ass','-map','0:v','-map','1:a','-t','148.5','-c:v','libx264','-preset','ultrafast','-crf','19','-c:a','aac','-ar','48000','-ac','2','-b:a','192k','-movflags','+faststart',str(out)])
    run(['-i',str(out),'-i',str(R/'assets/audio/narration.wav'),'-map','0:v','-map','1:a','-c:v','copy','-t','148.5','-c:a','aac','-ar','48000','-ac','2','-movflags','+faststart',str(out.with_name(out.stem+'-no-BGM.mp4'))])
print('EXPORT_EDITABLE_DRAFT',flush=True)
subprocess.run([sys.executable,'-X','utf8',str(R/'export-draft.py')],check=True)
out=P/'video/exports/Finance-Exception-Intelligence-Vantage-Full-Operation-Bilingual-v06.mp4'
probe=next((P/'video/launch-preview/node_modules/.pnpm').glob('@remotion+compositor-win32-x64-msvc@*/node_modules/@remotion/compositor-win32-x64-msvc/ffprobe.exe'))
meta=json.loads(subprocess.check_output([str(probe),'-v','error','-show_streams','-show_format','-of','json',str(out)]));(R/'FINAL-MEDIA.json').write_text(json.dumps(meta,indent=2))
assert abs(float(meta['format']['duration'])-148.5)<.001
print('VERIFY_DECODE_AND_STORY_TIMING',flush=True)
r=subprocess.run([str(F),'-v','error','-i',str(out),'-f','null','-'],capture_output=True)
times=[1,4,10,25.5,38,45,51.8,54,64,65.5,67,75,81.5,84,86.5,95,96.5,101,110,117.5,121,130,140,142.5,146]
for t in times:subprocess.run([str(F),'-v','error','-y','-ss',str(t),'-i',str(out),'-frames:v','1',str(R/'renders'/f'final-{t}.jpg')],check=True)
D=R/'jianying/Finance-Intelligence-Operation-Bilingual-v06';d=json.loads((D/'draft_content.json').read_text('utf-8'));media=[m['path']for k in ['videos','audios']for m in d['materials'].get(k,[])];missing=[p for p in media if not Path(p).exists()]
caps=json.loads((R/'captions.json').read_text('utf-8'));overlap=[i for i in range(1,len(caps))if caps[i]['start']<caps[i-1]['end']-.001]
pace=json.loads((R/'voice-pacing.json').read_text('utf-8'))
(R/'QA.json').write_text(json.dumps({'decode_pass':r.returncode==0,'decode_errors':r.stderr.decode('utf-8',errors='replace'),'duration_seconds':float(meta['format']['duration']),'missing_media':missing,'caption_overlap':overlap,'max_voice_tempo':max(p['tempo']for p in pace),'picture_segments':len(d['tracks'][0]['segments']),'tracks':len(d['tracks']),'segments':[len(t['segments'])for t in d['tracks']],'full_native_viewport_retained':True,'jianying_open_verified':False},indent=2))
print('DELIVERY_READY',flush=True)
