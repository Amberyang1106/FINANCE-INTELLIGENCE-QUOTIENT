from pathlib import Path
import json
r=Path(__file__).resolve().parent
p=r/"draft_content.json"
d=json.loads(p.read_text("utf-8"))
for kind in ("videos","audios"):
 for m in d["materials"].get(kind,[]):
  m["path"]=str(r/"Resources"/Path(m["path"]).name)
p.write_text(json.dumps(d,ensure_ascii=False),encoding="utf-8")
