# Production specification

Approved five chapters and 15 shots from script v0.4; measured and shortened English narration in shots.json supersedes draft spoken copy only. Runtime 170 seconds, native 3840×2160 composition, 60 fps, 10,200 frames.

Real Vantage UI captured on isolated origin 4180 at 1920×1080 CSS pixels with deviceScaleFactor 2. Wide captured states establish the real product; enlarged detail panels are a cinematic reconstruction of confirmed labels and calculations, not continuous screen recording or a production system. Remotion drives frame-based graphic motion; HyperFrames assembles picture, timed English captions and separate narration/music tracks.

Motion: 32–38-frame entrances, native chart reveal, investigation progression, amount comparison, five task stages, typed rule excerpt, three BU trend paths, card rearrangement and local Market return. Hold key numerical evidence. Ending disclosure visible for the full 7 seconds.

Music: Cipher / Kevin MacLeod, CC BY 4.0. Source retained with attribution; fade 1.5s in / 5s out, instrumental normalized then attenuated and ducked (5:1, 20ms attack, 600ms release) below narration. No cloned reference narrator, reference soundtrack or external publishing.

Banned: wrong brand, cropped minus signs, invented revenue, showing negative true-up as source credit, ledger correction claims, loss disappearance claims, knowledge/Studio interrupting case-to-task flow, rebuilding data independently from Demo, unmarked production integration.


Render routing: render the 3840×300 English subtitle band and both audio tracks with HyperFrames in parallel with the native 3840×2160 Remotion picture. Composite the band at y=1860 with FFmpeg without resizing either layer. This preserves 60fps native text, editable full-frame HyperFrames timeline and separate sound tracks while avoiding a second 10,200-frame full-picture rasterization. The final is still 3840×2160, not an upscaled band.


Final export repair: reject the HyperFrames caption-band pixels after decoded-frame review found residual letters. Retain its rendered mixed voice/music audio, use the native Remotion picture, and draw the exact measured captions.ass intervals with FFmpeg/libass at 4K. Final subtitle face is ArialMT; product/brand typography remains Geologica. Use finalize.py to reproduce the accepted film.
