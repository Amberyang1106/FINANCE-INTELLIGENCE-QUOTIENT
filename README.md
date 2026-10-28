# FP&A Agent — ISG Service Allocation Demo

英文交互 Demo，沿用 Cobalt 设计系统，演示 ROW / L0AUXG / 2026 Q3 的第三个月结账调查。

## 打开方式

直接用浏览器打开 index.html。页面使用经典脚本加载本地数据快照，不依赖 fetch 读取 JSON。

也可在本目录运行标准本地预览服务：

    python -m http.server 4173 --bind 127.0.0.1

然后访问 http://127.0.0.1:4173 。预览服务仅用于本机查看，不是 Sites 部署。

## 完整演示路径

1. 在 Monitor 查看 2026009 分摊台账：GA GP −235,412.32 USD，LE 季度 base −401,271.00 USD。使用期间选择查看前两个月及季度总览，避免混淆月度与季度指标。
2. 点击首屏“1 open case”或 GA 预警，进入 Analysis；季度、利润中心和相关 segment 自动带入。
3. 点击 Send 或 Analyze negative GP，观察四步模拟调查。可继续提问抵销、汇率、手工账或情景问题；回答均限于固定样例。
4. 打开凭证 5900018271：LE、−1,203,813.00 USD、user info yangtt16、Reference 5900018392，并核对 document text 与正向凭证检查范围。
5. 在 Scenario 勾选 Exclude voucher，从 Revenue base 排除该项；已入账 Revenue、copy、成本池和前两个月已执行分摊保持不变。
6. 查看所有 segment：GA 本期 GP 变为 +197,960.36 USD，LE 变为 −1,075,406.28 USD；本期合计 GP 保持 −727,638.08 USD，季度合计 GP 保持 +224,711.76 USD。
7. 在 Actions 选择待核实事项，填写 Decision notes，保存 candidate plan。
8. 生成报告，在 Reports 查看原因、证据、假设、全部 segment 的影响与行动，下载 Markdown。
9. 使用 Download CSV 导出当前原始分摊表；使用 Reset demo 清除本 Demo 保存的方案和报告，恢复初始状态。

## 保存与交互边界

- 候选方案及报告保存在当前浏览器的 localStorage；刷新可恢复。不同文件地址、端口、浏览器或设备不共享记录。若浏览器禁止存储，只保留本次会话并显示提示。
- Monitor 始终展示原结果；Scenario 展示候选比较，保存方案不会覆盖原始台账。
- 报告使用最后保存的方案快照。后续修改 notes、Actions 或情景后，需要再次保存并生成新报告。
- 所有金额为已确认的模拟数据。标识由用户指定，不代表已读取或核实真实凭证。没有连接 SAP、Databricks、外部 AI 或其他财务系统。
- 手工账属性是故事设定，不能仅凭 yangtt16 账号作真实判断；正向凭证检查只覆盖样例季度和利润中心。
- 当前计算只支持已确认范围：无 Revenue 行默认 B0；有 Revenue 行但净额为零/负值、缺失或未知 Revenue segment，以及需舍入的其他数据会明确报错，等待业务规则确定。主样例全部金额可精确到分。

## 数据与计算

- ISG-SERVICE-DEMO-DATA.json：已确认样例、31 条输入行、前两个月已执行分摊及前后预期结果。
- demo-data.js：由上述 JSON 生成的浏览器快照，供 file:// 与本地 HTTP 同时使用。
- allocation.js：整数美分计算；copy / 待分摊池分类；季度目标减去已执行分摊的 true-up。
- index.html / app.js / styles.css：英文界面、交互与布局；tokens.css / base.css：现有主题基础。
- ISG-SERVICE-DEMO-STORY.md：完整故事与数值说明。
- FP&A-DEMO-WORKFLOW-GUIDE.md：四阶段流程与确认记录。
- qa/VERIFICATION.md：本轮验证结果与截图。

修改 JSON 数据后同步快照：

    node sync-demo-data.cjs

执行财务计算核对：

    node allocation.test.cjs

检查覆盖前后预期结果、copy 与 GTM 映射、历史锁定、合计守恒、non_alloc_flg=Y、AL 成本不重复入池、PRC 金额字段、A 类维度缺失、无基数 B0、净额零与快照一致性。

## 当前进度

阶段一已确认；四条英文交互故事线均已实现并完成本地验证：分摊异常调查、报表逻辑知识问答、自定义 Monitor 与模板复用、Proposal 任务闭环。Sites 上线和介绍视频尚未开始。

Git：阶段一存档 454c72f；阶段二提交 00bb499，已按用户要求快进合并 main。第二故事线提交 424eefd，已合并 main；侧边栏和监控动效提交 dff002c，已合并 main；新布局与 Monitor Studio / Market 提交 c082232，已合并 main；Task To-do 在 feature/proposal-task-board 分支。


## 第二故事线：报表逻辑问答与知识库

1. 在侧边栏点击 + New chat，选择 Management report（默认 ISG Service）。
2. 选择 Knowledge base；默认检索该报表的全部库，也可单独选择内置或个人库。
3. 输入 pls tell me the allocation logic for ISG Service?，点击 Send。
4. 观察报表知识选择、来源匹配、答案组织与流式输出；可随时 Stop。
5. 点击正文引用或右侧来源卡，查看准确的知识段落。历史回答保留当时的来源快照。
6. 在 Knowledge 中浏览内置 MR Logic：Business Logic.md 与 Data Dictionary & Mapping.md，共 11 张规则/字段/概念卡。可搜索、切换 Files/Notes/Links/Cards 及卡片类型。
7. 点击 + New knowledge base，填写名称并绑定报表。个人库支持导入 MD/TXT/HTML、拖放文件、新建/编辑笔记以及链接摘录。内容实际参与本地检索。
8. 点击 Ask this library，开启绑定该库的对话；对话列表可切换与删除，刷新后恢复。

ROW PSD 是用于验证报表隔离的空知识示例；没有预设业务规则。可以为它创建个人库，验证新增知识确实会改变答案。

### 本轮范围

- 采用本地关键词检索、匹配段落组织与定时流式输出，没有连接外部 LLM、向量索引或 embedding 模型；跨语言语义检索和自动翻译不属于本轮范围。
- 内置内容来自用户已确认的分摊口径。附件截图只用于界面结构参考。
- 文件导入支持 MD、TXT、HTML，每个文件最多 500 KB；Office/PDF、目录扫描和网站爬取尚未实现。HTML 读取正文，保留段落并去除 script/style。
- 链接只检索用户提供的摘录；没有摘录时为 Reference only，不会伪装已读取网页。
- 个人库、对话和来源文本保存在该浏览器；存储不可用或满时只保留本次会话并提示。原分摊方案使用独立存储键；Reset demo 不清除报告对话和个人库。
- 流式输出可停止，切换对话会停止当前未完成回答；刷新时未完成回答保留为部分输出。引用快照不被来源编辑或删除覆盖。

验收记录与截图见 qa/KNOWLEDGE-VERIFICATION.md。

相关文件：knowledge-model.js（内置内容与检索）、knowledge-ui.js（对话与知识管理）、knowledge.css（界面样式）。执行 node knowledge.test.cjs 验证检索、来源和报表隔离，原 node allocation.test.cjs 继续用于分摊回归。


## 侧边栏与监控动效

桌面侧边栏顶部可 Collapse sidebar / Expand sidebar；收窄后保留 New chat、Knowledge bases、Service allocation、Investigation 快捷入口。窄屏沿用顶部导航。

进入 Service allocation 时短暂显示 Preparing sample allocation view，指标、台账行、合计和预警依次入场；这是本地样例的展示动效，不代表正在读取真实系统。动画完成后保持静止。Review period 切换只对更新数据做 280ms 淡入；快速切换取消旧动画。系统启用减少动态效果时直接显示数据。

执行 node motion.test.cjs 验证一次性动效、取消清理和减少动态效果分支。验收记录见 qa/MOTION-VERIFICATION.md。


## 新布局与第三故事线：Monitor Studio / Monitor Market

- 顶部采用 Lenovo 官方红色 Logo。主导航位于可收窄侧栏；活动背景按目标项位置和尺寸滑动，并带轻微回弹。New chat 留在侧栏；固定监控、Monitor case、Investigation、对话列表与用户身份在上方。
- 数据卡采用高不透明度磨砂表面；支持 corner-shape:squircle 的浏览器使用连续圆角，其余保留普通圆角。表格和文字保持可读。
- Review period 现在也显示样例准备反馈，并对指标、表格行、合计和预警交错入场；完成后保持静止。自定义柱图的轻微循环为独立表现；趋势图使用 SVG 描线和跟随点。减少动态效果偏好下关闭这些动画。

### 演示步骤

1. 点击 Monitor Studio，选择 Business group / Management report / Dimension / KPI。首版支持 ISG / ISG Service；其他范围明确提示无样例，禁用字段选择。
2. 点击 Quarterly GP by segment，再点击 Generate monitor。观察逐步模拟路由：报表、字段、样例来源、聚合、图表。生成最近完整样例季度 2026 Q3 的 GP 柱图。GP 使用既有季度合计（不是第一故事线的 2026009 月度 GP）；LE 为负。
3. 点击 Five-quarter revenue trend，再 Generate monitor。生成 2025 Q3–2026 Q3 的三条 BPC BU Revenue 曲线。此历史序列为合成演示数据；最后一季度按既有 Revenue 总额的 46% / 27% / 27% 拆分。
4. 点击卡片右上 Benchmark。GP 默认 <0 USD 预警；Revenue 默认 QoQ 增长 ≥8% 高亮、下降 ≥5% 预警；成本模板默认 >1,000,000 USD 预警。修改规则会实际重算样例信号，未配置邮件或调度服务。
5. 按住标题拖动卡片，跨行跨列移动、避让、吸附；底部角落可调整大小。标题旁 Layout options 提供 Move earlier/later 与 Toggle full width 的键盘替代。布局保存在当前浏览器，手机单列不会覆盖桌面布局。
6. 点击 Monitor Market，安装 GP / Revenue / Cost 内置模板。搜索可筛选模板。
7. 在 Studio 点击 Save as template，将整张看板保存到本地个人集合。Download board / Download 导出 JSON；Import template 导入有效模板后可安装。导入校验版本、报表/字段组合和阈值，限制 250 KB、每板 1–20 张卡。
8. 生成过程中切换工作区会取消本次生成，避免完成后强制跳转。

### 数据与能力边界

这是静态交互 Demo。自然语言只路由到上面三个已定义的样例组合，不是任意 SQL 或真实数据库查询；报表、日期和字段在来源追踪中明确显示。BU 名称与五季度历史为合成样例。市场中的个人发布、看板、阈值和布局都保存在本浏览器的独立存储键 fpa-monitor-studio:v1；Reset demo 继续只清除原分摊方案和报告。跨用户共享托管、真实上传服务和后台预警调度未接入。

图表复用浏览器原生 SVG，网格拖拽与避让复用 GridStack 14.0.0（MIT，本地 vendor 目录）。品牌资产与依赖来源见 assets/README.md 和 vendor/README.md。

验证：node monitor-model.test.cjs、node motion.test.cjs、node allocation.test.cjs、node knowledge.test.cjs。结果及截图见 qa/CUSTOM-MONITOR-VERIFICATION.md。


## 第四故事线：Proposal → Task To-do

### 直接体验内置 sample

打开 Task To-do，Task collection 默认选择 Built-in samples。5 个可交互样例随代码内置，首次打开新浏览器环境也会出现：

| Sample | 行动 | 人员 | 初始状态 |
| --- | --- | --- | --- |
| DEMO-001 | Contact the posting user | yangtt16 | Completed |
| DEMO-002 | Verify the positive counterpart | Alex Chen | In progress |
| DEMO-003 | Check the LE segment assignment | Maya Patel | Assigned |
| DEMO-004 | Check currency differences if relevant | David Kim | Received |
| DEMO-005 | Confirm the allocation-base treatment | 未分派 | Created |

点击 View sample handoff 或任意任务卡，查看五步链路、proposal 原因/证据/假设与 Handoff log。DEMO-002 展示 Maya → Alex 的重新分派记录。所有样例都标记 SAMPLE，人员反馈与结果为预设 Demo 内容；没有实际消息发送。FX 样例仅表示接收相关性核实请求，不代表已发现汇率问题。

样例只初始化一次；交互后的进度会保存，刷新不重复生成或自动恢复初始状态。原有任务不被覆盖。Task collection 可切换 My proposal tasks 或 All tasks；导航数字为全部未完成任务数，概览数字属于当前集合。

### 从固定 Monitor 的 proposal 新建任务

1. 沿 Monitor → Analysis 调查案例，在 Actions 选择跟进行动，在 Scenario 选择 base exclusion 并保存 candidate proposal。
2. 点击 Scenario 或报告中的 Create proposal tasks，勾选需落地的行动。另有一项分摊处理决策任务，用于记录业务复核后的处理结果。
3. 创建后进入 Task To-do 的 My proposal tasks 集合。相同 proposal 内容及行动重复创建时去重；只创建此前未创建的选中行动。未保存的表单改动不进入任务。
4. 以 Finance reviewer 视角打开任务，选择 Assignee 及可选 Due date，点击 Assign task。任务进入 Assigned，等待负责人反馈。
5. 在 Viewing as 或任务内 Demo perspective 切换到该负责人，依次 Receive task → Start work → Mark completed。完成时必须填写结果或证据说明；其他人不能替当前负责人反馈。
6. 未完成任务可重新分派，新负责人需要重新接收；旧接收、工作状态和所有交接日志仍保留。同一负责人只修改截止日期时不重置已返回的进度。
7. 搜索支持任务、凭证、Reference、人员和原 proposal 说明；可按人员/状态筛选，并使用 My inbox 或 Unassigned queue。

### 保存与范围

任务、日志、来源快照和样例初始化版本保存在独立的 fpa-proposal-tasks:v1 浏览器存储中。后续重新保存 proposal 或 Reset demo 不覆盖历史任务中的原因、证据、假设和决策说明。无法恢复的已有存储不会被样例初始化自动覆盖，改为会话内运行并提示。

角色切换仅为本地演示，不代表真实身份认证、真实人员目录或多人同步；未连接邮件/消息通知/任务服务。任务完成只记录反馈，不修改凭证或生产分摊，也不会把原固定 monitor 的异常自动认定为解决。

执行 node task-model.test.cjs 验证任务与样例逻辑。完整验收见 qa/TASK-TO-DO-VERIFICATION.md。
