from pathlib import Path
import json,wave,subprocess,time
R=Path(__file__).resolve().parent;P=R.parents[1];FF=P/'video/.tools/python/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe'
qs=json.loads((R/'narration-cues.json').read_text('utf-8'));trim=R/'assets/trim';trim.mkdir(exist_ok=True)
def run(a):subprocess.run([str(FF),'-v','error','-y']+a,check=True)
inputs=[];filters=[];report=[]
for i,q in enumerate(qs):
 src=R/'assets/audio'/('voice'+q['id']+'.wav');dst=trim/src.name
 run(['-i',str(src),'-af','silenceremove=start_periods=1:start_duration=0.01:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_duration=0.01:start_threshold=-50dB,areverse','-c:a','pcm_s16le','-ar','16000','-ac','1',str(dst)])
 with wave.open(str(dst))as w:dur=w.getnframes()/w.getframerate()
 tempo=max(1,dur/max(.45,q['duration']-.2));report.append({'id':q['id'],'duration':dur,'window':q['duration'],'tempo':tempo,'text':q['text']})
 inputs+=['-i',str(dst)];filters.append(f'[{i}:a]atempo={tempo},adelay={round((q["start"]+.08)*1000)}:all=1[a{i}]')
(R/'voice-pacing.json').write_text(json.dumps(report,indent=2))
filters.append(''.join(f'[a{i}]' for i in range(len(qs)))+f'amix=inputs={len(qs)}:normalize=0,apad,atrim=duration=148.5,loudnorm=I=-16:TP=-2:LRA=7,aresample=48000[n]')
run(inputs+['-filter_complex',';'.join(filters),'-map','[n]','-ac','2',str(R/'assets/audio/narration.wav')])
run(['-i',str(R/'assets/audio/narration.wav'),'-stream_loop','-1','-i',str(P/'video/full-en-v02/assets/audio/Cipher2.mp3'),'-filter_complex','[0:a]aformat=channel_layouts=stereo,asplit=2[v][key];[1:a]aresample=48000,volume=0.07,afade=t=in:d=1.2,afade=t=out:st=144.5:d=4[m];[m][key]sidechaincompress=threshold=0.02:ratio=6:attack=30:release=300[duck];[v][duck]amix=inputs=2:normalize=0,loudnorm=I=-16:TP=-2:LRA=7,aresample=48000[a]','-map','[a]','-t','148.5','-ac','2',str(R/'assets/audio/mix.wav')])
print('AUDIO_READY',flush=True)
