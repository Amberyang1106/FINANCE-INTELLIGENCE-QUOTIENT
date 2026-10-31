from pathlib import Path
import json,math
R=Path(__file__).resolve().parent;P=R.parents[1];OLD=P/'video/full-operation-v06'
base=(OLD/'captions.ass').read_text('utf-8-sig').split('Dialogue:')[0].replace(',160,160,106,1',',160,160,100,1')
caps=json.loads((R/'captions.json').read_text('utf-8'));tm=json.loads((R/'time-map.json').read_text('utf-8'));qs=json.loads((R/'narration-cues.json').read_text('utf-8'));pace={p['id']:p for p in json.loads((R/'voice-pacing.json').read_text('utf-8'))}
def stamp(t):return f'{int(t//3600)}:{int(t//60)%60:02}:{t%60:05.2f}'
def line(a,b,text,layer=0):return f'Dialogue: {layer},{stamp(a)},{stamp(b)},EN,,0,0,0,,{text}\n'
caption=base
for q in caps:
 caption+=line(q['start'],q['end'],q['en'])
 caption+=f'Dialogue: 0,{stamp(q["start"])},{stamp(q["end"])},ZH,,0,0,0,,{q["zh"]}\n'
(R/'captions.ass').write_text(caption,encoding='utf-8-sig')
nav=base;names=['Monitor','Investigate','Follow through','Understand','Customize'];xs=[420,850,1280,1710,2140]
# chapter cards themselves render the moving active label; normal navigation starts on the native page.
stages=[(tm['chapters']['monitor'],tm['chapters']['investigate'],0),(tm['chapters']['investigate'],tm['chapters']['tasks'],1),(tm['chapters']['tasks'],tm['chapters']['understand'],2),(tm['chapters']['understand']+1.5,tm['chapters']['customize'],3),(tm['chapters']['customize']+1.5,tm['market'][1],4)]
scenario=next(q for q in qs if q['text'].startswith('GA improves'))
excerpt=next(q for q in qs if 'answer excerpt' in q['text'])
for a,b,active in stages:
 windows=[(a,b)]
 if active==1:windows=[(a,scenario['start']),(scenario['start']+scenario['duration'],b)]
 for x,y in windows:
  for i,name in enumerate(names):
   color='004AF5C6'if i==active else'0099A0A6';size=40 if i==active else 24
   nav+=line(x,y,f'{{\\an5\\pos({xs[i]},1263)\\fs{size}\\bord0\\c&H{color}&}}{name}')
# Find spoken onset of Total and L E, using speech progress relative to first word.
marks=json.loads((R/'assets/audio'/('voice'+scenario['id']+'-timing.json')).read_text('utf-8-sig'))
first=marks[0]['Seconds'];total=next((m['Seconds']for m in marks if m['Text'].lower().strip(';,.:')=='total'),first+.8);le=next((m['Seconds']for m in marks if m['Text'].strip(';,.:')=='L'),first+1.8)
rate=pace[scenario['id']]['tempo'];start=scenario['start'];end=start+scenario['duration'];t1=start+.08+max(0,total-first)/rate;t2=start+.08+max(0,le-first)/rate
for a,b,active in [(start,t1,0),(t1,t2,1),(t2,end,2)]:
 for i,name in enumerate(['GA improves','Total GP unchanged','LE review open']):
  color=('004AF5C6'if i==0 else'00F4F3ED'if i==1 else'00969FFF')if i<=active else'0099A0A6'
  nav+=line(a,b,f'{{\\an5\\pos({[650,1280,1910][i]},1263)\\fs32\\bord0\\c&H{color}&}}{name}')
# Small disclosure fits the unused margin, not the native UI.
nav+=line(excerpt['start'],excerpt['start']+excerpt['duration'],'{\\an7\\pos(2390,1115)\\fs18\\bord0\\c&H0099A0A6&}ANSWER\\NEXCERPT')
# One continuous footer handoff; no camera or business-data movement.
a=tm['chapters']['tasks']-.4;b=a+.8
nav+=line(a,b,'{\\an7\\pos(0,0)\\p1\\bord0\\shad0\\c&H004AF5C6&\\clip(850,1285,850,1290)\\t(0,600,\\clip(850,1285,1280,1290))\\fad(0,180)}m 850 1286 l 1280 1286 l 1280 1288 l 850 1288',1)
nav+=line(a,b,'{\\an5\\move(850,1287,1280,1287,0,600)\\fs12\\bord0\\c&H004AF5C6&\\fad(0,180)}●',2)
# Evidence corner markers, anchored to measured native DOM rectangles.
rects=json.loads((R/'voucher-fields.json').read_text('utf-8'));vs=tm['voucher'][0];ss=vs+1.3;se=vs+4.3
nav+=line(ss,se,'{\\an7\\move(826,210,826,660)\\p1\\bord0\\shad0\\c&H00B7A482&\\fad(100,150)}m 0 0 l 8 4 l 0 8',1)
field_times=[]
for key in ['amount','BPC segment','User info','Reference']:
 r=rects[key];x=round(200+r['x']*1.125-4);y=round(12+r['y']*1.125-4);w=round(r['width']*1.125+8);h=round(r['height']*1.125+8);at=ss+((y+h-4-210)/450)*3
 arm=16;d=f'm 0 {arm} l 0 0 l {arm} 0 l {arm} 2 l 2 2 l 2 {arm} m {w-arm} 0 l {w} 0 l {w} {arm} l {w-2} {arm} l {w-2} 2 l {w-arm} 2 m {w} {h-arm} l {w} {h} l {w-arm} {h} l {w-arm} {h-2} l {w-2} {h-2} l {w-2} {h-arm} m {arm} {h} l 0 {h} l 0 {h-arm} l 2 {h-arm} l 2 {h-2} l {arm} {h-2}'
 nav+=line(at,min(at+.7,tm['voucher'][1]),f'{{\\an7\\pos({x},{y})\\p1\\bord0\\shad0\\c&H00B7A482&\\fad(100,180)}}{d}',1);field_times.append({'field':key,'time':at,'rect':[x,y,w,h]})
(R/'navigation.ass').write_text(nav,encoding='utf-8-sig');(R/'motion-timing.json').write_text(json.dumps({'scenario_onsets':[start,t1,t2,end],'field_times':field_times,'handoff':[a,b]},indent=2))
print('OVERLAYS_READY',flush=True)
