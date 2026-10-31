import fs from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const require=createRequire(await fs.realpath(path.resolve(root,'../launch-preview/node_modules/@remotion/cli/package.json')));
const {bundle}=require('@remotion/bundler');
const {selectComposition,renderStill,renderMedia}=require('@remotion/renderer');
const chrome='C:/Program Files/Google/Chrome/Application/chrome.exe';
const serveUrl=await bundle({entryPoint:path.join(root,'src/index.tsx'),publicDir:path.join(root,'public')});
const composition=await selectComposition({serveUrl,id:'FinanceOverview',browserExecutable:chrome});
if(process.argv.includes('--review')){
 const times=process.argv.includes('--updated')?[13.2,158.5,161]:[3,11.5,15,25,37,50,66,81,91,103,112,123,133,144,155,165];
 for(const t of times){await renderStill({composition,serveUrl,browserExecutable:chrome,frame:Math.round(t*60),output:path.join(root,'renders','review-'+t+'.png')});console.log('REVIEW',t);}
}else{
 let last=0;
 await renderMedia({composition,serveUrl,browserExecutable:chrome,codec:'h264',crf:17,pixelFormat:'yuv420p',concurrency:10,imageFormat:'jpeg',jpegQuality:90,x264Preset:'ultrafast',muted:true,outputLocation:path.join(root,'renders/product-4k60.mp4'),onProgress:p=>{const percentage=Math.floor(p.progress*100);if(percentage>=last+2){last=percentage;console.log(JSON.stringify({time:new Date().toISOString(),percent:percentage,rendered:p.renderedFrames,encoded:p.encodedFrames}));}}});
 console.log('REMOTION_RENDER_COMPLETE');
}
