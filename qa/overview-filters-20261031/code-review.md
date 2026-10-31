# Independent review — overview filters and matrix

Code verdict: **APPROVE**. Visual Pass A: awaiting final browser evidence. No Critical or Important source findings. Prior case-flow changes are treated as the accepted baseline, not new findings in this iteration.

## Reviewed scope

Read REVIEW-SCOPE.md, docs/overview-scope-execution.md, DESIGN.md, kpi-scope-config.js, kpi-overview.js, the changed app/knowledge/HTML/CSS paths, scope tests and package test entry. Reviewed only this iteration's configurable scope, unsupported state, matrix presentation/shared entry and feature naming. Product source remained read-only; this is the reviewer's only written artifact.

## Strengths and required behavior

- `kpi-scope-config.js` centralizes selection options and dataset lookup. A selectable option does not imply connected data.
- `kpi-overview.js:17-25` requires both an exact configured dataset and an exact provider-reported BG/report/Geo/period match, plus a reviewed selected-quarter row. A registry entry mistakenly pointed to the ROW provider cannot relabel its figures as PRC.
- `kpi-overview.js:61-67` clears metric, allocation case, chart, quarter table, matrix and scope-specific definition content, disables the trend selector and hides the entire data panel for unsupported combinations. Returning to the connected scope renders the same reviewed sample again. Single-profit-center coverage remains explicitly disclosed without exposing its code on the overview.
- `kpi-overview.js:27-40` renders six priority rows (Geo, Region, Segment, RTM, Channel, Freight) with sixteen expandable rows and no duplicate Freight. Both anomaly rows remain present after collapse. Matrix precedes trends in index.html.
- The Segment Dec-26 red button uses the same `data-review-allocation` route as the GA card. app.js guards unsupported overview scopes; the shared route sets closing period 2026009 and opens allocation without running an analysis. The display-month note explicitly disclaims a fiscal-to-calendar conversion.
- Ask Finance and Investigation Reports appear in navigation, accessible names, headings and breadcrumbs; case-ui-model uses the latter step label. Internal `chat` and `reports` route keys and prior storage remain compatible. Existing report-rule question wording describes the action rather than retaining the old feature name.
- New selector/empty-state/matrix styles use the existing tokens and live DOM controls. No parallel financial calculation or image-based UI was introduced.

## Verification

Independently ran `node --test kpi-scope.test.cjs kpi-scope-ui.test.cjs kpi-overview.test.cjs`: 3 test files passed, 0 failed. Checks include provider misrouting, unsupported report/BG/Geo/history quarter, empty/restored containers, matrix 6/22/6, accessible expanded state, Dec-26 column 9, shared route and naming. Retained chart geometry/reconciliation tests passed.

`git diff --check HEAD -- . ':!video' ':!qa'` produced no errors. `allocation.js`, `demo-data.js`, and `ISG-SERVICE-DEMO-DATA.json` have no diff. Existing media/LFS changes were excluded and not read.

One evidence inventory correction was sent to the main agent: case-ui-model.js also changed its display label and should be included in source-hashes.json. This is not a product blocker.

## Limits

Only ISG / ISG Service / ROW / 2026 Q3 has a connected reviewed sample. Configuration options are not a claim of connected business data or full BG/Geo aggregation. Future providers still need confirmed financial semantics; external integration, production monitoring and calendar conversion are not implemented or claimed. No browser was controlled by this reviewer; final Pass A will combine source review with the main agent's final screenshots/DOM evidence.

## Visual Pass A — initial final-set review

**REVISE [evidence]. Code approval remains unchanged.** Directly opened all 28 images enumerated in captures.json. Normalized native screenshot sizes/aspect ratios are accepted and are not the finding. Twenty images have no design/functional blocker; eight cannot substantiate their claimed state:

| Capture | Actual pixels / required correction |
|---|---|
| empty-geo-1280.jpg | Large uncomposited blank area and old GA card fragment at bottom; recapture settled PRC empty state. |
| matrix-expanded-1280.jpg | Still six rows and Show all 22; recapture actual expanded state. |
| matrix-expanded-bottom-1280.jpg | Lower half incompletely composited; recapture settled expanded footer. |
| matrix-recollapsed-1280.jpg | Still expanded bottom rows and Show only 6; recapture the six-row result. |
| ask-finance-1280.jpg | Shows the matrix, not Ask Finance; recapture after route paint. |
| reports-1280.jpg | Shows Ask Finance, not Investigation Reports; recapture after route paint. |
| segment-case-1280.jpg | Allocation metric/table contents have not rendered, consistent with capture during entry animation; capture settled detail state. |
| empty-375.jpg | Still shows ROW selection and KPI values rather than unsupported/empty state; recapture correct settled selection. |

These are captured-frame/state mismatches, distinct from product defects. Suggested evidence repair: wait for the requested DOM state and settled rendering, then capture in a subsequent browser call and directly inspect the result. Do not repair a correct product merely to compensate for stale/native frames.

Accepted observations from the other images: real token-based 4-column/2-column selectors, scope-specific empty states at desktop/tablet, first-screen desktop GA action, explicit single-profit-center limitation without its code in overview, retained code in mobile allocation details, accessible six-row matrix with internal horizontal scrolling, Segment Dec-26 and independent Freight alerts, and complete Investigation Reports wrapping in desktop sidebar and mobile heading. Final Pass A remains pending correction of the eight artifacts above.

## Final Pass A — PASS

**Code APPROVE; design-system/functional Pass A PASS. Confidence: HIGH. No unresolved Critical, Important, Minor or evidence blockers.** This final section supersedes the initial visual REVISE and pending status above; the earlier findings remain as the audit trail.

All 28 enumerated screenshots were directly opened. After the main agent separated each action from capture and verified settled frames, this reviewer directly reopened the eight replacements listed above plus ask-finance-375.jpg. Each now shows the intended state with a fully composited image. In particular: PRC empty views have no stale figures; expanded/re-collapsed matrices show their correct rows and action labels; desktop Ask Finance/Investigation Reports show their own headings; the Segment route shows Service allocation / 2026009, retained profit-center detail and an explicit Analyze cause button without starting analysis. Investigation Reports wraps fully in the sidebar and mobile heading.

Independently recomputed the final eight file hashes, including the added case-ui-model.js entry: all match disk. captures.json and capture-validation.json each contain 28 entries; earliest capture 08:18:45.727Z is after the latest hash-listed modification 08:14:22.360Z. Recorded document widths do not exceed viewport widths. Native getScreenshot normalization preserves aspect ratio (for example 1280×800 viewport becomes 1265×791 with scrollbar); this is explicitly accepted rather than misreported as an exact-pixel-size capture. The replacement frames resolved the actual state/compositing defects.

Real DOM, existing token palette/type/spacing, responsive selectors, internally scrolling matrix, source-bound empty states, unchanged financial engine and compatible route keys are supported by source plus the final images. The three independent source regression files passed earlier; no product code changed during evidence repair, so no redundant test rerun was required. This reviewer did not control a browser or certify live data/production connectivity; browser interactions and capture production belong to the main agent. Final acceptance is limited to this authorized overview/matrix/naming iteration.
