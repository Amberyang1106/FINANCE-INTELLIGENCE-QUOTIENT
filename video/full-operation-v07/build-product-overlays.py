from pathlib import Path
import json
R=Path(__file__).resolve().parent
base=(R/'inputs/operation-navigation.ass').read_text('utf-8-sig').split('Dialogue:')[0]
caps=json.loads((R/'captions.json').read_text('utf-8'));tm=json.loads((R/'product-timeline.json').read_text('utf-8'))
def stamp(t):return f'{int(t//3600)}:{int(t//60)%60:02}:{t%60:05.2f}'
def line(a,b,txt,style='EN',layer=0):return f'Dialogue: {layer},{stamp(a)},{stamp(b)},{style},,0,0,0,,{txt}\n'
caption=base
for c in caps:
 caption+=line(c['start'],c['end'],c['en'])+line(c['start'],c['end'],c['zh'],'ZH')
(R/'captions.ass').write_text(caption,encoding='utf-8-sig')
nav=base;names=['Monitor','Investigate','Follow through','Understand','Customize'];xs=[420,850,1280,1710,2140]
stages=[(10,28,0),(28,73,1),(73,90,2),(91.5,105,3),(106.5,127.5,4)]
value=[(10,13.83,'Reporting health, at a glance'),(28,31.13,'From an alert to traceable evidence'),(73,78.13,'Proposals into accountable actions'),(91.5,96.5,'The logic behind the numbers'),(106.5,112.37,'Monitors built around your questions')]
scenario=next(c for c in caps if c['en'].startswith('GA improves'))
for a,b,text in value:nav+=line(a,b,r'{\an5\pos(1280,1263)\fs38\bord0\c&H004AF5C6&\fad(120,120)}'+text)
for a,b,active in stages:
 excluded=[(x,y)for x,y,_ in value if x>=a and x<b]
 if active==1:excluded.append((scenario['start'],scenario['end']))
 windows=[];s=a
 for x,y in sorted(excluded):
  if x>s:windows.append((s,x))
  s=y
 if s<b:windows.append((s,b))
 for x,y in windows:
  for i,n in enumerate(names):
   color='004AF5C6'if i==active else'0099A0A6';size=40 if i==active else 24
   nav+=line(x,y,rf'{{\an5\pos({xs[i]},1263)\fs{size}\bord0\c&H{color}&}}'+n)
qs=json.loads((R/'narration-cues.json').read_text('utf-8'));q=next(q for q in qs if q['text'].startswith('GA improves'));pace={q['id']:q for q in json.loads((R/'voice-pacing.json').read_text('utf-8'))};marks=json.loads((R/'assets/audio'/('voice'+q['id']+'-timing.json')).read_text('utf-8-sig'));first=marks[0]['Seconds'];rate=pace[q['id']]['tempo'];t1=q['start']+.08+(next(m['Seconds']for m in marks if m['Text'].lower().strip(';,.:')=='total')-first)/rate;t2=q['start']+.08+(next(m['Seconds']for m in marks if m['Text'].strip(';,.:')=='L')-first)/rate
for a,b,active in [(scenario['start'],t1,0),(t1,t2,1),(t2,scenario['end'],2)]:
 for i,n in enumerate(['GA improves','Total GP unchanged','LE review open']):
  color=('004AF5C6'if i==0 else'00F4F3ED'if i==1 else'00969FFF')if i<=active else'0099A0A6'
  nav+=line(a,b,rf'{{\an5\pos({[650,1280,1910][i]},1263)\fs32\bord0\c&H{color}&}}'+n)
nav+=line(72.6,73.4,r'{\an7\pos(0,0)\p1\bord0\shad0\c&H004AF5C6&\clip(850,1285,850,1290)\t(0,600,\clip(850,1285,1280,1290))\fad(0,180)}m 850 1286 l 1280 1286 l 1280 1288 l 850 1288',layer=1)
(R/'navigation.ass').write_text(nav,encoding='utf-8-sig');(R/'motion-timing.json').write_text(json.dumps({'scenario_onsets':[scenario['start'],t1,t2,scenario['end']],'values':value,'field_markers':'baked real-DOM-aligned V07 markers retained at original speed','handoff':[72.6,73.4]},indent=2));print('OVERLAYS_READY')
