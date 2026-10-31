from pathlib import Path
import json,shutil,time,subprocess
R=Path(__file__).resolve().parent
while 'DRAFT_EXPORTED' not in (R/'draft-export.log').read_text('utf-8',errors='replace'):time.sleep(10)
D=R/'jianying/Finance-Intelligence-Bilingual-v03'
(D/'README.txt').write_text('Editable draft: native English and Chinese text, separate narration and music, 15 picture segments. Internal motion is baked into the video. Windows Jianying opening is not yet verified. Run relocate.py after moving this folder, then import/copy it to your configured Jianying draft directory. Keep a backup: saving in Jianying may upgrade/encrypt draft data.',encoding='utf-8')
(D/'relocate.py').write_text('from pathlib import Path\nimport json\nr=Path(__file__).resolve().parent\np=r/"draft_content.json"\nd=json.loads(p.read_text("utf-8"))\nfor kind in ("videos","audios"):\n for m in d["materials"].get(kind,[]):\n  m["path"]=str(r/"Resources"/Path(m["path"]).name)\np.write_text(json.dumps(d,ensure_ascii=False),encoding="utf-8")\n',encoding='utf-8')
shutil.make_archive(str(R/'Finance-Intelligence-Bilingual-v03-Jianying'),'zip',D.parent,D.name)
print('DRAFT_ZIP_COMPLETE',flush=True)
