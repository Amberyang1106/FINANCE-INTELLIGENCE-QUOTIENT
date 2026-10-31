# Independent visual QA — PASS within the evidence scope below

Verdict: **PASS for visual readability, information hierarchy and artifact-supported case flow.** No unresolved product finding remains from this review. This is a scoped approval, not a claim that all 78 screenshots were recaptured after the final CSS edit or that this subagent independently operated the live browser.

## Method and evidence boundary

This reviewer directly opened every one of the 78 final screenshot files with view_image, including re-opening all replaced affected images, and the four original before images for contextual comparison. Reviewed REVIEW-SCOPE, approved plan, DESIGN.md, case-ui-model.js, affected responsive CSS/current-step logic, execution log, independent code review, DOM snapshots, capture manifest, JPEG validation, source fingerprints, manual-verification.md and console export. The before images are comparison context; this redesign has no pixel-clone target.

The main agent performed real browser actions on 4194 and isolated empty-state origin 4195. Original 4193 state was preserved. This subagent could not access the main chat IAB from its own context; the main agent verified that its browser remained available. No user-browser disconnection was established. No product code, original inputs or browser storage was modified by this reviewer, and no agents were spawned.

Final coverage: **78 JPEG/DOM pairs: 42 at 1440×900, 11 at 1280×800, 10 at 768×1024 and 15 at 375×812.** All images were actually inspected. capture-validation.json reports all JPEG signatures and exact dimensions matching; I independently recalculated the seven source hashes and each matches final-source-hashes.json. The final workflow and clean-state console exports contain zero warning/error entries. Document widths recorded in the manifest do not exceed requested viewport widths; local scroll regions are intentional.

### Source and capture freshness

The feature-complete state was frozen at 06:53:31Z; original final workflow captures begin 06:54:24Z. Later repairs changed only <=640px case navigation/current-step alignment (app.js 07:13:51Z) and <=640px impact-card label/value layout (vantage.css 07:22:30Z). The affected mobile journey pages were replaced after the relevant navigation repair. Final Scenario images were replaced at 07:23:36Z, 07:23:43Z and 07:24:28Z, after the last impact-layout edit. Wider regression images were recaptured around 07:20–07:21Z and show the unchanged >=768 layout. Source inspection confirms those final CSS additions are media-scoped to <=40rem and current-step JS exits above 40rem.

Some retained desktop/modal/task/independent-page state images predate the narrow-only edits. They support the unchanged wider layout and previously executed functional flow; they are **not** presented as a complete after-final-edit recapture of every state. This scoped evidence limitation remains. A strict all-states-on-identical-final-build recapture would require another full capture pass. The present PASS addresses the reviewed visual change scope with that limitation disclosed.

## Requirement findings

| Dimension | Result | Observed evidence |
|---|---|---|
| Desktop first viewport | PASS | Both 1440 and 1280 show report scope, Revenue/net Cost/quarter GP, GA Month 3 loss and full Review allocation CTA. At 1280 the recorded CTA bounds are top 654.44 / bottom 694.44. |
| Case hierarchy | PASS | One GA/LE allocation case; Freight remains a separate hypothetical example. Explicit Analyze/Start and running/completed states are distinct. |
| Analysis ordering | PASS | Conclusion, key evidence and finance questions precede expandable calculation trace. Supplementary bottom frame shows four checks and retained formulas. |
| Scenario comparison | PASS | Desktop three-card Original/Candidate/Delta summary; 768 stacks cards; final 375 uses three label/value rows with intact long amounts. Details remain available. |
| Financial wording | PASS | Quarter GP and Month 3 GP explicitly differ. Cost credit remains included in net Cost. Finance review open/Not applied/No ledger changes remain visible. |
| Snapshot readability | PASS | Report saved-version warning and frozen task source show saved notes/results; unsaved note is absent from their DOM. Current editable state is separate. |
| Tasks and samples | PASS | Proposal owner collection, list, five-column board, explicit five-stage samples, assignment/receipt/progress/completion details, source links and duplicate-created disabled actions are visible. |
| Independent tools | PASS | Report Q&A, Knowledge, Studio and Market retain their own contexts and reachable controls at all requested widths, without the case journey. |
| Responsive navigation | PASS | Final 375 case strip scrolls locally, preserves whole words and keeps current step visible. Main document does not move horizontally in recorded checks. |
| Dialog readability | PASS | Freight, voucher, task detail, frozen source and reset dialog evidence shows real readable overlays; 375 long content uses vertical scroll. |
| Design integrity | PASS | Real DOM/native controls and reused Vantage tokens; no screenshot stand-in or financial reimplementation found. Independent code review supports this assessment. |
| Keyboard / motion scope | LIMITED PASS | Visible focus rings/native controls and running/resting states are captured. Main agent reports keyboard paths; reduced motion has automated coverage. OS preference switching was not manually exercised. |

## Financial controls and saved sources

| Scope / USD | Original | Candidate | Delta |
|---|---:|---:|---:|
| Quarter Revenue / 2026 Q3 | 2,808,897.00 | unchanged | — |
| Quarter net Cost / 2026 Q3 | 2,584,185.24 | unchanged | — |
| Quarter GP / 2026 Q3 | 224,711.76 | unchanged | — |
| GA GP / 2026009 Month 3 | −235,412.32 | 197,960.36 | +433,372.68 |
| LE GP / 2026009 Month 3 | −497,576.04 | −1,075,406.28 | −577,830.24 |
| Total GP / 2026009 Month 3 | −727,638.08 | −727,638.08 | 0.00 |

Source evidence is voucher 5900018271 / reference 5900018392, ROW / L0AUXG / ISG Service. Report and frozen task source DOM contain the saved note “QA saved candidate: verify entry background and policy eligibility.” and omit the later “QA UNSAVED” note. Frozen source shows the same candidate amounts. Completion remains an action result with finance review open and no ledger change. No Gregorian month mapping was invented for FISCPER 2026009. These are local reviewed sample results, not production-accounting conclusions.

## Findings resolved during this review

- **Product, 375 step labels:** fixed five equal columns split words into fragments. Final <=40rem horizontal 9rem steps retain whole words and keep the current step visible. Directly re-opened allocation, analysis, Scenario, report and task images confirm the repair.
- **Product, 375 LE amounts:** equal-third Original/Candidate/Delta columns made the long LE candidate touch the next value. Final label/value rows preserve font size and separate all exact amounts; latest three Scenario images confirm GA, LE and Total.
- **Evidence, screenshot dimensions:** default normalized captures did not match requested pixel size. Replaced with exact clips and signature/dimension validation.
- **Evidence, incorrect viewport origin:** clip x=0/y=0 was document-relative on scrolled pages and captured the page top instead of actual dialogs/target state. Corrected with scrollX/scrollY origin; replaced Freight/task/source mobile images now show true overlays. This was not a product modal failure.
- **Evidence, allocation/trend target:** allocation-375 initially remained on KPI; stable-trend capture initially showed matrix bottom. Final images show the correct page and Last 3 quarters selector plus stable charts. Supplementary matrix and trace images expose the previously offscreen content.
- **Withdrawn suspicion:** reopening the exact desktop all-segment table confirmed SMBMM Original/Selected Cost values are clearly separated; the stable table and cell geometry corroborate it. No product fix was required.

## Functional attribution and remaining limits

The main agent's manual-verification.md reports actual complete task creation/assignment/receipt/work/completion, saved-report/task snapshot isolation, duplicate prevention, legacy Actions entry, modal Close versus Return, actor-preview creation on first click, empty states and cancelled Reset. This reviewer independently checked the resulting images, DOM and source; these live interactions were not repeated by this subagent. The code reviewer separately approved source and targeted regression tests; execution/manual reports record final npm test 10 files passed and clean diff checks. Those test runs are attributed, not claimed as this reviewer's own runs.

No unresolved visual product blocker remains within scope. This does not verify live AI, production data, multi-user permissions, notifications, ledger correction, every possible long-text/data permutation, or every original feature's deep functional behavior. Existing broad typography/accessibility redesign and Studio wizard changes remain outside this iteration. No commit, push, merge, deployment or media rewrite occurred in this QA role.

## Complete reviewed capture inventory

Paths below are relative to this report. Every listed JPEG was opened; DOM accompanies it. SUPPLEMENTED means the initial frame alone was incomplete/in-transition and the acceptance judgment uses the named stable/lower supplemental evidence, not that frame as a complete state. Captured times are UTC and make the scoped freshness boundary auditable.

| Screenshot / DOM | Viewport | Captured at UTC | Direct visual observation |
|---|---|---|---|
| [freight-modal-1440](captures/freight-modal-1440.jpg) / [DOM](captures/freight-modal-1440.txt) | 1440×900 | 2026-10-31T06:54:24.754Z | PASS: Visible centered modal; independent Freight hypothesis and finance caveat readable. |
| [matrix-expanded-1440](captures/matrix-expanded-1440.jpg) / [DOM](captures/matrix-expanded-1440.txt) | 1440×900 | 2026-10-31T06:54:25.706Z | SUPPLEMENTED: Expansion control/header visible; actual matrix coverage supplied by top/bottom supplemental frames. |
| [trends-three-quarters-1440](captures/trends-three-quarters-1440.jpg) / [DOM](captures/trends-three-quarters-1440.txt) | 1440×900 | 2026-10-31T06:54:26.503Z | SUPPLEMENTED: Early in-transition/partial chart frame; superseded for stable trend acceptance. |
| [allocation-1440](captures/allocation-1440.jpg) / [DOM](captures/allocation-1440.txt) | 1440×900 | 2026-10-31T06:54:37.653Z | PASS: GA case, scope and Analyze cause visible; LE remains a linked signal. |
| [segment-detail-1440](captures/segment-detail-1440.jpg) / [DOM](captures/segment-detail-1440.txt) | 1440×900 | 2026-10-31T06:54:38.839Z | PASS: GA source periods/documents and quarter-base detail readable. |
| [analysis-ready-1440](captures/analysis-ready-1440.jpg) / [DOM](captures/analysis-ready-1440.txt) | 1440×900 | 2026-10-31T06:54:48.545Z | PASS: Start analysis and Ready state; navigation does not imply a run. |
| [analysis-running-1440](captures/analysis-running-1440.jpg) / [DOM](captures/analysis-running-1440.txt) | 1440×900 | 2026-10-31T06:54:49.209Z | PASS: Tracing 1/4 and queued steps visibly distinct. |
| [analysis-completed-1440](captures/analysis-completed-1440.jpg) / [DOM](captures/analysis-completed-1440.txt) | 1440×900 | 2026-10-31T06:55:11.569Z | PASS: Conclusion begins before optional trace; calculation/finance states distinct. |
| [analysis-trace-expanded-1440](captures/analysis-trace-expanded-1440.jpg) / [DOM](captures/analysis-trace-expanded-1440.txt) | 1440×900 | 2026-10-31T06:55:12.316Z | SUPPLEMENTED: Open questions and Compare scenario precede trace; lower checks supplied separately. |
| [voucher-modal-1440](captures/voucher-modal-1440.jpg) / [DOM](captures/voucher-modal-1440.txt) | 1440×900 | 2026-10-31T06:55:13.075Z | PASS: Voucher 5900018271, amount, period, reference and demo assumption visible. |
| [scenario-original-1440](captures/scenario-original-1440.jpg) / [DOM](captures/scenario-original-1440.txt) | 1440×900 | 2026-10-31T06:55:22.392Z | PASS: Unchecked exclusion; original and candidate values equal; unsaved state explicit. |
| [scenario-candidate-1440](captures/scenario-candidate-1440.jpg) / [DOM](captures/scenario-candidate-1440.txt) | 1440×900 | 2026-10-31T06:55:23.162Z | PASS: Three original/candidate/delta cards visible; selected exclusion and saved state. |
| [scenario-all-segments-1440](captures/scenario-all-segments-1440.jpg) / [DOM](captures/scenario-all-segments-1440.txt) | 1440×900 | 2026-10-31T06:55:23.780Z | PASS: All four segments and total visible; financial columns separated. |
| [scenario-unsaved-1440](captures/scenario-unsaved-1440.jpg) / [DOM](captures/scenario-unsaved-1440.txt) | 1440×900 | 2026-10-31T06:55:24.519Z | PASS: Edited QA note, focus ring and Uses last saved candidate warning visible. |
| [report-saved-version-1440](captures/report-saved-version-1440.jpg) / [DOM](captures/report-saved-version-1440.txt) | 1440×900 | 2026-10-31T06:55:34.640Z | PASS: Saved-version warning and saved report scope/timestamps/primary task action visible. |
| [task-duplicate-prevention-1440](captures/task-duplicate-prevention-1440.jpg) / [DOM](captures/task-duplicate-prevention-1440.txt) | 1440×900 | 2026-10-31T06:55:35.302Z | PASS: Saved proposal shown; already-created actions disabled and individually identified. |
| [tasks-list-1440](captures/tasks-list-1440.jpg) / [DOM](captures/tasks-list-1440.txt) | 1440×900 | 2026-10-31T06:55:43.733Z | PASS: Action/owner/status/feedback rows visible; finance-review caveat retained. |
| [tasks-board-1440](captures/tasks-board-1440.jpg) / [DOM](captures/tasks-board-1440.txt) | 1440×900 | 2026-10-31T06:55:44.102Z | PASS: Five lifecycle columns retained; created and completed tasks distinguished. |
| [task-completed-detail-1440](captures/task-completed-detail-1440.jpg) / [DOM](captures/task-completed-detail-1440.txt) | 1440×900 | 2026-10-31T06:55:44.941Z | PASS: Five completed lifecycle events; explicit no-ledger-change statement. |
| [task-frozen-source-1440](captures/task-frozen-source-1440.jpg) / [DOM](captures/task-frozen-source-1440.txt) | 1440×900 | 2026-10-31T06:55:51.859Z | PASS: Frozen source shows saved note/GA/LE/total; explicit current-candidate return. |
| [task-created-detail-1440](captures/task-created-detail-1440.jpg) / [DOM](captures/task-created-detail-1440.txt) | 1440×900 | 2026-10-31T06:56:19.645Z | PASS: Created stage, assignee/date controls and source review visible. |
| [task-assigned-detail-1440](captures/task-assigned-detail-1440.jpg) / [DOM](captures/task-assigned-detail-1440.txt) | 1440×900 | 2026-10-31T06:56:20.409Z | PASS: Alex Chen assignment and awaiting-receipt state visible. |
| [task-received-detail-1440](captures/task-received-detail-1440.jpg) / [DOM](captures/task-received-detail-1440.txt) | 1440×900 | 2026-10-31T06:56:21.209Z | PASS: Receipt acknowledged; Start work and update note visible. |
| [task-in-progress-detail-1440](captures/task-in-progress-detail-1440.jpg) / [DOM](captures/task-in-progress-detail-1440.txt) | 1440×900 | 2026-10-31T06:56:21.906Z | PASS: Completion evidence field and Mark completed action visible. |
| [task-final-completion-1440](captures/task-final-completion-1440.jpg) / [DOM](captures/task-final-completion-1440.txt) | 1440×900 | 2026-10-31T06:56:31.649Z | PASS: Outcome recorded and handoff events; source remains a saved candidate. |
| [task-samples-list-1440](captures/task-samples-list-1440.jpg) / [DOM](captures/task-samples-list-1440.txt) | 1440×900 | 2026-10-31T06:57:07.563Z | PASS: Five built-in samples show all five lifecycle states; local table scrolling visible. |
| [task-samples-board-1440](captures/task-samples-board-1440.jpg) / [DOM](captures/task-samples-board-1440.txt) | 1440×900 | 2026-10-31T06:57:07.846Z | PASS: Five stage columns each retain a sample; coherent card layout. |
| [report-q-a-1440](captures/report-q-a-1440.jpg) / [DOM](captures/report-q-a-1440.txt) | 1440×900 | 2026-10-31T06:57:11.396Z | PASS: Independent Report Q&A context and Ask report rules entry; no case journey. |
| [knowledge-1440](captures/knowledge-1440.jpg) / [DOM](captures/knowledge-1440.txt) | 1440×900 | 2026-10-31T06:57:11.917Z | PASS: Independent knowledge-library page; report sources remain reachable; no case journey. |
| [monitor-studio-1440](captures/monitor-studio-1440.jpg) / [DOM](captures/monitor-studio-1440.txt) | 1440×900 | 2026-10-31T06:57:33.138Z | PASS: Independent Studio controls reflow and Generate monitor remains reachable; no case journey. |
| [monitor-market-1440](captures/monitor-market-1440.jpg) / [DOM](captures/monitor-market-1440.txt) | 1440×900 | 2026-10-31T06:57:33.725Z | PASS: Independent Market search/template layout reflows; no case journey. |
| [workspace-menu-1440](captures/workspace-menu-1440.jpg) / [DOM](captures/workspace-menu-1440.txt) | 1440×900 | 2026-10-31T07:00:08.171Z | PASS: Reset appears in secondary Workspace options. |
| [reset-confirmation-1440](captures/reset-confirmation-1440.jpg) / [DOM](captures/reset-confirmation-1440.txt) | 1440×900 | 2026-10-31T07:00:08.702Z | PASS: Clear reset scope and Keep working/Reset demo actions visible. |
| [allocation-1280](captures/allocation-1280.jpg) / [DOM](captures/allocation-1280.txt) | 1280×800 | 2026-10-31T07:03:24.979Z | PASS: Service allocation scope/case/Analyze cause visible; responsive reflow. |
| [analysis-1280](captures/analysis-1280.jpg) / [DOM](captures/analysis-1280.txt) | 1280×800 | 2026-10-31T07:03:26.682Z | PASS: Conclusion/finance-review labels and investigation context readable. |
| [reports-1280](captures/reports-1280.jpg) / [DOM](captures/reports-1280.txt) | 1280×800 | 2026-10-31T07:03:30.078Z | PASS: Saved report scope/draft and source context readable; current Report step visible. |
| [task-to-do-1280](captures/task-to-do-1280.jpg) / [DOM](captures/task-to-do-1280.txt) | 1280×800 | 2026-10-31T07:03:31.801Z | PASS: Proposal task source/context and controls reflow; current Follow up visible where applicable. |
| [report-q-a-1280](captures/report-q-a-1280.jpg) / [DOM](captures/report-q-a-1280.txt) | 1280×800 | 2026-10-31T07:03:33.647Z | PASS: Independent Report Q&A context and Ask report rules entry; no case journey. |
| [knowledge-1280](captures/knowledge-1280.jpg) / [DOM](captures/knowledge-1280.txt) | 1280×800 | 2026-10-31T07:03:35.245Z | PASS: Independent knowledge-library page; report sources remain reachable; no case journey. |
| [monitor-studio-1280](captures/monitor-studio-1280.jpg) / [DOM](captures/monitor-studio-1280.txt) | 1280×800 | 2026-10-31T07:03:36.839Z | PASS: Independent Studio controls reflow and Generate monitor remains reachable; no case journey. |
| [monitor-market-1280](captures/monitor-market-1280.jpg) / [DOM](captures/monitor-market-1280.txt) | 1280×800 | 2026-10-31T07:03:38.514Z | PASS: Independent Market search/template layout reflows; no case journey. |
| [tasks-1280](captures/tasks-1280.jpg) / [DOM](captures/tasks-1280.txt) | 1280×800 | 2026-10-31T07:03:55.112Z | PASS: Proposal task source/context and controls reflow; current Follow up visible where applicable. |
| [kpi-768](captures/kpi-768.jpg) / [DOM](captures/kpi-768.txt) | 768×1024 | 2026-10-31T07:03:56.760Z | PASS: KPI cards stack without page overflow; narrow first screen requires normal vertical scrolling. |
| [allocation-768](captures/allocation-768.jpg) / [DOM](captures/allocation-768.txt) | 768×1024 | 2026-10-31T07:03:58.393Z | PASS: Service allocation scope/case/Analyze cause visible; responsive reflow. |
| [analysis-768](captures/analysis-768.jpg) / [DOM](captures/analysis-768.txt) | 768×1024 | 2026-10-31T07:04:00.100Z | PASS: Conclusion/finance-review labels and investigation context readable. |
| [reports-768](captures/reports-768.jpg) / [DOM](captures/reports-768.txt) | 768×1024 | 2026-10-31T07:04:03.464Z | PASS: Saved report scope/draft and source context readable; current Report step visible. |
| [task-to-do-768](captures/task-to-do-768.jpg) / [DOM](captures/task-to-do-768.txt) | 768×1024 | 2026-10-31T07:04:05.130Z | PASS: Proposal task source/context and controls reflow; current Follow up visible where applicable. |
| [report-q-a-768](captures/report-q-a-768.jpg) / [DOM](captures/report-q-a-768.txt) | 768×1024 | 2026-10-31T07:04:06.744Z | PASS: Independent Report Q&A context and Ask report rules entry; no case journey. |
| [knowledge-768](captures/knowledge-768.jpg) / [DOM](captures/knowledge-768.txt) | 768×1024 | 2026-10-31T07:04:08.342Z | PASS: Independent knowledge-library page; report sources remain reachable; no case journey. |
| [monitor-studio-768](captures/monitor-studio-768.jpg) / [DOM](captures/monitor-studio-768.txt) | 768×1024 | 2026-10-31T07:04:09.893Z | PASS: Independent Studio controls reflow and Generate monitor remains reachable; no case journey. |
| [monitor-market-768](captures/monitor-market-768.jpg) / [DOM](captures/monitor-market-768.txt) | 768×1024 | 2026-10-31T07:04:11.516Z | PASS: Independent Market search/template layout reflows; no case journey. |
| [kpi-375](captures/kpi-375.jpg) / [DOM](captures/kpi-375.txt) | 375×812 | 2026-10-31T07:04:45.355Z | PASS: KPI cards stack without page overflow; narrow first screen requires normal vertical scrolling. |
| [report-q-a-375](captures/report-q-a-375.jpg) / [DOM](captures/report-q-a-375.txt) | 375×812 | 2026-10-31T07:04:54.929Z | PASS: Independent Report Q&A context and Ask report rules entry; no case journey. |
| [knowledge-375](captures/knowledge-375.jpg) / [DOM](captures/knowledge-375.txt) | 375×812 | 2026-10-31T07:04:56.618Z | PASS: Independent knowledge-library page; report sources remain reachable; no case journey. |
| [monitor-studio-375](captures/monitor-studio-375.jpg) / [DOM](captures/monitor-studio-375.txt) | 375×812 | 2026-10-31T07:04:58.219Z | PASS: Independent Studio controls reflow and Generate monitor remains reachable; no case journey. |
| [monitor-market-375](captures/monitor-market-375.jpg) / [DOM](captures/monitor-market-375.txt) | 375×812 | 2026-10-31T07:04:59.740Z | PASS: Independent Market search/template layout reflows; no case journey. |
| [scenario-table-stable-1440](captures/scenario-table-stable-1440.jpg) / [DOM](captures/scenario-table-stable-1440.txt) | 1440×900 | 2026-10-31T07:07:10.902Z | PASS: Stable all-segment table; Original/Selected Cost cells clearly separated. |
| [matrix-visible-top-1440](captures/matrix-visible-top-1440.jpg) / [DOM](captures/matrix-visible-top-1440.txt) | 1440×900 | 2026-10-31T07:07:20.040Z | PASS: Actual upper monthly matrix rows, periods and illustrative-status warning visible. |
| [matrix-visible-bottom-1440](captures/matrix-visible-bottom-1440.jpg) / [DOM](captures/matrix-visible-bottom-1440.txt) | 1440×900 | 2026-10-31T07:07:20.583Z | PASS: Lower matrix rows including June Freight red light and final rows visible. |
| [analysis-trace-bottom-1440](captures/analysis-trace-bottom-1440.jpg) / [DOM](captures/analysis-trace-bottom-1440.txt) | 1440×900 | 2026-10-31T07:08:29.867Z | PASS: All four checks and GA formulas readable; rerun remains separate. |
| [tasks-empty-1440](captures/tasks-empty-1440.jpg) / [DOM](captures/tasks-empty-1440.txt) | 1440×900 | 2026-10-31T07:08:47.506Z | PASS: No saved candidate and zero non-sample task counts; no sample tasks implied. |
| [report-empty-1440](captures/report-empty-1440.jpg) / [DOM](captures/report-empty-1440.txt) | 1440×900 | 2026-10-31T07:08:48.322Z | PASS: No report draft; save/review prerequisite explanation and entry visible. |
| [freight-modal-375](captures/freight-modal-375.jpg) / [DOM](captures/freight-modal-375.txt) | 375×812 | 2026-10-31T07:13:41.807Z | PASS: Correct scrolled-viewport modal; close and complete Freight explanation fit. |
| [analysis-375](captures/analysis-375.jpg) / [DOM](captures/analysis-375.txt) | 375×812 | 2026-10-31T07:18:23.343Z | PASS: Ready analysis page; current Investigate step fully visible, whole words retained. |
| [allocation-375](captures/allocation-375.jpg) / [DOM](captures/allocation-375.txt) | 375×812 | 2026-10-31T07:18:42.539Z | PASS: Correct Service allocation page; complete-word horizontal journey and current Review allocation visible. |
| [reports-375](captures/reports-375.jpg) / [DOM](captures/reports-375.txt) | 375×812 | 2026-10-31T07:19:13.208Z | PASS: Saved report scope/draft and source context readable; current Report step visible. |
| [task-to-do-375](captures/task-to-do-375.jpg) / [DOM](captures/task-to-do-375.txt) | 375×812 | 2026-10-31T07:19:20.290Z | PASS: Proposal task source/context and controls reflow; current Follow up visible where applicable. |
| [task-detail-375](captures/task-detail-375.jpg) / [DOM](captures/task-detail-375.txt) | 375×812 | 2026-10-31T07:19:29.261Z | PASS: Real mobile modal; vertical five-stage lifecycle and no-ledger-change statement. |
| [task-source-375](captures/task-source-375.jpg) / [DOM](captures/task-source-375.txt) | 375×812 | 2026-10-31T07:19:37.853Z | PASS: Real frozen-source modal; saved amounts/note remain readable; scroll for later content. |
| [trends-three-quarters-stable-1440](captures/trends-three-quarters-stable-1440.jpg) / [DOM](captures/trends-three-quarters-stable-1440.txt) | 1440×900 | 2026-10-31T07:20:29.857Z | PASS: Last 3 quarters selector and stable Revenue/Cost chart values visible. |
| [cost-credit-three-quarters-1440](captures/cost-credit-three-quarters-1440.jpg) / [DOM](captures/cost-credit-three-quarters-1440.txt) | 1440×900 | 2026-10-31T07:20:39.595Z | PASS: Three-quarter credit bars visible; no axis collision in observed chart. |
| [kpi-1440](captures/kpi-1440.jpg) / [DOM](captures/kpi-1440.txt) | 1440×900 | 2026-10-31T07:20:53.647Z | PASS: Scope, all quarter KPIs, GA negative GP and complete Review allocation button in first viewport. |
| [kpi-1280](captures/kpi-1280.jpg) / [DOM](captures/kpi-1280.txt) | 1280×800 | 2026-10-31T07:21:00.653Z | PASS: Scope, all quarter KPIs, GA negative GP and complete Review allocation button in first viewport. |
| [scenario-1280](captures/scenario-1280.jpg) / [DOM](captures/scenario-1280.txt) | 1280×800 | 2026-10-31T07:21:08.069Z | PASS: All GA/LE/Total original-candidate-delta cards and period/USD label visible together. |
| [scenario-768](captures/scenario-768.jpg) / [DOM](captures/scenario-768.txt) | 768×1024 | 2026-10-31T07:21:21.070Z | PASS: All three impact cards stack ahead of details; atomic values separated. |
| [scenario-375](captures/scenario-375.jpg) / [DOM](captures/scenario-375.txt) | 375×812 | 2026-10-31T07:23:36.253Z | PASS: Current Compare scenario visible; final label/value rows keep amounts intact. |
| [scenario-impacts-lower-375](captures/scenario-impacts-lower-375.jpg) / [DOM](captures/scenario-impacts-lower-375.txt) | 375×812 | 2026-10-31T07:23:43.530Z | PASS: GA, LE and Total compact cards readable; labels/values in separate rows. |
| [scenario-total-375](captures/scenario-total-375.jpg) / [DOM](captures/scenario-total-375.txt) | 375×812 | 2026-10-31T07:24:28.305Z | PASS: Full Total card confirms unchanged −727,638.08 and 0.00 delta; saved actions visible. |

## Final source fingerprints independently checked

| File | SHA-256 | Last modified UTC |
|---|---|---|
| app.js | 75e441c1f453e080b4c4ae6f6135b6b5bdddef4ad0f8d8eaf360a69848fa184b | 2026-10-31T07:13:51.568Z |
| index.html | 364cceebd1c96e19be88a7f4e93607c4ab63496a13e0f5e81678eb8d6a77ed39 | 2026-10-31T06:53:31.469Z |
| case-ui-model.js | ecac6330c14c7a539be4d82dc7eeb58572a4b3341e461a314445b9d75b691c64 | 2026-10-31T06:32:06.830Z |
| kpi-overview.js | f41af71d6e6e72521719d4eef9a8623734b2bf76c41e5adf208a4bde991cc54f | 2026-10-31T06:43:59.633Z |
| task-board.js | b9ba786650178611f157be869b103da8ec9c8bb4cdb665537318de8b266aef87 | 2026-10-31T06:53:31.437Z |
| knowledge-ui.js | b4dc59a734021abcbf93a3caad0ae52e2f464ba224173921ac13d626e47f532e | 2026-10-31T06:40:40.256Z |
| vantage.css | bbff7aca3bed63cc8abf51c3945b107b68b9761beb72f48e70dc65b96b422338 | 2026-10-31T07:22:30.337Z |
