# Vantage case-flow design contract

This iteration preserves the existing Vantage UI and the approved 2026-10-31 plan. No finance engine, fixture, framework, font or runtime dependency changes.

## 1. Users and decision path
Finance reviewers discover a segment exception, inspect allocation, run the simulated trace, compare a candidate, save evidence and follow assigned actions. Assignees preview local feedback. Completion of an action never establishes a corrected ledger or closes finance review.

## 2. Tokens and typography
Use tokens.css: dark steel paper (--color-paper through --color-paper-4), ink and muted text, lime --color-accent for the primary action, --color-danger for negative amounts, --color-warning for open review. Geologica/system sans; tabular numeric figures. Type scale --text-xs through --text-3xl. Existing 4px cards, 999px pills and 1px rules remain. Spacing uses --space-xs/sm/md/lg/xl; no new palette.

## 3. Layout
New overview iteration: use compact configuration-backed BG, management report, Geo and period selectors. Do not show the profit-center code in the overview; disclose single-profit-center sample coverage in its source note. Scope changes must clear all stale sample values when no exact dataset is connected. Place the monthly matrix before trends; Geo, Region, Segment, RTM, Channel and Freight are permanently visible, with other rows expandable. The Dec-26 Segment sample alert links to case fiscal period 2026009 without asserting a calendar conversion. Ask Finance and Investigation Reports are display names; chat/reports route keys and financial report names remain unchanged.
Keep sidebar, breadcrumb, pinned monitors and existing report tools. KPI order: configurable scope, quarterly Revenue/net Cost/GP, one linked GA/LE case plus independent Freight sample, six-row monthly matrix with optional remaining rows, existing trends and quarterly definitions. Case views show five review steps. Scenario is a full main view with no inspector and a compact three-column impact summary ahead of detailed tables. Tasks default to local proposal actions in a list; samples and kanban remain explicit options.

## 4. Reusable components
Attention card: scope, engine-derived month-three GP, linked signal, one action. Case step: current location independently from evidence status; unavailable navigation explains prerequisites. Impact card: Original/Candidate/Delta for GA, LE and total, labelled 2026009 / USD. Task list row: action, assignee, due date, lifecycle state, latest feedback, frozen source. Native details retain optional calculation/matrix/filter information.

## 5. States
KPI scope has connected and no-reviewed-data states. Configuration lookup and provider-reported source scope must both match BG/report/Geo/period before showing data. No-data state clears metrics, cases, matrix lights, trend/quarter tables and sample-specific definition notes; returning to the supported scope restores the sample. Scope changes reset optional matrix/definition expansion. Earlier synthetic trend quarters never become reviewed selectable datasets or acquire the current case route. Investigation Reports wraps in the expanded sidebar without smaller type; Ask Finance keeps its report-rule, knowledge-source and simulated-answer explanation.
Calculation traced and Finance review open are separate labels. Compare available after trace or saved candidate. Saved candidate and report states derive from actual snapshots, never page visits. Unsaved changes retain last saved report/task inputs and display Uses last saved candidate. Task collection entry from creation uses exact proposal ID; sidebar opens non-sample tasks with Finance reviewer perspective. Demo samples retain five lifecycle stages.

## 6. Interaction and motion
Analyze cause is the explicit single action that prepares and runs the sample; navigation alone never runs it. Repeat navigation retains plan/report/form state. Rerun is a separate action. Old Scenario tab, voucher and task source entry share one route. Ctrl/Cmd+K activates the same contextual shortcut as the top trigger. Reset lives in a secondary menu with the existing confirmation. Preserve existing finite motion and reduced-motion handling.

## 7. Responsive and accessibility
At 1280/1440 desktop sizes show quarterly KPIs and GA amount/action, and all three Scenario impacts. At 768/375 stack compact cards; contain table overflow within scroll regions. Native buttons, labels, details, dialogs, visible token focus rings, status text and semantic headings remain. Never convey state by colour alone. New controls have explicit names and keyboard paths.

## 8. Boundaries and verification
Sample data, Simulated AI, Local task feedback and No ledger changes remain visible. Quarter GP differs from Month 3 GP. Candidate changes base only; GA improvement redistributes cost, LE remains open, total GP unchanged. Automated engine/presentation/routing tests plus real browser QA by the main agent. Existing broad typography/accessibility debt is outside scope; touched controls receive basic QA.

## Implementation refinements
At widths up to 40rem, each Scenario impact card uses three label/value rows for Original, Candidate and Delta. Each row separates its label from the right-aligned, non-wrapping amount with the existing medium gap; type size is unchanged. The three cards stay together before details. The 768px and desktop impact layout is unchanged.
At widths up to 40rem (640px at the default root size), the five-step case journey is a horizontally scrollable strip with 9rem minimum-width steps. Labels wrap at whole words. The current step is revealed by moving the strip only, including after resize; this does not scroll the document while a user edits content below. Five-step semantics and aria-current remain unchanged. The 768px and desktop layout is unchanged.
The overview amount and Review allocation button share one early decision row, verified visible together at 1280×800 without reducing type size. Old task sources open a read-only frozen proposal and optional attached report snapshot in the existing comparison dialog. Returning to the current editable candidate is explicit; historic tasks never restore their snapshot over current selections. Existing task snapshots without an attached report remain readable and explain the missing report attachment.
