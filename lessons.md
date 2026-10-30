# Lessons

## 2026-10-27：首版 UI 缺少明确设计系统

- 用户反馈：首版 Demo UI 观感较差。
- 根因：首版同时使用暖灰、酸绿、珊瑚色和衬线标题，视觉语言冲突；大量小卡片平均分配注意力，没有突出 FP&A 的核心工作对象。
- 长期规则：任何后续页面先确定一个完整主题与单一强调色，再确定一个屏幕签名对象；财务工作台优先使用台账、表格、差异桥和证据链，不用通用 KPI 卡片墙作为主构图。
- 本次修正：采用 Hallmark Cobalt，使用冷白纸面、蓝灰墨色、电钴蓝信号、Graphite 分析面板和财务差异台账。


## 2026-10-27：文件读取失败时先切换通道

- 用户反馈：文件已正确挂载，本地浏览器可以正常打开。
- 长期规则：PowerShell 初始化或管道失败不能作为文件不可读的结论；先使用 Node.js 文件接口直接读取已授权路径，再判断是否需要用户重新提供文件。
- 本次修正：通过 Node.js 成功读取项目，并完成页面静态文案及 JavaScript 动态文案的英文翻译。


## 2026-10-27：以 ISG Service 实际分摊业务定义故事

- 用户修正：主线改为 ROW 季度 × profit center × bpc_seg_cd 分摊异常监测，替代华东经营毛利分析。
- 用户否定了暂拟的“直接成本 + 成本池 × Rev%”公式；实际 Cost 规则未收到前，保持待定义，不据此生成测算结果。
- 已确认季度汇总权重与期间下钻；排除凭证只调整分摊 base，保留已入账 Revenue。
- 长期规则：截图用于确认展示结构与可见事实，不能据负 GP 直接认定负数凭证根因；故事、计算公式和证据状态分别确认。


## 2026-10-27：月度分摊与季度 true-up 分开定义

- 用户补充：month1/month2 按当月 Revenue base 分摊；month3 按季度目标扣除前两个月已分摊额。此前季度统一权重的概述已修正。
- 成本先分类：非空 bpc 直接 copy；空 bpc 的 B 类且 gtm_lv2 有值，映射后 copy；其余空 bpc 才进入待分摊池。
- 长期规则：true-up 扣减待分摊池的历史分摊额，不扣包含 copy 的成本结果；负数 true-up 不能直接作为分摊错误证据。
- 无 Revenue base 默认 B0；净额零、接近零或负分母的行为不能自行推断。期间公式使用三位期间号，保留 period-year 分组。


## 2026-10-27：指定账号与随机金额保持可追溯

- 用户将利润中心指定为 L0AUXG，主凭证号指定为 5900018271，user info 指定为 yangtt16，Reference 指定为 5900018392。文档应区分用户提供标识和模拟金额，不能再笼统称所有标识均虚构。
- username 不等于人名；保留演示手工账属性时明确其为故事设定，不根据 yangtt16 字符串作真实判定。
- 本轮采用统一随机系数 1.33757 缩放金额，保留权重与 true-up 勾稽；如后续逐笔随机化，须从输入重新计算全部结果，不能独立随机结果列。


## 2026-10-28：交互效果按页面与触发事件确认

- 用户补充：Review period 切换也要展示加载反馈和交错入场，不能只保留淡入。
- 固定监控表在动效结束后保持稳定；自定义图表的小循环是本次单独授权的表现，不扩散到原始台账。
- 新布局将主导航集中在侧栏，原案例范围、调查、对话和固定监控集中在上方；避免同一入口在两个区域重复。
- 数据卡优先可读性：磨砂面使用高不透明度与深色文本；连续圆角只作渐进增强，提供普通圆角降级。


## 2026-10-28：演示样例应随代码交付

- 用户补充：Task To-do 需要保留 sample。不能只将浏览器验收记录当作交付样例；新浏览器环境也应能查看完整故事。
- 本次做法：内置一次性初始化的 5 阶段样例，明确 SAMPLE 标识，与个人 proposal 任务分组；刷新不重复创建，不覆盖已有任务或样例进度。
- 验证方法：使用独立本地预览端口隔离存储，测试首次访问、样例状态更新和刷新恢复，再关闭临时服务；保留主预览中的原任务。

## 2026-10-29：独立版本与验收证据

- 用户明确 Vantage 先保留独立分支，不合并 main；此前其他轮次的合并授权不延续到本版本。
- 首屏与局部细节截图分别留证，原版/新版本用同视口比较；不可用中段截图代替移动端入口检查。
- 长占位符搜索框与 badge 在手机端分行，实测输入宽度及整页溢出；视觉主题检查不能只依赖静态 lint。

## 2026-10-29：产品介绍视频先锁定总时长

- 用户修正：Demo 介绍视频压缩在 3 分钟以内。脚本由 4:30/18 镜头改为 2:50/14 镜头，四条故事线保留。
- 后续先分配总秒数，再写旁白与动作；片头、转场、片尾、音频尾部均计入。优先压缩重复操作和次要配置，不用快进或加速旁白替代内容取舍。
- 脚本预算不等于成片时长；最终必须检查导出文件小于 180 秒。

## 2026-10-29 · Launch-style English preview
- New video direction: take the user-provided Tessel film and repository as the motion reference; deliver a 10-second style preview before regenerating the full film.
- Use English for visible copy, subtitles and synthesized speech; target native 4K rather than enlarging prior screenshots. Preserve Vantage case facts and keep main unmerged.

## 2026-10-30 · Fixed Monitor has two purposes
- Product name: FINANCE EXCEPTION INTELLIGENCE; subtitle: Finance Workspace. Update assistant labels as well as the header. Existing exported videos are historical files, not live product branding.
- Separate routine KPI overview from scenario-specific Service allocation. Preserve the latter investigation/Scenario/report/task path and all existing Samples.
- Cost credit must be distinguished from negative allocated true-up. Show its source-row definition and label synthetic historical quarters clearly; reconcile the reviewed quarter with existing data.

## 2026-10-30 · Chart labels and video baseline
- Bar centers must sit inside categorical bands, not on the first/last grid boundary. Check left and right bar edges against the plot for both 3- and 5-quarter views.
- Before a new product video, reconcile the current brand, fixed-Monitor branches, language and resolution with the script. Treat existing renders as historical outputs, not current-spec deliverables.

## 2026-10-30 · Approved video story order
- Keep the saved-proposal handoff and task follow-through directly after the investigation/report. Knowledge and custom monitors follow the completed action narrative.
- Whenever scenes move, update shot IDs, timestamps, chapter budgets, capture order, transition instructions and continuity references together; do not only reorder a high-level feature list.
- Editing transition notes are not additional spoken copy; retain the 170-second total and measure future English voice timing separately.
