import {spawn} from 'node:child_process';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const cli=path.resolve(root,'../launch-preview/node_modules/hyperframes/bin/hyperframes.mjs');
const [cwd,...args]=process.argv.slice(2);
const child=spawn(process.execPath,[cli,...args],{cwd,windowsHide:true,env:{...process.env,HYPERFRAMES_BROWSER_PATH:'C:/Program Files/Google/Chrome/Application/chrome.exe'},stdio:'inherit'});
child.on('error',error=>{console.error(error);process.exitCode=1;});
child.on('exit',code=>{process.exitCode=code??1;});
