from pathlib import Path
import subprocess,json,time,hashlib
R=Path(__file__).resolve().parent;P=R.parents[1]
FF=P/'video/.tools/python/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe'
PROBE=next((P/'video/launch-preview/node_modules/.pnpm').glob('@remotion+compositor-win32-x64-msvc@*/node_modules/@remotion/compositor-win32-x64-msvc/ffprobe.exe'))
def run(args): return subprocess.run([str(FF),'-hide_banner','-y',*map(str,args)],check=True,capture_output=True,text=True,encoding='utf-8')
def probe(p):return json.loads(subprocess.check_output([str(PROBE),'-v','error','-show_streams','-show_format','-of','json',str(p)],text=True,encoding='utf-8'))
print('WAITING_FOR_RENDER',flush=True)
for n in range(180):
 log=(R/'render.log').read_text('utf-8',errors='replace')
 if 'REMOTION_RENDER_COMPLETE' in log:break
 if 'Error:' in log:raise RuntimeError(log[-4000:])
 time.sleep(5)
else:raise TimeoutError('Render not finished in 15 minutes')
base='Finance-Exception-Intelligence-Vantage-Operation-Pilot-EN-2K-30s-v01'
results=[]
for suffix,audio in [('', 'mix.wav'),('-no-BGM','narration.wav')]:
 out=P/'video/exports'/(base+suffix+'.mp4')
 print('ENCODING '+out.name,flush=True)
 run(['-i',R/'renders/visual-2k.mp4','-i',R/'public/audio'/audio,'-map','0:v:0','-map','1:a:0','-c:v','copy','-af','loudnorm=I=-16:TP=-1.5:LRA=7','-c:a','aac','-b:a','192k','-ar','48000','-t','30','-movflags','+faststart','-metadata','title=Finance Exception Intelligence / 30-second operation pilot','-metadata','comment=Frozen sample data. Synthetic English narration. Music: Cipher by Kevin MacLeod, incompetech.com, CC BY 4.0; edited and mixed.',out])
 info=probe(out);v=next(x for x in info['streams'] if x['codec_type']=='video');a=next(x for x in info['streams'] if x['codec_type']=='audio')
 assert (v['width'],v['height'])==(2560,1440)
 assert v['r_frame_rate']=='30/1' and int(v['nb_frames'])==900
 assert abs(float(info['format']['duration'])-30)<.05
 run(['-v','error','-i',out,'-f','null','-'])
 m=run(['-i',out,'-af','loudnorm=I=-16:TP=-1.5:LRA=7:print_format=json','-f','null','-'])
 (R/('loudness'+suffix+'.log')).write_text(m.stderr,encoding='utf-8')
 vh=run(['-v','error','-i',out,'-map','0:v:0','-c','copy','-f','hash','-hash','sha256','-']).stdout.strip()
 results.append({'file':str(out),'bytes':out.stat().st_size,'sha256':hashlib.sha256(out.read_bytes()).hexdigest(),'videoStreamHash':vh,'width':v['width'],'height':v['height'],'frames':int(v['nb_frames']),'fps':v['r_frame_rate'],'duration':float(info['format']['duration']),'videoCodec':v['codec_name'],'audioCodec':a['codec_name'],'fullDecodePassed':True})
 if not suffix:
  for t in [0,2.8,3.9,5.8,7.3,8.8,11.7,12.7,14.6,17,19.1,20.5,21.3,22.6,24,25.3,27.5,29.5]:run(['-ss',t,'-i',out,'-frames:v','1','-q:v','2',R/('renders/final-'+str(t)+'.jpg')])
assert results[0]['videoStreamHash']==results[1]['videoStreamHash']
baseline=json.loads((R/'baseline.json').read_text())
assert hashlib.sha256((P/'video/exports/Finance-Exception-Intelligence-Vantage-Overview-en-US-v02.mp4').read_bytes()).hexdigest()==baseline['fullFilmSha256']
assert hashlib.sha256((P/'app.js').read_bytes()).hexdigest()==baseline['applicationSha256']
report={'complete':True,'outputs':results,'sameVideoStreamBothVersions':True,'fullFilmUnchanged':True,'applicationUnchanged':True}
(R/'FINAL-QA.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print('PILOT_COMPLETE',flush=True)
