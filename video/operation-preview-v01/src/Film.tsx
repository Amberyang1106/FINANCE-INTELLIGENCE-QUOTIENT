import React from 'react';
import {AbsoluteFill,Composition,registerRoot,useCurrentFrame,Easing,interpolate,OffthreadVideo,staticFile,Audio,delayRender,continueRender} from 'remotion';
import {PageCam,CamKey} from './PageCam';
import actions from '../actions.json';
export const FPS=30,TOTAL=900;
export const SHOTS=[{id:'exception',label:'01 / Exception',from:0,duration:118},{id:'analysis',label:'02 / Analysis',from:118,duration:264},{id:'evidence',label:'03 / Evidence',from:382,duration:206},{id:'scenario',label:'04 / Scenario',from:588,duration:312}];
export const CAPTIONS=[{from:10,to:145,text:'Start with the negative GP alert, then open Analysis.'},{from:153,to:246,text:'Ask why GP turned negative.'},{from:246,to:371,text:'Trace the allocation and revenue base.'},{from:396,to:473,text:'Open the source voucher.'},{from:473,to:574,text:'Review the amount, posting user, and reference.'},{from:600,to:699,text:'Exclude the voucher from the allocation base only.'},{from:699,to:792,text:'GA improves. Total month 3 GP stays unchanged.'},{from:792,to:900,text:'LE remains unresolved. Finance review is still required.'}];
const ease=Easing.bezier(.55,0,.18,1);
const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const r=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{...clamp,easing:ease});
const mix=(a:number,b:number,t:number)=>a+(b-a)*t;
const K=(s:number,cx:number,cy:number,zoom:number):CamKey=>({frame:Math.round(s*30),cx,cy,zoom});
export const KEYS=[K(0,960,580,.95),K(1.2,960,580,.95),K(2,1040,440,1.18),K(3.9,1040,440,1.18),K(4.6,960,580,.95),K(5.3,970,680,1.25),K(7.4,970,680,1.25),K(8.15,1000,640,1.2),K(11.65,1000,640,1.2),K(12.45,1200,650,1.15),K(12.9,1200,650,1.15),K(13.6,960,470,1.3),K(17,960,470,1.3),K(18.2,960,735,1.1),K(19.65,960,735,1.1),K(20.7,1255,500,1.45),K(23.6,1255,500,1.45),K(24.4,1115,550,1.2),K(25.4,1115,550,1.2),K(26.2,960,560,1.5),K(30,960,560,1.5)];
const camera=(f:number)=>{let a=KEYS[0],b=KEYS[KEYS.length-1];for(let i=0;i<KEYS.length-1;i++)if(f>=KEYS[i].frame&&f<=KEYS[i+1].frame){a=KEYS[i];b=KEYS[i+1];break;}const t=r(f,a.frame,b.frame);return {cx:mix(a.cx,b.cx,t),cy:mix(a.cy,b.cy,t),zoom:mix(a.zoom,b.zoom,t)};};
const clicks=actions.log.filter(a=>!['voucher-evidence','comparison-result'].includes(a.name)).map(a=>({f:Math.round(a.time*30),x:a.rect.x+a.rect.width/2,y:a.rect.y+a.rect.height/2,name:a.name}));
const cursor=(f:number)=>{let x=1100,y=400;for(const c of clicks){const u=r(f,c.f-22,c.f-6);const dx=c.x-x,dy=c.y-y,len=Math.max(1,Math.hypot(dx,dy)),bow=Math.sin(Math.PI*u)*Math.min(70,len*.12);x=mix(x,c.x,u)-dy/len*bow;y=mix(y,c.y,u)+dx/len*bow;}return {x,y};};
export const Visual:React.FC<{frameOffset?:number}>=({frameOffset=0})=>{const f=useCurrentFrame()+frameOffset,t=f/30,c=camera(f),p=cursor(f),x=960+(p.x-c.cx)*c.zoom,y=540+(p.y-c.cy)*c.zoom;
const step=SHOTS.findIndex(s=>f>=s.from&&f<s.from+s.duration),caption=CAPTIONS.find(s=>f>=s.from&&f<s.to);
const texture=t<3.93?'monitor.png':t>=13.65&&t<19.62?'voucher.png':t>=22.8&&t<24.5?'scenario-after.png':t>=26?'final-comparison.png':'monitor.png';
const live=(t>=3.93&&t<13.65)||(t>=19.62&&t<22.8)||(t>=24.5&&t<26);
const click=clicks.find(a=>f>=a.f&&f<a.f+18);const press=click?1-r(f,click.f+1,click.f+7):0;
const hidden=t>13.7&&t<18.5;const opacity=hidden?0:1;
const [font]=React.useState(()=>delayRender('Geologica'));React.useEffect(()=>{new FontFace('Geologica','url('+staticFile('geologica.woff2')+')').load().then(x=>{document.fonts.add(x);continueRender(font);}).catch(()=>continueRender(font));},[font]);
return <AbsoluteFill style={{background:'#060d10',fontFamily:'Geologica,Arial,sans-serif',color:'#eef3f4'}}><div style={{position:'absolute',width:1920,height:1080,transform:'scale(1.3333333333333333)',transformOrigin:'top left'}}>
<div style={{position:'absolute',inset:0,bottom:140,overflow:'hidden'}}><PageCam src={'captures/'+texture} pageH={1080} keys={KEYS} ease={ease}>{live&&<OffthreadVideo src={staticFile('operation.mp4')} muted style={{position:'absolute',left:0,top:0,width:1920,height:1080}}/>}
{f>20&&f<116&&<svg width="1920" height="1080" style={{position:'absolute',left:0,top:0}}><defs><filter id="soft"><feGaussianBlur stdDeviation="22"/></filter><mask id="focus"><rect width="1920" height="1080" fill="white"/><rect x="410" y="450" width="325" height="160" rx="20" fill="black" filter="url(#soft)"/><rect x="1235" y="195" width="155" height="90" rx="24" fill="black" filter="url(#soft)"/></mask></defs><rect width="1920" height="1080" fill="#03090c" opacity={.34*r(f,20,40)*(1-r(f,100,116))} mask="url(#focus)"/></svg>}
</PageCam>
{click&&<div style={{position:'absolute',left:x-40,top:y-40,width:80,height:80,borderRadius:'50%',border:'3px solid #c6f54a',opacity:1-(f-click.f)/18,transform:'scale('+(0.3+1.2*r(f,click.f,click.f+18))+')'}}/>}
<div style={{position:'absolute',left:x-5,top:y-4,opacity,transform:'scale('+(1-.16*press)+')',transformOrigin:'5px 4px',filter:'drop-shadow(0 3px 5px #0009)'}}><svg width="38" height="38" viewBox="0 0 24 24"><path d="M4.5 2.5 L4.5 19.2 L8.9 15 L11.9 21.6 L14.9 20.3 L11.9 13.8 L18.2 13.4 Z" fill="#0d1324" stroke="white" strokeWidth="1.6" strokeLinejoin="round"/></svg></div></div>
<div style={{position:'absolute',left:0,right:0,top:940,height:140,background:'#071015',borderTop:'1px solid #30434c',padding:'15px 45px',boxSizing:'border-box'}}><div style={{display:'flex',alignItems:'center',gap:25,fontSize:17}}>{SHOTS.map((s,i)=><span key={s.id} style={{color:i===step?'#c6f54a':'#8c9da6',fontWeight:i===step?650:450}}>{s.label}{i<3&&<span style={{marginLeft:25,color:'#4b5e66'}}>→</span>}</span>)}<span style={{marginLeft:'auto',fontSize:14,color:'#aab8c0'}}>Vantage / Sample data / Simulated AI</span></div><div style={{fontSize:29,lineHeight:1.35,marginTop:16,minHeight:40}}>{caption?.text}</div><div style={{position:'absolute',height:2,left:0,bottom:0,width:(f/899*100)+'%',background:'#c6f54a'}}/></div>
</div></AbsoluteFill>;};
export const Film:React.FC<{bgm?:boolean}>=({bgm=true})=><AbsoluteFill><Visual/><Audio src={staticFile(bgm?'audio/mix.wav':'audio/narration.wav')}/></AbsoluteFill>;
