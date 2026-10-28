# Custom monitor workspace verification

Date: 2026-10-28. Branch: feature/custom-monitor-workspace.

## Archived baseline

Previous sidebar/finite-monitor-motion work committed as dff002c and fast-forward merged into main before this iteration. Current work remains on its feature branch for review.

## Automated checks

- node monitor-model.test.cjs: 25 passed. English/Chinese routing, BG/report isolation, unsupported intents, quarterly GP/Cost reconciliation, synthetic BU history, threshold signals and portable template validation.
- node motion.test.cjs: 16 passed, including the actual Review period change binding invoking the full staggered entry path.
- node allocation.test.cjs: 42 passed.
- node knowledge.test.cjs: 22 passed.
- Total: 105 checks. app.js, monitor-model.js and monitor-studio.js parse successfully. All 163 HTML IDs are unique and all local HTML resources exist.

## Browser scenarios exercised

Local preview: http://127.0.0.1:4173/ in the in-app browser.

1. Official Lenovo red logo appears at the top. Main navigation is in the sidebar; case scope, investigation, pinned monitor and conversation history are above the workspace. Finance reviewer is in the top bar.
2. Navigation indicator changes position and dimensions when selecting a different section; compact mode retains all seven navigation entries and New chat. Expand restores labels. The indicator uses a finite spring-like easing and respects reduced motion.
3. Review period switches show Preparing sample allocation view and aria-busy=true, then return to stable values with aria-busy=false. Rapid switches finish with the latest selection.
4. Monitor Studio: select scopes and generate quarterly GP by BPC Segment from the reviewed quarter fixture. LE is flagged at the default GP<0 threshold. Raising the threshold to 200,000 USD flags all four segments; restoring zero restores the original result.
5. Generate five-quarter BPC BU revenue. The trace labels the history synthetic. Defaults show Support Services +9.5% growth, Professional Services −10.0% alert and Managed Services +22.7% growth. Setting both QoQ thresholds to 100% clears those signals; restoring 8%/5% restores them. Curve points also evaluate each historical QoQ change: default red alert points count 1, raised thresholds count 0, then defaults are restored.
6. Actual pointer drag moves Revenue momentum across rows/columns; the occupied GP module yields to another row. DOM grid coordinates change, and refresh preserves the saved positions. Keyboard Move earlier produces a packed two-column layout; Toggle full width changes the Cost card to 12 columns.
7. Generate during navigation: leaving Studio cancels the pending generation and does not pull the user back to the canvas.
8. BG/report selectors cascade. SSG exposes its no-sample report and disables dimension/KPI choices. Generation for unsupported scopes returns an explicit no-data message.
9. Market: install the Cost template; save a two-card board as a personal template; download the actual JSON file; inspect its version, scopes and thresholds. Import an invalid JSON template and verify rejection; import a valid downloaded template and install its two cards; remove the temporary duplicate cards using their controls.
10. Refresh restores three sample monitors, benchmarks, desktop positions and two personal sample templates. The personal collection is local only.
11. Desktop 1440×1000 and phone 390×844 have no document-level horizontal overflow. Phone cards become one column with taller rows and horizontally scrollable charts. Returning to desktop restores 6/6/12 column widths. Temporary viewport override reset after verification.
12. Original investigation regression: Monitor → Analysis → traced investigation → voucher 5900018271; user yangtt16 and reference 5900018392 remain correct. Scenario exclusion yields GA GP 197,960.36 USD and unchanged total month-3 GP. No candidate plan saved during QA.
13. Knowledge regression: MR Logic remains available; New chat → ISG allocation question → streamed source-backed answer with six matched sections/two documents; citation opens the original rule text.
14. Early browser-cache errors from the retired app.js resource were corrected with explicit static resource versions. Final app.js?v=workspace-6 and new monitor scripts record no new script errors during final scenarios.

## Evidence

- lenovo-monitor-workspace.jpg: new navigation, context area and stable original allocation table.
- custom-monitor-studio.jpg: scope selectors and natural-language builder.
- custom-monitor-canvas.jpg: GP and Revenue monitor cards with benchmarks.
- monitor-market.jpg: curated and local personal templates.
- custom-monitor-mobile.jpg: narrow layout.

## Limits

This is a static English interaction demo. The two language examples route to explicitly supported sample combinations; no external AI, SQL execution, real database connection, alert scheduler, cloud uploads or shared marketplace service is connected. Latest sample quarter is 2026 Q3. BU history/names are synthetic. Thresholds and graph data are calculated locally. Templates exchange configuration JSON files only. Storage is browser-local and separate from the previous financial scenario/report and knowledge chat stores.

Continuous squircle corners and backdrop blur are progressive enhancements with round/opaque fallbacks. Reduced-motion logic has executable checks and CSS fallbacks; OS-level animation settings were not changed. Drag collision, resize and responsive layout reuse the pinned MIT-licensed GridStack 14.0.0 distribution.
