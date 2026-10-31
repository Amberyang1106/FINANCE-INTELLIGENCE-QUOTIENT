from pathlib import Path
import sys,zipfile
R=Path(__file__).resolve().parent
with zipfile.ZipFile(next((R/'vendor-wheels').glob('pymediainfo*.whl'))) as z:z.extractall(R/'python-lib')
sys.path[:0]=[str(R/'python-lib'),str(R.parents[1]/'video/.tools/python')]
p=R/'python-lib/pyJianYingDraft/__init__.py'
s=p.read_text('utf-8').replace('if ISWIN:', 'if False:')
p.write_text(s,encoding='utf-8')
import pyJianYingDraft as d
print('DRAFT_IMPORT_OK')

import inspect
for x in [d.TextSegment,d.TextStyle,d.ClipSettings,d.DraftFolder.create_draft,d.ScriptFile.append_track]:print(x,inspect.signature(x))
