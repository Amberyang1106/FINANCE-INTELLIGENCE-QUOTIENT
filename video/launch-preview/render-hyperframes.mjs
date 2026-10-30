import {spawn} from 'node:child_process';
const args=["C:/Users/yangtt16/OneDrive - Lenovo/小强创新/fpa-agent-demo/video/launch-preview/node_modules/hyperframes/bin/hyperframes.mjs","render","--output","renders/Vantage-Launch-Preview-4K-EN-10s.mp4","--fps","60","--quality","high","--workers","2","--no-browser-gpu","--video-frame-format","png"];
const child=spawn(process.execPath,args,{cwd:"C:/Users/yangtt16/.cache/fpa-video/vantage-launch-preview",windowsHide:true,env:{...process.env,HYPERFRAMES_BROWSER_PATH:'C:/Program Files/Google/Chrome/Application/chrome.exe'},stdio:'inherit'});
child.on('error',error=>{console.error(error);process.exitCode=1});child.on('exit',code=>{process.exitCode=code??1});
