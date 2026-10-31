import fs from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';
import {pathToFileURL, fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const here=path.join(root,'video/operation-preview-v01');
const pnpm=path.join(root,'video/launch-preview/node_modules/.pnpm');
const pkg=(await fs.readdir(pnpm)).find(x=>x.startsWith('puppeteer-core@'));
const {default:puppeteer}=await import(pathToFileURL(path.join(pnpm,pkg,'node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js')));
const server=http.createServer(async(req,res)=>{try{
 const url=decodeURIComponent((req.url||'/').split('?')[0]);
 const file=path.resolve(root,'.'+(url==='/'?'/index.html':url));
 if(!file.startsWith(root+path.sep))throw Error('outside project');
 const ext=path.extname(file);res.setHeader('Content-Type',({'.html':'text/html','.js':'application/javascript','.css':'text/css','.svg':'image/svg+xml','.woff2':'font/woff2','.png':'image/png'})[ext]||'application/octet-stream');
 res.end(await fs.readFile(file));
}catch{res.statusCode=404;res.end('Not found');}});
await new Promise(r=>server.listen(4186,'127.0.0.1',r));
const browser=await puppeteer.launch({headless:true,executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe'});
const page=await browser.newPage();await page.setViewport({width:1920,height:1080,deviceScaleFactor:2});
await fs.mkdir(path.join(here,'public/captures'),{recursive:true});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:4186/',{waitUntil:'networkidle0'});
await fs.writeFile(path.join(here,'capture-ready.json'),JSON.stringify({ready:true,title:await page.title()}));
console.log('CAPTURE READY');
let last='';
while(true){
 let command;try{command=JSON.parse(await fs.readFile(path.join(here,'capture-command.json'),'utf8'));}catch{await new Promise(r=>setTimeout(r,100));continue;}
 if(command.id===last){await new Promise(r=>setTimeout(r,100));continue;}last=command.id;
 try{
  if(command.code){const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;var result=await new AsyncFunction('page',command.code)(page);}
  if(command.screenshot)await page.screenshot({path:path.join(here,'public/captures',command.screenshot),fullPage:false});
  await fs.writeFile(path.join(here,'capture-result.json'),JSON.stringify({id:last,ok:true,result,errors}));
 }catch(e){await fs.writeFile(path.join(here,'capture-result.json'),JSON.stringify({id:last,ok:false,error:e.stack,errors}));}
 if(command.close)break;
}
await browser.close();server.close();
