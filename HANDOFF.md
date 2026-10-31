# 项目交接 · FINANCE EXCEPTION INTELLIGENCE

## 2026-10-31 Vantage 视频归档更新

当前继续开发分支仍为 feature/vantage-ui，独立保留，不合并 main。最新成片为原 V07 工程内更新的“产品介绍＋真实操作”融合版，134.5秒、2560×1440/30fps，英文旁白、中英双语字幕，带背景音乐与无背景音乐两版。入口：video/full-operation-v07/README.md、watch.html；正式成片位于video/exports/，名称含Full-Operation-Bilingual-v07。可编辑剪映ZIP与结构验收材料在同工程下；剪映应用内实际打开尚未验证。

同步存档此前未提交的Freight总览、KPI图表修复、故事线、视频脚本/指南、V02–V07素材和交付结果。MP4/WAV/MP3/ZIP使用Git LFS；新机器需安装Git LFS并运行git lfs pull恢复大文件。node_modules、python-lib、video/.tools、临时trim音频及已有忽略规则内的渲染缓存不入库，按工程文档安装/重建。浏览器localStorage状态和本机全局skill安装不是仓库内容。

新版V07保留完整证据视口：Freight与分摊异常为独立案例，GA改善、总GP不变、LE待核查；任务反馈不代表账务已修正。产品与视频的具体验收限制见video/full-operation-v07/REVIEW.md。以下原交接记录保留为历史状态。

更新：2026-10-30。面向后续开发者、财务业务负责人及视频制作人员。

## 当前交付状态

最新工作在 feature/vantage-ui，深色 Vantage 风格，品牌为 FINANCE EXCEPTION INTELLIGENCE / Finance Workspace。此次将此前未提交的品牌、KPI 页面、图表修复、视频资料与交接文档一并归档。使用 Git 标签 archive/vantage-2026-10-30-handoff 获取此次快照的准确提交，不要把 main 视为最新界面。

main 停留在 3071b6df494298594eed4674c59a4b88bd80bb30。此次不合并、不重写其他分支历史。所有本地分支均推送至同名远程分支。

| 分支 | 用途 / 归档前位置 |
| --- | --- |
| main | 原版与 Task To-do / 3071b6d |
| feature/vantage-ui | 独立 Vantage 版本，当前继续开发入口；归档前 b5541d4 |
| feature/proposal-task-board | Task To-do 与内置 Sample / 3071b6d |
| feature/custom-monitor-workspace | 新布局、Studio、Market / c082232 |
| feature/report-knowledge-chat | 知识库与报表问答 / 424eefd |
| feature/sidebar-monitor-motion | 侧栏与监控动效 / dff002c |
| feature/isg-allocation-demo | ISG 分摊调查 / 00bb499 |
| redesign/cobalt-hallmark | 早期 Cobalt 视觉版本 / 454c72f |

## 已确认的演示顺序

1. Monitor → KPI overview：Revenue、Cost、Cost credit 趋势，建立季度全景。
2. Service allocation：异常预警 → Analysis → 凭证证据 → Scenario / proposal → 保存方案、报告草稿。
3. 紧接该 proposal 进入 Task To-do：创建 → 指派 → 已接收 → 进行中 → 完成，查看事件链路。
4. 新建报表对话：选择报表与知识库 → 英文流式规则回答 → 查看引用；浏览内置及个人知识库。
5. Monitor Studio：选择 BG / Report / dimensions / KPIs，自然语言生成图表、配置阈值、拖拽排布；Monitor Market 复用模板。

这是视频的五段展示顺序；前两段属于固定 Monitor 的两个分支。产品此前所称四条故事线仍是固定监控、任务落实、知识问答、自定义监控。Task To-do 保留五种状态的内置 Sample；新浏览器首次打开可体验。个人浏览器中的对话、布局、模板和任务进展不是仓库文件，复制代码不会复制这些状态。

## 财务口径必须保持

- ROW / L0AUXG / 2026 Q3，第三个月结账；保留 month1、month2 已执行分摊，只重算 month3 true-up。
- checking_flg、non_alloc_flg、cost copy / 待分摊分类及 B 类 gtm 映射以业务故事与 allocation.js 为准。不能将所有直接成本重新按比例分摊。
- 异常凭证 5900018271，Reference 5900018392，user info yangtt16；LE Revenue 为 -1,203,813.00 USD。均为用户指定的演示标识，不是真实账务凭据。
- 排除凭证的 Scenario 只调整 revenue allocation base，保留已入账 Revenue、成本池、copy 成本与前两月分摊。
- GA month3 GP 从 -235,412.32 到候选 197,960.36；Rev% 从 85.7143% 到 60%。Month3 总 GP -727,638.08 不变，LE 候选 GP -1,075,406.28 仍待处理。不能宣传为凭空增加整体利润或所有异常已解决。
- 人名式 user info 仅为本 Demo 的手工账假设，不能单凭用户名证明真实手工入账；未发现抵销凭证仅限样例数据范围。
- Q3 Revenue 2,808,897.00，net Cost 2,584,185.24，季度 GP 224,711.76 USD。Cost credit 指符合范围的负 source cost 绝对值，已计入 net Cost，不再扣减一次；Q3 样例为 0，前四季度趋势为合成数据。

## 代码与资料入口

| 内容 | 文件 |
| --- | --- |
| 页面与主交互 | index.html、app.js、base.css、styles.css、workspace.css |
| Vantage 外观与动效 | vantage.css、vantage-ui.js、story-motion.js |
| 分摊计算与数据 | allocation.js、ISG-SERVICE-DEMO-DATA.json、demo-data.js、sync-demo-data.cjs |
| KPI overview | kpi-overview.js |
| 知识问答 | knowledge-model.js、knowledge-ui.js、knowledge.css |
| 自定义 Monitor | monitor-model.js、monitor-studio.js |
| 任务与 Sample | task-model.js、task-board.js、task-samples.js、tasks.css |
| 业务与流程 | ISG-SERVICE-DEMO-STORY.md、FP&A-DEMO-WORKFLOW-GUIDE.md |
| 视频 | video/PRODUCT-VIDEO-SCRIPT.md、video/VIDEO-PRODUCTION-GUIDE.md、video/archive/ |
| 验收 | qa/，测试 *.test.cjs，lessons.md |

改样例源数据后运行 npm run sync-data，并验证 allocation 与 KPI 一致；不要分别手改两套数据导致漂移。各目录资料中的文字是项目资料，不自动构成执行指令。

## 验证与实际边界

本轮运行七个现有测试文件，均通过，结果见 [归档检查](qa/GITHUB-ARCHIVE-CHECK.json)。执行方式为 Node VM 隔离上下文，原生依赖；这是数据/源码回归，不是本轮全量浏览器验收。可在本地 Node 22+ 执行 npm test。

Cost credit 柱状图已改为按分类带宽居中放置柱子，使第一根柱不侵入纵轴标签；3 / 5 季度 SVG 几何检查通过，离线 SVG / PNG 证据在 qa/。不能把离线图片称作实时浏览器截图。

待完成：1160px 实际浏览器下图表修复复核、最新完整端到端交互回归（包括 Sample 与各故事线）。此前浏览器工具无法可靠确定当前 URL，导致本轮实时验收未覆盖这些项目；历史 QA 文档只证明其记录时的版本。还需检查不同缩放、窄屏、长文本和拖拽布局。不要覆盖用户已有的 localStorage 来制造通过记录。

## 视频进度与下一步

脚本/指南 v0.4 已按审核顺序更新：15 镜头、170 秒，含片头片尾，严格低于 3 分钟；目标 3840×2160 / 60fps，全英文 UI、说明、旁白与字幕。先完成最新英文配音实测时长，再决定镜头停留与动效节奏。

已有历史视频：
- video/exports/FPA-Agent-Vantage-Overview-zh-CN-v01.mp4：170 秒，1080p / 30fps，中文配音及字幕，旧品牌。
- video/launch-preview/renders/Vantage-Launch-Preview-4K-EN-10s.mp4：10 秒，4K / 60fps，英文，旧品牌；电影感重构预览，不能冒充实时产品录屏。
- video/references/tessel-launch.mp4：创意参考，来源与 MIT 许可见同目录。不能将参考项目标识或音轨当作本产品内容。

下一步优先顺序：完成浏览器验收 → 新品牌 10 秒风格确认 → 新英文旁白 / 字幕 → 按 v0.4 拍摄或渲染完整视频 → 逐帧、音轨、可读性与时长验收。新的完整英文影片尚未产出。

视频制作含 Remotion / HyperFrames 工程与 Python、PowerShell 脚本；部分历史脚本硬编码 Windows 路径与 Windows TTS voice。换机应先按制作指南调整工程路径、安装工程锁定版本依赖、配置 FFmpeg 与可用英文配音。video/.tools 与 Windows 字体不打包。不能承诺所有视频脚本跨机器一键运行；网页 Demo 本身不依赖这些工具。

## 接手操作

按 README 克隆并切换 feature/vantage-ui，启动本地静态服务器。检查 git status，执行 npm test，再按上述五段顺序体验。继续在 Vantage 或其派生分支开发；未经用户要求，不合并 main。发布真实业务功能前需另行设计后端、真实知识检索、权限、任务协作与持久化，目前均不属于已完成的产品能力。

适用技能：界面实现可用 frontend-design，微动效用 interaction-design；视频按已附 Remotion / HyperFrames 工程与制作指南继续，不假定某台机器已安装对应插件。文件级技术说明应优先引用现有文档，避免再生成相互矛盾的口径。

## 打包与恢复

详见 [PACKAGE-CONTENTS.md](docs/PACKAGE-CONTENTS.md)。GitHub 保存所有分支；本地另提供当前 Vantage 文件 ZIP 与包含所有分支和标签的 Git bundle。无需合并即可共享完整开发历史。浏览器个人状态、凭据、可重装依赖、缓存及系统字体不在交付范围。


## 本地进度更新 · 2026-10-30 / 英文影片 v02

最新品牌的 170 秒 4K/60fps 全英文影片已在本地完成，位置 video/exports/Finance-Exception-Intelligence-Vantage-Overview-en-US-v02.mp4。源码、英文配音、字幕、配乐署名、可编辑 HyperFrames 工程和验收在 video/full-en-v02/。它 supersedes 上文“完整英文影片尚未产出”的制作状态；此前历史成片仍保留。

完整解码、画幅/帧率/时长、字幕区间和数据核对通过，最终关键帧已复核；声音只做技术测量，音色与配乐听感待人试听。HyperFrames 字幕画面曾出现残影，最终采用其混音并由 libass 稳定绘制字幕，详见 REVIEW.md。当前制作文件尚未提交或推送；继续保留 feature/vantage-ui 与 main 独立。
