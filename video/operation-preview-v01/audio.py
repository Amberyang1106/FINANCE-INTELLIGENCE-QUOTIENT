import json,wave,subprocess,pathlib,numpy as np
root=pathlib.Path(__file__).parent
ff=root.parent/'.tools/python/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe'
shots=json.loads((root/'shots.json').read_text())
sr=48000
mix=np.zeros((30*sr,2),dtype=np.float32)
for s in shots:
 p=root/'assets/audio'/('voice'+s['id']+'.wav')
 raw=subprocess.check_output([str(ff),'-v','error','-i',str(p),'-af','loudnorm=I=-17:TP=-2:LRA=7','-ar',str(sr),'-ac','2','-f','f32le','-'])
 d=np.frombuffer(raw,dtype=np.float32).reshape(-1,2)
 start=round(s['start']*sr)
 assert start+len(d)<=len(mix),(s['id'],len(d)/sr)
 mix[start:start+len(d)]+=d
(root/'public/audio').mkdir(exist_ok=True)
def wavwrite(name,x):
 assert np.max(np.abs(x))<1,(name,np.max(np.abs(x)))
 with wave.open(str(root/'public/audio'/name),'wb') as w:
  w.setnchannels(2);w.setsampwidth(2);w.setframerate(sr);w.writeframes((x*32767).astype('<i2').tobytes())
wavwrite('narration.wav',mix)
raw=subprocess.check_output([str(ff),'-v','error','-ss','12','-i',str(root/'assets/audio/Cipher2.mp3'),'-t','30','-ar',str(sr),'-ac','2','-f','f32le','-'])
music=np.frombuffer(raw,dtype=np.float32).reshape(-1,2)[:len(mix)]
gain=np.ones(len(music),dtype=np.float32)*.055
gain[:sr]*=np.linspace(0,1,sr);gain[-sr*2:]*=np.linspace(1,0,sr*2)
wavwrite('music.wav',music*gain[:,None])
final=mix.copy();final[:len(music)]+=music*gain[:,None]
wavwrite('mix.wav',final)
(root/'audio-verification.json').write_text(json.dumps({'duration':30,'sampleRate':sr,'voice':'Microsoft Zira Desktop / synthetic','musicLinearGain':.055,'peak':float(np.max(np.abs(final))),'narrationOnlySameTimeline':True},indent=2))
print('AUDIO_COMPLETE')
