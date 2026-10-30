# Vantage 产品介绍视频 · 制作报告

日期：2026-10-29。版本：v01。源分支 feature/vantage-ui，产品基线 b5541d4；main 保持 3071b6d，未合并。

## 成片与配套文件

- [MP4 成片](exports/FPA-Agent-Vantage-Overview-zh-CN-v01.mp4)
- [本地播放器与章节入口](preview.html)
- [中文字幕 SRT](captions/FPA-Agent-Vantage-zh-CN.srt)
- [压缩脚本](PRODUCT-VIDEO-SCRIPT.md) / [制作指南](VIDEO-PRODUCTION-GUIDE.md)
- [逐镜头素材和旁白清单](edit/manifest.json)
- [可复现渲染脚本](edit/render_video.py)

## 制作方式

采用真实 Vantage 页面操作与逐帧捕获，使用 FFmpeg、Pillow 完成剪辑、局部放大、章节包装、淡切与字幕烧录。未采用 Remotion，也未重写产品界面冒充录屏。页面采样率随捕获耗时变化，约 4–10 帧/秒，输出编码为 30fps；不声称原始捕获为原生 30fps。

录制使用独立本地端口 4177，同源存储与用户 4175 环境隔离。录制页只添加资源 base 和隐藏 Toast 的取景样式，业务代码、样例数据和产品源文件不作更改。录制的临时视口为 1920 × 900，捕获完成后恢复；特写从真实页面素材裁切。静态片头与片尾沿用 Lenovo Logo 和 Vantage 配色。

旁白由本机 Microsoft Huihui Desktop 离线合成，Rate=0，按 14 段原速录制。字幕依据原生语音时间标记断句，不通过加速旁白压缩时长。英文 GA、LE 采用逐字母发音，base 读作“基数”。音频目标 -16 LUFS / -1.5 dBTP；未添加背景音乐。

Geologica 使用项目既有 OFL 授权字体。中文由本机 Microsoft YaHei 渲染，系统字体不作为可分发素材打包。大型原始捕获、WAV、工具和 MP4 通过 video/.gitignore 排除 Git，仍保留本地文件。

## 故事与事实核对

| 时间 | 内容与取景要点 |
| --- | --- |
| 00:08–01:16 | 结账预警 → 四步调查 → 凭证 → Scenario → 保存报告 |
| 01:16–01:41 | 报表逻辑问答、流式片段、知识原文引用、知识库 |
| 01:41–02:12 | 季度 GP 看板、阈值配置、五季度收入趋势、布局与模板 |
| 02:12–02:43 | 从同一方案创建 TASK-006，分派、接收、进行、完成 |

- 主案例 ROW / L0AUXG / 2026 Q3 / 2026009；凭证 5900018271，Reference 5900018392，用户 yangtt16，LE 负收入 -1,203,813.00 USD。
- 原始 GA GP -235,412.32；候选 197,960.36。已入账 Revenue 和前两月执行分摊保留，只调整 base 并重算第三月 true-up。
- 总 GP -727,638.08 不变；LE 候选 GP -1,075,406.28 仍需复核。画面保留总计及限制说明。
- “本次范围内未确认正向抵销”不代表全系统无正向凭证。手工账归类为样例假设，用户名不作为证明。
- Studio GP 为季度累计口径，与主调查 Month 3 口径有区别；五季度 BU 趋势保留 synthetic / demo 标记。
- TASK-006 沿用同一已保存方案；负责人视角回报与日志为本地模拟，没有发送通知、连接账务或修改生产数据。Completed 仅表示跟进行动完成。
- 原五个 Built-in samples 保留。新任务为独立录制环境内的第六个任务，未覆盖 Sample。

## 验收记录

成片实测 170.00 秒，1920 × 1080，30fps，H.264 High + AAC LC / 48kHz 双声道，10,972,856 字节。完整解码返回 0，错误输出为空。本地播放器验证 duration=170、seekableEnd=170，章节跳转定位到 101.009 秒。详见 [QA-RESULT.json](QA-RESULT.json)。抽查 14 个时点，并重点核对凭证、Scenario、GP 图表、趋势和 TASK-006 完成链路。字幕为烧录中文字幕，同时提供可编辑 SRT。

本片是产品功能介绍初版，使用合成旁白。所有 AI、数据库路由、共享模板和任务回报均为 Demo 能力展示；未执行 Sites 或其他外部发布。Vantage 分支继续独立保留，视频工程尚未提交存档。
