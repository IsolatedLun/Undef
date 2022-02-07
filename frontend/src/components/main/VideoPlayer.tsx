import React from 'react';
import { FULLSCREEN_ICO, SETTINGS_ICO } from '../../consts';
import Button from '../modules/Button';

const VideoPlayer = () => {
  return(
      <div className="video-player">
          <video className="player__el"></video>
          <div className="player__controls">

            <div className="controls__inner">

              <div className="controls__bar">
                <div className="bar__progress"></div>
              </div>

              <div className="controls__options flex flex--center--between">
                <div>
                  <Button props={{ content: FULLSCREEN_ICO, isIcon: true, default: true, 
                    tooltip: 'Fullscreen', action: () => null }} />
                </div>
                
                <div>
                  <Button props={{ content: SETTINGS_ICO, isIcon: true, default: true, 
                    tooltip: 'Settings', action: () => null }} />
                </div>
              </div>

            </div>

          </div>
      </div>
  )
};

export default VideoPlayer;
