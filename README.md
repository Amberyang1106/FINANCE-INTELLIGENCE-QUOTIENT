# FINANCE EXCEPTION INTELLIGENCE

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
