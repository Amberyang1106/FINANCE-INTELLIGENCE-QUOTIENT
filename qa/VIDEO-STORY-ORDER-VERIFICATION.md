# Approved video story order · v0.4

Date: 2026-10-30. User approval in the current conversation is the basis for the sequence below.

## Locked order and budgets

| Section | Shots | Window | Seconds |
| --- | --- | --- | ---: |
| Intro | 01 | 00:00–00:06 | 6 |
| 1 · 日常 KPI 监测 | 02 | 00:06–00:18 | 12 |
| 2 · 专项异常调查与方案 | 03–07 | 00:18–01:25 | 67 |
| 3 · 方案落实与任务跟进 | 08–10 | 01:25–01:55 | 30 |
| 4 · 报表逻辑问答与知识库 | 11–12 | 01:55–02:17 | 22 |
| 5 · 自定义监控与模板复用 | 13–14 | 02:17–02:43 | 26 |
| Ending | 15 | 02:43–02:50 | 7 |
| Total | 01–15 | 00:00–02:50 | 170 |

Chapters 1–2 are the two fixed-Monitor branches. Chapters 2–3 must be consecutive: save the candidate/report, create a task from the same proposal, assign, receive, start and record the follow-up outcome. Q&A begins only afterward. Completed follow-up does not imply ledger correction or root-cause resolution.

## Updated artifacts

- video/PRODUCT-VIDEO-SCRIPT.md v0.4: approved chapter order, renumbered 15-shot timeline, revised case-to-task and task-to-Q&A narration, picture handoffs and continuity gates.
- video/VIDEO-PRODUCTION-GUIDE.md v0.4: matching chapter windows/budgets, filming preparation, capture groups, editor handoffs and order-specific acceptance criteria.
- ISG-SERVICE-DEMO-STORY.md v0.4: story-map rows reordered and approved viewing sequence stated explicitly; allocation data unchanged.
- FP&A-DEMO-WORKFLOW-GUIDE.md: current-version pointers and approval record synchronized.
- v0.3 script and guide retained under video/archive/. Existing output media, voice tracks, manifests, sample data and application code unchanged in this pass.

## Checks

[Machine-readable result](video-story-order-check.json) records the 15 sequential IDs, contiguous start/end times from 0 to 170 seconds, each row’s duration, matching 170-second guide budget, English shot narration and local-link checks. The approved sequence appears consistently in all four current documents.

This is documentation validation, not a new video or audio QA pass. Full English narration still needs actual timing, and the new-name/KPI short preview remains a production gate. Native 4K60, under-three-minute output and all existing financial guardrails remain the target.

Branch: feature/vantage-ui. Main remains 3071b6d. No Git commit, main merge, app edit, new voice render, movie render or publication was performed for this update.
