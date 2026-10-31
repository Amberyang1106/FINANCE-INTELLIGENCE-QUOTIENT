from pathlib import Path
import subprocess, json, time, sys
ROOT=Path(__file__).resolve().parent
PROJECT=ROOT.parents[1]
FF=PROJECT/'video/.tools/python/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe'
PROBE=next((PROJECT/'video/launch-preview/node_modules/.pnpm').glob('@remotion+compositor-win32-x64-msvc@*/node_modules/@remotion/compositor-win32-x64-msvc/ffprobe.exe'))
def probe(p):
    return json.loads(subprocess.check_output([str(PROBE),'-v','error','-show_streams','-show_format','-of','json',str(p)],text=True,encoding='utf-8'))
print('WAITING_FOR_REMOTION_AND_HYPERFRAMES',flush=True)
while True:
    log=(ROOT/'remotion-render.log').read_text('utf-8',errors='replace')
    if 'REMOTION_RENDER_COMPLETE' in log and (ROOT/'hyperframes-render-complete.json').exists(): break
    if 'Error:' in log or 'error: failure' in log.lower(): raise RuntimeError('Remotion failed; inspect render log')
    h=(ROOT/'hyperframes-render.log').read_text('utf-8',errors='replace') if (ROOT/'hyperframes-render.log').exists() else ''
    if 'Error: HyperFrames exit' in h: raise RuntimeError('HyperFrames failed; inspect render log')
    time.sleep(10)
picture=ROOT/'renders/product-4k60.mp4';band=ROOT/'renders/captions-mix.mp4'
v=next(s for s in probe(picture)['streams'] if s['codec_type']=='video')
b=next(s for s in probe(band)['streams'] if s['codec_type']=='video')
assert (v['width'],v['height'])==(3840,2160)
assert (b['width'],b['height'])==(3840,300)
out=PROJECT/'video/exports/Finance-Exception-Intelligence-Vantage-Overview-en-US-v02.mp4'
out.parent.mkdir(exist_ok=True)
print('COMPOSITING_NATIVE_4K_PICTURE_AND_HYPERFRAMES_CAPTIONS_AUDIO',flush=True)
args=[str(FF),'-hide_banner','-y','-i',str(picture),'-i',str(band),'-filter_complex','[0:v]ass=filename=captions.ass:fontsdir=assets/fonts[v];[1:a]loudnorm=I=-16:TP=-1.5:LRA=7,aresample=48000[a]','-map','[v]','-map','[a]','-c:v','libx264','-preset','ultrafast','-crf','18','-pix_fmt','yuv420p','-c:a','aac','-b:a','256k','-t','170','-movflags','+faststart','-metadata','title=FINANCE EXCEPTION INTELLIGENCE / Finance Workspace','-metadata','comment=Sample-data prototype. Synthetic English narration. Simulated AI and task feedback. Music: Cipher by Kevin MacLeod (incompetech.com), CC BY 4.0, edited and mixed.',str(out)]
subprocess.run(args,check=True)
subprocess.run([sys.executable,str(ROOT/'verify.py'),str(out)],check=True)
print('CHECKING_COMPLETE_DECODE',flush=True)
subprocess.run([str(FF),'-v','error','-i',str(out),'-f','null','-'],check=True)
measurement=subprocess.run([str(FF),'-hide_banner','-i',str(out),'-af','loudnorm=I=-16:TP=-1.5:LRA=7:print_format=json','-f','null','-'],capture_output=True,text=True,encoding='utf-8',check=True)
(ROOT/'encoded-loudness.log').write_text(measurement.stderr,encoding='utf-8')
for t in [3,13.2,25,37,50,66,81,91,103,112,123,133,144,158.5,161,165]:
    subprocess.run([str(FF),'-v','error','-y','-ss',str(t),'-i',str(out),'-frames:v','1','-q:v','2',str(ROOT/f'renders/final-{t}.jpg')],check=True)
(ROOT/'delivery-complete.json').write_text(json.dumps({'complete':True,'output':str(out),'fullDecodePassed':True,'mediaVerified':True},indent=2),encoding='utf-8')
print('FINAL_FILM_COMPLETE',flush=True)
