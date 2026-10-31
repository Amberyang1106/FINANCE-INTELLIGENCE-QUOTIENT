# Main-agent browser verification

Date: 2026-10-31, Asia/Shanghai. Base: `517cebbdd2b51dab17493ed8849ff165ca4faefa`; implementation remains uncommitted on `codex/vantage-case-flow`.

## Environment and evidence

- Original preview: http://127.0.0.1:4193/ . Revised workflow QA: http://127.0.0.1:4194/ . Clean-state testing: http://127.0.0.1:4195/ . Clean user preview: http://127.0.0.1:4196/ . Separate origins isolate local browser state; original storage was not reset. The user preview contains no QA task feedback or QA decision notes.
- The main agent operated the actual in-app browser through its documented API. Subagents cannot access this chat's IAB session, so independent reviewers inspect saved screenshots, DOM snapshots, logs and source. This is a tool-context boundary, not a disconnected user browser.
- `capture-manifest.json` enumerates 78 final screenshot/DOM pairs. `capture-validation.json` independently parses every JPEG header and verifies exact viewport dimensions. All signatures and dimensions match; recorded document width does not exceed the tested viewport.
- Viewports: 1440×900, 1280×800, 768×1024, 375×812. At 1280×800 the complete Review allocation button bounds were top 654.44 / bottom 694.44, within the first viewport.
- The first acceptance set followed the main feature freeze. Later repairs changed only the narrow-screen journey strip/current-step horizontal visibility and <=640px impact-card layout. Affected 375px case views and impact cards were recaptured; fresh desktop/laptop/tablet regression images confirm the unchanged wider layout. Retained desktop state images therefore predate these narrow-only edits; they are not represented as all newer than the final CSS edit. `final-source-hashes.json` identifies the final reviewed source bytes, and independent reports state this scoped evidence limitation.
- Default browser screenshot normalization initially scaled scrollbar-bearing viewports; those artifacts were replaced using explicit screenshot clips. A second capture correction uses document-space clip coordinates `(scrollX, scrollY)`, rather than `(0, 0)`, to capture the actual scrolled viewport and top-layer dialogs. Relevant mobile/modal/trend states were recaptured and visually checked. Final validation has no mismatched images. Interim files are diagnostic evidence, not acceptance screenshots.
- `final-browser-console.json` records no warnings or errors for the workflow and clean-state tabs. Some locator calls hit tool deadlines; the agent reread current DOM state and continued instead of treating an unconfirmed action as success.

## Observed behavior

| Scenario | Actual result |
|---|---|
| Dashboard | Quarter Revenue 2,808,897.00, net Cost 2,584,185.24 and GP 224,711.76 USD are visible; GA month-three GP −235,412.32 and Review allocation precede trends/matrix. |
| Independent Freight | View alert opens a visible 560×442.71 dialog while the complete matrix stays collapsed. It remains a separate hypothetical sample. |
| Complete matrix and trend | Matrix expands; top/bottom rows and June Freight light remain available. 3/5-quarter selection is retained; stable 3-quarter screenshot includes the selected control and chart values. |
| Allocation entry | Dashboard opens Service allocation for ROW / L0AUXG / 2026009. GA and linked LE form one case. Segment drilldown remains available. |
| Explicit investigation | Analyze cause starts the sample without a second synonymous click. Navigation alone does not run a fresh investigation. Final-source Start analysis also progressed through four checks to the completed result. |
| Investigation result | Calculation traced and Finance review open are separate. Conclusion and key evidence precede expandable calculation details; voucher/source information remains accessible. |
| Scenario | Full main-view comparison shows GA −235,412.32 → 197,960.36, LE −497,576.04 → −1,075,406.28 and total −727,638.08 → −727,638.08 USD. No total-profit increase is implied. |
| Saved versus unsaved | After saving a candidate and report, an unsaved note was entered. The report still contained the saved note, omitted the unsaved note, and displayed the saved-version warning. |
| Task creation and duplicate prevention | Report creation produced four tasks for its saved proposal and selected that proposal's collection. Reopening creation disabled already-created actions and the submit button; no duplicate was created. |
| Task lifecycle | Real UI actions assigned a task, switched to the local recipient preview, received it, started it, and completed it with evidence. All five events appeared in the handoff log. Completion retained open finance review and no-ledger-change text. |
| Frozen source | Task source retained saved notes and amounts, omitted the unsaved note, and attached the original report where available. Ordinary source Close returned to task detail. Return to current candidate closed both modals and opened Scenario. |
| Legacy Actions | Inspector Actions enters Scenario and focuses the Follow-up actions region; it no longer opens an empty shell. |
| Role preview and creation | After recipient preview, entering Reports and clicking Create follow-up tasks opened the creation dialog on the first click with the proposal-owner context. |
| Samples and board | Explicit Demo samples shows the five sample stages; My proposal tasks stays separate. List/kanban switching remains available. |
| Independent tools | Report Q&A, Knowledge, Studio and Market remain reachable without the case-specific workflow strip. Their pages were captured at all test widths. |
| Narrow journey and amounts | At <=640px the journey scrolls horizontally without splitting words and keeps the current step in view. Original/Candidate/Delta use label/value rows in impact cards, preserving exact amounts without squeezing the LE value into three columns. Desktop/tablet layout remains unchanged. |
| Empty state | A separate clean origin showed an empty user-task collection and a report prerequisite explanation without deleting existing browser data. |
| Reset | Reset remains in Workspace options, opens the existing confirmation, and was cancelled with Keep working. No user history was cleared. |

## Regression and scope checks

- Main agent reran the full `npm test` after all product fixes: 10 test files passed, 0 failed, 0 skipped.
- `git diff --check -- . ':!video'` returned no whitespace errors.
- Financial engine and fixture paths `allocation.js`, `ISG-SERVICE-DEMO-DATA.json`, and `demo-data.js` have no diff.
- Existing WAV/LFS checkout representation changes remain the initial baseline issue, not UI work. No commit, push, merge or deployment was performed.

## Review status and limits

Independent code review approved the final source. Independent functional/design-system and visual-readability reviews are recorded separately. Do not use this main-agent report as a replacement for their verdicts.

This verifies the local demo with reviewed sample data. No production data, live AI, external notification, real accounting change, or actual multi-user authorization was exercised. Reduced-motion logic is covered by existing automated tests; OS-level preference switching was not performed during manual browser checks.
