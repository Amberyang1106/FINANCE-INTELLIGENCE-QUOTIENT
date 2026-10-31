# FINANCE EXCEPTION INTELLIGENCE

本轮总览已支持 BG / 管理报表 / Geo / 期间选择；目前仅 ISG / ISG Service / ROW / 2026 Q3 连接到既有单中心样例，其他选择显示暂无数据，不代表 BG/Geo 全量汇总。月度矩阵常显 Geo、Region、Segment、RTM、Channel 与 Freight 六行，其余可展开；Dec-26 Segment 灯与案例卡共用入口，它与案例期间 2026009 是演示关联，未进行公历换算。侧栏名称为 **Ask Finance**、**Investigation Reports**，原 chat/reports 路由保留。配置接入契约及本轮验证见 [总览实施记录](docs/overview-scope-execution.md)。

本地案例引导改版位于 `codex/vantage-case-flow`（基于 `517cebb`，尚未提交或发布）。先阅读 [本轮执行与验收记录](docs/ui-case-flow-execution.md) 和 [设计契约](DESIGN.md)；下文远程分支与视频说明保留为历史基线。

新版操作路径：**KPI overview → Review allocation → Analyze cause → Compare scenario → Save candidate → Generate report → Create follow-up tasks**。Analyze cause 一次点击运行固定样例；导航本身不运行分析。Scenario 显示 GA、LE、Total GP 三项影响，保留已保存版本与未保存提示。任务默认本人创建的方案行动（含分派给他人的行动）；Demo samples 为显式切换，List / Kanban board 均保留。Report Q&A 的创建入口为 Ask report rules。

运行验证：`npm test`。示例仍为本地 Sample data / Simulated AI / Local task feedback / No ledger changes；GA 改善属于成本重新分配，总 GP 不变，LE 与业务资格保持待复核。

财务异常监测与调查交互 Demo。最新版本位于 **feature/vantage-ui**；main 保留原版，二者未合并。

## 快速开始

~~~powershell
git clone https://github.com/Amberyang1106/FINANCE-INTELLIGENCE-QUOTIENT.git
cd FINANCE-INTELLIGENCE-QUOTIENT
git switch feature/vantage-ui
python -m http.server 4175 --bind 127.0.0.1
~~~

浏览器打开 http://127.0.0.1:4175/ 。这是静态 HTML/CSS/JavaScript 应用，无需安装前端依赖或配置 API Key。也可直接打开 index.html；建议使用本地 HTTP 服务，以保持浏览器存储行为一致。

## 从这里接手

- [交接说明：进度、分支、验证与下一步](HANDOFF.md)
- [完整开发到视频流程](FP&A-DEMO-WORKFLOW-GUIDE.md)
- [业务故事与分摊口径](ISG-SERVICE-DEMO-STORY.md)
- [视频脚本 v0.4](video/PRODUCT-VIDEO-SCRIPT.md) / [制作指南](video/VIDEO-PRODUCTION-GUIDE.md)
- [打包范围与恢复方式](docs/PACKAGE-CONTENTS.md)

演示顺序：**日常 KPI → Service allocation 异常调查与方案 → Task To-do → 报表问答与知识库 → Monitor Studio / Market**。

所有财务数据与身份字段均用于样例演示；AI 回答、知识检索、任务接收与模板市场采用本地模拟，不连接真实账务、数据库、协作或模型服务。用户在浏览器创建的内容存在该浏览器对应 origin 的 localStorage 中，不随 Git 仓库复制。

## 验证

Node.js 22 或更新版本：运行 npm test，无需 npm install。测试覆盖分摊计算、知识来源、自定义监控、任务及 Sample、动效约束、KPI 数据与 SVG 布局。最新归档执行证据：[GITHUB-ARCHIVE-CHECK.json](qa/GITHUB-ARCHIVE-CHECK.json)。完整浏览器验收仍有待完成项，详见 HANDOFF。

## 视频资产状态

本地已完成最新品牌与 KPI 开场的 **v02 英文产品影片：170 秒、4K、60fps**，含英文旁白、字幕与配乐。见 [制作工程与验收](video/full-en-v02/README.md) / [本地播放器](video/full-en-v02/watch.html)。本轮尚未提交或推送。历史 170 秒中文 1080p 视频和 10 秒英文 4K 预览继续保留，使用旧品牌。

本项目未声明统一开源授权；第三方字体、库与参考素材保留各自许可，见相应目录。旧版说明保留在 [README-HISTORY.md](docs/README-HISTORY.md)。
