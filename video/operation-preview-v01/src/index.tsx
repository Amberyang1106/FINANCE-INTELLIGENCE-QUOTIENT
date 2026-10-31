import React from 'react';
import {Composition,registerRoot} from 'remotion';
import {Film,TOTAL} from './Film';
registerRoot(()=> <Composition id="VantageOperationPilot" component={Film} width={2560} height={1440} fps={30} durationInFrames={TOTAL} defaultProps={{bgm:true}}/>);
