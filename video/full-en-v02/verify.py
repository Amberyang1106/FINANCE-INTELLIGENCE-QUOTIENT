from pathlib import Path
import json, hashlib, subprocess, sys
ROOT=Path(__file__).resolve().parent
shots=json.loads((ROOT/'shots.json').read_text('utf-8'))
timing=json.loads((ROOT/'voice-timing.json').read_text('utf-8'))
data=json.loads((ROOT/'public/data.json').read_text('utf-8'))
captions=json.loads((ROOT/'captions.json').read_text('utf-8'))
assert len(shots)==15 and sum(s['duration'] for s in shots)==170
assert all(s['start']==sum(p['duration'] for p in shots[:i]) for i,s in enumerate(shots))
assert all(s['start']+.4<=s['start']+s['duration'] for s in shots)
assert all(t['speechSeconds']+.4<=t['shotSeconds'] for t in timing['shots'])
assert abs(sum(data['gp']['values'])-224711.76)<.001
assert sum(round(s['values'][-1]*100) for s in data['trend']['series'])==280889700
assert data['overview'][-1]['revenueCents']==280889700
assert data['overview'][-1]['costCents']==258418524
assert data['overview'][-1]['creditCents']==0
assert all(w['start']<=w['end']<=170 for w in timing['words'])
assert all(c['start']<c['end']<=170 for c in captions)
assert all(captions[i]['end']<=captions[i+1]['start']+.001 for i in range(len(captions)-1))
source=(ROOT/'src/index.tsx').read_text('utf-8')
for value in ['5900018271','5900018392','yangtt16','−235,412.32','−1,075,406.28','−727,638.08','Months 1–2','No ledger change','FINANCE EXCEPTION INTELLIGENCE']:
    assert value in source,value
assert 'FP&A Agent' not in source and 'Service Finance Workspace' not in source
result={'sourceChecks':True,'shots':15,'seconds':170,'captions':len(captions),'voiceFits':True,'quarterReconciliation':True,'scope':'Model, timing and authored copy. Visual review and final encoded-media checks are separate.'}
if len(sys.argv)>1:
    media=Path(sys.argv[1]);project=ROOT.parents[1]
    probe=next((project/'video/launch-preview/node_modules/.pnpm').glob('@remotion+compositor-win32-x64-msvc@*/node_modules/@remotion/compositor-win32-x64-msvc/ffprobe.exe'))
    p=subprocess.run([str(probe),'-v','error','-show_format','-show_streams','-of','json',str(media)],capture_output=True,text=True,encoding='utf-8',check=True)
    info=json.loads(p.stdout);v=next(s for s in info['streams'] if s['codec_type']=='video');a=next(s for s in info['streams'] if s['codec_type']=='audio')
    assert (v['width'],v['height'])==(3840,2160)
    assert v['codec_name']=='h264' and a['codec_name']=='aac'
    assert v['r_frame_rate']=='60/1'
    assert 169.9<=float(info['format']['duration'])<180
    result['media']={'file':media.name,'bytes':media.stat().st_size,'sha256':hashlib.sha256(media.read_bytes()).hexdigest(),'width':3840,'height':2160,'fps':60,'seconds':float(info['format']['duration']),'videoCodec':v['codec_name'],'audioCodec':a['codec_name'],'channels':a['channels']}
    (ROOT/'final-media-probe.json').write_text(json.dumps(info,indent=2),encoding='utf-8')
(ROOT/'verification.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
print(json.dumps(result))
