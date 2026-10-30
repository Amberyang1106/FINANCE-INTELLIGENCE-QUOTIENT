from pathlib import Path
import json,wave,subprocess,math
import numpy as np
ROOT=Path(__file__).resolve().parent
FF="C:/Users/yangtt16/OneDrive - Lenovo/小强创新/fpa-agent-demo/video/.tools/python/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe"
shots=json.loads((ROOT/'voice.json').read_text())
transcript=[];args=[];filters=[]
for i,s in enumerate(shots):
 p=ROOT/'public'/('voice'+s['id']+'.wav')
 with wave.open(str(p)) as w:dur=w.getnframes()/w.getframerate()
 print(s['id'],dur,flush=True)
 assert s['start']+dur<=10.001,(s['id'],dur)
 marks=json.loads((ROOT/'public'/('voice'+s['id']+'-timing.json')).read_text('utf-8-sig'))
 for j,m in enumerate(marks):
  end=marks[j+1]['Seconds'] if j+1<len(marks) else dur
  transcript.append({'word':m['Text'],'start':s['start']+m['Seconds'],'end':s['start']+end})
 args+=['-i',str(p)];filters.append(f'[{i}:a]aresample=48000,adelay={round(s["start"]*1000)}:all=1[a{i}]')
filters.append(''.join(f'[a{i}]' for i in range(4))+'amix=inputs=4:normalize=0,apad=whole_dur=10,atrim=duration=10,loudnorm=I=-17:TP=-2:LRA=7,aresample=48000[out]')
subprocess.run([FF,'-v','error','-y',*args,'-filter_complex',';'.join(filters),'-map','[out]','-ac','2','-c:a','pcm_s16le',str(ROOT/'public'/'narration.wav')],check=True)
(ROOT/'transcript.json').write_text(json.dumps({'engine':'Windows offline Microsoft Zira Desktop','words':transcript},indent=2))
sr=48000;y=np.zeros(sr*10);rng=np.random.default_rng(24)
for at in [0,.5,1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9]:
 n=int(.14*sr);t=np.arange(n)/sr;freq=1046 if (at*2)%2==0 else 784
 sig=.045*np.sin(2*np.pi*freq*t)*np.exp(-t*55)+.018*rng.normal(size=n)*np.exp(-t*95)
 st=int(at*sr);y[st:st+n]+=sig
for at in [0,3,5.5,8]:
 n=int(.6*sr);t=np.arange(n)/sr;env=np.sin(np.pi*np.arange(n)/n)**3
 sig=.04*rng.normal(size=n)*env;sig=np.convolve(sig,np.ones(20)/20,'same')
 st=int(at*sr);y[st:st+n]+=sig
for at in [0,3,5.5,8]:
 n=min(int(1.7*sr),len(y)-int(at*sr));t=np.arange(n)/sr
 tone=sum(np.sin(2*np.pi*freq*t)*np.exp(-t*3) for freq in [130.81,196,261.63])*.021
 st=int(at*sr);y[st:st+n]+=tone
stereo=np.column_stack([y,y]);pcm=np.int16(np.clip(stereo,-.9,.9)*32767)
with wave.open(str(ROOT/'public'/'sound-design.wav'),'wb') as w:w.setnchannels(2);w.setsampwidth(2);w.setframerate(sr);w.writeframes(pcm.tobytes())
print('ENGLISH AUDIO READY',flush=True)
