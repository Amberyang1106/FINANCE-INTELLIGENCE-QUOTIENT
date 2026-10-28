# Report knowledge storyline verification

Date: 2026-10-28. Branch: feature/report-knowledge-chat.

## Git baseline

Previous allocation demo archived as 00bb499 and fast-forward merged into main before this work. The second storyline remains on its feature branch for user review.

## Automated checks

- node knowledge.test.cjs: 22 checks passed. Covers report/library isolation, confirmed allocation logic, source provenance snapshots, personal content, reference-only links, no-match behavior, chunking and weak-match exclusion.
- node allocation.test.cjs: 42 checks passed. Existing financial calculation and sample-data checks remain unchanged.
- git diff --check: passed; only repository line-ending conversion notices.

## Browser scenarios exercised

Preview: http://127.0.0.1:4173/ in the in-app browser. This is local preview, not Sites deployment. Direct file:// automation was blocked by the browser tool; the page continues to use classic scripts and no fetch dependency for its bundled data.

1. Sidebar New chat; ISG Service report and library selection; suggested question then Send; visible knowledge retrieval and partial streamed text; completed answer with six matched sections from two documents.
2. Open the month-3 citation and inspect the exact source text; send a follow-up and stop a partially streamed answer.
3. Select ROW PSD with no knowledge: no matching source, no substitution of ISG rules.
4. Create a temporary ROW PSD personal library and note; ask the library and retrieve the actual note. Edit the note and verify a new answer uses the revised text while the old citation retains its earlier snapshot.
5. Import actual Markdown and HTML files through the native file chooser; imported text is searchable. HTML paragraph boundaries are retained and script/style text is absent.
6. Add a URL without an excerpt: Reference only, zero searchable sections. No webpage crawl is implied.
7. Search knowledge cards and filter the built-in five field cards. Reload restores personal sources and conversations. Built-in library remains read-only.
8. Remove the temporary library and QA conversations. Keep one completed ISG Service example conversation for review.
9. Regression: Monitor → Analysis → voucher → exclusion scenario. GA GP becomes 197,960.36 USD; the original total GP remains unchanged. No candidate plan was saved during QA.
10. Keyboard tab navigation: inspector Evidence → ArrowRight selects Actions; knowledge Files → End selects Cards. Inspector tab handling is scoped to its own tablist.
11. Desktop 1440×1000 and narrow viewport 390×844: no document-level horizontal overflow in Chat or Knowledge; temporary viewport override reset afterwards.

## Evidence

- report-chat.jpg: completed report-logic answer with source trace.
- knowledge-files.jpg: built-in sources and read-only library.
- knowledge-cards.jpg: searchable rule/field/concept cards.
- report-chat-mobile.jpg and knowledge-mobile.jpg: narrow layout captures.

## Demo boundaries

Local keyword retrieval and source-section assembly with simulated streaming; no external LLM or embedding service. Personal import supports MD/TXT/HTML up to 500 KB per file. Notes and link excerpts are searchable. Office/PDF, directory import and webpage crawling are outside this iteration. User data is browser-local. Original allocation scenario and report storage remain separate.
