import fs from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const require=createRequire(await fs.realpath(path.resolve(root,'../launch-preview/node_modules/@remotion/cli/package.json')));
const {bundle}=require('@remotion/bundler');
const {selectComposition,renderStill,renderMedia}=require('@remotion/renderer');
const chrome='C:/Program Files/Google/Chrome/Application/chrome.exe';

const serveUrl=await bundle({entryPoint:path.join(root,'src/cards.tsx'),publicDir:path.join(root,'public'),onProgress:p=>console.log('BUNDLE',p)});for(const id of ['intro','cause','knowledge','custom']){const composition=await selectComposition({serveUrl,id,browserExecutable:chrome});await renderMedia({composition,serveUrl,browserExecutable:chrome,codec:'h264',crf:18,pixelFormat:'yuv420p',concurrency:4,x264Preset:'ultrafast',muted:true,outputLocation:path.join(root,'renders/'+id+'.mp4')});console.log('CARD_COMPLETE',id);}console.log('CARDS_READY');