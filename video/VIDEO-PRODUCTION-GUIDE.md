# FINANCE EXCEPTION INTELLIGENCE · Video production guide v0.4

Updated: 2026-10-30. The five-chapter viewing order has been approved by the user. Companion: [master script](PRODUCT-VIDEO-SCRIPT.md). This is the plan for the next full English film, not a claim that it is already produced. [Previous guide v0.3](archive/VIDEO-PRODUCTION-GUIDE-v0.3.md).

## 1. Current baseline and required changes

| Area | Next film specification | Existing artifacts |
| --- | --- | --- |
| Product | FINANCE EXCEPTION INTELLIGENCE / Finance Workspace | Prior films use FP&A Agent / Service Finance Workspace |
| Fixed Monitor | KPI overview → explicit switch → Service allocation → exception investigation | Earlier films start at allocation; the 10s teaser omits the ordinary KPI branch |
| Language | English UI, explanatory copy, narration, captions and ending | Full v01 film is Chinese VO/captions; old teaser is English with old branding |
| Image | Native 3840 × 2160, 60fps / 16:9 | Full v01 is 1080p30; old teaser is 4K60 |
| Duration | Target 170 seconds; actual file <180 seconds | Old 170s film remains historical, not the next production source |
| Route | Remotion product choreography + HyperFrames composition/audio/captions, with real app operations as proof | Old full-film FFmpeg/Pillow edit and teaser remain separate reproducible projects |

Working branch: feature/vantage-ui, based on b5541d4 plus uncommitted current branding/KPI changes and the chart fix. Main remains independent. Before shooting, archive the approved application changes with Git when authorized, record the new commit, source asset hashes and recording origin in a new manifest. Do not label b5541d4 alone as the complete current UI.

This v0.4 update changes documentation only; the earlier chart fix remains in the application. No new voice/audio/video render or Sites publication is requested in this pass. Existing MP4s, SRTs, manifests, production reports and QA evidence remain unchanged so they continue to describe the files actually delivered.

## 2. Narrative map

### Approved five-chapter order / 已确认顺序

**日常 KPI 监测 → 专项异常调查与方案 → 方案落实与任务跟进 → 报表逻辑问答与知识库 → 自定义监控与模板复用。**

| Chapter | Shots | Time | Visible entry → result |
| --- | --- | --- | --- |
| 1 · Quarterly pulse | 02 | 00:06–00:18 | Monitor / KPI overview → Revenue, Cost and Cost credit quarterly charts. |
| 2 · Exception investigation and proposal | 03–07 | 00:18–01:25 | Service allocation alert → Analysis → voucher → Actions / Scenario → saved candidate and report. |
| 3 · Proposal execution and task follow-up | 08–10 | 01:25–01:55 | That same saved proposal → task creation → assign → recipient receipt / progress → completed follow-up and handoff log. |
| 4 · Report-logic Q&A and knowledge | 11–12 | 01:55–02:17 | New chat / selected report and library → streaming answer → source citation → library management. |
| 5 · Custom monitors and templates | 13–14 | 02:17–02:43 | Studio scope → request / simulated routing → GP monitor / threshold → revenue trend / drag layout → Market templates. |

Intro: shot 01 / 00:00–00:06. Ending: shot 15 / 02:43–02:50. These are five presentation chapters; the first two are fixed Monitor's two branches, so they still map to four broader product stories.

**Editing rule:** keep chapters 2 and 3 consecutive. Do not insert Chat, Knowledge, Studio or Market between saving the proposal and following its tasks. Complete the narrative “discover → evidence → candidate → finance decision → execution follow-up” before demonstrating the additional knowledge and monitoring capabilities.

The KPI chart is not asserted to have discovered or caused the allocation case. Use the real Review Service allocation button or adjacent tab. Completed means the follow-up action is complete; it does not mean a journal was corrected, the negative revenue is legitimate, or the allocation-policy review is closed. Preserve the finance-review caveats in chapter 2 and the no-ledger-change wording in chapter 3.

## 3. Lock the facts before recording

- Scope: ISG Service / ROW / L0AUXG / 2026 Q3; investigation 2026009. No unsupported company fiscal-year claim.
- Overview Q3 Revenue 2,808,897.00; net Cost 2,584,185.24; Cost credit 0.00 USD. Prior history is synthetic, visibly marked. Latest QoQ is compared with that synthetic prior quarter.
- Cost credit = eligible negative pre-allocation source BMC/NBMC rows, displayed as absolute magnitude. Included in net Cost; never subtract twice. Negative LE true-up is an allocation redistribution, not source credit. A zero bar is a baseline marker, not an invented positive value.
- All IDs, amounts and Scenario constraints follow the master script facts table. GA Month 3 negative GP is not GA quarter loss. GA improvement does not increase total GP; LE remains open.
- Username alone is not manual-entry proof; counterpart absence is only within the sample scope.
- Keep the same saved proposal/report/task identities throughout. Recipient role preview is local simulation; task completion is a follow-up outcome, not a ledger fix.

## 4. Prepare the app and assets

1. Keep the user workspace at http://127.0.0.1:4175/ intact. Test that the server responds and every local asset loads. Use an isolated local origin/storage for recording; do not clear the user's data.
2. Initial app view: Monitor / KPI overview; Last 5 quarters. Confirm all three charts, exact Q3 values, provenance notice, all quarter labels and no y-axis/bar overlap. Also check the 3-quarter range.
3. Allocation branch: 2026009, original base, no candidate exclusion selected for the first comparison. Preserve the two locked months and all original calculation inputs.
4. Tasks come next in both filming and final viewing: preserve five Samples; record a new task directly from this shoot's saved proposal. Preserve report/proposal timestamp, selected action, task number and source snapshot. Never roll back a completed task by editing storage.
5. Knowledge follows the task chapter: ISG Service + MR Logic, fresh conversation. Built-in 2 files / 11 cards; retain personal libraries. Capture citation only after the answer actually completes.
6. Studio / Market close the feature tour: prepare a fresh recording canvas so first-generation shots are genuine. Fixed overview and Studio retain different scopes/dimensions on screen. Keep the synthetic-history marker.
7. Audit local Geologica font, Lenovo logo aspect ratio, SVG icons, chart colors and source excerpt titles. All output copy must use the exact new name, including assistant labels, HTML title, captions, spoken intro/ending and file metadata.
8. Refresh stale caches after source changes. Stop ongoing layout animation before taking a still that is meant to show a final state; retain original native movement when demonstrating an action.

## 5. Timing and voice gate

Use the 15-shot / 170-second timeline in the master script. Do not append a separate teaser or music outro beyond that total.

| Scene group / final viewing order | Shots | Budget |
| --- | --- | ---: |
| Intro | 01 | 6s |
| 1 · KPI overview | 02 | 12s |
| 2 · Allocation / investigation / Scenario / report | 03–07 | 67s |
| 3 · Task execution and follow-up | 08–10 | 30s |
| 4 · Knowledge Q&A / library | 11–12 | 22s |
| 5 · Studio / Market | 13–14 | 26s |
| Ending | 15 | 7s |
| Total | 01–15 | 170s |

All transition cues are included in these budgets. Use the shot table in the master script as the single source of timing and spoken copy. A chapter boundary does not add a standalone title card or extra voice sentence.

Generate English narration only after script review. An offline voice is acceptable for preview; label it as synthetic. Match pronunciation and pace across all scenes. Do not clone the sample film narrator or reuse its soundtrack. The earlier Microsoft Zira preview voice is an available local fallback, not an already-approved final voice.

Export each spoken segment separately and collect actual word timing. GP = “G P”; Rev% = “revenue share”; true-up = “quarter-end true-up”. Speak “Finance Exception Intelligence” in full. Leave numbers/IDs on screen without reading each digit. Shorten repeated wording before increasing speech speed; preserve negative signs, base-only scope, locked months, total GP unchanged and LE review open.

The written draft has not passed voice-duration measurement yet. At final assembly, assert every segment fits its allotted interval and nothing is cut off by the 170-second end. Keep dialogue louder than ticks, swishes and underscore; aim around −16 LUFS and true peak below −1 dBTP, then measure the encoded output and audition it.

## 6. Remotion and HyperFrames handoff

### Remotion: product image and camera

- Reuse the working ten-second pipeline's pinned dependencies and local font/logo. Build the next project/version separately so old delivered renders and manifests stay truthful.
- Render crisp UI text/SVG natively at 3840 × 2160 / 60fps. Do not enlarge the old 1080p screenshots and label them native 4K. A small original logo may retain its supplied resolution; do not distort it.
- Native 60fps means frame-based motion with 10,200 frames for 170 seconds, not a low-rate screen capture encoded at 60fps. If captured footage is used, record its true rate and identify it honestly.
- Film-specific UI reconstruction may emphasize real fields, but keep visible data, button names, source rules and step order equal to the live app. Label it a cinematic reconstruction in production notes. It is not proof of an executed production action.
- Use a persistent lime attention marker as a visual motif, large type, soft spring settling, camera pushes and matching transitions. Keep Lenovo red in the existing logo. Prefer short, meaningful motion followed by reading holds.
- The new long name needs new lockup layout; never squeeze the old FP&A Agent slot. Test the intro, assistant name, ending and captions at 4K and at a downscaled 1080p review size.

### HyperFrames: final composition

- Import the Remotion render as muted video, with separate narration/music/SFX tracks and timed English captions. Preserve a deterministic seekable timeline and local assets.
- Follow the installed HyperFrames skill and pinned CLI contracts for data attributes, registered timelines, lint/runtime/layout/contrast checks, snapshots, background Studio preview and MP4 export.
- Use only documented system-Chrome configuration when necessary: HYPERFRAMES_BROWSER_PATH. On this machine, OneDrive atomic-rename locks occurred; build in a dedicated local cache directory, then copy delivered source/evidence/output back to the project. Do not alter installed package code or weaken browser protections.
- Render a new-name intro/ending and one KPI shot as the next short style check before a full render. The previous 10-second film is a historical style sample, not current-brand approval.
- No new online publisher or cloud rendering destination is authorized by this guide. Sites deployment remains a separate task.

## 7. Capture order and continuity

| Capture group / final film order | Shot IDs | What must remain linked |
| --- | --- | --- |
| A · Quarterly picture and case | 02–07 | KPI overview → explicit Service allocation switch → investigation → voucher → candidate/report. |
| B · Immediate follow-through | 08–10 | Directly continue from A’s report: same proposal timestamp, selected action, actual task number, assignee and chronological feedback. |
| C · Knowledge capability | 11–12 | Separate report question, one actual local answer, its completed citation and knowledge library. |
| D · Personal monitoring capability | 13–14 | Same scope/request/routing/result, benchmark, trend, real chart rearrangement and template entry. |
| E · Brand packaging | 01,15 | Current full-name lockup, original logo, English tagline and prototype disclosure. |

Shoot A then B as one continuous case block; keep them consecutive in the final edit. Film C and D afterward. E may be authored last, but stays inside the intro/ending budgets. Earlier instructions to insert Q&A/Studio between the report and tasks are superseded.

### Handoff checklist for the editor

- **02 → 03:** show the real switch from KPI overview to Service allocation; retain scope and month-three labels.
- **07 → 08:** keep the just-generated report on screen; click Create proposal tasks. No “return later” montage. The narration starts “From this saved proposal…”.
- **08 → 09 → 10:** one task progresses in chronological order; finance assigns, the assignee role reports receipt/progress, then records an outcome. Do not splice different task IDs or reset a completed Sample.
- **10 → 11:** briefly hold the follow-up outcome/history, then open New chat. “Beyond case follow-up…” signals a separate capability without claiming the financial root cause is fixed.
- **12 → 13:** transition from understanding report rules to configuring a personal monitor. Show Studio scope before generated charts.
- **14 → 15:** Market templates → product lockup/disclosure; no deployment claim or fictitious URL.

Keep the full four-step investigation (~4.4s), native voucher emphasis, Scenario comparison, trend drawing and task landing. Edit long waits with a visible transition without implying model performance. Preserve actual role switching. Do not invent source matches, success notifications or production receipts. The script table owns all spoken words; these handoffs are instructions, not extra narration.

## 8. Framing, captions and chart acceptance

- Establish the workbench and its two fixed-monitor buttons before macro details. Preserve quarter, dimension, USD and sample provenance in chart shots.
- Chart labels must remain outside bars/lines. For categorical bars, centers belong inside category bands; check both outer bar edges and quarter labels in 3- and 5-quarter views. For lines, inspect endpoint labels and axis gutters at the actual output size.
- Q3 zero credit needs a legible zero/baseline indication and explanation. Do not smooth it into a fictional positive credit or imply that fewer credits prove improvement.
- English captions: one or two lines, sentence-case, generally 7–12 words per group, timed from voice. At 4K use roughly 56–72px caption size as a starting point and keep at least 90px bottom clearance; inspect actual glyph widths. Avoid figures, totals and task buttons.
- Readable disclosure stays on screen for at least 5s at the ending; keep sample/simulated markers visible in the interface. Closing task remains a local follow-up.

## 9. Evidence and delivery checklist

| Gate | Evidence required |
| --- | --- |
| Source | Actual commit + worktree patch/asset hashes; branch feature/vantage-ui; main unchanged |
| App | Branding, both Monitor branches, 3/5-quarter charts, uninterrupted case-to-task flow, then knowledge/Studio/Market and Sample preservation; record any uncompleted UI checks rather than claiming pass |
| Story order | Five chapters match the approved order; shots 03–10 form one case; report/proposal/task identities stay continuous. Q&A starts only after task follow-up. |
| Data | Current-quarter reconciliation; no credit/true-up confusion; unchanged Scenario guardrails |
| Language | English UI, titles, captions, narration, ending; old product name absent from new rendered content |
| Style | Current-name/KPI short preview reviewed; reference-inspired motion, no copied mark/audio/footage |
| Composition | Remotion render success; HyperFrames lint/runtime/layout/contrast checks; every warning fixed or documented; hero frames and transitions visually inspected |
| Final media | MP4 / H.264 + stereo AAC; 3840×2160; 60fps; target 10,200 frames /170s; actual duration <180s; seekable file and complete decode without errors |
| Sound | Non-zero speech for every segment, actual audition, no clipping/truncated ending; encoded loudness/peak checked |
| Delivery | MP4, English SRT, final narration, actual manifest, editable source, screenshots and QA report; local Studio project URL and player when available |

A passed financial test does not prove UI spacing, and a snapshot does not prove sound or task persistence. Match each claim to its evidence. Previous browser QA was interrupted when Computer Use could not verify the URL; this does not count as a UI pass. Never bypass that block. Continue permissible source/model verification and describe the remaining real-browser checks clearly.

## 10. Versioning and artifacts

Keep v0.2 and v0.3 docs under archive/. v0.4 supersedes the earlier chapter order. Keep the existing Chinese full film and English old-brand 10-second preview untouched. Suggested next full export: Finance-Exception-Intelligence-Vantage-Overview-en-US-v02.mp4. Do not link that path as an existing deliverable before it exists.

The old video/edit/manifest.json and launch-preview voice/timing files describe actual earlier renders. Do not silently retime, rename or overwrite them while only reviewing documents. Create a new manifest and voice assets for the new full film after the current app revision is archived. Product source, data, sample IDs and local storage are not video-editing scratch space.

## 11. Source documents

- [Story map and exact allocation case](../ISG-SERVICE-DEMO-STORY.md)
- [End-to-end workflow](../FP&A-DEMO-WORKFLOW-GUIDE.md)
- [Current script](PRODUCT-VIDEO-SCRIPT.md)
- [Historic full-film production report](PRODUCTION-REPORT.md)
- [Historic 10-second preview](launch-preview/README.md)
- [Chart fix and readiness review](../qa/KPI-CHART-AND-VIDEO-READINESS.md)
- [Approved order and timing verification](../qa/VIDEO-STORY-ORDER-VERIFICATION.md)
