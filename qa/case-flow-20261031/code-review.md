# Independent code and plan-conformance review

Verdict: **APPROVE (code review)**. No unresolved Critical, Important or Minor findings remain in the reviewed source. This is not a substitute for the main agent's final real-browser acceptance.

Reviewed branch: `codex/vantage-case-flow`. Baseline HEAD: `517cebbdd2b51dab17493ed8849ff165ca4faefa`. All implementation changes remain uncommitted. Read-only product review; the reviewer wrote only this report. Existing video/voice LFS differences were excluded and media were not read.

## Scope and method

Read the approved plan at `D:/MR Dictionary/小强/docs/superpowers/plans/2026-10-31-vantage-ui-case-flow-plan.md` in full, the execution log, REVIEW-SCOPE, DESIGN.md, the complete product diff against HEAD, new presentation model, all new tests and changed documentation. Followed requesting-code-review criteria. No CodeGraph index exists in this checkout. Inspected source paths and existing task model contracts; used the provided VM fixture for narrow state probes. No browser was available to this reviewer; actual browser observations below are explicitly attributed to the main agent.

## Strengths

- The six approved UI areas are implemented as real HTML/DOM controls, using existing CSS tokens and the existing finance engine. No screenshot-based UI or parallel financial implementation was introduced.
- Quarter and month-three GP are separate; the GA/LE signals form one case while Freight remains independent. The original engine, source fixture, prior-period allocations and task lifecycle model are unchanged.
- Explicit Analyze starts the sample run; ordinary navigation preserves saved work and does not claim completed analysis. The presentation model derives completion states from actual plan/report/task evidence.
- Scenario uses one set of exclusion, notes and action controls. All-segment detail remains available. Report and task creation read the saved candidate rather than current unsaved edits; task sources remain frozen and exact proposal IDs drive focused collections.
- Default tasks are non-sample proposal-owner tasks, including actions assigned to others. Samples and kanban remain available explicitly. Original storage keys and contracts are retained without a migration or cleanup.
- The new tests exercise data derivation, state transitions, restore/storage failure, snapshot separation and proposal isolation. Source-level contract checks supplement, rather than replace, browser verification.

## Plan coverage

| Approved area | Source evidence | Code assessment |
|---|---|---|
| 1. Overview / GA signal | index.html KPI order; kpi-overview.js summary-derived metrics, one GA/LE card, separate Freight and native collapsed matrix | Covered; desktop visibility belongs to browser QA |
| 2. Case path / explicit analysis | app.js view routing, startCaseAnalysis, renderCaseNavigation; case-ui-model.js evidence-derived steps | Covered; visits alone do not complete work |
| 3. Conclusion-first analysis | app.js renderAnalysis: conclusion, key evidence and open finance questions precede expandable four-step trace | Covered; formulas and voucher trace retained |
| 4. Full Scenario workspace | index.html scenarioView; app.js renderScenario/savePlan/getProposalSnapshot | Covered; one live form, GA/LE/total impact and saved-version separation |
| 5. Naming / entry convergence | Report Q&A labels, contextual commandAction shared with Ctrl/Cmd+K, secondary Reset, compatibility Scenario/Actions routing | Covered; no new runtime or approval capability |
| 6. Proposal task hierarchy | task-board.js focusedProposal/openForProposal, default user collection, list/board, source viewer and role preview | Covered; exact ID filtering and unchanged lifecycle |

## Findings resolved during review

### Important / P2 — Legacy Actions tab opened an empty panel

Original reproduction: open Analysis or allocation inspector and activate Actions. app.js moved `actionsContent` to Scenario but the old tab still selected the now-empty `actionsTab`.

Fix reviewed at app.js:110–117: both legacy Actions and explicit review-actions route into the single Scenario action section, scroll to it and focus the section; index.html gives it `tabindex="-1"`. The new case-flow assertion verifies the compatibility route. No duplicate action controls were added.

### Important / P2 — Returning from a task's frozen source left its detail modal open

Original reproduction: task detail → Review source proposal → Return to current candidate. Source probe observed Scenario visible and comparison closed while `taskDetailDialog.open` remained true. The main agent independently reproduced the obstructing modal in a real browser.

Fix reviewed at app.js:331 and app.js:378: the explicit source-return action now carries `data-return-current-candidate` and closes the underlying task dialog before routing. Ordinary Close still returns to task detail. New regression checks both behaviors.

### Minor / P3 — Assignee preview caused an unnecessary first-click rejection when creating from a report

Original reproduction: choose an assignee preview in Tasks, leave for Report, then Create follow-up tasks. A fixture probe observed no creation dialog, Tasks opened, actor already reset to finance-reviewer, and a contradictory instruction to switch to finance-reviewer.

Fix reviewed at task-board.js:41: creation restores the proposal-owner perspective before opening the saved-candidate dialog. New task-board regression checks first-click opening and the resulting reviewer role. This is a local simulation role reset, not a change to production permissions.

### Main-agent finding — Freight dialog inherited collapsed details

Main agent observed an open but zero-sized dialog under collapsed matrix details. Reviewed fix: index.html:122 places the dialog in the body modal collection. case-flow.test.cjs parses the ancestor structure and requires a body-level parent. Both card and matrix event bindings retain the same dialog ID. Main agent must recheck actual visibility/close behavior after reload.

## Verification and limits

- Main agent reported full baseline/final regression success earlier in this session; this reviewer did not unnecessarily rerun the whole suite.
- During the executor's red phase, the new modal-return and actor tests failed as expected. After the final implementation landed, this reviewer ran `node --test case-flow.test.cjs task-board.test.cjs`: 2 files passed, 0 failed (Node v24.16.0).
- This reviewer ran `git diff --check HEAD -- . ':!video' ':!qa'` after the fixes: no output/errors.
- Final code fingerprint below includes the three review fixes and Freight placement. Source changed during review, so earlier intermediate assertions must not be treated as final evidence.
- The VM fixture does not model layout, native focus, dialog stacking or accessibility trees. Main agent must verify the exact repaired flows in a real browser, plus the approved 1280/1440 first-screen checks, 375/768 reflow, keyboard/reduced-motion behavior, and full saved-candidate-to-task lifecycle. No claim of final browser PASS is made here.
- No independent live browser observations or screenshots were produced by this reviewer.

## Reviewed source fingerprints (SHA-256)

| File | Hash |
|---|---|
| app.js | 71ae7ffbfba35bebea9c6d9868c2d3c0bda0b4990c03a4426c571d2e83b05f05 |
| task-board.js | b9ba786650178611f157be869b103da8ec9c8bb4cdb665537318de8b266aef87 |
| index.html | 364cceebd1c96e19be88a7f4e93607c4ab63496a13e0f5e81678eb8d6a77ed39 |
| case-flow.test.cjs | 1209b666c16295887a1c3a3dbf6f733818ea3008cd4c186381fb2df1cd01e5bc |
| task-board.test.cjs | 1cfd5d28a5f7de7e425f50a4d2daf5aefb54e84f041c1871e199c0ebb16ff635 |

## Final visual QA Pass A addendum — design system and functional integrity

**Verdict: PASS. Confidence: HIGH for source/design-system and scoped functional integrity. Blocking findings: none.** This addendum supersedes the earlier app.js fingerprint and the earlier statement that no screenshots were inspected. It does not claim an exhaustive visual-readability verdict; the separate Pass B reviewer owns that review.

### Evidence actually inspected

Applied visual-qa Pass A. Opened images directly with view_image: principal 1440px KPI, allocation, completed analysis, original/candidate Scenario, saved-version report, task list, frozen task source, task completion, empty tasks, Report Q&A, Knowledge, Studio, Market and Freight modal; 1280px KPI/Scenario; 768px Scenario; 375px KPI, analysis, Scenario, task journey, task detail/source and Freight. Reopened replacement mobile modal images and the final three Scenario images after repairs. This was a targeted design/functional sample, not a claim to have visually inspected every one of the 78 captures.

Independently read the manifest/validation JSON and recomputed all seven final source hashes: 78 manifest entries, 78 validated JPEGs, all signatures and exact dimensions valid, no recorded documentWidth greater than viewport width, all source hashes equal disk. final-browser-console.json contains empty workflow and cleanState arrays. Browser actions and console capture were performed by the main agent; this reviewer had no IAB access and independently inspected the saved images, DOM text, source and test behavior.

### Design and business integrity

- Real DOM is established by index.html native sections/buttons/forms/details/dialogs, dynamic app/task rendering and matching saved accessibility trees. The only raster image in the page markup is the Lenovo brand asset; financial cards, workflow, forms and tables are live elements, not screenshot substitutes.
- Existing tokens.css supplies the coherent paper/ink/accent/warning/danger palette, Geologica font family, type scale, spacing and radii. New case/impact/task styles reuse those tokens and reusable classes. The pre-existing Freight styling remains a scoped legacy exception; it is not a new design system.
- Direct images confirm the approved hierarchy and the existing Vantage visual language. Desktop KPI exposes quarter totals and the GA action; Scenario presents GA, LE and total with explicit Month 3/USD labels; Report shows the saved-version notice; task source exposes frozen notes, numbers and finance-review caveats. Independent tools hide the case journey. No feature is replaced with an image or fabricated financial resolution.
- CSS scrims and modal surfaces render correctly in the corrected captures. JPEG has no alpha channel; no PNG-alpha claim is made. Existing finite/reduced-motion behavior remains covered by earlier code/tests; this reviewer did not independently capture transition frame sequences or switch OS motion preferences.

### Repairs and their final evidence

1. **Resolved [evidence]: 375px modal images omitted the top layer.** Original freight-modal-375, task-detail-375 and task-source-375 JPEGs showed the underlying page while DOM snapshots included dialogs. Main agent traced this to document-coordinate clipping at (0,0) after page scroll, then captured the actual viewport using scroll offsets. Replacement images now visibly include Freight, task lifecycle and frozen source dialogs with Close controls. This was a capture defect, not a product modal failure.
2. **Resolved [product]: narrow journey word fragmentation.** Final max-width:40rem rule uses a horizontal strip with complete-word step labels and token spacing. app.js:215–222 only adjusts caseSteps.scrollLeft to reveal the current step; its ResizeObserver does not move the document. Direct refreshed analysis/scenario/task images show complete current-step labels. Independently reran case-flow.test.cjs after this change: 1 file passed, 0 failures, including narrow alignment and desktop no-scroll assertions.
3. **Resolved [product]: narrow impact values crowded into columns.** Final max-width:40rem impact rule renders Original/Candidate/Delta as three label/value rows, keeps amounts unbroken and uses existing spacing tokens. scenario-375 (07:23:36Z), scenario-impacts-lower-375 (07:23:43Z), and scenario-total-375 (07:24:28Z) were opened after the last CSS edit (07:22:30.337Z). They show complete GA/LE/Total values, including LE −1,075,406.28 and total delta 0.00; actions and all-segment disclosure remain below the compact summary.

### Freshness scope and final fingerprints

The final collection is **not** uniformly newer than the last CSS edit. Earlier desktop/state screenshots are retained as historical evidence for unchanged states. Narrow journey/modal replacements and the final Scenario impact captures cover the affected surfaces; current-build desktop/tablet regression captures complement the unchanged >=768px rules. Acceptance here uses that explicitly scoped delta plus source trace, not a false all-captures-fresh assertion. The stricter claim of a completely regenerated final visual suite is not established by this report.

Final authoritative bytes are recorded in final-source-hashes.json and independently matched to disk. Changed since the initial code review:

- app.js: `75e441c1f453e080b4c4ae6f6135b6b5bdddef4ad0f8d8eaf360a69848fa184b`
- vantage.css: `bbff7aca3bed63cc8abf51c3945b107b68b9761beb72f48e70dc65b96b422338`

No finance engine, sample data, task lifecycle or saved-snapshot rule changed in these narrow fixes. No new unresolved source or design/functional blocker was found.
