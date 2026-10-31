# Manual acceptance record

Date: 2026-10-31. Local preview: http://127.0.0.1:4197/. Product source frozen before final captures; eight source hashes recorded and checked again after capture. No product edits during review.

## Verified in a real browser

- BG/report, Geo and reporting-period selectors are usable. Unsupported PRC, 2026 Q2, ISG HW and PCSD combinations show No data with no retained current-sample figures. ISG Service / ROW / 2026 Q3 restores the existing reviewed sample.
- The overview does not show the profit-center code. The source note discloses single-profit-center sample coverage. Allocation detail still shows its profit center and fiscal period 2026009.
- Default visible matrix rows: Geo, Region, Segment, RTM, Channel, Freight. Expand shows 22 rows; collapse returns to six, without duplicating or hiding Freight. The matrix precedes Revenue trend.
- Segment / Dec-26 opens Service allocation / 2026009 through the same case entry as the attention card. It does not start investigation automatically. Its illustrative display-month relationship is explicit.
- Freight remains a separate sample and opens its modal. Keyboard activation was verified as well as matrix navigation.
- Ask Finance and Investigation Reports open their respective pages; sidebar, headings and breadcrumb names distinguish questions from investigation output. The full desktop sidebar name wraps without reducing type size.
- Viewports checked: 1280×800, 768×1024, 375×812. No recorded document horizontal overflow. The complete matrix has its own horizontal scroll; the mobile December alert can be reached through it.
- Browser console export contains zero warning/error entries.

## Automated checks

Parent reran `npm test` on the frozen source: 12 test files passed, zero failed, cancelled or skipped. See npm-test.log. Diff whitespace check passed; finance engine and source fixtures have no diff.

## Capture evidence and limitations

captures.json enumerates 28 final image/DOM pairs. All are JPEG, all retain the viewport aspect ratio within rounding, and all were taken after the frozen product edit. Native browser screenshot output excludes/normalizes scrollbar space: common actual image sizes are 1265×791, 753×1004 and 360×779 for the requested viewports. capture-validation.json records actual dimensions rather than claiming pixel-exact viewport captures.

The first capture pass caught nine stale or partially composited frames. They were discarded by overwriting the same paths after explicit stable-state observation in a separate browser call. The native capture is now used; clip-based screenshot probes are not acceptance evidence. Independent reviewers reopen the replacement frames before issuing final verdicts. Failed locator actions were followed by fresh state inspection and keyboard/native input; an attempted action was never accepted as a successful state change.

This is acceptance of the changed surfaces, not a whole-app Lighthouse/performance certification or a live-data integration test. No real multi-BG aggregation, fiscal-to-calendar conversion, ledger write, external AI or video revision is claimed.
