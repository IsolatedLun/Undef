import React from 'react';
import { ELLIPSE_V_ICO } from '../../consts';
import Button from './Button';

export interface INF_Video {
    title: string;
}

interface Video {
    video: INF_Video
}

const Video = ({ props } : { props : Video }) => {
  return(
    <div className="video">
        <div className="video__thumbnail skel">
            <img src="" alt="" />
        </div>

        <div className="video__details flex flex--center--gap--1 flex--g--1">
            <div className="video__channel-profile round profile ">
                <img src="" alt="" />
            </div>

            <div className='video__inner-details flex flex--center'>
                <div className='video__info flex flex--col gap--05'>
                    <p className="video__title text--elliptic">asdsasdasdasddsaaasdssdssd</p>
                    <p className="video__channel-name">isolated</p>
                </div>

                <Button props={{ content: ELLIPSE_V_ICO, action: () => null, default: true,
                    id: 'home-video-options', tooltip: 'Options', isIcon: true }} />
            </div>
        </div>
    </div>
  )
};

export default Video;
