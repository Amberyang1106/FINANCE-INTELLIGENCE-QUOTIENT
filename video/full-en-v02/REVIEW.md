# Production review / delivered local v02

## Creative choices

Five approved presentation chapters, 170s, full English. Real Vantage UI states establish the workspace; enlarged deterministic detail views show the evidence, candidate and task handoff. This is a cinematic product tour, not continuous live-system screen recording. No alternative story order was built.

## Source / frame review

Fresh read-only reviewer found no P0/P1 in source, captions or representative frames. It checked the five-chapter order, same proposal-to-TASK-006 chain with five lifecycle events, financial values/IDs/Scenario caveats, 46 valid non-overlapping caption intervals, all voice budgets, and readable voucher/Scenario/ending frames. The refreshed card-drag variant and final composited output still require decoded-frame inspection.

## Measurements already passed

15 shots sum to 170s. Voice output fixed to 16kHz to match SAPI word-event timing; all segments fit. KPI/GP/BU totals reconcile to the real Demo model. HyperFrames lint/runtime/layout/motion/contrast/audio checks contain no errors. Deliberate caption reading holds produce craft warnings; first-frame-empty applies only to the subtitle layer before the first spoken word, not the final picture.

## Pending until rendered

Final MP4 metadata, complete decode, post-composite subtitle placement and measured encoded loudness. Sound has been measured, not heard by the agent; audible balance and synthetic-voice preference need a human playback review. The weakest proof is the card rearrangement: source interaction was verified on the real app, but the film uses a labeled cinematic reconstruction rather than a continuous pointer recording.


## P0 found at final decode / repaired routing

The first HyperFrames subtitle-band encode accumulated residual letters from preceding captions (visible at 13.2s and 50s) although random-seek snapshots and layout checks were clean. That first composite is rejected. Preserve the bad-frame evidence under renders/rejected-caption-*. Final routing uses the actual HyperFrames mixed audio and native Remotion picture, with libass rendering the exact same measured caption intervals and bundled Geologica font. This isolates caption redraw from the incremental browser capture path. Re-run complete decode, metadata, loudness, decoded-frame and browser playback checks after repair; older completion markers were removed.


## Final result after repair

Final MP4 passed 3840×2160 / 60fps / 170.000s / H.264 + stereo AAC checks and complete decode. The repaired decoded frames at 13.2s, 50s and 103s show one clean caption cue, with no prior-letter residue. The card-drag and ending frames were inspected after final decode. Native product graphics remain Geologica; Windows libass selected ArialMT for the final subtitle layer, now explicitly specified in captions.ass. This is a small typography difference kept for a stable readable export, not a data or workflow change.

Encoded loudness: approximately −16.29 LUFS, true peak −2.73 dBTP, no clipping. A headless browser playback and seek check is recorded separately. No human/agent listening audition was performed; the user should judge synthetic voice timbre and background-music balance by playing the film. No production integration, application behavior, Sample, main branch or remote repository was changed by the film production.
