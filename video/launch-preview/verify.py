from pathlib import Path
import subprocess,json,wave
import numpy as np
from PIL import Image,ImageDraw
ROOT=Path(__file__).resolve().parent
OUT=ROOT/'renders'/'Vantage-Launch-Preview-4K-EN-10s.mp4'
FF="C:/Users/yangtt16/OneDrive - Lenovo/小强创新/fpa-agent-demo/video/.tools/python/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe"
FP="C:/Users/yangtt16/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-8.1.2-full_build/bin/ffprobe.exe"
probe=json.loads(subprocess.check_output([FP,'-v','error','-show_format','-show_streams','-of','json',str(OUT)]))
v=next(s for s in probe['streams'] if s['codec_type']=='video');a=next(s for s in probe['streams'] if s['codec_type']=='audio')
assert (v['width'],v['height'])==(3840,2160),v
assert v['avg_frame_rate']=='60/1',v
assert int(v['nb_frames'])==600,v
assert abs(float(probe['format']['duration'])-10)<.025,probe['format']
assert a['codec_name']=='aac' and int(a['channels'])==2,a
result=subprocess.run([FF,'-v','error','-i',str(OUT),'-f','null','-'],capture_output=True,text=True)
assert result.returncode==0 and not result.stderr,result.stderr
print('Metadata and complete decode passed',flush=True)
qa=ROOT/'qa';qa.mkdir(exist_ok=True)
subprocess.run([FF,'-v','error','-y','-i',str(OUT),'-vn','-ac','1','-ar','48000','-c:a','pcm_s16le',str(qa/'decoded-audio.wav')],check=True)
with wave.open(str(qa/'decoded-audio.wav')) as w:sr=w.getframerate();samples=np.frombuffer(w.readframes(w.getnframes()),dtype=np.int16)/32768
rms=[]
for s,e in [(.35,2.2943),(3.05,4.9742),(5.45,7.7641),(7.85,9.9492)]:
 val=float(np.sqrt(np.mean(samples[int(s*sr):int(e*sr)]**2)));assert val>.008,val;rms.append(val)
print('English voice segments have non-zero audio energy',flush=True)
frames=[]
for i,t in enumerate([1.9,4.5,6.9,9.2]):
 p=qa/('final-'+str(t)+'.jpg');print('Inspect frame '+str(t),flush=True);subprocess.run([FF,'-v','error','-y','-ss',str(t),'-i',str(OUT),'-frames:v','1','-q:v','2',str(p)],check=True)
 im=Image.open(p);im.thumbnail((960,540));frames.append((t,im.copy()))
sheet=Image.new('RGB',(1920,1120),'#070f13');d=ImageDraw.Draw(sheet)
for i,(t,im) in enumerate(frames):x=i%2*960;y=i//2*560;sheet.paste(im,(x,y));d.text((x+12,y+542),str(t)+' s',fill='white')
sheet.save(qa/'final-contact.jpg',quality=95)
Image.open(qa/'final-4.5.jpg').save(ROOT/'renders'/'poster.jpg',quality=95)
report={'duration':float(probe['format']['duration']),'width':v['width'],'height':v['height'],'fps':v['avg_frame_rate'],'frames':int(v['nb_frames']),'videoCodec':v['codec_name'],'audioCodec':a['codec_name'],'audioChannels':a['channels'],'audioSampleRate':a['sample_rate'],'bytes':OUT.stat().st_size,'fullDecode':{'returncode':result.returncode,'errors':result.stderr},'voiceSegmentRms':rms,'language':'English','visualReviewTimes':[1.9,4.5,6.9,9.2]}
(qa/'final-result.json').write_text(json.dumps(report,indent=2));print(json.dumps(report),flush=True)
