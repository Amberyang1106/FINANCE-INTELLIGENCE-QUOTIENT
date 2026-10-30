from pathlib import Path
import json,sys,subprocess,wave,re,shutil,math
from PIL import Image,ImageDraw,ImageFont
ROOT=Path(__file__).resolve().parents[1]
EDIT=ROOT/'edit'; CACHE=EDIT/'cache'; CACHE.mkdir(exist_ok=True)
sys.path.insert(0,str(ROOT/'.tools'/'python'))
import imageio_ffmpeg
FF=imageio_ffmpeg.get_ffmpeg_exe()
MAN=json.loads((EDIT/'manifest.json').read_text('utf-8'))
BG='#070f13'; INK='#edf3f4'; MUTED='#aab8c0'; RULE='#28383e'; LIME='#c6f54a'; RED='#ff9f96'
TRANS=.3
FONTS=ROOT/'.tools'/'fonts';FONTS.mkdir(exist_ok=True)
if not (FONTS/'msyh.ttc').exists():shutil.copyfile('C:/Windows/Fonts/msyh.ttc',FONTS/'msyh.ttc')
def font(size,latin=False,bold=False):
    return ImageFont.truetype(str(EDIT/'Geologica.ttf') if latin else ('C:/Windows/Fonts/msyhbd.ttc' if bold else 'C:/Windows/Fonts/msyh.ttc'),size)
def run(args,name):
    with (CACHE/(name+'.log')).open('w',encoding='utf-8') as log:
        result=subprocess.run([FF,'-hide_banner','-y',*args],cwd=EDIT,stdout=log,stderr=log)
    if result.returncode:raise RuntimeError(name+': '+(CACHE/(name+'.log')).read_text('utf-8')[-2500:])
def raw_info(name):return json.loads((ROOT/'raw'/name/'capture.json').read_text('utf-8'))
def raw_image(name,index=-1):
    info=raw_info(name);return Image.open(ROOT/'raw'/name/info['frames'][index]['file']).convert('RGB')
def fit(im,size):
    im=im.copy();im.thumbnail(size,Image.Resampling.LANCZOS);return im
def text(d,xy,s,size,fill=INK,latin=False,bold=False):d.text(xy,s,font=font(size,latin,bold),fill=fill)
def wrap(s,n=22):return [s[i:i+n] for i in range(0,len(s),n)]
def prepare_assets():
    logo=Image.open(ROOT.parent/'assets'/'lenovo-logo-red.png').convert('RGBA');logo.thumbnail((108,36),Image.Resampling.LANCZOS)
    for shot in MAN['shots']:
        plate=Image.new('RGBA',(1920,1080),(0,0,0,0));d=ImageDraw.Draw(plate)
        d.rectangle((0,0,1920,79),fill=BG);d.rectangle((0,984,1920,1080),fill=BG)
        plate.alpha_composite(logo,(54,22));text(d,(184,24),'FP&A Agent',30,latin=True)
        text(d,(640,20),shot['title'],34,bold=True)
        text(d,(1515,27),'Interactive prototype',21,MUTED,latin=True)
        text(d,(1810,27),shot['id']+'/14',20,LIME,latin=True)
        d.line((54,77,1866,77),fill=RULE,width=1);d.line((54,983,1866,983),fill=RULE,width=1)
        d.line((54,983,54+int(1812*shot['end']/170),983),fill=LIME,width=2)
        plate.save(EDIT/('header'+shot['id']+'.png'))
    for kind in ['intro','outro']:
        im=Image.new('RGB',(1920,1080),BG);d=ImageDraw.Draw(im)
        text(d,(105,180),'FP&A AGENT',24,LIME,latin=True)
        if kind=='intro':
            text(d,(100,252),'从财务信号',76,bold=True);text(d,(100,350),'到可追溯的行动',76,LIME,bold=True)
            text(d,(105,490),'From signals to actions',34,MUTED,latin=True)
            labels=['分摊调查','知识问答','自建监控','任务闭环']
            for i,label in enumerate(labels):
                y=625+i*62; text(d,(105,y),str(i+1).zfill(2),23,LIME,latin=True);text(d,(165,y-4),label,31)
            shot=fit(raw_image('S02',20),(890,520));im.paste(shot,(940,260));d.rectangle((939,259,940+shot.width,260+shot.height),outline=RULE,width=2)
            text(d,(946,806),'ROW / L0AUXG / 2026 Q3',24,MUTED,latin=True)
        else:
            text(d,(100,270),'让财务判断有据可循',65,bold=True);text(d,(100,360),'让后续行动可追溯',65,LIME,bold=True)
            text(d,(105,500),'Evidence. Decisions. Follow-through.',29,MUTED,latin=True)
            shot=fit(raw_image('S13'),(850,520));im.paste(shot,(975,230));d.rectangle((974,229,975+shot.width,230+shot.height),outline=RULE,width=2)
            text(d,(105,760),'交互原型 / 样例数据 / 模拟分析与任务回报',32,MUTED)
            text(d,(105,820),'No live ledger changes',30,LIME,latin=True)
        im.save(EDIT/(kind+'.png'))
    plate=Image.new('RGBA',(1920,1080),(0,0,0,0));d=ImageDraw.Draw(plate)
    text(d,(120,160),'GA / Month 3 gross profit',29,MUTED,latin=True)
    text(d,(120,245),'Original',25,MUTED,latin=True);text(d,(120,290),'-235,412.32',70,RED,latin=True)
    d.line((120,405,790,405),fill=RULE,width=1)
    text(d,(120,450),'Candidate',25,MUTED,latin=True);text(d,(120,500),'197,960.36',70,LIME,latin=True)
    text(d,(120,655),'仅调整 Revenue base',36,bold=True)
    text(d,(120,720),'前两个月已执行分摊保持不变',30,MUTED)
    text(d,(120,785),'总毛利不变 / LE 仍需复核',32,RED)
    text(d,(1025,945),'Actual scenario view / USD',22,MUTED,latin=True)
    plate.save(EDIT/'scenario-callouts.png')

def stamp(t,ass=False):
    if ass:
        z=round(t*100);return f'{z//360000}:{z//6000%60:02d}:{z//100%60:02d}.{z%100:02d}'
    z=round(t*1000);return f'{z//3600000:02d}:{z//60000%60:02d}:{z//1000%60:02d},{z%1000:03d}'
def captions_and_audio():
    cues=[];durations={}
    for shot in MAN['shots']:
        sid=shot['id'];wav=ROOT/'voice'/('S'+sid+'.wav')
        with wave.open(str(wav)) as w:duration=w.getnframes()/w.getframerate()
        durations[sid]=duration
        if duration+.2>shot['end']-shot['start']:raise ValueError('Voice exceeds scene '+sid)
        marks=json.loads((ROOT/'voice'/('S'+sid+'-timing.json')).read_text('utf-8-sig'))
        source=shot['voice']; clauses=list(re.finditer(r'[^，。；]+[，。；]?',source))
        for i,m in enumerate(clauses):
            if not m.group().strip():continue
            beginning=next((x['Seconds'] for x in marks if x['Index']>=m.start()),0)
            next_index=clauses[i+1].start() if i+1<len(clauses) else len(source)
            ending=next((x['Seconds'] for x in marks if x['Index']>=next_index),duration)
            shown=m.group().strip().replace('G A','GA').replace('L E','LE').rstrip('，。；')
            lines=wrap(shown,25)
            start=shot['start']+.2+beginning;end=min(shot['end']-.04,shot['start']+.2+ending)
            if end>start:cues.append({'start':start,'end':end,'text':'\n'.join(lines),'scene':sid})
    (ROOT/'captions'/'timings.json').write_text(json.dumps({'voiceDurations':durations,'cues':cues},ensure_ascii=False,indent=2),'utf-8')
    (ROOT/'captions'/'FPA-Agent-Vantage-zh-CN.srt').write_text('\n\n'.join(str(i+1)+'\n'+stamp(c['start'])+' --> '+stamp(c['end'])+'\n'+c['text'] for i,c in enumerate(cues))+'\n','utf-8-sig')
    ass='[Script Info]\nScriptType: v4.00+\nPlayResX: 1920\nPlayResY: 1080\nWrapStyle: 2\n\n[V4+ Styles]\nFormat: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding\nStyle: Default,Microsoft YaHei,36,&H00F4F6F7,&H00F4F6F7,&H00130F07,&H00130F07,0,0,0,0,100,100,0,0,1,1,0,2,90,90,22,1\n\n[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n'
    for c in cues:ass+='Dialogue: 0,'+stamp(c['start'],True)+','+stamp(c['end'],True)+',Default,,0,0,0,,'+c['text'].replace('\n',r'\N')+'\n'
    (ROOT/'captions'/'subtitles.ass').write_text(ass,'utf-8-sig')
    args=[];filters=[]
    for i,shot in enumerate(MAN['shots']):
        args+=['-i',str(ROOT/'voice'/('S'+shot['id']+'.wav'))]
        filters.append(f'[{i}:a]aresample=48000,adelay={round(shot["start"]*1000+200)}:all=1[a{i}]')
    filters.append(''.join(f'[a{i}]' for i in range(14))+'amix=inputs=14:duration=longest:normalize=0,apad=whole_dur=170,atrim=duration=170,loudnorm=I=-16:TP=-1.5:LRA=7,aresample=48000[out]')
    run(args+['-filter_complex',';'.join(filters),'-map','[out]','-ac','2','-c:a','pcm_s16le',str(ROOT/'voice'/'narration.wav')],'narration')
    return durations

PLANS={
'01':[('intro',8.3)],'02':[('S02',12.3)],'03':[('S03',6.3),('S03_result',6)],
'04':[('S04',8.3),('S04_check',7)],'05':[('S05_actions',3.3),('S05',10),('S05_total',7)],
'06':[('S06',9.3)],'07':[('S07_prompt',2.3),('S07',8),('S07_citation',5)],
'08':[('S08_files',3.3),('S08',7)],'09':[('S09_route',3.3),('S09',7),('S09_benchmark',5)],
'10':[('S10_curve',8.3),('S10_layout',4),('S10_market',4)],'11':[('S11_select',4.3),('S11',6)],
'12':[('S12_assigned',3.3),('S12_received',3),('S12_started',4),('S12_move',4)],
'13':[('S13',4.3),('S13_board',3)],'14':[('outro',7)]}

def encode_piece(name,duration,sid,n):
    out=CACHE/(sid+'_'+str(n)+'.mp4')
    if name in ['intro','outro']:
        frames=round(duration*30)
        run(['-loop','1','-i',str(EDIT/(name+'.png')),'-vf',f"zoompan=z='1+0.008*on/{frames}':x='(iw-iw/zoom)/2':y='(ih-ih/zoom)/2':d=1:s=1920x1080:fps=30",'-t',str(duration),'-an','-c:v','libx264','-threads','4','-preset','veryfast','-crf','18','-pix_fmt','yuv420p',str(out)],out.stem)
    else:
        info=raw_info(name);sequence=ROOT/'raw'/name/'frames.ffconcat'
        lines=['ffconcat version 1.0']
        for i,f in enumerate(info['frames']):
            end=info['frames'][i+1]['at'] if i+1<len(info['frames']) else info['duration']
            lines+= ["file '"+f['file']+"'",f'duration {max(.01,end-f["at"]):.6f}']
        lines+=["file '"+info['frames'][-1]['file']+"'"];sequence.write_text('\n'.join(lines)+'\n','utf-8')
        if name=='S05_total':
            vf="fps=30,scale=860:820:force_original_aspect_ratio=decrease:flags=lanczos,pad=1920:1080:1000:110:color=0x070f13"
        else:
            vf="fps=30,scale=1668:900:force_original_aspect_ratio=decrease:flags=lanczos,pad=1920:1080:(ow-iw)/2:80+(900-ih)/2:color=0x070f13"
        vf+=f',tpad=stop_mode=clone:stop_duration={duration}'
        args=['-f','concat','-safe','0','-i',str(sequence)]
        if name=='S05_total':
            args+=['-loop','1','-i',str(EDIT/'scenario-callouts.png'),'-filter_complex',f'[0:v]{vf}[v];[v][1:v]overlay=0:0:shortest=1[out]','-map','[out]']
        else:args+=['-vf',vf]
        run(args+['-t',str(duration),'-an','-c:v','libx264','-threads','4','-preset','veryfast','-crf','18','-pix_fmt','yuv420p',str(out)],out.stem)
    return out

def render_scene(sid,parts):
    outputs=[encode_piece(name,dur,sid,i) for i,(name,dur) in enumerate(parts)]
    listing=CACHE/('concat'+sid+'.txt');listing.write_text('\n'.join("file '"+p.name+"'" for p in outputs),'utf-8')
    joined=CACHE/('joined'+sid+'.mp4')
    run(['-f','concat','-safe','0','-i',str(listing),'-c','copy',str(joined)],'join'+sid)
    out=EDIT/('scene'+sid+'.mp4');dur=sum(x[1] for x in parts)
    run(['-i',str(joined),'-loop','1','-i',str(EDIT/('header'+sid+'.png')),'-filter_complex','[0:v][1:v]overlay=0:0:shortest=1[v]','-map','[v]','-t',str(dur),'-an','-c:v','libx264','-threads','4','-preset','veryfast','-crf','19','-pix_fmt','yuv420p',str(out)],'scene'+sid)
    print('SCENE '+sid+' ready: '+str(dur)+'s',flush=True)

def assemble():
    args=[]
    for sid in PLANS:args+=['-threads','1','-i',str(EDIT/('scene'+sid+'.mp4'))]
    filters=[f'[{i}:v]setsar=1,settb=AVTB,format=yuv420p[v{i}]' for i in range(14)];prev='v0'
    for i,shot in enumerate(MAN['shots'][1:],1):
        output='x'+str(i);filters.append(f'[{prev}][v{i}]xfade=transition=fade:duration=0.3:offset={shot["start"]}[{output}]');prev=output
    filters.append(f'[{prev}]ass=../captions/subtitles.ass:fontsdir=../.tools/fonts,format=yuv420p[out]')
    out=ROOT/'exports'/'FPA-Agent-Vantage-Overview-zh-CN-v01.mp4'
    run(args+['-i',str(ROOT/'voice'/'narration.wav'),'-filter_complex_threads','2','-filter_complex',';'.join(filters),'-map','[out]','-map','14:a','-t','170','-r','30','-c:v','libx264','-threads','4','-preset','veryfast','-crf','19','-c:a','aac','-b:a','192k','-movflags','+faststart',str(out)],'final')
    print('FINAL '+str(out),flush=True)

def main():
    prepare_assets();durations=captions_and_audio()
    (EDIT/'render-plan.json').write_text(json.dumps(PLANS,indent=2),'utf-8')
    if '--prepare' in sys.argv:return
    from concurrent.futures import ThreadPoolExecutor,as_completed
    with ThreadPoolExecutor(max_workers=2) as pool:
        futures=[pool.submit(render_scene,sid,parts) for sid,parts in PLANS.items()]
        for f in as_completed(futures):f.result()
    assemble()
if __name__=='__main__':main()
