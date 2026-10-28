# Stage 2 verification — ISG Service allocation demo

Date: 2026-10-27 (Asia/Shanghai)
Branch: feature/isg-allocation-demo
Stage 1 archive: 454c72f

## Financial checks

Command: node allocation.test.cjs

Result: 42 checks passed. The calculation uses source rows and locked executed allocations, then compares computed results against the reviewed JSON expectations.

Coverage: original and candidate quarter targets; month 3 true-up; copy and GTM mapping; unchanged months 1–2 and booked revenue; total GP conservation; Y exclusions; AL cost exclusion; PRC amount selection; existing-BPC priority; A-class missing-dimension detection; no-row B0 default; net-zero base rejection; no mutation of the source; browser snapshot equality.

Key results (USD):

| Metric | Original | Candidate |
| --- | ---: | ---: |
| GA month 3 GP | -235,412.32 | 197,960.36 |
| LE month 3 GP | -497,576.04 | -1,075,406.28 |
| Total month 3 GP | -727,638.08 | -727,638.08 |
| Total quarter GP | 224,711.76 | 224,711.76 |

## Browser scenarios

Verified in the in-app Chromium browser through http://127.0.0.1:4173:

| Scenario | Result |
| --- | --- |
| Initial monitor and sample labels | Pass |
| Periods 2026007 / 2026009 and quarter switch | Pass; monthly and quarter weights labeled separately |
| Negative-GP alert to Analysis | Pass; L0AUXG / 2026009 / GA context carried |
| Send question and four-step simulated investigation | Pass; submit disabled while tracing |
| LE base drill-down | Pass; three routine rows and the negative adjustment reconcile |
| Voucher details | Pass; 5900018271, yangtt16, 5900018392, text, flags, amount and search scope shown |
| Base exclusion and all-segment comparison | Pass; candidate matches the reviewed figures |
| Save notes, candidate and generate report | Pass |
| Report Markdown download | Pass; 40 lines at the tested version, expected GP and notes retained |
| Quarter CSV download | Pass; header, four segments and total (6 rows), correct revenue and GP |
| Reload restoration | Pass; candidate, notes and report restored |
| Cancel reset / confirm reset | Pass; cancel retains data, confirm returns to initial state |
| Empty question | Pass; explicit input message |
| Arrow-key inspector tabs / Ctrl K | Pass |
| Desktop 1440 × 1000 | Pass; three columns, page width equals viewport |
| Narrow screen 390 × 844 | Pass; controls fit, data table scrolls inside its container |
| Console errors/warnings after final reload | None observed |

Evidence screenshots:

- [Desktop monitor](monitor-desktop.jpg)
- [All-segment scenario](scenario-comparison.jpg)
- [Narrow-screen layout](monitor-mobile.jpg)

QA-created candidate and report were cleared. The final preview starts with the original monitor and no saved candidate. Temporary viewport override was reset.

## Limits

Browser QA used the local HTTP preview because the automation browser blocks direct file:// navigation. The app uses only relative classic scripts and a generated data snapshot so it can also be opened locally; direct file:// interaction was not automated.

No live financial-system or external-model behavior was tested. No Sites deployment or video production was performed. New datasets that require rounding or zero/negative denominator handling need separately agreed rules; these are not inferred from this fixed sample.
