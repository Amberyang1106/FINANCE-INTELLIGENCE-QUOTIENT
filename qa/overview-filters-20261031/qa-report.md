# Overview filters and matrix — Visual Pass B: PASS

**No unresolved product or evidence blocker.** All 28 final JPEGs were directly opened with view_image, including all nine replaced capture states. All same-name DOM snapshots were read. This approval covers this iteration's changed scope, matrix, routes and naming at 1280×800, 768×1024 and 375×812; it does not reuse the previous iteration's PASS.

## Method and source freshness

Read REVIEW-SCOPE.md, DESIGN.md, source/config/render paths relevant to the matrix and scope, independent code-review.md, source-hashes.json, captures.json, capture-validation.json and browser-console.json. Eight source hashes were independently recalculated and all match disk, including case-ui-model.js. Latest rendered product edits were 08:11:16Z and DESIGN.md 08:14:22Z; every final capture is later. Sources remained unchanged during the replacement captures.

The parent agent operated the actual browser and supplied the captured results. This reviewer did not initialize or operate cua/browser runtime, change storage, log in, start another browser, modify product source, or spawn agents. The parent-chat IAB access boundary remains a tool-context limitation, not a disconnected user browser.

The native screenshot API normalizes scrollbar-bearing images. **Viewport dimensions are not JPEG pixel dimensions.** Typical actual files are 1265×791 for viewport 1280×800, 753×1004 for 768×1024, and 360×779 for 375×812. Unscrolled empty states can retain full viewport pixels. The table records both. I independently parsed all 28 JPEG SOF dimensions/signatures, checked aspect ratio within rounding and document width <= viewport; none failed. Direct inspection found no remaining black strip, missing composited region, wrong page, or transient dim state. Rejected clip/native-probe/before images outside captures.json were not used for acceptance.

## Findings by requirement

| Requirement | Result | Evidence |
|---|---|---|
| Configurable BG/report, Geo, quarter | PASS | Four native labeled selectors are readable across all tested sizes. At 375 they form two columns without truncated selected values. |
| Honest supported scope | PASS | ISG / ISG Service / ROW / 2026 Q3 displays the original reviewed sample. Source note says single-profit-center sample, not BG/Geo total, and synthetic trend history. No L0AUXG appears in overview DOM. |
| Unsupported combinations | PASS | Geo/period/report/BG screenshots show No data for this scope and restoration guidance, without stale financial metrics, case cards, matrix rows/lights, charts or sample-specific figures. Returning to the supported combination restores data. |
| Matrix before trends | PASS | Collapsed, expanded-bottom and recollapsed desktop images visibly place the matrix and its toggle ahead of the trend selector/charts. Tablet and mobile show the same ordering. |
| Six priority plus sixteen additional rows | PASS | DOM verifies 6/22/6 for collapsed/expanded/recollapsed. Priority row names are Geo, Region, Segment, RTM, Channel, Freight; Freight occurs once. Final expanded upper/lower images cover all row sections through WOI. |
| Exceptions survive collapse | PASS | Segment/Dec-26 and Freight/Jun-26 remain visible in the desktop six-row frame. Mobile local month scrolling reaches Dec-26 while the row labels remain readable. |
| Month association is not period conversion | PASS | Matrix text explicitly says Dec-26 sample alert links to case period 2026009 and is not a fiscal-period conversion. Segment alert's accessible name names Dec-26 and 2026009. Detail-route images show 2026009 / Month 3 true-up. |
| Ask Finance / Investigation Reports | PASS | Navigation, headings, breadcrumbs and investigation-step display agree. Long Investigation Reports wraps at word boundaries in the sidebar/mobile heading. Report-rule action wording remains a meaningful action rather than a conflicting feature title. |
| Responsive readability | PASS | Controls, notes and empty-state copy reflow. Wide matrix scrolls locally; no document-level horizontal overflow is recorded. Long expanded content is below the viewport and remains present in DOM. |
| Detail/independent Freight route | PASS | Segment reaches the allocation detail with L0AUXG retained as intended. Freight opens a separate readable dialog with illustrative/finance-review caveat. |
| Compositing and stable state | PASS after replacement | Nine timing/compositing captures were replaced. Final versions visibly match their state names and same-name DOM. |

## Financial and interpretation checks

Supported overview retains quarter Revenue **2,808,897.00**, net Cost **2,584,185.24**, GP **224,711.76 USD** and GA Month 3 GP **−235,412.32 USD**. These are sample figures, not full-BG/Geo aggregation. No newly selected unsupported quarter inherits synthetic history as reviewed data. The matrix's non-alert lights are labeled illustrative rather than actual financial checks.

The visible Dec-26 cell is an explicitly illustrative display-month association. It does not establish any conversion from fiscal period 2026009 to a Gregorian month. Detail views intentionally retain profit-center scope and the existing calculation path. No production data or posted ledger change was verified or claimed.

## Capture issues repaired without product changes

Initial native frames for empty-geo-1280, matrix-expanded-1280, matrix-expanded-bottom-1280, matrix-recollapsed-1280, ask-finance-1280, reports-1280, segment-case-1280 and empty-375 contained an earlier state or incomplete compositing. ask-finance-375 was still visibly dim during entrance. The parent separated UI actions from capture calls and visually confirmed settled frames before replacing each same-name JPEG/DOM. All nine replacements were reopened by this reviewer; the evidence defects are closed. Product fixes were not inferred from these bad frames.

The expanded matrix's earlier accessibility snapshot temporarily combined an old role name with new child text. Source inspection found no fixed aria-label; renderMatrix updates textContent and aria-expanded. Final visible labels/state and source are consistent. No confirmed product accessible-name defect was established from that timing artifact.

## Complete final screenshot inventory

All rows below are directly image-reviewed, not inferred from a metadata PASS. Offscreen content is assessed using the corresponding DOM and supplementary scroll captures. Times are UTC.

| Screenshot / DOM | Test viewport | JPEG pixels | Captured at UTC | Direct visual result |
|---|---|---|---|---|
| [matrix-collapsed-1280](matrix-collapsed-1280.jpg) / [DOM](matrix-collapsed-1280.txt) | 1280×800 | 1265×791 | 2026-10-31T08:18:45.727Z | PASS — Six priority rows visible; Segment/Dec-26 and Freight/Jun-26 red alerts; Show all 22; matrix before trends. |
| [overview-1280](overview-1280.jpg) / [DOM](overview-1280.txt) | 1280×800 | 1265×791 | 2026-10-31T08:18:54.581Z | PASS — Four labeled scope selectors, quarter figures and GA CTA clear in desktop first viewport; overview omits the profit-center code. |
| [empty-period-1280](empty-period-1280.jpg) / [DOM](empty-period-1280.txt) | 1280×800 | 1280×800 | 2026-10-31T08:20:14.106Z | PASS — 2026 Q2 selection; unsupported explanation replaces reviewed values. |
| [empty-report-1280](empty-report-1280.jpg) / [DOM](empty-report-1280.txt) | 1280×800 | 1280×800 | 2026-10-31T08:20:15.225Z | PASS — ISG HW selection; no connected sample or stale totals are shown. |
| [empty-bg-1280](empty-bg-1280.jpg) / [DOM](empty-bg-1280.txt) | 1280×800 | 1280×800 | 2026-10-31T08:20:31.697Z | PASS — PCSD/PCSD HW selection; clear unsupported scope and supported-sample guidance. |
| [restored-1280](restored-1280.jpg) / [DOM](restored-1280.txt) | 1280×800 | 1265×791 | 2026-10-31T08:20:33.319Z | PASS — Supported ISG/ISG Service/ROW/2026 Q3 restores original figures and GA/Freight cards. |
| [freight-1280](freight-1280.jpg) / [DOM](freight-1280.txt) | 1280×800 | 1265×791 | 2026-10-31T08:23:01.752Z | PASS — Readable real Freight dialog over matrix; retains independent hypothetical-sample caveat. |
| [overview-768](overview-768.jpg) / [DOM](overview-768.txt) | 768×1024 | 753×1004 | 2026-10-31T08:23:19.899Z | PASS — Scope controls remain readable; metrics/case stack; single-profit-center sample limitation visible. |
| [matrix-collapsed-768](matrix-collapsed-768.jpg) / [DOM](matrix-collapsed-768.txt) | 768×1024 | 753×1004 | 2026-10-31T08:23:27.741Z | PASS — Six named rows and local table scrollbar; Show all 22; trend section follows. |
| [matrix-expanded-768](matrix-expanded-768.jpg) / [DOM](matrix-expanded-768.txt) | 768×1024 | 753×1004 | 2026-10-31T08:23:30.102Z | PASS — Additional rows appear under the retained six; long table continues below viewport rather than disappearing. |
| [empty-768](empty-768.jpg) / [DOM](empty-768.txt) | 768×1024 | 768×1024 | 2026-10-31T08:23:42.686Z | PASS — PRC empty state fits the tablet layout; no sample data panel remains. |
| [ask-finance-768](ask-finance-768.jpg) / [DOM](ask-finance-768.txt) | 768×1024 | 753×1004 | 2026-10-31T08:23:44.659Z | PASS — Ask Finance heading and selectors reflow; no case-specific journey. |
| [reports-768](reports-768.jpg) / [DOM](reports-768.txt) | 768×1024 | 753×1004 | 2026-10-31T08:23:46.625Z | PASS — Investigation Reports and current step readable without word splitting; report/detail context retained. |
| [matrix-collapsed-375](matrix-collapsed-375.jpg) / [DOM](matrix-collapsed-375.txt) | 375×812 | 360×779 | 2026-10-31T08:24:07.161Z | PASS — Six row names remain readable beside the local horizontal month scroller; clear expansion control. |
| [matrix-dec-375](matrix-dec-375.jpg) / [DOM](matrix-dec-375.txt) | 375×812 | 360×779 | 2026-10-31T08:24:36.682Z | PASS — Dec-26 and Segment red signal visible together; explanatory non-conversion text readable above. |
| [segment-case-375](segment-case-375.jpg) / [DOM](segment-case-375.txt) | 375×812 | 360×779 | 2026-10-31T08:24:52.146Z | PASS — Mobile shared route shows Service allocation and 2026009; whole-word journey and detail source scope readable. |
| [matrix-expanded-375](matrix-expanded-375.jpg) / [DOM](matrix-expanded-375.txt) | 375×812 | 360×779 | 2026-10-31T08:25:06.450Z | PASS — Six priority rows plus added CPU/Derived rows; Dec signal retained while expanded. |
| [reports-375](reports-375.jpg) / [DOM](reports-375.txt) | 375×812 | 360×779 | 2026-10-31T08:25:12.798Z | PASS — Investigation Reports wraps at the word boundary; current horizontal case step readable. |
| [overview-375](overview-375.jpg) / [DOM](overview-375.txt) | 375×812 | 360×779 | 2026-10-31T08:26:06.066Z | PASS — Four selectors reflow to two columns with intact selected labels; no page-level horizontal overflow. |
| [empty-375](empty-375.jpg) / [DOM](empty-375.txt) | 375×812 | 360×779 | 2026-10-31T08:27:52.032Z | PASS — Stable mobile PRC empty state; complete readable guidance and no financial values. |
| [empty-geo-1280](empty-geo-1280.jpg) / [DOM](empty-geo-1280.txt) | 1280×800 | 1280×800 | 2026-10-31T08:28:01.566Z | PASS — PRC selection; clear No data for this scope; no stale financial panels, lights or charts. |
| [matrix-expanded-1280](matrix-expanded-1280.jpg) / [DOM](matrix-expanded-1280.txt) | 1280×800 | 1265×791 | 2026-10-31T08:28:14.448Z | PASS — Stable expanded frame shows priority rows and additional CPU/Derived rows, without missing compositing. |
| [matrix-expanded-bottom-1280](matrix-expanded-bottom-1280.jpg) / [DOM](matrix-expanded-bottom-1280.txt) | 1280×800 | 1265×791 | 2026-10-31T08:28:29.942Z | PASS — Bottom rows through WOI, Show only 6 priority monitors, then intact trend charts. |
| [matrix-recollapsed-1280](matrix-recollapsed-1280.jpg) / [DOM](matrix-recollapsed-1280.txt) | 1280×800 | 1265×791 | 2026-10-31T08:28:53.866Z | PASS — Restored six rows and Show all 22; both exception rows remain. |
| [ask-finance-1280](ask-finance-1280.jpg) / [DOM](ask-finance-1280.txt) | 1280×800 | 1265×791 | 2026-10-31T08:29:01.862Z | PASS — Stable Ask Finance heading/navigation/breadcrumb; report-rule action and knowledge context remain clear. |
| [reports-1280](reports-1280.jpg) / [DOM](reports-1280.txt) | 1280×800 | 1265×791 | 2026-10-31T08:29:13.585Z | PASS — Investigation Reports heading, sidebar, breadcrumb and case step consistent; empty draft prerequisite clear. |
| [segment-case-1280](segment-case-1280.jpg) / [DOM](segment-case-1280.txt) | 1280×800 | 1265×791 | 2026-10-31T08:29:30.996Z | PASS — Shared Segment alert route lands on Service allocation / 2026009; L0AUXG retained in detail. |
| [ask-finance-375](ask-finance-375.jpg) / [DOM](ask-finance-375.txt) | 375×812 | 360×779 | 2026-10-31T08:29:40.217Z | PASS — Replaced dim transition frame; stable title/body and report-rule/knowledge controls readable. |

## Source fingerprints independently verified

| File | SHA-256 | Last modified UTC |
|---|---|---|
| index.html | 9f31420d582444471025530affeb18283396bf7b3137873de1820db26e0e7a32 | 2026-10-31T08:08:05.276Z |
| app.js | 029636842880ba600672829bf83de8b4decda4e8bfc6b16ca508af30831c5604 | 2026-10-31T08:08:05.341Z |
| knowledge-ui.js | b4cb53976fbbfc2613366e509b271ed8093bb8d6a642eada7475eac4ac0dafce | 2026-10-31T08:08:05.374Z |
| kpi-overview.js | 2aba21f06c56f5abce78c354f58e67196541a809cffbe6610ba46f7941e07a61 | 2026-10-31T08:11:16.895Z |
| kpi-scope-config.js | e91e2af88d7fd3ad2cc0ade0dd8797501cf97403064e9d5c6e95c2804d061414 | 2026-10-31T08:04:24.051Z |
| vantage.css | 1bd00807a9411123753d1e43062d3ec5c1648188d604b4c7904a5c7bcbd02ab0 | 2026-10-31T08:11:16.975Z |
| DESIGN.md | 8bf250173c5864ea6cd32f47bc7fa00357677ae670ccf5bac69ca38a6a497140 | 2026-10-31T08:14:22.360Z |
| case-ui-model.js | 44ace60013239cf70df4640a335e02ae27215fbc7dcc6298fd53b3272acc37ae | 2026-10-31T08:11:16.951Z |

## Limits and attribution

browser-console.json contains no logged errors/warnings. Real browser interactions and test execution belong to the parent agent/independent code reviewer; this reviewer independently judged the saved rendered evidence and cross-checked DOM/source. Code review reports exact-scope/provider guards and 3 targeted test files passing; those are attributed results, not new test runs by this reviewer.

This is a scoped visual-readability acceptance, not whole-application certification, exhaustive keyboard/screen-reader testing, external dataset integration, production monitoring or confirmation of every possible long label/data combination. The connected reviewed sample remains limited to the stated supported scope. No unresolved finding requires another product or capture repair for this iteration.
