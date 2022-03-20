import React, { createRef, useEffect, useState } from 'react';
import { API_URL, FULLSCREEN_ICO, SETTINGS_ICO, VOLUME_ICO } from '../../../consts';
import { calculateDuration, changeTime, changeVolume, 
  toggleVideo, updateVideoData } from '../../funcs/videoPlayerFuncs';
import Button from '../../modules/Button';
import Input from '../../modules/inputs/Input';

interface VideoData {
  videoUrl: string;
  thumbnailUrl: string;
  duration: number;
}

const VideoPlayer = ({ videoData } : { videoData: VideoData }) => {
  let videoRef = createRef<HTMLVideoElement>();
  let barRef = createRef<HTMLDivElement>();
  let currDurationRef = createRef<HTMLParagraphElement>();
  let bufferBarRef = createRef<HTMLDivElement>();

  const [mouseDown, setMouseDown] = useState(false);

  function fullscreen(e: Event, videoElStr: string) {
    (document.getElementById(videoElStr) as HTMLVideoElement).requestFullscreen();
  }

  return(
      <div 
        className="video-player pos--relative" 
        onMouseDown={() => setMouseDown(true)}
        onMouseUp={() => setMouseDown(false)}
        >
          
          <video 
            onClick={() => toggleVideo(videoRef.current!)}
            onTimeUpdate={() => 
              updateVideoData(videoRef.current!, barRef.current!, 
                currDurationRef.current!, bufferBarRef.current!)}
            
            id='video-el'
            ref={videoRef}
            className="player__el" 
            poster={API_URL + videoData.thumbnailUrl}
            src={API_URL + videoData.videoUrl}
            preload='none'
            tabIndex={0}
            >

          </video>

          <div className="player__controls">

            <div className="controls__inner">

              <div 
                className="controls__bar" 
                onClick={(e) => changeTime(e, videoRef.current!)}
                onMouseMove={(e) => {
                  if(mouseDown)
                    changeTime(e, videoRef.current!)
                }}
                >

                <div ref={barRef} className="bar__progress" id='bar-progress'></div>
                <div ref={bufferBarRef} className="bar__progress" id='buffer-progress'></div>
              </div>

              <div className="controls__options flex flex--center--between">
                <div>
                  <p>
                    <span ref={currDurationRef} id='current-duration'>{ calculateDuration(0) }</span> / 
                    <span className="duration"> { calculateDuration(videoData.duration) }</span>
                  </p>
                  <Button props={{ content: VOLUME_ICO,
                    tooltip: 'Volume', action: () => null, modifiers: 'video__volume-button' }} />
                  <Input props={{ type: 'range', id: 'video__volume', realType: 'string', name: 'volume',
                    action: changeVolume, params: ['video-el'] }} />
                </div>
                
                <div>
                  <Button props={{ content: SETTINGS_ICO, 
                    tooltip: 'Settings', action: () => null }} />
                  <Button props={{ content: FULLSCREEN_ICO,
                    tooltip: 'Fullscreen', action: () => document.getElementById('video-el')?.requestFullscreen() }} />
                </div>
              </div>

            </div>

          </div>
      </div>
  )
};

export default VideoPlayer;
