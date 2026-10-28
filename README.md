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

阶段一已确认，阶段二英文交互 Demo 已实现并完成本地验证。Sites 上线和介绍视频尚未开始。

Git：阶段一存档 454c72f；阶段二开发分支 feature/isg-allocation-demo。阶段二改动等待用户查看后决定是否提交及合并 main。
