import React from 'react';
import { CLOCK_ICO, ELLIPSE_V_ICO, FLAG_ICO, FULLSCREEN_ICO, SETTINGS_ICO } from '../../consts';
import Button from '../modules/Button';
import Contextmenu from '../modules/Contextmenu';

const VideoDetails = () => {

  const videoOptionsMenu = <Contextmenu props={{ id: 'options-menu', options: [
    { action: () => null, icon: FLAG_ICO, text: 'esh' },
  ] }} />

  return(
      <div className="main-video__details">
        <p className="details__title">The first fucking video ever...!</p>
        <div className="details__options flex flex--start--between">
            <div className='flex flex--center gap--05 txt--muted'>
                <p className="options__views">232,312 views</p>
                <div className="dot--split"></div>
                <p className="options__date">Feb 7, 2022</p>
            </div>
            <div className="details__controls flex flex--col gap--075">
              <div className='flex gap--1'>
                <Button props={{ content: SETTINGS_ICO, isIcon: true, default: true, 
                        tooltip: 'Settings' }} />

                <Button props={{ content: SETTINGS_ICO, isIcon: true, default: true, 
                        tooltip: 'Settings' }} />

                <Button props={{ content: CLOCK_ICO, isIcon: true, default: true, 
                        tooltip: 'Add to watch later' }} />

                <Button props={{ content: ELLIPSE_V_ICO, isIcon: true, default: true, 
                  contextMenu: videoOptionsMenu }} />
              </div>

              <div className="controls__rating-bar"></div>
            </div>
        </div>

        <p className="details__desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem tempore inventore maxime minima obcaecati cumque totam, magnam quos ipsa dolorum?</p>
      </div>
  )
};

export default VideoDetails;
