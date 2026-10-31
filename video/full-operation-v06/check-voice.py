import json,wave
from pathlib import Path
r=Path(__file__).resolve().parent
for q in json.loads((r/'narration-cues.json').read_text('utf-8')):
 with wave.open(str(r/'assets/audio'/('voice'+q['id']+'.wav')))as w:d=w.getnframes()/w.getframerate()
 tempo=max(1,d/max(.6,q['duration']-(.2 if q['duration']<2 else .4)))
 if tempo>1.4:print(q['id'],round(tempo,2),q['text'])
