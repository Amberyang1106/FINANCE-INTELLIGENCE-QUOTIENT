# UI case-flow execution

Approved plan: ../../docs/superpowers/plans/2026-10-31-vantage-ui-case-flow-plan.md (parent workspace).
Repository: D:/MR Dictionary/小强/finance-intelligence
Branch: codex/vantage-case-flow. Baseline: 517cebbdd2b51dab17493ed8849ff165ca4faefa.

## Initial state
Parent ran npm test: all seven existing files passed. Existing video/voice/S03.wav through S14.wav and narration.wav show modified because of pre-existing Git LFS pointer/blob mismatch. These media are not read, edited, cleaned or included in this change. Parent owns qa/case-flow-20261031/ and preview port 4194; old 4193 stays unchanged.

## Progress
- [x] Task 1: presentation model and overview
- [x] Task 2: case navigation and entry naming
- [x] Task 3: conclusion-first analysis
- [x] Task 4: standalone Scenario comparison
- [x] Task 5: current-proposal task list and explicit samples
- [x] Task 6: automated regression, main-agent browser verification, independent code/design integrity review and independent visual-readability review complete within the documented evidence scope

Implementation uses frontend, executing-plans, test-driven-development and verification-before-completion guidance. Existing approved design and user authorization resolve repeated design-approval instructions; no commit, push, merge, deployment or new dependencies.

## Evidence
### Automated verification

- Baseline: parent ran all seven existing test files successfully before implementation.
- Red: case-ui-model test failed because the presentation module did not exist; case-flow failed because explicit startCaseAnalysis did not exist; overview failed because Quarter GP/case card were absent; task-board failed because exact proposal navigation did not exist. Each then passed after implementation.
- Source-view regression first failed because frozen source review did not open; passed after adding the snapshot viewer and attached saved-report text.
- Final `npm test`: exit 0, 10 test files passed, 0 failures (Node v24.16.0). Includes 42 financial calculation checks, 22 knowledge checks, 25 monitor checks, 65 task lifecycle checks, 16 finite-motion checks, 36 story-motion checks and overview/model/behavior suites.
- `git diff --check -- . ':!video' ':!qa'`: exit 0, no whitespace errors.
- New behavioral coverage: overview entry fixes closing period; explicit Analyze cause starts once; repeat navigation retains the saved plan; visits alone do not complete steps; changed notes or cancelled exclusion do not change saved report/task inputs; reload restores saved candidate/report without inventing analysis completion; unavailable localStorage retains session functionality; task collection excludes samples by default; exact proposal IDs exclude other historical tasks; list and board remain selectable; all new static HTML IDs and existing script bindings are checked, with dynamic markup declarations handled explicitly.

### Browser evidence owned by parent

Preview: http://127.0.0.1:4194/ (new); old 4193 unchanged. Evidence folder: qa/case-flow-20261031/.
Midpoint checks reported by parent: initialization and navigation work after restoring breadcrumb; 1440×900 overview CTA visible; 1280×800 CTA top 654.44 / bottom 694.44 (fully within viewport); 1280 Scenario shows GA/LE/Total together and correct engine amounts. Final end-to-end flow, mobile/tablet, keyboard, dialogs and screenshots await parent acceptance; this report does not claim those passed.

## Changed files and responsibilities

- `index.html`: overview hierarchy, native collapsed matrix, case journey, standalone Scenario form, Report Q&A naming, secondary Reset menu and task controls/list.
- `case-ui-model.js`: pure engine-result summary and evidence-based step statuses; no storage or finance rules.
- `app.js`: shared Scenario route, explicit single-action investigation, conclusion-first trace, candidate freshness, saved report/task snapshots and frozen source viewer.
- `kpi-overview.js`: quarterly Revenue/net Cost/GP and one linked GA/LE case derived from existing models, separate Freight alert; existing trend charts preserved.
- `task-board.js`: default proposal-owner collection, exact proposal source filter, list/kanban, explicit samples, latest feedback and frozen-source links; task lifecycle/model unchanged.
- `knowledge-ui.js`: Report Q&A title.
- `vantage.css`: token-based case, summary, impact and task-list components, responsive layouts and focus-compatible native controls.
- `case-ui-model.test.cjs`, `case-flow.test.cjs`, `task-board.test.cjs`, `kpi-overview.test.cjs`, `package.json`: new behavior and retained seven-file regression entry.
- `DESIGN.md`, `README.md`, `HANDOFF.md`, this log: design contract, operation path, evidence and limitations.

No change to allocation.js, demo-data.js, source JSON, monitor-model finance behavior, task-model lifecycle rules or video files. No new dependency, migration, commit, push, merge or deployment.

## Financial and product checks

Quarter total GP: 224,711.76 USD. 2026009 Month 3 total GP: −727,638.08 USD, unchanged by candidate. GA: −235,412.32 → 197,960.36 USD. LE: −497,576.04 → −1,075,406.28 USD. These are engine outputs checked by tests; no alternative calculation engine was added. Cost credit remains an auxiliary source-credit metric already included in net Cost. Month 1–2 allocations, posted revenue, copy costs and cost pool stay fixed. Calculation traced, Finance review open and task completion remain distinct.

## Design choices, known limits and retrospective

- Source return opens a read-only frozen proposal/optional attached report in the existing modal, with an explicit route back to the current editable Scenario; this avoids overwriting the current candidate with a historical task snapshot. Old tasks without a stored report attachment explain that absence.
- Amount and CTA share an early row to meet the 1280×800 first-screen acceptance without smaller type. All three Scenario impacts precede detailed tables.
- A midpoint runtime error exposed that the permissive VM fixture could hide a missing HTML breadcrumb. Fixed the DOM and added a contract scan over static script IDs and dynamically declared IDs. Browser QA remains essential for layout and real controls.
- Full production AI, notifications, multiuser permissions, approvals, finance policy confirmation, ledger correction and video rework remain outside scope.
- Existing voices remain modified in Git for the pre-existing LFS condition. Parent QA artifacts are independent files. Neither is conflated with this source change.

## Final acceptance handoff

### Narrow impact amount readability repair

Parent's corrected 375px captures revealed that the LE candidate amount −1,075,406.28 overflowed the three equal-width metric columns and visually ran into adjacent values. Added a max-width:40rem style override: Original, Candidate and Delta now occupy separate label/value rows with explicit spacing and non-wrapping amounts. Font size and the three-card summary grouping are retained. No HTML, financial, task or report behavior changed; 768px and desktop styles remain unchanged. Parent should recapture only the 375px Scenario summary/impact shots, especially the lower LE/Total section.

### Narrow journey readability repair

Independent 375px review found the fixed five-column journey split words across multiple lines. At max-width 40rem (640px with the default 16px root), changed only the case-step component into an overflow-x strip with 9rem step widths and normal word wrapping. A presentation-only helper keeps aria-current's step horizontally visible after render/resize; it never scrolls the document. No finance, task or report state changes. Added narrow horizontal visibility/no vertical jump and desktop no-scroll assertions. Parent should recapture 375px case views (Service allocation, Analysis, Scenario, Reports and Tasks); 768px/1280px/1440px CSS is unchanged. Modal screenshots were a capture-coordinate issue confirmed by parent, so no modal changes were made in this repair.

### Final QA repair: Freight modal containment

### Final review repair: compatibility and modal return

Independent code review found the legacy inspector Actions tab still routed to its now-empty panel after actions moved into Scenario. Routed both that tab and recommended-action links to the shared Scenario form, then focus/scroll the Follow-up actions section. Browser review also found Return to current candidate left taskDetailDialog open behind the source modal. Added an explicit return marker that closes source and task detail before Scenario; ordinary source Close preserves task details. Finally, creating tasks from a report/candidate after assignee preview now restores Finance reviewer and opens the creation dialog on the first click. Assignment and assignee feedback still use the unchanged model permission checks. Added red/green behavior regressions for all three findings, including source Close versus Return, action-section focus/position and stale-role creation. Full npm test after source changes: 10 files passed, 0 failed; diff --check clean. Browser recheck remains owned by parent.

Parent browser evidence found View alert set freightAlert.open=true while its size was 0×0 and the page was blocked by a modal backdrop. The modal was nested beneath the collapsed monthly matrix details. Added a markup-ancestor regression; its red run failed with `Freight dialog must not inherit collapsed details`. Moved the existing dialog unchanged into the body-level modal collection, preserving IDs and both matrix/card event bindings and leaving the matrix collapsed. The regression now also requires the dialog's direct parent to be body. Re-ran `npm test`: all 10 files passed, 0 failures. `git diff --check` excluding video/qa: exit 0. Real-browser visible dialog dimensions and accessibility await parent recheck. Only product markup moved; no financial or application state changed.

## Final acceptance completed by main agent

All approved implementation tasks are complete. The main agent reran the final full `npm test`: 10 files passed, 0 failed or skipped; `git diff --check` is clean. Financial engine and source fixtures have no diff. Actual browser checks covered the complete saved-candidate-to-task lifecycle, saved/unsaved snapshot isolation, duplicate prevention, legacy entry points, nested-source return, role preview, separate samples, empty states and four viewport sizes.

Independent code review: APPROVE. Independent design/functional integrity Pass A: PASS. Independent visual readability Pass B: PASS, with no remaining product findings. Evidence: `qa/case-flow-20261031/code-review.md`, `qa-report.md`, `manual-verification.md`, 78 screenshot/DOM pairs, matching JPEG validation, source fingerprints and clean console exports.

Evidence scope: affected narrow views were recaptured after the <=640px repairs. Some unchanged desktop state captures predate the final narrow-only CSS edit; fresh wider-layout regression captures and source-guard review support their unchanged scope. Do not describe all state images as after-final-edit captures. Reduced-motion behavior has automated coverage; no OS preference was changed for manual testing. No production data, actual ledger change or real external AI/notification was tested.

Clean user preview: http://127.0.0.1:4196/ . Original comparison: http://127.0.0.1:4193/ . The clean preview has no QA notes/tasks, and original browser storage remains unchanged. Changes remain local on `codex/vantage-case-flow`; no commit, push, merge or deployment occurred. Existing WAV/LFS checkout-state warnings remain untouched for later media work.
