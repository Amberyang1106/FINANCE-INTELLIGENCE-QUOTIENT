# Vantage 五项业务动效验收

日期：2026-10-29。基线：4c8cfe5；工作分支 feature/vantage-ui。main 保持 3071b6d，不合并。

## 实现及实际验收

| 项目 | 实现 | 验收结果 |
| --- | --- | --- |
| 异常聚焦 | 原加载和交错入场完成后，GA 负 GP → LE 负 Revenue → GA 预警，各自短暂细框强调，然后恢复稳定。仅 closing 月出现 GA 负 GP 行时触发。 | Month 1 无异常聚焦；Month 3 捕获 GA -235,412.32 强调；切到 Knowledge 后残留强调数为 0。 |
| 调查步骤 | 四步各约 1.1s，同步强调规则/true-up/denominator/凭证证据；最终结论与计算行依次入场。减少动态效果时不等待演示停顿。 | 实测 Tracing 1/4、Queued、最终 Checked 与结论；金额和凭证结果保持原口径。 |
| 凭证呈现 | 280ms 弹窗进入；金额、Segment、User、Reference、positive-entry check 依次呈现或强调。关闭弹窗取消待执行动效。 | 5900018271 / -1,203,813.00 USD / LE / yangtt16 / Reference 5900018392 保留；关闭后 voucherContent 强调数为 0。 |
| Scenario 对比 | Original / Candidate 明确分列；补充 GA 总成本对照，依次强调权重、true-up、总成本、GP、总 GP 与锁定说明。显示准确值，无数字滚动计数。 | 85.7143% → 60%；GA true-up 770,440.32 → 337,067.64；GA Cost 1,037,954.32 → 604,581.64；GP -235,412.32 → 197,960.36。LE candidate GP -1,075,406.28 保持红色，总 GP -727,638.08 不变。快速勾选/取消后切换 Evidence，Scenario 残留强调数为 0。 |
| 任务流转 | 创建入场；状态更新时推进原链路，当前节点与最新日志反馈；详情弹窗关闭后播放看板跨列 FLIP，避免被弹窗挡住。快速更新使用最新位置，切页/resize/reduced-motion 取消过期位置。 | 在当前 4175 QA 环境新增 TASK-010，Alex Chen 完成 Assigned → Received → In progress → Completed，5 个事件与证据快照保留；关窗过程中卡片 x=684.51、Received 列 x=700.12，结束后二者 x=700.12，确认动画吸附至真实目标位置。 |

所有动效使用原生 CSS / Web Animations API，无新增依赖。不以动画计数生成中间财务值，不更改计算模型、任务权限、存储结构或 Sample 初始化规则。

## 业务与兼容性

- 旧 170 项检查全部通过；新增 36 项覆盖顺序、取消、结束清理、快速替换、reduce、后台隐藏、关窗跨列和 resize。总计 **206 项通过**，见 [tests.json](story-motion/tests.json)。
- 财务计算、知识模型、Monitor 模型、任务模型、task-samples.js、原始数据 JSON/快照均未改动；原有测试未删除或修改。三个业务/展示脚本 node --check 通过。
- 5 个内置 Sample 未被本轮 QA 操作改变；刷新后 Created/Assigned/Received/In progress/Completed 各 1 个。新增 QA 任务与原任务一并保留，无重置或覆盖。
- 刷新后已有知识问答的 6 个来源段落仍可见，Studio 的 3 张监控卡恢复；报告可沿原流程从当前保存 candidate 重新生成。
- 1440×1000 桌面实际检查；375×844 手机内容区 360px，Scenario 各数值区 clientWidth=scrollWidth=239，无整页横向溢出；凭证弹窗 322px，无整页横向溢出。临时 viewport 已恢复。
- 浏览器未捕获 error 日志。减少动态效果的分支通过隔离测试，未更改操作系统偏好。
- 静态主题检查 0 FAIL / 0 WARN / 6 ANSWERED；render tier 因未安装 puppeteer-core 未执行，视觉证据来自实际浏览器操作，不声称该自动渲染层通过。见 [lint.txt](story-motion/lint.txt)。

## 录屏操作提示

1. Monitor 选择 Month 3，停留约 3.5s；镜头覆盖台账和预警，查看三个依次强调的异常位置。
2. Analyze negative GP 后留出约 4.4s，让调查步骤完成，再打开凭证。
3. 凭证保持打开约 2s，可观察关键字段强调；不自动滚动或抢焦点。
4. Scenario 勾选 exclusion，停留约 3s；原值、候选值和总 GP 守恒说明始终可读。
5. 创建/更新任务后，详情中可看链路和日志；关闭详情，观察看板跨列位移。可搜索特定任务，使录屏更集中。

本轮没有实现 Presentation mode、自动重播、视频生成或 Sites 部署。数据与 AI/人员反馈仍为本地 Demo；没有触发真实通知或财务入账。

## 截图

- [异常聚焦](story-motion/monitor-focus.jpg)
- [调查进行中](story-motion/investigation-running.jpg)
- [凭证金额强调](story-motion/voucher-focus.jpg)
- [Scenario 对比](story-motion/scenario.jpg)
- [任务创建](story-motion/task-created.jpg)、[接收](story-motion/task-received.jpg)、[跨列移动中](story-motion/task-moving.jpg)、[完成链路](story-motion/task-completed-flow.jpg)
- [手机 Scenario](story-motion/mobile-scenario.jpg)、[手机凭证](story-motion/mobile-voucher.jpg)
