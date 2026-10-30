# FINANCE EXCEPTION INTELLIGENCE · Video production guide v0.3

Updated: 2026-10-30. Companion: [master script](PRODUCT-VIDEO-SCRIPT.md). This is the plan for the next full English film, not a claim that it is already produced. [Previous guide](archive/VIDEO-PRODUCTION-GUIDE-v0.2.md).

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

This update changes documentation and the web chart only. No new voice/audio/video render or Sites publication is requested in this pass. Existing MP4s, SRTs, manifests, production reports and QA evidence remain unchanged so they continue to describe the files actually delivered.

## 2. Narrative map

The film still covers four product stories; fixed Monitor now has two branches:

1. **Routine pulse:** KPI overview displays quarterly Revenue, net Cost and source Cost credit. Current Q3 totals reconcile; earlier quarters are synthetic.
2. **Specific exception:** manually switch to Service allocation, inspect the GA month-three alert, run Analysis, drill down to LE voucher, compare Scenario, save candidate/report.
3. **Knowledge story:** report Q&A and original citation, built-in files/cards and personal-library entry.
4. **Self-service monitoring story:** Studio scope, request, simulated routing, GP benchmark, BU Revenue trend, drag layout and Market templates.
5. **Execution story:** same proposal → task → assign → receive → start → complete outcome with history.

Items 1 and 2 are the two branches of story one, not five unrelated top-level stories. The KPI chart is not asserted to have algorithmically discovered or caused the allocation case. Use the real Review Service allocation button or adjacent tab to connect them.

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
4. Knowledge: ISG Service + MR Logic, fresh conversation. Built-in 2 files / 11 cards; retain personal libraries. Capture citation only after the answer actually completes.
5. Studio: prepare a fresh recording canvas so first-generation shots are genuine. Fixed overview and Studio must retain different scopes/dimensions on screen. Keep the actual synthetic-history marker.
6. Tasks: preserve five Samples. Record a new task from this shoot's saved proposal and use its actual assigned number. Never roll back a completed task by editing storage.
7. Audit local Geologica font, Lenovo logo aspect ratio, SVG icons, chart colors and source excerpt titles. All output copy must use the exact new name, including assistant labels, HTML title, captions, spoken intro/ending and file metadata.
8. Refresh stale caches after source changes. Stop ongoing layout animation before taking a still that is meant to show a final state; retain original native movement when demonstrating an action.

## 5. Timing and voice gate

Use the 15-shot / 170-second timeline in the master script. Do not append a separate teaser or music outro beyond that total.

| Scene group | Budget |
| --- | ---: |
| Intro | 6s |
| KPI overview + allocation/investigation/Scenario/report | 79s |
| Knowledge Q&A / library | 22s |
| Studio / Market | 26s |
| Tasks | 30s |
| Ending | 7s |
| Total | 170s |

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

| Group | Shot IDs | What must remain linked |
| --- | --- | --- |
| A | 02–07 | KPI overview → Service allocation → investigation → voucher → candidate/report |
| D | 12–14 | The same saved report/proposal, actual task number, assignee and chronological feedback |
| B | 08–09 | One real local answer, completed citation and knowledge sources |
| C | 10–11 | Same scope/request/routing/result, real benchmark setting, chart layout and template entry |
| E | 01,15 | New full-name lockup, real logo, English tagline and prototype notice |

Shoot A then D consecutively; insert B/C in editing. Keep the full four-step investigation (~4.4s), native voucher emphasis, Scenario comparison, trend drawing and task landing. Edit long waits with a clear transition without implying model performance. Preserve actual role switching. Do not invent success notifications, source matches or production task receipts.

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
| App | Branding, both Monitor branches, 3/5-quarter charts, exception path, knowledge/Studio/Market/tasks and Sample preservation; record any uncompleted UI checks rather than claiming pass |
| Data | Current-quarter reconciliation; no credit/true-up confusion; unchanged Scenario guardrails |
| Language | English UI, titles, captions, narration, ending; old product name absent from new rendered content |
| Style | Current-name/KPI short preview reviewed; reference-inspired motion, no copied mark/audio/footage |
| Composition | Remotion render success; HyperFrames lint/runtime/layout/contrast checks; every warning fixed or documented; hero frames and transitions visually inspected |
| Final media | MP4 / H.264 + stereo AAC; 3840×2160; 60fps; target 10,200 frames /170s; actual duration <180s; seekable file and complete decode without errors |
| Sound | Non-zero speech for every segment, actual audition, no clipping/truncated ending; encoded loudness/peak checked |
| Delivery | MP4, English SRT, final narration, actual manifest, editable source, screenshots and QA report; local Studio project URL and player when available |

A passed financial test does not prove UI spacing, and a snapshot does not prove sound or task persistence. Match each claim to its evidence. Previous browser QA was interrupted when Computer Use could not verify the URL; this does not count as a UI pass. Never bypass that block. Continue permissible source/model verification and describe the remaining real-browser checks clearly.

## 10. Versioning and artifacts

Keep v0.2 docs under archive/. Keep the existing Chinese full film and English old-brand 10-second preview untouched. Suggested next full export: Finance-Exception-Intelligence-Vantage-Overview-en-US-v02.mp4. Do not link that path as an existing deliverable before it exists.

The old video/edit/manifest.json and launch-preview voice/timing files describe actual earlier renders. Do not silently retime, rename or overwrite them while only reviewing documents. Create a new manifest and voice assets for the new full film after the current app revision is archived. Product source, data, sample IDs and local storage are not video-editing scratch space.

## 11. Source documents

- [Story map and exact allocation case](../ISG-SERVICE-DEMO-STORY.md)
- [End-to-end workflow](../FP&A-DEMO-WORKFLOW-GUIDE.md)
- [Current script](PRODUCT-VIDEO-SCRIPT.md)
- [Historic full-film production report](PRODUCTION-REPORT.md)
- [Historic 10-second preview](launch-preview/README.md)
- [Chart fix and readiness review](../qa/KPI-CHART-AND-VIDEO-READINESS.md)
