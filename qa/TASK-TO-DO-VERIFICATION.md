# Task To-do verification

Date: 2026-10-28. Branch: feature/proposal-task-board.

## Archived baseline

New Lenovo layout and Monitor Studio / Market committed as c082232 and fast-forward merged into main before this iteration. Task To-do changes remain on the feature branch for review.

## Automated checks

- node task-model.test.cjs: 65 checks passed. Creation, partial creation, duplicate prevention, immutable proposal snapshots, actor-specific feedback, legal transition order, reassignment, due-date changes, completion notes, restore, sample factory and preservation of existing task IDs/progress.
- node motion.test.cjs: 16 passed.
- node allocation.test.cjs: 42 passed.
- node knowledge.test.cjs: 22 passed.
- node monitor-model.test.cjs: 25 passed.
- Total: 170 checks. app.js, task-model.js, task-board.js and task-samples.js parse successfully. All 191 static HTML IDs are unique; referenced local resources exist. git diff --check passes.

## Browser acceptance

Main preview: http://127.0.0.1:4173/ in the in-app browser.

1. With no saved candidate, Create from saved proposal routes to Scenario and explains the prerequisite. Select exclusion, enter decision notes and Save candidate plan.
2. Scenario opens the task preview with the saved scope, voucher and selected follow-ups. Create four tasks from three selected follow-ups plus the base-treatment decision. Reopening disables already-created actions; repeated saving of the same proposal content does not create duplicates.
3. Assign the posting-background task to yangtt16. Another assignee preview has no receipt/progress form. yangtt16 receives it, starts work and completes it with a result note. An empty completion note leaves the task In progress. Five recorded events identify the proposal owner and responding person.
4. Assign the counterpart task to Maya; record her receipt; reassign to Alex. The task returns to Assigned, waits for Alex and no longer accepts Maya feedback. Alex receives and starts work. Earlier events remain in the log; the current stepper uses the new assignment/receipt.
5. Assign the segment task to Maya; leave it waiting for receipt. Keep the base-treatment task Created. These four proposal tasks are retained in My proposal tasks.
6. Personal inbox, assignee/stage filters, Reference search and open-task navigation count work. The count badge includes all collections; overview counts reflect the selected collection.
7. Unsaved proposal changes produce a preview warning. After saving changed notes, an existing task still shows the original source notes and evidence. Open source voucher displays document 5900018271, user yangtt16 and Reference 5900018392. Restoring the original proposal content still deduplicates against its existing tasks.
8. Generate the original report; its Create proposal tasks entry reads the saved candidate and reports existing tasks rather than duplicating them. Refresh restores task states, assignments, due dates and handoff events.
9. Five built-in samples are added once alongside the existing four proposal tasks. Samples are explicitly labeled SAMPLE and have one task in each of Created / Assigned / Received / In progress / Completed. My proposal tasks still contains the original four tasks.
10. First-use test uses a temporary local preview on port 4174, giving a separate browser storage origin. It starts with five samples without requiring an existing candidate. Change the Created sample to Assigned then Received; refresh still shows five tasks, including the changed progress. Samples are not regenerated or reset. The temporary tab and server were closed after verification.
11. Desktop 1440×1000: five columns, snapshot details, progress stepper and handoff log are usable. Phone 390×844: board scrolls within its own area, lifecycle steps become vertical, and there is no document or task-dialog horizontal overflow. Temporary viewport override is reset at handoff.
12. Legacy regression: original candidate GA GP remains 197,960.36 USD and total month-3 GP stays −727,638.08 USD. Monitor Studio still renders the existing two cards in this browser, Market exposes its three curated templates, and MR Logic remains available. Existing financial/knowledge/custom-monitor checks continue to pass.
13. No script errors recorded during the verified final scenarios. Sample first-load also records no script errors.

## Retained samples

| ID | Action | Assignee | Initial state |
| --- | --- | --- | --- |
| DEMO-001 | Contact the posting user | yangtt16 | Completed |
| DEMO-002 | Verify the positive counterpart | Alex Chen | In progress |
| DEMO-003 | Check the LE segment assignment | Maya Patel | Assigned |
| DEMO-004 | Check currency differences if relevant | David Kim | Received |
| DEMO-005 | Confirm the allocation-base treatment | Unassigned | Created |

The samples are editable and initialized only once. Current progress is saved. The FX sample is a relevance-check request; it does not assert that an FX residual exists. The existing main-preview four proposal tasks were not overwritten.

## Evidence

- task-to-do-samples.jpg: five-stage sample board.
- task-handoff-log.jpg: retained human handoff events.
- task-to-do-mobile.jpg: narrow lifecycle layout.

## Delivery boundaries

Browser-local interaction demo with simulated people and feedback. No real assignment notification, identity authentication, email, task server or multi-user sync is connected. Task completion records an outcome; it does not update a journal, execute production allocation or automatically clear the fixed monitor exception. Proposal evidence is copied into a task snapshot. Reset demo removes only the original financial candidate/report and keeps task history. Unreadable existing task storage is left unchanged; samples then operate in the current session.
