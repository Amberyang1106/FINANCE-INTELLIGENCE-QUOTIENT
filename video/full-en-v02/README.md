# Finance Exception Intelligence / English film v02

Local production on feature/vantage-ui / source commit 5a126df. Approved five-chapter sequence, 15 shots, 170 seconds, 3840×2160 / 60fps.

- PLAN.md and SPEC.md: execution scope and delivery contract.
- shots.json: final measured spoken copy. The master v0.4 script remains the story/order source.
- narrate.ps1 and audio.py: offline Microsoft Zira English narration, word timing, SRT, instrumental ducking and mix.
- MUSIC-ATTRIBUTION.md: official music source and required CC BY credit.
- src/index.tsx and render.mjs: native Remotion picture and review frames.
- assets/captures: real UI states captured from isolated origin 4180; public/data.json: exact Demo model output.
- recording-state.json: isolated shoot only, including one proposal and its same TASK-006 history, not the user browser at 4175.
- film/index.html: editable HyperFrames picture/caption/voice/music timeline.

Use the pinned dependencies in ../launch-preview/package.json (Remotion 4.0.539, HyperFrames 0.8.216, GSAP 3.14.2). Install/reuse them locally; node_modules is ignored. Windows TTS and Chrome/FFmpeg paths must be configured when changing machines. Do not overwrite earlier renders.

Visuals mix real captured product states with a cinematic reconstruction of actual fields, figures and supported interactions. Graphic motion is frame-based at 60fps; still captures are held states, not a continuous 60fps screen recording. No production AI, database, notifications or ledger writes are claimed.

The requested complete output is generated only after rendering and verification; consult REVIEW.md / final QA for actual status rather than inferring it from this source directory. No Git merge or remote publishing is part of this production request.


## Completed local deliverable

Final file: ../exports/Finance-Exception-Intelligence-Vantage-Overview-en-US-v02.mp4. Play watch.html through the project server. 170s / 3840×2160 / 60fps, English synthetic narration, English burned captions and sidecar SRT, licensed instrumental with dialogue ducking.

Accepted final routing is Remotion picture + HyperFrames mixed audio + libass captions. The HyperFrames captions-mix.mp4 picture is rejected for residual letters; its mixed audio is used. Do not ship its video pixels. The editable full-frame film/index.html is retained; reproduce the accepted MP4 with finalize.py and captions.ass. See REVIEW.md for measurement/inspection boundaries and font fallback.
