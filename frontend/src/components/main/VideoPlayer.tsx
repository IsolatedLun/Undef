import React, { createRef, useEffect } from 'react';
import { API_URL, FULLSCREEN_ICO, SETTINGS_ICO } from '../../consts';
import Button from '../modules/Button';

interface VideoData {
  videoUrl: string;
  thumbnailUrl: string;
}

const VideoPlayer = ({ videoData } : { videoData: VideoData }) => {
  let videoRef = createRef<HTMLVideoElement>();
  let barRef = createRef<HTMLDivElement>();

  function toggleVideo(videoEl: HTMLVideoElement): void {
      if(videoEl.paused)
        videoEl.play()
      else
        videoEl.pause()
  }

  function handleVideoBar(innerBarEl: HTMLElement, currTime: number, duration: number): void {
    innerBarEl.style.transform = `scaleX(${currTime / duration})`;
  }

  useEffect(() => {
    
  })


  return(
      <div className="video-player">
          <video 
            onClick={() => toggleVideo(videoRef.current!)}
            onTimeUpdate={() => 
              handleVideoBar(barRef.current!, videoRef.current!.currentTime, videoRef.current!.duration)}
            
            id='video-el'
            ref={videoRef}
            className="player__el" 
            poster={API_URL + videoData.thumbnailUrl}
            src={API_URL + videoData.videoUrl}
            >

          </video>

          <div className="player__controls">

            <div className="controls__inner">

              <div className="controls__bar">
                <div ref={barRef} className="bar__progress" id='bar-progress'></div>
              </div>

              <div className="controls__options flex flex--center--between">
                <div>
                  
                </div>
                
                <div>
                  <Button props={{ content: SETTINGS_ICO, isIcon: true, default: true, 
                    tooltip: 'Settings', action: () => null }} />
                  <Button props={{ content: FULLSCREEN_ICO, isIcon: true, default: true, 
                    tooltip: 'Fullscreen', action: () => null }} />
                </div>
              </div>

            </div>

          </div>
      </div>
  )
};

export default VideoPlayer;
