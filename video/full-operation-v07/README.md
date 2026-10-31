# V07 · Product introduction and real operations

## v07 产品介绍与操作融合版（2026-10-31，当前交付）

直接更新V07，不另建V08。**134.5秒／4035帧，2560×1440、30fps**，135秒硬上限。开场“价值主张→五项能力→Monitor”，中段真实操作证明，结尾能力聚合。V07原操作底片作为可复用输入保存在full-operation-v07/inputs/；不新增独立发布版本。

| 时间 | 内容与主动作 |
|---|---|
|0–4|价值主张＋侧斜的真实Monitor界面|
|4–10|五项能力卡片聚合、扇形展开、Monitor转正进入完整界面|
|10–28|KPI总览→Freight红灯及建议→趋势图|
|28–73|独立分摊异常→Analysis提问→调查→凭证→因果→Scenario→报告|
|73–90|Proposal转任务→Assign→接收/进行中/完成反馈|
|90–105|Understand标题收拢→报表问答/引用/知识库|
|105–127.5|Customize标题收拢→Studio/阈值/趋势/真实拖拽/Market|
|127.5–134.5|真实页面围绕品牌聚合，稳定落定|

参考用户提供的48.23秒短片，借鉴其“价值主张＋真实界面”“一句功能总结→操作证明”“品牌聚合收尾”。沿用Vantage字体与色板；悬浮与侧斜仅用于产品概览，财务证据镜头保持完整正视视口，不遮挡数据。Gallery使用card-stack/default（真实页面替换卡面）与既有title-demote-to-label/A适配。

关键阅读段：凭证7.1秒、因果4秒、Scenario13.13秒、真实拖拽3.17秒，均保持原速；KPI、任务、问答和Studio适度压缩，具体速度由product-timeline.json源/目标帧推导。Freight与GA是独立案例；建议尚需财务审核，GA改善≠总GP增加，LE仍待核查；任务完成≠账务修正。

英文旁白，英文上/中文下字幕，Cipher背景音乐避让人声，另交付无BGM版；同一V07预览URL及文件名更新。原生界面占(200,12,2160,1215)，价值总结/导航在下方留白。双语字幕沿用用户认可的桌面展示字号EN42/ZH36；未按手机小窗的Shotcraft Q11大字阈值制作。

Preview: http://127.0.0.1:4187/video/full-operation-v07/watch.html

Source: PRODUCT-DESIGN-SPEC.md, product-timeline.json and captions.json. Run prepare-product.mjs to regenerate timeline/cues; see PLAN.md. Render opening/closing then run run-product.mjs. Optional recovery renderers render-product-opening.mjs and render-product-closing.mjs retry a single graphic.

Editable Jianying ZIP in this folder; media relocator included. Effects baked, cuts/captions/audio editable. Application opening not verified. Workbench uses the same baked picture plus editable subtitle/audio tracks; it is not a reconstruction of the internal programmatic effects.

Windows workbench adaptation: installed stock Video Shotcraft workbench dependencies; directory links in gen-index.mjs use Windows junctions, and parity renderer explicitly uses installed Chrome. Local-only skill-runtime adjustments, no product business-code changes.
Rebuild entry: node run-product.mjs (prepares timeline, waits for cards and narration, then mixes/assembles/exports in order).

Workbench: http://localhost:5198/?import=project . It imports20 picture cuts,70 editable captions and separate audio. Internal card effects remain baked into the picture. The preview has1s editing padding; exact export uses4035frames.

Archive restoration: inputs/knowledge.mp4 and inputs/custom.mp4 preserve the two chapter transitions required for V07 assembly, so rebuilding does not depend on ignored renders/. Run git lfs pull before reconstruction.
