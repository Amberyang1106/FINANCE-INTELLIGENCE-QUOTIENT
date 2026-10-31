from pathlib import Path
import subprocess
R=Path(__file__).resolve().parent;P=R.parents[1];F=P/'video/.tools/python/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe'
subprocess.run([str(F),'-v','error','-y','-i',str(R/'assets/audio/narration.wav'),'-i',str(P/'video/full-en-v02/assets/audio/Cipher2.mp3'),'-filter_complex','[0:a]aformat=channel_layouts=stereo[key];[1:a]aresample=48000,volume=0.07,afade=t=in:d=1.2,afade=t=out:st=130.5:d=4[m];[m][key]sidechaincompress=threshold=0.02:ratio=6:attack=30:release=300,apad,atrim=duration=134.5[a]','-map','[a]','-t','134.5','-ar','48000','-ac','2',str(R/'assets/audio/music-ducked.wav')],check=True)
print('MUSIC_STEM_READY',flush=True)
