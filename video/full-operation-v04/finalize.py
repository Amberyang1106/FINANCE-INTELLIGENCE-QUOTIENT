from pathlib import Path
import json,subprocess,wave,time
R=Path(__file__).resolve().parent
P=R.parents[1]
FF=P/'video/.tools/python/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe'
shots=json.loads((R/'narration-cues.json').read_text('utf-8'))
def run(args):subprocess.run([str(FF),'-hide_banner','-y']+args,check=True)
inputs=[]; filters=[]
for i,q in enumerate(shots):
 f=R/'assets/audio'/('voice'+q['id']+'.wav')
 with wave.open(str(f)) as w:d=w.getnframes()/w.getframerate()
 tempo=max(1,d/max(.6,q['duration']-(.2 if q['duration']<2 else .4)))
 inputs+=['-i',str(f)]
 filters.append(f'[{i}:a]atempo={tempo},adelay={int((q["start"]+.1)*1000)}:all=1[a{i}]')
filters.append(''.join(f'[a{i}]' for i in range(len(shots)))+f'amix=inputs={len(shots)}:normalize=0,apad,atrim=duration=139.5[n]')
run(inputs+['-filter_complex',';'.join(filters),'-map','[n]','-ar','48000',str(R/'assets/audio/narration.wav')])
run(['-i',str(R/'assets/audio/narration.wav'),'-stream_loop','-1','-i',str(P/'video/full-en-v02/assets/audio/Cipher2.mp3'),'-filter_complex','[1:a]volume=0.045,afade=t=in:d=1,afade=t=out:st=135.5:d=4[m];[0:a][m]amix=inputs=2:normalize=0,loudnorm=I=-16:TP=-2:LRA=7[a]','-map','[a]','-t','139.5',str(R/'assets/audio/mix.wav')])
def stamp(t):
 h=int(t//3600);m=int(t//60)%60;s=t%60
 return f'{h}:{m:02}:{s:05.2f}'
ass='[Script Info]\nScriptType: v4.00+\nPlayResX: 2560\nPlayResY: 1440\nWrapStyle: 0\n[V4+ Styles]\nFormat: Name,Fontname,Fontsize,PrimaryColour,SecondaryColour,OutlineColour,BackColour,Bold,Italic,Underline,StrikeOut,ScaleX,ScaleY,Spacing,Angle,BorderStyle,Outline,Shadow,Alignment,MarginL,MarginR,MarginV,Encoding\nStyle: EN,Arial,42,&H00FFFFFF,&H00FFFFFF,&H00100B07,&H80000000,0,0,0,0,100,100,0,0,1,3,0,2,160,160,106,1\nStyle: ZH,Microsoft YaHei,36,&H00CCDBDF,&H00FFFFFF,&H00100B07,&H80000000,0,0,0,0,100,100,0,0,1,3,0,2,160,160,35,1\n[Events]\nFormat: Layer,Start,End,Style,Name,MarginL,MarginR,MarginV,Effect,Text\n'
for q in shots:
 for style,key in [('EN','text'),('ZH','zh')]:ass+=f'Dialogue: 0,{stamp(q["start"])},{stamp(q["start"]+q["duration"])},{style},,0,0,0,,{q[key]}\n'
(R/'captions.ass').write_text(ass,encoding='utf-8-sig')
while not (R/'render.log').exists() or 'REMOTION_RENDER_COMPLETE' not in (R/'render.log').read_text('utf-8',errors='replace'):time.sleep(10)
out=P/'video/exports/Finance-Exception-Intelligence-Vantage-Full-Operation-Bilingual-v04.mp4'
run(['-i',str(R/'renders/plate.mp4'),'-i',str(R/'assets/audio/mix.wav'),'-vf','ass=captions.ass','-map','0:v','-map','1:a','-c:v','libx264','-preset','ultrafast','-crf','19','-c:a','aac','-b:a','192k','-ar','48000','-ac','2','-t','139.5','-movflags','+faststart',str(out)])
(R/'complete.json').write_text(json.dumps({'file':str(out),'seconds':139.5}))
