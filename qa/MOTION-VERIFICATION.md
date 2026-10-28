# Sidebar and monitor motion verification

Date: 2026-10-28. Branch: feature/sidebar-monitor-motion.

## Archived baseline

Knowledge libraries and report Q&A committed as 424eefd and fast-forward merged into main before this iteration.

## Automated verification

- node motion.test.cjs: 14 checks passed. Finite entry effects, stagger order, fade-only period transition, interruption/cancellation, timer cleanup, stable completion, reduced-motion and missing-animation-API branches.
- node allocation.test.cjs: 42 checks passed.
- node knowledge.test.cjs: 22 checks passed.
- node --check app.js and git diff --check passed. 128 HTML IDs are unique.

## Browser verification

Preview: http://127.0.0.1:4173/ in the in-app browser.

- Collapse produces a 56 px rail; expand restores the normal width. Keyboard Enter works in both directions. Accessible expanded state and button labels update correctly.
- Compact Knowledge bases, Allocation investigation and Service allocation navigate correctly. The New chat compact button delegates to the existing sidebar New chat handler.
- Re-entering Monitor displays Preparing sample allocation view with aria-busy=true; after completion it displays Sample allocation ready with aria-busy=false.
- Review periods 2026007, 2026008, quarter and 2026009 were exercised, including rapid consecutive selections. The latest selection remains correct. The locked-period Review month 3 true-up shortcut also returns to 2026009.
- Stable month-3 values remain GA GP −235,412.32 USD and total GP −727,638.08 USD. No financial data or rules changed.
- Desktop 1440×1000 and narrow viewport 390×844 have no document-level horizontal overflow. Narrow screens retain the existing top navigation; the sidebar is hidden. Viewport override reset afterwards.
- No browser console errors recorded during the checks.
- Reduced-motion and missing-API behavior verified with isolated executable checks; OS-level motion settings were not changed.

## Evidence

sidebar-collapsed.jpg shows the compact rail and stable allocation table. monitor-motion-mobile.jpg shows the narrow layout. Stagger/fade timing is verified by the executable checks; static images show only the settled state.

## Result

Local acceptance passed. This iteration is left uncommitted on its feature branch for user review; Sites deployment and video remain outside this iteration.
