# 打包范围与恢复

本次交付包括 Git 跟踪的完整源代码、业务规则与样例、测试、QA 文档及图片、视频脚本与制作指南、录制输入、配音、历史成片和参考视频。所有 8 个分支独立保留；资料新增在 feature/vantage-ui，不回写 main。

排除可重新安装的 node_modules、video/.tools、Python 缓存、渲染中间缓存与 scene*.mp4、日志、.env / 凭据、编辑器临时文件。Windows 系统字体不随仓库分发。原始录制与配音、最终导出不排除；已有片段和重复参考输出作为历史资料保留。第三方素材许可按原文件保存，仓库未新增统一开源许可证。

浏览器 localStorage 中的个人对话、任务进展、知识内容及模板不属于源文件，也不会由 Git 自动打包；内置 Sample 已在源码中。

GitHub 是可直接克隆的版本库。为避免 GitHub 自动生成的单分支 ZIP 丢失历史，本地额外生成两种文件：

- Vantage 工作文件 ZIP：精确来自 git ls-files，不包括 .git 和忽略项，可解压启动网页。
- 全仓 Git bundle：包含所有本地分支与标签及其历史，使用 git clone <bundle文件路径> <目标目录> 恢复，再 git switch feature/vantage-ui。

恢复 bundle 后如需连接 GitHub，将 origin 调整为 https://github.com/Amberyang1106/FINANCE-INTELLIGENCE-QUOTIENT.git。普通 GitHub clone 默认看到 main，请显式切换 Vantage。

打包输出保存在项目目录外，避免把 ZIP / bundle 递归提交进仓库。交付目录中的 DELIVERY-MANIFEST.json 记录提交、分支及压缩包 SHA-256；校验值针对生成时内容。所有单文件均低于 GitHub 普通 Git 的 100 MB 文件上限，此次不引入 Git LFS。
