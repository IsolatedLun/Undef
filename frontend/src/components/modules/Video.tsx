import React from 'react';
import { ELLIPSE_V_ICO } from '../../consts';
import Button from './Button';

export interface INF_Video {
    title: string;
}

const Video = ({ props } : { props : INF_Video }) => {
  return(
    <div className="video">
        <div className="video__thumbnail skel">
            <img src="" alt="" />
        </div>

        <div className="video__details flex">
            <div className="video__channel-profile round profile">
                <img src="" alt="" />
            </div>

            <div className='video__inner-details'>
                <div className='video__info flex flex--col gap--05'>
                    <p className="video__title">{ props.title }</p>
                    <p className="video__channel-name link--muted">isolated</p>
                </div>

                <div className='video__stats flex flex--center txt--muted'>
                    <p>100,000 views</p>
                    <div className="dot--split"></div>
                    <p>2 days ago</p>
                </div>

                <Button props={{ content: ELLIPSE_V_ICO, action: () => null, default: true,
                    id: 'home-video-options', tooltip: 'Options', isIcon: true }} />
            </div>
        </div>
    </div>
  )
};

export default Video;
