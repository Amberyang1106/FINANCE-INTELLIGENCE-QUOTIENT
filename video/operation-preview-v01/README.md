# Vantage 30-second operation pilot

Standalone sample on feature/vantage-ui. The existing 170-second full film, application code and main branch are unchanged.

Preview: http://127.0.0.1:4175/video/operation-preview-v01/watch.html

Deliverables in ../exports: Finance-Exception-Intelligence-Vantage-Operation-Pilot-EN-2K-30s-v01.mp4 and Finance-Exception-Intelligence-Vantage-Operation-Pilot-EN-2K-30s-v01-no-BGM.mp4. Same video stream, English burned-in captions, English Microsoft Zira synthetic narration. 2560×1440, 30 fps, 30 seconds.

Sources: actual application footage and 2× screenshots; Video Shotcraft PageCam and cursor-flyover motion grammar. Exact operation positions/times in actions.json; creative/financial constraints in SPEC.md. Dynamic footage is captured at 1920×1080; stable evidence holds use 3840×2160 textures. Output is 2560×1440. No reconstructed finance UI.

Reproduction: dependencies reuse ../launch-preview/node_modules. Run narrate.ps1, audio.py, node render.mjs, then finalize.py using the existing local Node/Python/FFmpeg runtimes. capture.mjs opens an isolated browser at port 4186 and accepts capture-command.json; it never changes the user's browser storage.

Music: Cipher by Kevin MacLeod, incompetech.com. CC BY 4.0 https://creativecommons.org/licenses/by/4.0/ . Original https://incompetech.com/music/royalty-free/mp3-royaltyfree/Cipher2.mp3 . Edited 30-second excerpt, quiet backing, faded. Retain attribution on public reuse. No added SFX.

Verification: FINAL-QA.json and independent review in REVIEW.md.

Video Shotcraft workbench auto-open was attempted. Windows rejected its directory symlink with EPERM; workbench import/parity is not verified. The standalone HTML video preview remains the delivery route.

Optional next steps from Video Shotcraft: public attribution to the skill author is voluntary: [X @VincentWei93](https://x.com/VincentWei93), [Douyin @Vincent](https://www.douyin.com/user/MS4wLjABAAAAK1pkjBxilk2Oi_9h_vFyD-lTAu9CTlvhmOtkosDvvxg), [Xiaohongshu @Vincent](https://xhslink.cn/m/At9iP2d5C1V). You may also share the film through the [showcase form](https://github.com/Vincentwei1021/video-shotcraft/issues/new?template=showcase.yml) for the [showcase](https://vincentwei1021.github.io/video-shotcraft/showcase.html); submission is optional and was not performed. Jianying project export is available as a separate requested follow-up; not exported in this pilot.
