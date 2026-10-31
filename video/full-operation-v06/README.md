# V06 editorial product film

Completed: 148.5 seconds, 2560 × 1440, 30 fps, 48 kHz stereo. The real operation footage retains the full viewport. Remotion creates the animated opening, cause diagram and chapter cards; FFmpeg assembles one timeline with bilingual captions and music that ducks under narration.

Preview: http://127.0.0.1:4187/video/full-operation-v06/watch.html . The preview server reuses Remotion’s static-file handler for reliable chapter seeking. MP4 and narration-only files are in ../exports. The Jianying ZIP contains 20 picture cuts, 34 English and 34 Chinese native text segments, separate narration and music stems, and a reference mix. Animations and chapter navigation are baked into the picture. Actual Windows Jianying opening remains unverified.

Reproduction uses the existing local runtimes and dependencies. Run these sequentially, waiting for each to finish: render-cards.mjs → narrate.ps1 → audio.py → music-stem.py → produce.py. Local Python dependencies are currently linked from v04; configure them when moving machines. The base picture is ../full-operation-v05/renders/plate.mp4. PLAN.md records exact frame cuts.

The canonical captions and spoken copy are captions.json and narration-cues.json. QA.json, FINAL-MEDIA.json, browser-playback.json and REVIEW.md record verification. Music credit is in MUSIC-ATTRIBUTION.md.
