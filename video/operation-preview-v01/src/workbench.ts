import React from 'react';
import {Film,Visual,TOTAL,SHOTS} from './Film';
export const WORKBENCH={name:'Vantage / 30-second operation pilot',fps:30,width:2560,height:1440,total:TOTAL,background:'#060d10',shots:SHOTS.map(s=>({...s,component:()=>React.createElement(Visual,{frameOffset:s.from})})),transitions:[],captions:[],overlays:[],sfx:[{from:0,duration:TOTAL,src:'audio/narration.wav',volume:1}],bgm:[{from:0,duration:TOTAL,src:'audio/music.wav',volume:1}],order:[],original:Film};
