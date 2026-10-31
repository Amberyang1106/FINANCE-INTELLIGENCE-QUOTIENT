import fs from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const require=createRequire(await fs.realpath(path.resolve(root,'../launch-preview/node_modules/@remotion/cli/package.json')));
const {bundle}=require('@remotion/bundler');
const {selectComposition,renderStill,renderMedia}=require('@remotion/renderer');
const chrome='C:/Program Files/Google/Chrome/Application/chrome.exe';
const serveUrl=await bundle({entryPoint:path.join(root,'src/index.tsx'),publicDir:path.join(root,'public'),onProgress:p=>console.log('BUNDLE',p)});
const composition=await selectComposition({serveUrl,id:'VantageOperationPilot',browserExecutable:chrome});
if(process.argv.includes('--review')){
 const times=[0,2.8,5.8,8.8,11.7,14.6,17,19.1,21.3,22.6,24,25.3,27.5,29.5];
 for(const t of times){await renderStill({composition,serveUrl,browserExecutable:chrome,frame:Math.round(t*30),output:path.join(root,'renders','review-'+t+'.png')});console.log('REVIEW',t);}
}else{
 let last=0;
 await renderMedia({composition,serveUrl,browserExecutable:chrome,codec:'h264',crf:17,pixelFormat:'yuv420p',concurrency:6,imageFormat:'jpeg',jpegQuality:90,x264Preset:'ultrafast',muted:true,outputLocation:path.join(root,'renders/visual-2k.mp4'),onProgress:p=>{const percentage=Math.floor(p.progress*100);if(percentage>=last+2){last=percentage;console.log(JSON.stringify({time:new Date().toISOString(),percent:percentage,rendered:p.renderedFrames,encoded:p.encodedFrames}));}}});
 console.log('REMOTION_RENDER_COMPLETE');
}
