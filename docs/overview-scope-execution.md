# Configurable KPI overview and matrix update

## Scope and source check
User authorized this iteration. Keep all prior work, saved browser state, financial engine/fixtures and media. No commit/push/deploy. Parent QA uses 4197; existing user page 4196 stays unchanged.

Fixture scope is ROW / period-year 2026 Q3 / 2026007–2026009 / USD, one profit center. The source explicitly says this is not an asserted company FY name. There is no authoritative Dec-26 calendar conversion. Therefore Dec-26 is an explicit illustrative display-month link to case period 2026009. KPI source notes disclose single-profit-center coverage without displaying its code.

## Progress
- [x] Scope configuration, exact provider lookup and unsupported empty states
- [x] Six always-visible matrix rows, remaining rows expandable, Segment Dec-26 route
- [x] Ask Finance and Investigation Reports visible labels
- [x] Behavior tests and npm test
- [ ] Parent final browser acceptance and independent review

## Decisions
Only exact configured reviewed scope shows existing quarterly numbers, case, monthly sample lights and trend context. Selecting any other BG/report/Geo/quarter clears those views, including specific Q3 definitions. Earlier synthetic quarters remain labelled in the current-scope trend context only; selecting them does not open the current case. The first five existing matrix rows plus Freight always remain visible; extra rows expand inside the matrix without hiding either anomaly.

## Parent acceptance

Parent independently reran the complete suite: 12 test files passed with zero failures or skips. Real-browser checks covered the four unsupported scope changes and restoration, matrix 6/22/6, Segment and Freight entries, naming, and 1280/768/375 pixel viewport widths. The final 28 screenshot/DOM pairs and eight source hashes were independently reviewed: Code APPROVE, visual Pass A PASS, visual Pass B PASS, with no remaining blockers. Initial stale capture frames were replaced and reviewed again; product source stayed frozen. See [manual evidence](../qa/overview-filters-20261031/manual-verification.md), [code review](../qa/overview-filters-20261031/code-review.md) and [visual review](../qa/overview-filters-20261031/qa-report.md).

Current preview: http://127.0.0.1:4197/. Local branch remains `codex/vantage-case-flow`; no commit, push, merge or media edit was performed. The existing audio/LFS checkout warnings remain outside this UI change. Multi-BG source integration, company-wide aggregation and fiscal-to-calendar conversion remain future work.

## Implementation and files

- `kpi-scope-config.js`: configuration-only BG/report/Geo/quarter catalog and exact dataset registry. Options are not assertions of connected data. One connected dataset: ISG / isg-service / ROW / 2026-Q3. Dataset metadata declares single-profit-center coverage and the illustrative Dec-26 → 2026009 relationship.
- `kpi-overview.js`: dependent report selector, exact source-provenance validation, explicit empty/restored states, optional 16 matrix rows, two independent alert routes, retained trend window/geometry and dynamic source/definition notes.
- `index.html`: compact selectors, visible matrix before Revenue trend, six priority rows controlled by renderer, empty-state container and feature display names. No profit-center code in the overview section.
- `app.js`: feature breadcrumb labels and guard preventing an unsupported overview scope from opening the fixed allocation case via card/shortcut route.
- `knowledge-ui.js`, `case-ui-model.js`: stable Ask Finance heading and Investigation Reports case-step display name, route keys unchanged. Existing financial dictionary/report names remain intact.
- `vantage.css`: token-based selector/empty-state layout, contained matrix scrolling, two-column selectors at ≤40rem and long Investigation Reports label wrapping without smaller type.
- `kpi-scope.test.cjs`, `kpi-scope-ui.test.cjs`, `kpi-overview.test.cjs`, `package.json`: scope provenance/negative cases, real VM rendering and existing geometry regression in the full test command.
- DESIGN, README, HANDOFF and this record document the current UI and data boundary. No financial engine, source fixture, audio, video or stored user state was edited.

## Minimum future-data interface

Add selection options and an explicit `datasets` entry to `kpi-scope-config.js`, then register a provider function under `window.FPAKpiDataProviders[providerId]` before `kpi-overview.js` loads. The provider receives `(selection, dataset)` and returns:

```javascript
{
  sourceScope: { bg, report, geo, period },
  coverage: 'single_profit_center',
  quarters: [{ label, revenueCents, costCents, creditCents, reviewed }],
  caseSummary // optional; only a separately attached compatible case may use it
}
```

Amounts remain integer cents from the actual connected source/model. The provider sourceScope must exactly match selection; an attached selected-quarter row must have reviewed=true. The default provider derives its Geo and period-year/quarter from the unchanged fixture. Merely adding another selector option or redirecting a registry entry to the existing provider does not make data available. Historical synthetic quarters remain reviewed=false and cannot satisfy the selected dataset. New financial case/matrix semantics require their own confirmed facts; this interface does not implement external connectivity, aggregation, ledger changes or governance approval.

## Actual verification

Red/green evidence: the configuration test first failed because the configuration module was missing; the UI suite first failed because the selection controller was absent. A deliberately misrouted PRC configuration then reproduced stale-provider relabelling; the provenance guard rejects it after repair.

`npm test` after final feature changes: exit 0, 12 files passed, 0 failed. Original ten files retained. New tests cover exact config scope, unsupported BG/report/Geo/history quarter, clearing metrics/case/chart/table/matrix/definition values, restoring the supported scope, six priority rows and no duplicate Freight, 22-row expansion and aria state, Segment Dec-26 alert in column 9, shared 2026009 case routing, overview code removal, matrix-before-trend ordering, visible labels and breadcrumb keys. Existing 3/5-quarter credit bar geometry and financial reconciliation remain passing.

`git diff --check -- . ':!video' ':!qa'`: exit 0, no errors.

Parent interim real-browser facts: PRC shows empty state and ROW restores data; matrix 6 → 22 → 6 works; Segment Dec-26 opens Service allocation / fiscal period 2026009; profit-center code appears in detail only. Final screenshots and independent acceptance must be taken after SOURCE_FROZEN. Parent owns qa/overview-filters-20261031/ and new preview4197; original4196 is untouched.
## Remaining limits

Only one existing reviewed synthetic sample is connected, not a multi-center BG/Geo total. Historical trend values remain synthetic context. No authoritative calendar conversion of 2026009 to Dec-26 was supplied; the display-month link is explicitly illustrative. No production monitoring checks or approval/ledger actions were added. Current selection is local UI state; prior saved proposals/tasks/chats are retained. Initial WAV/LFS working-tree differences and parent QA files are not changes from this implementation.
