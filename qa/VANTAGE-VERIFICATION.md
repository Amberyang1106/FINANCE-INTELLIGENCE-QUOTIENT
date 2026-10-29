# Vantage UI 验收记录

日期：2026-10-29。分支：feature/vantage-ui。原版 main 固定为 3071b6df494298594eed4674c59a4b88bd80bb30；本轮不合并 main。

## 结果

四条故事线与内置样例通过本地浏览器验收。使用独立预览 http://127.0.0.1:4175 隔离浏览器存储，没有重置用户原 4173 的进度。

| 故事线 | 本轮实际操作及可见结果 |
| --- | --- |
| 固定分摊监控 | 切换 Month 1/Month 3，出现 Preparing/Ready；GA Month 1 GP 197,960.36，Month 3 GP -235,412.32；Monitor → Analysis → 4 步凭证调查；打开 5900018271，用户 yangtt16、Reference 5900018392、金额 -1,203,813.00 USD。 |
| 方案与报告 | 仅排除 Revenue base，保存 candidate 并生成报告；GA candidate GP 197,960.36，LE -1,075,406.28，总 GP -727,638.08 不变；报告保留原因、证据、前两月锁定假设、行动与决策说明。 |
| 报表知识问答 | New chat 选择 ISG Service，检索与流式输出完成；6 段/2 个来源，打开第 4 项引用显示原始 true-up 规则；MR Logic 2 文件/11 卡保留；创建个人库并保存 1 条笔记成功。 |
| 自定义监控/市场 | BG/Report/Dimension/KPI 联动，SSG 明示无样例并禁用字段；生成 GP 柱图及五季度 BU Revenue 趋势图；GP 阈值改为 -300,000 后 LE 从 Alert 转 Within rule，再恢复 0；趋势阈值 8%/5% 可访问；安装 Cost 模板，保存含 3 卡的个人模板；刷新后恢复。真实鼠标拖动横向交换两卡，跨行移动 Cost 并使其他卡让位；无脚本错误。 |
| Proposal → Task To-do | 从报告创建 4 个 proposal 任务；TASK-006 分派 yangtt16，切换该人视角后 Receive → Start work → 填结果 → Complete，5 条日志与来源快照保留；刷新仍完成。 |
| 内置 Sample | 5 个样例与个人任务隔离，Created/Assigned/Received/In progress/Completed 各 1 个；未改变它们的初始状态；View sample handoff 展示 DEMO-002 的 Maya → Alex 重新分派及 6 条日志；刷新保留。 |

## UI、响应式与动效

- 蓝黑钢色表面、Geologica 本地字体、青柠色动作/选中态、细角框、4px 平面卡片；Lenovo 红色 Logo 保持原图。
- 导航可收窄并展开；切换高亮使用 transform/opacity FLIP，保留原按钮与视图接线。原 191 个 ID、36 个表单/字段标签及 11 个脚本入口全部保留。
- Service allocation 数据加载与交错入场结束后回到 Ready；16 项有限动效检查覆盖取消、快速切换和 reduced-motion 分支。图表新增 Pause/Resume chart motion。减少动态效果的系统偏好未在真实浏览器中切换；该分支通过隔离测试及 CSS 检查。
- 1440×900 全部主要工作区首屏、375×844 手机首屏与任务/凭证弹窗已截图。Windows 手机内容区 clientWidth=360，六个工作区 scrollWidth=360，无整页横向溢出；表格及任务列采用局部滚动。1920 宽屏 header=1518，内容限宽居中。
- 视觉复核先要求补齐完整首屏，已补拍；其后发现手机市场搜索框被 badge 挤窄，已改为单独一行。复测 input=255px，与其容器同宽；页面无横向溢出。
- 五个业务脚本 node --check 通过；浏览器验收未捕获 error 日志。

## 自动检查

42 分摊 + 22 知识检索 + 25 Monitor 模型 + 16 动效 + 65 Task/Sample = **170 项通过**，详见 [model-tests.json](vantage/model-tests.json)。motion 测试仅将加载完成文案的分隔符断言随 UI 从中点更新为斜线，保留全部测试。财务数据和四个业务模型未修改。

Hallmark sloplint：0 FAIL / 0 WARN / 6 ANSWERED（同类应用表面的一致性说明），链接 1/1、原脚本入口 11/11 保留。见 [.hallmark/vantage-lint.txt](../.hallmark/vantage-lint.txt)。render tier 因无 puppeteer-core 未运行，不能称其自动渲染通过；本记录的视觉验收依据真实 Cua 浏览器截图。fresh-context finish review 1 个修正项已处理并由主执行者复测。

## 对比与证据

[打开交互对比页](vantage/compare.html)：Monitor、Task To-do 使用真实同尺寸 1280×800 的前后截图，点击图片可看原尺寸。任务页的 5 个 Sample 相同；Vantage 的全局任务计数另包含本轮创建的 4 个 QA 任务，因此全局数字与原图不同。

- [Monitor 对比](vantage/comparison-monitor.jpg) / [Task 对比](vantage/comparison-tasks.jpg)
- [桌面 Monitor](vantage/desktop-monitor.jpg) / [桌面 Task](vantage/desktop-tasks.jpg) / [Studio 图表](vantage/studio.jpg)
- [知识卡](vantage/knowledge.jpg) / [来源问答](vantage/chat.jpg) / [样例交接](vantage/sample-handoff.jpg) / [任务完成](vantage/task-completed.jpg)
- desktop-* / phone-* 为补齐的工作区完整首屏证据，phone-market.jpg 为修复后图。

## 主题来源与边界

用户指定 Hallmark Vantage。官方主题来源 https://github.com/Nutlope/hallmark/blob/main/skills/hallmark/references/themes/vantage.md ，读取的文件 blob SHA dfa1c3dfb16dbe59da604e1a87ae239cc74e0ec8；本地参照保存在 .hallmark/reference。按 app/restyle 应用于已有财务工作台，不增加与财务数据无关的点云 hero。Geologica 的 SIL OFL 许可见 assets/Geologica-OFL.txt；GridStack 主题 CSS 副本说明见 vendor/README.md。

所有金额仍为演示数据，分析与流式回答为本地预设/文本检索；任务回报是本地角色模拟，无真实多人通知。Sites 和视频尚未开展。
