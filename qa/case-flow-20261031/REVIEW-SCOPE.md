# Case flow UI review scope

Approved plan: `D:/MR Dictionary/小强/docs/superpowers/plans/2026-10-31-vantage-ui-case-flow-plan.md`.

Baseline: `517cebbdd2b51dab17493ed8849ff165ca4faefa`.

Original URL: http://127.0.0.1:4193/ . New URL: http://127.0.0.1:4194/ . Separate ports isolate browser storage. Do not reset or modify original-page storage.

## Required behavior

- KPI first viewport: quarter scope, Revenue / net Cost / quarter GP, GA month-three negative GP and explicit allocation CTA. Cost credit stays available and is already included in net Cost.
- One allocation case contains GA and LE linked signals. Freight remains separate.
- Allocation CTA carries GA / 2026009 / ROW / L0AUXG. Analyze action runs once and preserves saved work when revisiting.
- Analysis result puts conclusion and open finance questions before expandable calculations.
- Scenario is a full primary view, reachable from old entry points. Show original/candidate GA, LE and total GP together at desktop sizes.
- Scenario edits are not silently applied to saved report/task snapshots; unsaved state is explicit.
- Task creation starts from saved proposal, defaults to that proposal's tasks, protects against duplicates, and offers explicit sample switching and retained board.
- Task state and business review state are separate; Completed is not ledger correction.
- Independent Report Q&A / Knowledge / Studio / Market screens must not carry misleading case-specific scope. Existing functions remain reachable.

## Financial controls

- Quarter Revenue 2,808,897.00; net Cost 2,584,185.24; quarter GP 224,711.76 USD.
- GA month-three GP: -235,412.32 -> +197,960.36; delta +433,372.68 USD.
- LE month-three GP: -497,576.04 -> -1,075,406.28; delta -577,830.24 USD.
- Total month-three GP stays -727,638.08 USD. No posted Revenue, earlier allocations or source-data edits.
- Distinguish fiscal period 2026009 from Gregorian calendar dates; no invented mapping.

## Capture inventory for actual implementation

Enumerate and save the actual revised surface names before reviewing. At minimum include:

1. KPI default, expanded matrix, Freight modal.
2. Allocation view and segment detail.
3. Analysis ready/running/completed, expanded calculations and voucher modal.
4. Scenario original, selected candidate, saved candidate, changed-after-save, all-segment detail.
5. Report empty/generated, report source return.
6. Tasks empty/user collection, creation dialog, current-proposal list, board, sample collection, detail/assignment/feedback and completion.
7. Report Q&A, Knowledge, Studio, Market as navigation-regression screens.
8. Secondary menu/reset confirmation if affected.

Required viewports: 1440x900 and 1280x800 for first-viewport requirements; 768x1024 and 375x812 for reflow and navigation. Enumerate captures per viewport and state. Fresh screenshots must follow the final source edit. Browser logs, DOM state and screenshot observations must be recorded as actual findings; no synthetic PASS.

## Baseline media and current Git

`before-kpi-1440.jpg`, `before-allocation-1440.jpg`, `before-scenario-1440.jpg`, `before-tasks-1440.jpg` are original version captures. Their JPEG signatures were verified and file extensions corrected before review. They show the pre-existing browser state, not a clean reset. They are comparison context, not pixel-matching targets for the redesign.

Fresh clone produced existing Git LFS raw-blob/pointer warnings. Initial Git status lists modified `video/voice/S03.wav` through `S14.wav` and `video/voice/narration.wav`. These are pre-existing checkout representation issues; this UI change must leave them untouched.

## Evidence contract

Record capture path, viewport, route/state, test steps, actual observed result, source revision timing and limitations. Code review and visual review remain independent. Report PASS / REVISE / FAIL with concrete findings, separating product defects from bad/stale evidence. Do not edit product source from a QA/reviewer role.
