from pathlib import Path
import json, wave, subprocess, re
ROOT=Path(__file__).resolve().parent
FF=ROOT.parents[0]/'.tools/python/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe'
shots=json.loads((ROOT/'shots.json').read_text('utf-8'))
audio=ROOT/'assets/audio'
args=[]; filters=[]; words=[]; actual=[]
for i,s in enumerate(shots):
    p=audio/f'voice{s["id"]}.wav'
    with wave.open(str(p)) as w: duration=w.getnframes()/w.getframerate()
    assert duration+.4<=s['duration'], (s['id'],duration,s['duration'])
    actual.append({'id':s['id'],'start':s['voiceStart'],'speechSeconds':duration,'shotSeconds':s['duration'],'fits':True})
    marks=json.loads((audio/f'voice{s["id"]}-timing.json').read_text('utf-8-sig'))
    spoken=s['text'].replace('GP','G P')
    for j,m in enumerate(marks):
        end=marks[j+1]['Seconds'] if j+1<len(marks) else duration
        next_index=marks[j+1]['Index'] if j+1<len(marks) else len(spoken)
        token=spoken[m['Index']:next_index].strip()
        words.append({'word':token,'start':s['voiceStart']+m['Seconds'],'end':s['voiceStart']+end,'shot':s['id']})
    args+=['-i',str(p)]
    filters.append(f'[{i}:a]aresample=48000,adelay={round(s["voiceStart"]*1000)}:all=1[a{i}]')
filters.append(''.join(f'[a{i}]' for i in range(len(shots)))+f'amix=inputs={len(shots)}:normalize=0,apad=whole_dur=170,atrim=duration=170,loudnorm=I=-17:TP=-2:LRA=7,aresample=48000[out]')
subprocess.run([str(FF),'-v','error','-y',*args,'-filter_complex',';'.join(filters),'-map','[out]','-ac','2','-c:a','pcm_s16le',str(audio/'narration.wav')],check=True)
# Keep the instrumental comfortably below dialogue, with a fast duck and a gentle release.
musicFilter='[0:a]aresample=48000,atrim=duration=170,loudnorm=I=-26:TP=-8:LRA=6,volume=0.48,afade=t=in:d=1.5,afade=t=out:st=165:d=5[bed];[1:a]asplit=2[sc][unused];[bed][sc]sidechaincompress=threshold=0.025:ratio=5:attack=20:release=600[duck];[unused]anullsink;[duck]aresample=48000[out]'
subprocess.run([str(FF),'-v','error','-y','-i',str(audio/'Cipher2.mp3'),'-i',str(audio/'narration.wav'),'-filter_complex',musicFilter,'-map','[out]','-ac','2','-c:a','pcm_s16le',str(audio/'music-ducked.wav')],check=True)
mix='[0:a][1:a]amix=inputs=2:normalize=0,loudnorm=I=-16:TP=-1.5:LRA=7,aresample=48000[out]'
subprocess.run([str(FF),'-v','error','-y','-i',str(audio/'narration.wav'),'-i',str(audio/'music-ducked.wav'),'-filter_complex',mix,'-map','[out]','-ac','2','-c:a','pcm_s16le',str(audio/'final-mix.wav')],check=True)
groups=[]
for s in shots:
    sw=[w for w in words if w['shot']==s['id']]
    group=[]
    for n,w in enumerate(sw):
        group.append(w)
        if len(group)>=8 or n==len(sw)-1 or (len(group)>=4 and re.search(r'[.!?;]$',w['word'])):
            text=' '.join(x['word'] for x in group).replace('G P','GP')
            groups.append({'text':text,'start':group[0]['start'],'end':min(group[-1]['end'],s['start']+s['duration']-.05)})
            group=[]
def stamp(t):
    ms=round(t*1000);h,ms=divmod(ms,3600000);m,ms=divmod(ms,60000);sec,ms=divmod(ms,1000)
    return f'{h:02}:{m:02}:{sec:02},{ms:03}'
(ROOT/'captions.json').write_text(json.dumps(groups,indent=2),encoding='utf-8')
(ROOT/'narration.srt').write_text('\n\n'.join(f'{i+1}\n{stamp(g["start"])} --> {stamp(g["end"])}\n{g["text"]}' for i,g in enumerate(groups))+'\n',encoding='utf-8')
(ROOT/'voice-timing.json').write_text(json.dumps({'engine':'Microsoft Zira Desktop / Offline synthetic English','rate':0,'shots':actual,'words':words},indent=2),encoding='utf-8')
print(json.dumps({'shots':len(actual),'allFit':True,'captions':len(groups),'duration':170}))
