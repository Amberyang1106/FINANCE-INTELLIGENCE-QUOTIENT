# FP&A Agent — launch-style preview

A 10-second English style preview based on the existing Vantage case. Product source and main branch are unchanged.

## Reference

Creative reference: [Leonxlnx/claude-launchvideo](https://github.com/Leonxlnx/claude-launchvideo/tree/f0906e8629fa524c7cedc1ac959bf987005ee846), examined alongside the user-provided local tessel-launch.mp4 (33 seconds / 1080p60).
Borrowed principles: persistent attention marker, large typography, spring-settled product cards, continuous camera relay, frame-synchronized original sound design. Tessel footage, soundtrack, wordmark and calendar UI are not reused.

## Pipeline

- Remotion 4.0.539: vector UI reconstructed for film from real Vantage sample facts, rendered at 3840 × 2160 / 60fps / 600 frames.
- HyperFrames 0.8.216: GSAP English caption choreography, rendered-product video compositing, separate English narration and original sound-design audio.
- Windows offline Microsoft Zira Desktop / Rate 0: four English segments; word timing in transcript.json. Original synthesized ticks, swishes and chord tones generated with NumPy, not the reference music.
- Local Geologica font and original Lenovo logo from the demo assets.

## Reproduce

Use Node 22+ and pnpm. Install dependencies from pnpm-lock.yaml, then render src/index.tsx / VantageLaunch with the Remotion CLI (system Chrome used locally). Run audio.py after narrate.ps1 to assemble voice and sound; copy the product render to film/product.mp4. From film/, use HyperFrames lint, validate, inspect, snapshot, preview --background, and render --fps 60 --quality high.

The 4K image is rendered from text/vector elements, rather than upscaling the earlier 1080p screencast. This is a cinematic reconstruction for the preview, not a recording of new production integration. Sample facts and no-ledger-change boundaries remain.

## Scope

Preview excerpt: allocation exception → voucher evidence → assigned action → brand lockup. The full four-story film is not regenerated in this task. The Vantage application, existing samples and main branch are preserved. No publishing or Git merge performed.

## Delivered / 2026-10-30

- [4K English MP4](renders/Vantage-Launch-Preview-4K-EN-10s.mp4) — actual 10.000s, 3840×2160, 60fps, 600 frames, H.264 + stereo AAC / 48kHz, 13,781,137 bytes.
- [Browser player](http://127.0.0.1:4182/watch.html)
- [Editable HyperFrames Studio](http://localhost:4181/#project/vantage-launch-preview)
- [English subtitles](preview-en.srt)
- [Final QA evidence](qa/final-result.json) / [HyperFrames check](qa/hyperframes-check.json)

Full decode returned 0 with no errors. All four voice segments have non-zero decoded audio energy. The actual MP4 played through to currentTime=10 / ended=true in the in-app browser, with audio unmuted and 3840×2160 decoded dimensions. Four encoded hero frames were visually reviewed against the source composition snapshots. HyperFrames lint, runtime, layout, contrast, craft and audio passes report zero errors and zero warnings. Its separate motion analyzer is disabled for the rendered video layer; movement was reviewed through snapshots and playback rather than claimed as automatically audited.

All 28 tracked application/test/data source files match Vantage b5541d4 after normalizing Windows line endings. Main remains 3071b6d. Only video production files and lessons are changed; no app behavior or existing Samples changed. No Git commit/merge or external publishing was performed.

On this machine, the active Studio copy is at C:/Users/yangtt16/.cache/fpa-video/vantage-launch-preview to avoid OneDrive atomic-rename locks; source and rendered outputs are preserved in this repository. Rendering uses the installed Chrome via HYPERFRAMES_BROWSER_PATH. The reference's temporal multi-sample motion-blur pipeline is not copied for this style preview.

## Superseded production direction / 2026-10-30

This delivered preview retains the old FP&A Agent branding and omits the new KPI overview. Keep its rendered media and evidence unchanged. The next film uses FINANCE EXCEPTION INTELLIGENCE / Finance Workspace, English copy/VO/captions and both fixed-Monitor branches. Follow ../PRODUCT-VIDEO-SCRIPT.md and ../VIDEO-PRODUCTION-GUIDE.md v0.3. This preview remains a historical style sample, not a current-brand deliverable.
