from pathlib import Path
import subprocess,json,time,shutil
R=Path(__file__).resolve().parent
P=R.parents[1]
FF=P/'video/.tools/python/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe'
while 'REMOTION_RENDER_COMPLETE' not in (R/'render.log').read_text('utf-8',errors='replace'):time.sleep(10)
while not (R/'complete.json').exists():time.sleep(3)
def run(a):subprocess.run([str(FF),'-hide_banner','-y']+a,check=True)
run(['-i',str(R/'renders/plate.mp4'),'-vf','ass=cursor.ass','-an','-c:v','libx264','-preset','ultrafast','-crf','19',str(R/'renders/editable-plate.mp4')])
out=P/'video/exports/Finance-Exception-Intelligence-Vantage-Full-Bilingual-v03.mp4'
run(['-i',str(R/'renders/editable-plate.mp4'),'-i',str(R/'assets/audio/mix.wav'),'-vf','ass=captions.ass','-map','0:v','-map','1:a','-c:v','libx264','-preset','ultrafast','-crf','19','-c:a','aac','-ar','48000','-ac','2','-b:a','192k','-t','138','-movflags','+faststart',str(out)])
run(['-i',str(out),'-i',str(R/'assets/audio/narration.wav'),'-map','0:v','-map','1:a','-c:v','copy','-af','loudnorm=I=-16:TP=-2:LRA=7','-c:a','aac','-ar','48000','-ac','2','-t','138','-movflags','+faststart',str(out.with_name(out.stem+'-no-BGM.mp4'))])
while 'DRAFT_EXPORTED' not in (R/'draft-export.log').read_text('utf-8',errors='replace'):time.sleep(5)
D=R/'jianying/Finance-Intelligence-Bilingual-v03'
shutil.copy2(R/'renders/editable-plate.mp4',D/'Resources/plate.mp4')
shutil.make_archive(str(R/'Finance-Intelligence-Bilingual-v03-Jianying'),'zip',D.parent,D.name)
probe=next((P/'video/launch-preview/node_modules/.pnpm').glob('@remotion+compositor-win32-x64-msvc@*/node_modules/@remotion/compositor-win32-x64-msvc/ffprobe.exe'))
meta=json.loads(subprocess.check_output([str(probe),'-v','error','-show_streams','-show_format','-of','json',str(out)]))
(R/'FINAL-MEDIA.json').write_text(json.dumps(meta,indent=2))
print('FINAL_DELIVERY_READY',flush=True)
