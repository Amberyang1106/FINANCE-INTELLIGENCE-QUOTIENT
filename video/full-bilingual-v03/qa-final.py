from pathlib import Path
import subprocess,json,time
R=Path(__file__).resolve().parent
P=R.parents[1]
while 'FINAL_DELIVERY_READY' not in (R/'finish-delivery.log').read_text('utf-8',errors='replace'):time.sleep(5)
FF=P/'video/.tools/python/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe'
f=P/'video/exports/Finance-Exception-Intelligence-Vantage-Full-Bilingual-v03.mp4'
r=subprocess.run([str(FF),'-v','error','-i',str(f),'-f','null','-'],capture_output=True)
for t in [8,9.8,17,26,28,30,65,104,133]:subprocess.run([str(FF),'-v','error','-y','-ss',str(t),'-i',str(f),'-frames:v','1',str(R/'renders'/f'final-{t}.jpg')],check=True)
d=json.loads((R/'jianying/Finance-Intelligence-Bilingual-v03/draft_content.json').read_text('utf-8'))
missing=[m['path'] for kind in ['videos','audios'] for m in d['materials'].get(kind,[]) if not Path(m['path']).exists()]
result={'full_decode_pass':r.returncode==0,'decode_errors':r.stderr.decode('utf-8',errors='replace'),'draft_tracks':len(d['tracks']),'draft_segments':[len(t['segments']) for t in d['tracks']],'missing_media':missing,'jianying_application_open_verified':False}
(R/'QA.json').write_text(json.dumps(result,indent=2))
print('QA_COMPLETE',flush=True)
