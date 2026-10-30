import render_video as r
from concurrent.futures import ThreadPoolExecutor
r.prepare_assets()
with ThreadPoolExecutor(max_workers=2) as pool:
    list(pool.map(lambda sid:r.render_scene(sid,r.PLANS[sid]),['04','05','09','10','13','14']))
r.assemble()
