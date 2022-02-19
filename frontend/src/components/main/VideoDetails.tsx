import React from 'react';
import { Link } from 'react-router-dom';
import { API_URL, CLOCK_ICO, DISLIKE_ICO, ELLIPSE_V_ICO, FLAG_ICO, LIKE_ICO } from '../../consts';
import { positionTooltip } from '../funcs/accessibilityFuncs';
import Button from '../modules/Button';
import Contextmenu from '../modules/Contextmenu';
import { VideoData } from './VideoTab';

const VideoDetails = ({ videoDetails } : { videoDetails: VideoData }) => {

  const videoOptionsMenu = <Contextmenu props={{ id: 'options-menu', options: [
    { action: () => null, icon: FLAG_ICO, text: 'esh' },
  ] }} />

  return(
      <>
        <div className="main-video__details">
        <p className="details__title">{ videoDetails.title }</p>
        <div className="details__options flex flex--center--between">
            <div className='flex flex--center gap--05 txt--muted'>
                <p className="options__views">{ videoDetails.views } views</p>
                <div className="dot--split"></div>
                <p className="options__date">{ videoDetails.created_at } ago</p>
            </div>

            <div className="details__controls flex flex--col gap--075">
              <div className='flex gap--1'>
                <Button props={{ content: CLOCK_ICO, action: () => null,
                        tooltip: 'Add to watch later' }} />

                <Button props={{ content: LIKE_ICO, action: () => null,
                    tooltip: 'Like', extraAfter: videoDetails.likes}} />
                
                <Button props={{ content: DISLIKE_ICO, action: () => null,
                        tooltip: 'Dislike', extraAfter: videoDetails.dislikes }} />

                <Button props={{ content: ELLIPSE_V_ICO, action: () => null,
                  contextMenu: videoOptionsMenu }} />
              </div>
              <div className="controls__rating-bar btn--tooltip">

                <div style={{ transform: `scaleX(${videoDetails.ratio})` }}
                  className="rating-bar__display"></div>

                <div className="tooltip span" 
                  data-tooltip={`${videoDetails.ratio * 100}% of people like this`}></div>
              </div>
            </div>
        </div>

        <p className="details__desc">{ videoDetails.description }</p>
      </div>

      <div className="user__details flex flex--center gap--1">
        <div className="user__profile profile round">
          <img src={API_URL + videoDetails.profile} alt="" />
        </div>
        <div>
          <div className="user__stats txt--center flex flex--col gap--025">
            <Link onMouseOver={(e) => positionTooltip(e.target as HTMLElement)}
              className="username btn--tooltip tooltip" 
              to={`/channels/${videoDetails.channel}`} data-tooltip={videoDetails.username}>
                { videoDetails.username }
              </Link>

            <p className="subscribers txt--sm txt--muted">{ videoDetails.subscribers } subscribers</p>
          </div>
        </div>
      </div>
      </>
  )
};

export default VideoDetails;
