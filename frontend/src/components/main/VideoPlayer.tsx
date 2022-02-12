import React, { createRef, useEffect, useState } from 'react';
import { API_URL, FULLSCREEN_ICO, SETTINGS_ICO } from '../../consts';
import { calculateDuration, changeTime, toggleVideo, updateVideoData } from '../funcs/videoPlayerFuncs';
import Button from '../modules/Button';

interface VideoData {
  videoUrl: string;
  thumbnailUrl: string;
  duration: number;
}

const VideoPlayer = ({ videoData } : { videoData: VideoData }) => {
  let videoRef = createRef<HTMLVideoElement>();
  let barRef = createRef<HTMLDivElement>();
  let currDurationRef = createRef<HTMLParagraphElement>();

  const [mouseDown, setMouseDown] = useState(false);

  function fullscreen(e: Event, videoElStr: string) {
    (document.getElementById(videoElStr) as HTMLVideoElement).requestFullscreen();
  }

  return(
      <div 
        className="video-player" 
        onMouseDown={() => setMouseDown(true)}
        onMouseUp={() => setMouseDown(false)}
        >
          
          <video 
            onClick={() => toggleVideo(videoRef.current!)}
            onTimeUpdate={() => 
              updateVideoData(videoRef.current!, barRef.current!, currDurationRef.current!)}
            onEnded={() => alert('ended')}
            
            id='video-el'
            ref={videoRef}
            className="player__el" 
            poster={API_URL + videoData.thumbnailUrl}
            src={API_URL + videoData.videoUrl}
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
              </div>

              <div className="controls__options flex flex--center--between">
                <div>
                  <p>
                    <span ref={currDurationRef} id='current-duration'>{ calculateDuration(0) }</span> / 
                    <span className="duration"> { calculateDuration(videoData.duration) }</span>
                    </p>
                </div>
                
                <div>
                  <Button props={{ content: SETTINGS_ICO, isIcon: true, default: true, 
                    tooltip: 'Settings', action: () => null }} />
                  <Button props={{ content: FULLSCREEN_ICO, isIcon: true, default: true, 
                    tooltip: 'Fullscreen', action: fullscreen, params: ['video-el'] }} />
                </div>
              </div>

            </div>

          </div>
      </div>
  )
};

export default VideoPlayer;
