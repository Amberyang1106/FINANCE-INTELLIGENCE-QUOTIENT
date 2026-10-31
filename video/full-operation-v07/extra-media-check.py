from pathlib import Path
import subprocess,json
R=Path(__file__).resolve().parent;P=R.parents[1];F=P/'video/.tools/python/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe';out=P/'video/exports/Finance-Exception-Intelligence-Vantage-Full-Operation-Bilingual-v07.mp4';hashes=[]
for p in [out,out.with_name(out.stem+'-no-BGM.mp4')]:
 x=subprocess.run([str(F),'-v','error','-i',str(p),'-map','0:v','-c','copy','-f','hash','-'],capture_output=True,check=True);hashes.append(x.stdout.decode().strip())
loud=subprocess.run([str(F),'-hide_banner','-i',str(out),'-vn','-af','loudnorm=I=-16:TP=-2:LRA=7:print_format=json','-f','null','-'],capture_output=True,check=True).stderr.decode(errors='replace');a=loud.rfind('{');b=loud.rfind('}')+1;report={'same_picture_BGM_noBGM':hashes[0]==hashes[1],'video_stream_hashes':hashes,'loudness_measurement':json.loads(loud[a:b]),'subjective_listening_verified':False};(R/'AUDIO-PICTURE-CHECK.json').write_text(json.dumps(report,indent=2));print('AUDIO_PICTURE_CHECK_READY')
