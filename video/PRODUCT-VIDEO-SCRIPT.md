# FINANCE EXCEPTION INTELLIGENCE · Product video script v0.4

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

### v07 实际中英文字幕与旁白

| 时间 | English | 中文 |
|---|---|---|
| 00:00.00–00:02.50 | Finance Exception Intelligence. | 财务异常智能。 |
| 00:02.50–00:07.00 | See exceptions. Trace evidence. Coordinate action. | 发现异常，追溯证据，协同行动。 |
| 00:07.00–00:10.00 | Five capabilities. One finance workspace. | 五项相互衔接的能力，一个财务工作空间。 |
| 00:10.00–00:13.83 | Review reporting health. Open the Freight alert. | 总览报表状况，打开 Freight 预警。 |
| 00:13.83–00:16.70 | A possible duplicate allocation needs finance review. | 可能存在重复分摊，需财务核实。 |
| 00:16.70–00:21.40 | Identify records, correct duplicates, rerun, and validate Freight and GP. | 识别记录，修正重复分摊，重新运行，并验证 Freight 与毛利。 |
| 00:21.40–00:28.00 | Review revenue, cost and source cost-credit trends. | 查看收入、成本及源成本抵减趋势。 |
| 00:28.00–00:31.13 | Trace a separate allocation exception. | 追溯另一个独立的分摊异常。 |
| 00:31.13–00:33.73 | GA's month-three gross profit is negative. | GA 第三个月毛利为负。 |
| 00:33.73–00:38.40 | Ask why gross profit turned negative. | 询问毛利为什么转为负数。 |
| 00:38.40–00:43.77 | Follow the rules, true-up, revenue base, and source evidence. | 依次追踪规则、轧差、收入基数和源凭证。 |
| 00:43.77–00:45.87 | Open the negative revenue voucher. | 打开负收入凭证。 |
| 00:45.87–00:48.87 | Check amount, segment, user and reference. | 核对金额、segment、入账人和参考号。 |
| 00:48.87–00:50.87 | No confirmed sample offset. | 样例内未确认正向对冲。 |
| 00:50.87–00:54.87 | LE's negative base raises GA's share and pressures GP. | LE 负基数放大 GA 权重，影响毛利。 |
| 00:54.87–00:58.57 | Compare excluding the voucher from the allocation base only. | 比较仅将凭证排除在分摊基数之外的方案。 |
| 00:58.57–01:03.30 | Posted revenue and months one and two stay unchanged. | 已入账收入和前两个月的分摊结果不变。 |
| 01:03.30–01:08.00 | GA improves; total GP unchanged; LE needs review. | GA 改善，总毛利不变，LE 仍待核查。 |
| 01:08.00–01:13.00 | Save the candidate and generate a report with evidence, assumptions, and actions. | 保存候选方案，生成包含证据、假设和行动的报告。 |
| 01:13.00–01:18.13 | Turn proposals into accountable actions. | 将改善建议转化为责任明确的行动。 |
| 01:18.13–01:20.10 | Assign an owner. | 分派负责人。 |
| 01:20.10–01:22.23 | Confirm receipt. | 确认任务已接收。 |
| 01:22.23–01:27.23 | Start work and track the handoff. | 开始处理并追踪交接。 |
| 01:27.23–01:28.40 | Record the outcome. | 记录处理结果。 |
| 01:28.40–01:30.00 | Ledger unchanged. | 账务保持不变。 |
| 01:30.00–01:37.53 | Understand the logic behind the numbers. Ask the report. | 理解数字背后的逻辑，直接询问报表规则。 |
| 01:37.53–01:42.50 | The simulated answer excerpt includes source citations. | 查看模拟回答片段及其来源引用。 |
| 01:42.50–01:45.00 | Explore built-in and personal knowledge. | 查看内置和个人知识库。 |
| 01:45.00–01:52.37 | Build monitors around your questions. Choose scope and metrics. | 围绕业务问题创建监控，选择范围和指标。 |
| 01:52.37–01:57.30 | Review the chart, then set a gross-profit threshold. | 查看图表，再设置毛利阈值。 |
| 01:57.30–02:02.00 | Add a revenue trend. | 添加收入趋势。 |
| 02:02.00–02:05.17 | Drag to arrange your monitors. | 拖动卡片，调整监控布局。 |
| 02:05.17–02:07.50 | Reuse templates. | 复用监控模板。 |
| 02:07.50–02:11.50 | One workspace. From reporting signals to accountable action. | 一个工作空间，从报表信号走向可追踪的行动。 |
| 02:11.50–02:14.50 | Finance Exception Intelligence. | 财务异常智能。 |

## v06 叙事增强版（2026-10-31，历史交付）

成片148.5秒、2560×1440/30fps。保留v05完整录屏视口，新增3秒品牌开场、4秒分摊因果解释、知识问答/自建监控各1秒章节卡。调查与任务保持连续；Freight与GA为独立案例。底部章节导航及Scenario三结论不覆盖UI；任务接收、拖拽和模板字幕逐步对时。原速操作未加速。最新工程 full-operation-v06，实际配音与字幕以 narration-cues.json 和 captions.json 为准。预览 http://127.0.0.1:4187/video/full-operation-v06/watch.html 支持章节跳转。

### v06 成片中英文字幕与旁白

| 时间 | English | 中文 |
| --- | --- | --- |
| 00:00.00–00:03.00 | Finance Exception Intelligence. | 财务异常智能。 |
| 00:03.00–00:05.00 | Evidence into action. | 从证据走向行动。 |
| 00:05.00–00:06.00 | Monthly status. | 查看月度监控状态。 |
| 00:06.00–00:07.00 | Open Freight. | 打开 Freight 预警。 |
| 00:07.00–00:10.00 | A possible duplicate allocation needs finance review. | 可能存在重复分摊，需财务核实。 |
| 00:10.00–00:14.89 | Identify records, correct duplicates, rerun, and validate Freight and GP. | 识别记录，修正重复分摊，重新运行，并验证 Freight 与毛利。 |
| 00:14.89–00:24.77 | Review revenue, cost, and cost credit trends. | 查看收入、成本和成本抵减趋势。 |
| 00:24.77–00:27.90 | Now, investigate a separate allocation exception. | 再看一个独立的分摊异常。 |
| 00:27.90–00:31.00 | GA's month-three gross profit is negative. | GA 第三个月毛利为负。 |
| 00:31.00–00:35.67 | Ask why gross profit turned negative. | 询问毛利为什么转为负数。 |
| 00:35.67–00:42.25 | Follow the rules, true-up, revenue base, and source evidence. | 依次追踪规则、轧差、收入基数和源凭证。 |
| 00:42.25–00:44.78 | Open the negative revenue voucher. | 打开负收入凭证。 |
| 00:44.78–00:47.30 | Check amount, segment, user and reference. | 核对金额、segment、入账人和参考号。 |
| 00:47.30–00:49.83 | No matching positive entry is confirmed. | 本样例尚未确认匹配的正向凭证。 |
| 00:49.83–00:53.83 | LE's negative base raises GA's share and pressures GP. | LE 负基数放大 GA 权重，影响毛利。 |
| 00:53.83–00:58.55 | Compare excluding the voucher from the allocation base only. | 比较仅将凭证排除在分摊基数之外的方案。 |
| 00:58.55–01:03.27 | Posted revenue and months one and two stay unchanged. | 已入账收入和前两个月的分摊结果不变。 |
| 01:03.27–01:07.98 | GA improves; total GP unchanged; LE needs review. | GA 改善，总毛利不变，LE 仍待核查。 |
| 01:07.98–01:14.19 | Save the candidate and generate a report with evidence, assumptions, and actions. | 保存候选方案，生成包含证据、假设和行动的报告。 |
| 01:14.19–01:20.94 | Turn this saved proposal into accountable follow-up. | 让这份已保存方案进入有负责人、有反馈的后续行动。 |
| 01:20.94–01:23.29 | Assign an owner. | 分派负责人。 |
| 01:23.29–01:25.57 | Confirm receipt. | 确认任务已接收。 |
| 01:25.57–01:32.18 | Start work and track the handoff. | 开始处理并追踪交接。 |
| 01:32.18–01:34.15 | Record the outcome. | 记录处理结果。 |
| 01:34.15–01:36.10 | Ledger unchanged. | 账务保持不变。 |
| 01:37.10–01:45.05 | Next, understand the rules behind the numbers. Ask about report logic. | 接下来理解数字背后的规则，询问报表逻辑。 |
| 01:45.05–01:52.99 | The simulated answer streams from the selected knowledge base and links to its source. | 模拟答案从所选知识库流式展示，并链接原文。 |
| 01:52.99–01:57.00 | Explore built-in and personal knowledge. | 查看内置和个人知识库。 |
| 01:58.00–02:05.19 | Use that understanding to define your monitor. Choose the report, dimension and metric. | 基于对规则的理解定义监控，选择报表、维度和指标。 |
| 02:05.19–02:12.37 | Review the chart, then set a gross-profit threshold. | 查看图表，再设置毛利阈值。 |
| 02:12.37–02:18.50 | Add a revenue trend. | 添加收入趋势。 |
| 02:18.50–02:21.67 | Drag to arrange your monitors. | 拖动卡片，调整监控布局。 |
| 02:21.67–02:23.47 | Reuse templates. | 复用监控模板。 |
| 02:23.47–02:28.50 | Finance Exception Intelligence. From signals to accountable action. | 财务异常智能：从监测信号走向可追踪的行动。 |


## v05 构图修正（2026-10-31，覆盖 v04 运镜方案）

用户要求动效不得影响整体展示。所有操作镜头固定保留完整1920×1080录屏视口，等比适配到2160×1215并放在(200,12)；字幕从1240开始。取消超出适配框的放大、局部移镜、遮罩压暗、叠加凭证标题和扫过表格的装饰层。保留真实光标移动、轻量点击反馈及页面已有的调查步骤、数值变化、流式输出、曲线描画和拖拽重排。旧版镜头表中的急推/特写/遮罩仅是历史参考，不得未经全视口边界验收重新用于成片。时长、旁白与双语字幕沿用139.5秒已核对时间线。


## v04 实际录制时间线（2026-10-31）

本轮用户要求的完整操作版以真实 Demo 录屏为主体，目标成片139.5秒；以下时间表覆盖旧版170秒的制作时长，旧表仅保留为历史分镜说明。英文在上、中文在下，英文旁白和配乐；原速调查步骤、真实勾选和任务交接保留。镜头实施与调整见 [v04 动效映射](full-operation-v04/MOTION-MAP.md)，动作记录见该工程 actions.json。不要把未实现的 Gallery 特定变体声称为已复刻。

| 镜头 | 实际时间 | 配音 |
| --- | --- | --- |
| 01 | 0.00–2.00 s | Finance Exception Intelligence. |
| 02 | 2.00–21.77 s | See monthly monitor status at a glance. Click the Freight alert. A possible duplicate allocation needs finance review. Identify impacted records, correct the duplication, rerun the scope, and validate Freight and gross profit. Then review revenue, cost, and cost credit trends. |
| 03 | 21.77–26.09 s | Open Service allocation. GA shows negative month-three gross profit. |
| 04 | 26.09–39.25 s | Ask why gross profit turned negative. Follow the rules, true-up, revenue base, and source evidence. |
| 05 | 39.25–46.83 s | Open the negative revenue voucher. Review the amount, segment, posting user and reference. A matching positive entry is not confirmed in this sample. |
| 06 | 46.83–60.98 s | Compare excluding the voucher from the allocation base only. Posted revenue and months one and two stay unchanged. GA improves, total gross profit is unchanged, and LE remains under review. |
| 07 | 60.98–67.19 s | Save the candidate and generate a report with evidence, assumptions, and actions. |
| 08 | 67.19–73.94 s | Create a follow-up task from the same saved proposal. |
| 09 | 73.94–85.18 s | Assign an owner. The assignee receives the task and starts work. Track each handoff. |
| 10 | 85.18–89.11 s | Record the outcome. Task completion does not change the ledger. |
| 11 | 89.11–104.99 s | Ask about report logic. The simulated answer streams from the selected knowledge base and links to its source. |
| 12 | 104.99–109.00 s | Explore built-in and personal knowledge. |
| 13 | 109.00–123.37 s | Choose a report, dimension and metric. Describe a monitor, then configure a gross-profit benchmark. |
| 14 | 123.37–134.47 s | Add revenue trends, configure signals, rearrange cards, and reuse templates in Monitor Market. |
| 15 | 134.47–139.47 s | Finance Exception Intelligence. Sample data. Simulated AI. |


Updated: 2026-10-30. Story order approved by the user in this conversation. Production specification for the next full film; no new film is rendered by this document update.

Source: feature/vantage-ui working tree, based on b5541d4 plus the current branding/KPI changes and chart-gutter fix. These application changes are archived with the repository handoff snapshot (tag archive/vantage-2026-10-30-handoff). Resolve that tag to the actual source commit and record the production asset manifest. Do not merge main.

This replaces v0.3’s viewing order and continues to supersede the v0.2 Chinese/1080p production plan. The previously delivered 2:50 Chinese film and 10-second English preview remain historical artifacts; neither includes the new brand and KPI opening. [Previous script v0.3](archive/PRODUCT-VIDEO-SCRIPT-v0.3.md). [Production guide](VIDEO-PRODUCTION-GUIDE.md).

## Chapter 1 update: monthly overview and Freight alert

Within the existing 00:06–00:18 window: show the status matrix (2 s), click the Jun-26 Freight red light and hold the alert card (4 s), close it and show Revenue, Cost and Cost credit trends (4 s), then transition to Service allocation (2 s). Suggested English narration: “See monthly monitor status at a glance. A Freight alert highlights a possible duplicate allocation and the steps for finance to investigate. Review revenue, cost and cost credit trends, then explore a separate allocation exception.” Time against the final voiceover; rebalance later shots if necessary while keeping the complete film under three minutes. This Freight hypothesis is illustrative and separate from the GA voucher case.

## Audience, delivery and story structure

Finance leaders and FP&A analysts. English UI, on-screen explanations, narration and captions. Native 3840 × 2160, 60fps, 16:9; 170-second target, strictly under 180 seconds including titles, transitions and audio tail. Actual voice timing must be measured before final animation.

## Approved viewing order / 用户已审核的五段顺序

**日常 KPI 监测 → 专项异常调查与方案 → 方案落实与任务跟进 → 报表逻辑问答与知识库 → 自定义监控与模板复用。**

These are five consecutive presentation chapters. Chapters 1–2 are the two branches of fixed Monitor; the application still has four broader product stories. Use this five-chapter order for editing, voice, captions and storyboard—not the earlier Q&A/Studio-before-tasks order.

| Chapter | Viewing window | Shot IDs | User journey / purpose |
| --- | --- | --- | --- |
| 1 · 日常 KPI 监测 / Quarterly pulse | 00:06–00:18 | 02 | Monitor → monthly status overview → click Jun-26 Freight alert and review its hypothesis and actions → Revenue, Cost and Cost credit trends. |
| 2 · 专项异常调查与方案 / Exception to proposal | 00:18–01:25 | 03–07 | Service allocation → alert → Analysis → voucher evidence → Actions / Scenario → save candidate → report draft. |
| 3 · 方案落实与任务跟进 / Proposal to follow-through | 01:25–01:55 | 08–10 | Immediately create a task from that same saved proposal → assign → receive → start → record outcome → complete; preserve the handoff history. |
| 4 · 报表逻辑问答与知识库 / Report knowledge | 01:55–02:17 | 11–12 | New conversation → report / knowledge base → streamed rule answer → citation → built-in and personal knowledge. |
| 5 · 自定义监控与模板复用 / Extend your monitoring | 02:17–02:43 | 13–14 | Studio scope / natural-language request → sample chart → Benchmark → trend / layout → Market templates. |

Intro 00:00–00:06; ending 02:43–02:50. Chapters 2 and 3 form one uninterrupted case journey. Do not insert Q&A, Knowledge, Studio or Market between the saved proposal and its task follow-through. After the follow-up result, introduce knowledge and custom monitors as additional capabilities, without implying that the original accounting issue has been resolved.

The KPI view does not auto-detect this allocation case from trend slopes. Its explicit Review Service allocation button connects the two branches. The investigation starts from the allocation alert. Cost credit is not the negative true-up.

Use Tessel's marker relay, typographic hierarchy, beat-synchronized transitions and restrained camera movement as creative references. Preserve Vantage colors, Geologica, Lenovo logo and the real product vocabulary. Do not copy the reference's calendar, mark, audio or footage. No new production integration is implied by animation.

## Locked timeline and English narration

| ID | Time | Seconds | Scene / operation | English narration |
| --- | --- | ---: | --- | --- |
| 01 | 00:00–00:06 | 6 | Lenovo logo, exact full product name, Finance Workspace; lime marker leads into the actual workbench. | Meet Finance Exception Intelligence. From the financial picture to evidence and accountable action. |
| 02 | 00:06–00:18 | 12 | Monitor → monthly status matrix → click Jun-26 Freight alert, hold and close the card → Revenue, Cost and Cost credit trends → switch to Service allocation. | See monthly monitor status at a glance. A Freight alert highlights a possible duplicate allocation and the steps for finance to investigate. Review revenue, cost and cost credit trends, then explore a separate allocation exception. |
| 03 | 00:18–00:30 | 12 | Click Review Service allocation or adjacent tab. Show 2026009, GA loss, LE base and warning. Keep loading/stagger/focus sequence at original speed. | Switch to Service allocation for a specific close check. GA shows negative month-three gross profit, while LE's negative revenue base signals a linked allocation issue. |
| 04 | 00:30–00:42 | 12 | Alert → Analysis → Analyze negative GP. Retain all four native investigation steps, about 4.4 seconds, then conclusion. | The investigation carries the scope forward, checking the rules, quarter-end true-up, revenue base, and source documents across segments. |
| 05 | 00:42–00:57 | 15 | Open voucher. Readable document number, amount, LE, user and reference. Show Positive-entry check scope and manual-entry caveat. | Trace the large negative revenue voucher to its amount, segment, posting information, and reference. No matching positive counterpart is confirmed within this sample scope. Finance still needs to verify the business context. |
| 06 | 00:57–01:17 | 20 | Actions → Scenario. Show before/candidate, months 1–2 lock, base-only exclusion, LE impact and total GP. No cropped-away residual loss. | Compare a candidate that excludes the voucher from the allocation base only. Keep posted revenue and the first two months unchanged. Recalculate month three: GA improves, but total gross profit is unchanged, and LE remains under review. |
| 07 | 01:17–01:25 | 8 | Save candidate plan → Generate report draft. Record same proposal timestamp and selected actions for later tasks. | Save the candidate and generate a report draft with causes, evidence, assumptions, and selected follow-ups. |
| 08 | 01:25–01:35 | 10 | Continue directly from shot 07 in Reports → same saved proposal → Create proposal tasks → Contact the posting user → My proposal tasks. Preserve proposal timestamp and actual task number. | From this saved proposal, turn the selected action into a task, retaining its evidence, calculation assumptions, and source context. |
| 09 | 01:35–01:49 | 14 | Finance reviewer assigns Alex Chen. Show role switch → Receive task → Start work. Display lifecycle/log and actual board movement after closing detail. | Assign the action to its owner. In the assignee preview, receipt and progress updates build a visible handoff history, so finance can follow execution. |
| 10 | 01:49–01:55 | 6 | Enter outcome, Mark completed, chain/log, Completed column. Same task and proposal throughout. | Record the follow-up outcome. Keep the history; the underlying ledger remains unchanged. |
| 11 | 01:55–02:09 | 14 | After completing the case follow-up, introduce a separate report-logic question. New chat → ISG Service / MR Logic → retrieval → real streaming excerpt → completed answer → Business Logic.md / Month 3 true-up citation. | Beyond case follow-up, ask about report logic. The answer draws on the selected knowledge base, streams into view, and links each rule to its source for review. |
| 12 | 02:09–02:17 | 8 | Knowledge → Files / Cards, built-in library and personal-library creation entry. | Built-in rules and personal knowledge libraries keep reporting definitions easy to find and reuse. |
| 13 | 02:17–02:30 | 13 | Studio scope ISG / ISG Service / BPC Segment / GP → natural-language request → simulated routing → quarter GP bar chart → Benchmark GP below zero. | Choose the report, dimension, and metric. Describe a monitor in natural language, inspect the sample field routing, and set a gross-profit threshold for the generated chart. |
| 14 | 02:30–02:43 | 13 | Five-quarter revenue trend by BPC BU; curve reveal, growth/decline benchmark; one real drag and landing; short Market template view. | Add a revenue trend, configure growth and decline signals, and arrange the cards. Reuse common monitoring patterns through the local template market. |
| 15 | 02:43–02:50 | 7 | Exact product name and tagline; prototype disclosure visible at least 5 seconds. No fictitious deployment URL. | Finance Exception Intelligence. A sample-data prototype connecting monitoring, evidence, knowledge, and follow-through. |
| Total | 00:00–02:50 | 170 | Includes every transition and tail. | Normal-paced English; revise wording if measured delivery exceeds a scene. |

## 中文字幕草案 / Chinese subtitle draft

以下与上方英文旁白逐镜对应，供审核或制作中文字幕轨。英文旁白与英文字幕仍为既定成片口径；是否在成片中启用中文字幕可在制作时决定。时间为镜头范围，最终应按实测配音重新拆句和对时。

| 镜头 / 时间 | 中文字幕 |
| --- | --- |
| 01 / 00:00–00:06 | 认识 Finance Exception Intelligence：从财务全貌出发，连接证据与可追踪的行动。 |
| 02 / 00:06–00:18 | 一眼查看各项监控的月度状态。Freight 预警提示可能存在重复分摊，并给出财务调查步骤。查看收入、成本和成本抵减趋势，再进入另一个分摊异常案例。 |
| 03 / 00:18–00:30 | 切换至 Service allocation，查看一项具体的结账检查。GA 第三个月毛利为负，而 LE 的负收入基数显示出相关的分摊问题。 |
| 04 / 00:30–00:42 | 调查沿用当前范围，依次检查规则、季度末轧差、收入基数，以及跨 segment 的源凭证。 |
| 05 / 00:42–00:57 | 追踪这笔大额负收入凭证，查看金额、segment、入账信息和参考号。在本样例范围内尚未确认匹配的正向凭证，财务仍需核实业务背景。 |
| 06 / 00:57–01:17 | 比较一种候选方案：仅将该凭证排除在分摊基数之外。已入账收入和前两个月的结果保持不变，只重算第三个月。GA 有所改善，但总毛利不变，LE 仍需进一步核查。 |
| 07 / 01:17–01:25 | 保存候选方案，并生成包含原因、证据、假设和后续行动的报告草稿。 |
| 08 / 01:25–01:35 | 从这份已保存的方案出发，将选定行动转为任务，同时保留证据、测算假设和来源信息。 |
| 09 / 01:35–01:49 | 将行动分派给负责人。在被指派人视角下，接收和进度更新形成可见的交接记录，方便财务跟踪执行。 |
| 10 / 01:49–01:55 | 记录后续处理结果并保留历史；底层账务不会因此改变。 |
| 11 / 01:55–02:09 | 除了跟进案例，也可以询问报表逻辑。系统从选定的知识库组织答案，以流式方式展示，并链接到规则来源供核查。 |
| 12 / 02:09–02:17 | 内置规则和个人知识库让报表定义更容易查找和复用。 |
| 13 / 02:17–02:30 | 选择报表、维度和指标，用自然语言描述监控需求，查看示例字段路由，并为生成的图表设置毛利阈值。 |
| 14 / 02:30–02:43 | 添加收入趋势，配置增长和下降信号，并调整卡片布局。通过本地模板市场复用常用监控方式。 |
| 15 / 02:43–02:50 | Finance Exception Intelligence：以样例数据演示如何连接监控、证据、知识与后续行动。 |



## Chapter handoffs and continuity cues

| Boundary | Picture handoff | Narrative connection |
| --- | --- | --- |
| 02 → 03 | The real adjacent Service allocation button or Review Service allocation link is clicked; keep scope labels visible. | “The quarterly picture is the starting point; a specific close check exposes the exception.” Do not claim the trend chart discovered it automatically. |
| 07 → 08 | Stay on the report just generated and use Create proposal tasks. No unrelated navigation or chapter detour. | “From this saved proposal…” makes the action’s origin explicit. Keep report/proposal timestamp, selected action and task source snapshot identical. |
| 10 → 11 | Hold the completed follow-up/log briefly, then transition to New chat. | “Beyond case follow-up…” introduces a separate capability. Completed is an action status; it does not close the ledger issue. |
| 12 → 13 | Leave the knowledge library, open Monitor Studio and show its scope controls before chart generation. | Move from understanding existing rules to defining the user’s own monitoring. Use the existing shot narration; do not add unbudgeted voice lines. |
| 14 → 15 | Template view hands attention to the full-name brand lockup and readable prototype disclosure. | Recap the capabilities without implying production deployment. |

The boundary descriptions are editing instructions, not extra narration to append to the 170-second timeline. All narration appears in the shot table. Let reading holds and native animations sit inside each shot’s budget.

## Video Shotcraft 动效与分镜设计 / 每镜执行参考

参考 [Video Shotcraft 镜头画廊](https://vincentwei1021.github.io/video-shotcraft/)；下列名称是对应的 Gallery 镜头卡，采用其运动语法并以 Vantage 深色界面、Lenovo 红与荧光绿重新设计。实际产品操作使用真实页面录屏或截图；动效为剪辑层处理，不改变产品数据或暗示系统有额外功能。每镜一个主动作，动作完成后留阅读停顿；鼠标先到目标、停稳再点击，点击和结果连续可见。

| 镜头 | 参考镜头卡 | 画面、运镜与动作 | 转场 / 声音提示 |
| --- | --- | --- | --- |
| 01 开场 | brand-ink-open / light-play-moves · spotlight-sweep | 黑色背景上 Lenovo 标志及完整产品名依次显现，柔和光扫过字标；字标落定至少 1 秒。 | 一条荧光绿线引入真实界面；低频轻击配合字标落定。 |
| 02 KPI 与 Freight | crane-rise-reveal / cursor-flyover / light-play-moves · sheen-sweep | 从全景进入月度矩阵，沿 Jun-26 列推近 Freight 红灯；指针到位、点击，真实弹窗出现。对异常、潜在原因和四步行动分段聚焦并留阅读时间；关闭后平移到三张趋势图。 | 点击用轻脉冲，随后以 line-carry-transition 引向 Service allocation；Freight 与 GA 为独立样例。 |
| 03 专项异常 | cursor-flyover / crash-zoom-punch | 点击真实 Service allocation 按钮，先呈现完整范围，再短促推近 GA 的负 GP 和 LE 负基数；推近仅一次并稳定。 | 低频重音配合预警聚焦，标签与期间保持可读。 |
| 04 调查过程 | cursor-flyover / list-reveal | 鼠标进入 Analysis，展示问题输入与发送，四个真实调查步骤逐步出现；镜头沿步骤轻移，停留结论。 | 每一步用轻提示音；不要加速或虚构 AI 调用。 |
| 05 凭证证据 | crash-zoom-punch / light-play-moves · spotlight-sweep | 点击凭证后推近真实详情；从凭证号、金额、LE、用户到 reference 逐项移动焦点，保留正向凭证检查范围和人工核实提示。 | 使用柔和扫光引导注意力，避免遮挡数字。 |
| 06 Scenario | before-after-slider-scrub / cursor-flyover | 展示真实勾选“仅从 base 排除”；用同屏分屏或扫过式蒙版对照前后 GA，固定展示总 GP 不变、LE 仍待核查和前两个月锁定。 | 勾选反馈与数值更新分别落拍；静止阅读至少 2 秒。蒙版只作剪辑，不能冒充页面控件。 |
| 07 方案与报告 | document-typewriter-reveal | 真实保存方案并生成报告；在真实报告上用局部揭示强调原因、证据、假设和行动，禁止伪造生成过程。 | 纸张轻落音；保持同一方案上下文。 |
| 08 生成任务 | line-carry-transition / cursor-flyover | 从同一份报告点击创建任务，镜头顺真实页面移动至任务卡，保留来源与行动。 | 一条细线连接报告与任务，作为剪辑隐喻。 |
| 09 指派和接收 | list-reveal / element-body-moves · contact-shadow-lift | 展示指派、切换被指派人、接收和开始；卡片按真实状态移动，细微抬升与阴影增强层次。 | 状态变化用柔和提示音；不能暗示真实通知或后台服务。 |
| 10 完成与交接 | line-carry-transition | 显示输入结果、完成及时间线，镜头沿交接线移动至完成状态并停留。 | 一次干净的完成音；说明任务完成不等于账务修正。 |
| 11 报表问答 | glass-pill-dictation-typing / document-typewriter-reveal | 光标输入问题，真实模拟流式回答逐行呈现；随后推近知识来源引用。只在录屏已有的输出基础上控制镜头节奏。 | 轻键入声与检索提示，回答结束后留出阅读停顿。 |
| 12 知识库 | deck-deal-flyin | 从真实知识库页面选取文件或卡片区域，以轻微交错的卡片入场呈现内置与个人库；明确是剪辑重构。 | 单次柔和发牌声，避免喧宾夺主。 |
| 13 自建监控 | canvas-materialize-moves · panel-to-canvas / cursor-flyover | 实际选择 BG、报表、维度和 KPI，展示自然语言请求及模拟路由；图表生成后聚焦 benchmark 配置。 | 节奏随字段选择推进，避免把模拟路由表现为真实数据库调用。 |
| 14 趋势与模板 | draw-svg-trace / element-body-moves · contact-shadow-lift | 沿真实曲线进行一笔描画式揭示，保留坐标与数值；录制一次真实拖拽、落位，再切入 Market 模板。 | 曲线结束轻落音；拖拽跟手、松开后短暂弹性吸附。 |
| 15 收尾 | brand-ink-open / marker-underline-title | 产品全名与标语回到画面，荧光绿线条落位；prototype / sample data / simulated AI 披露保持可读至少 5 秒。 | 音乐自然收束，品牌字标稳定停留。 |

**节奏与制作约束：** 表中 02 镜头目前只有 12 秒，内容和阅读量已超出舒适范围；先按真实英文配音和阅读速度重新计时，必要时延长该镜并等量压缩其他镜头，使全片仍低于 180 秒。先做该镜 styleframe 和短样，确认红灯点击、弹窗内容及三项趋势都看得清。BGM 选定后按实际节拍对齐转场，关键数据保持静止；高强度整屏冲击全片不超过三次。最终成片同时检查英文旁白及字幕对时、可选中文字幕对时、样例披露、配乐版权和音量。

本节为制作方案而非已实现效果；正式实现前按每张卡的具体 style 和参考 demo 校验并适配，已有成片和 30 秒样片均不因此改变。

## Exact display copy

- Brand: **FINANCE EXCEPTION INTELLIGENCE**. Subtitle: **Finance Workspace**. Spoken: “Finance Exception Intelligence.” Do not abbreviate to FEI without separate approval. Long lockup may use deliberate line breaks, never compress or clip characters.
- KPI scene: “The quarterly picture.” / “Revenue / Cost / Cost credit” / “Current quarter reviewed · Earlier history synthetic”.
- Allocation: “Month 3 close / Allocation exception”.
- Investigation: “Rules → True-up → Base → Voucher”.
- Scenario: “Base only / Months 1–2 locked / Total GP unchanged / LE review open”.
- Q&A: “Source-backed report logic / Simulated answer”.
- Studio: “Quarter GP / Configurable benchmark / Simulated routing”.
- Tasks: “Proposal → Task” / “Assigned → Received → In progress → Completed” / “Local role preview”.
- Ending: “From signals to actions.” / “Interactive prototype · Sample data · Simulated AI and task feedback · No live ledger changes”.

## Facts that must agree across shots

| Item | Fixed fact |
| --- | --- |
| Scope | ISG Service / ROW / L0AUXG / period-year 2026 Q3 |
| KPI window | Last 5 quarters: 2025 Q3–2026 Q3; optional last 3: 2026 Q1–Q3 |
| Q3 Revenue / net Cost / GP | 2,808,897.00 / 2,584,185.24 / 224,711.76 USD |
| Q3 Cost credit | 0.00 USD: no eligible negative cost source rows in this fixture |
| Credit definition | Sum absolute values of negative eligible pre-allocation BMC/NBMC source costs; already included in net Cost. A negative segment true-up is not a source credit. |
| Historical quarter provenance | Previous four quarters are synthetic. Overview Revenue agrees with the existing BU-series aggregate. Do not describe it as actual company performance. |
| Latest QoQ | Revenue +6.4%; net Cost +13.6%; Cost credit −100.0% vs synthetic 2026 Q2. Credit decline alone is not an improvement verdict. |
| Allocation alert period | 2026009 / Month 3; GA quarter GP is positive, so do not call it a quarter-wide GA loss. |
| Document / Reference / user | 5900018271 / 5900018392 / yangtt16 |
| Voucher | LE / −1,203,813.00 USD; manual-entry classification is a demo assumption, not inferred from username. |
| GA Month 3 GP | −235,412.32 → 197,960.36 USD |
| GA quarter Rev% | 85.7143% → 60.0000% |
| LE candidate Month 3 GP | −1,075,406.28 USD / remains open |
| Total Month 3 GP | −727,638.08 USD / unchanged |
| Scenario | Only exclude Revenue base; retain posted revenue, copy costs, cost pool and months 1–2 allocations. |
| Counterpart | Not confirmed in the sample quarter and profit-center scope; not a global absence claim. |
| Q&A / Studio / Market | Local knowledge, simulated streaming and field routing, predefined sample combinations and local templates. No production LLM, arbitrary SQL or hosted shared market. |
| Tasks | Local role feedback; completed follow-up does not mean ledger correction or root-cause resolution. Preserve 5 built-in Samples. |

## Recording continuity and timing gates

1. The overview is the first fixed-Monitor branch; switch explicitly to Service allocation before the allocation alert. Neither the KPI trends nor Cost credit are presented as the proven cause.
2. The fixed overview has profit-center quarterly totals; Studio has segment GP and BPC BU series. Preserve dimension and period labels so these are not mistaken for duplicate charts.
3. Q&A must finish before filming its citation. Waiting may be edited out with a visible transition; do not imply a live model's response speed.
4. Use the same saved proposal for report and task scenes. Shots 03–10 must remain consecutive in the final film. Shoot the investigation, saved report and task flow in one continuity block; knowledge/Studio scenes follow afterward.
5. Keep natural speech. GP pronounced “G P”; Rev% as “revenue share”; true-up as “quarter-end true-up”; full IDs remain visible without reading every digit.
6. Before full production, measure English TTS duration for every shot and update the storyboard from real word timings. This v0.4 narration is a written draft, not a timed or rendered voice track.
7. Approve the new-name opening/ending and a KPI chart shot before rendering all 10,200 frames. The old 600-frame preview is a style reference only and is not brand-current.
