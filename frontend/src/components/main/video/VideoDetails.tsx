import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL, CLOCK_ICO, DISLIKE_ICO, 
  ELLIPSE_V_ICO, FLAG_ICO, LIKE_ICO } from '../../../consts';
import { useRateVideoMutation } from '../../../services/videoApi';
import { positionTooltip } from '../../funcs/accessibilityFuncs';
import Button from '../../modules/Button';
import Contextmenu from '../../modules/Contextmenu';
import { VideoData } from './VideoTab';

interface RateSongResponse {
  data: {
    rate_type: string;
    likes: number;
    dislikes: number;
  }
}

const VideoDetails = ({ videoDetails } : { videoDetails: VideoData }) => {
  const [rateType, setRateType] = useState(videoDetails.rate_type);
  const [rating, setRating] = useState({
    likes: videoDetails.likes,
    dislikes: videoDetails.dislikes
  })

  const [rateSong, {  }] = useRateVideoMutation();

  const videoOptionsMenu = <Contextmenu props={{ id: 'options-menu', options: [
    { action: () => null, icon: CLOCK_ICO, text: 'Add to watch later' },
    { action: () => null, icon: FLAG_ICO, text: 'Report' },
  ] }} />

  function rateSongWrapper(type: string) {
    rateSong({ video_id: videoDetails.id, type: type }).unwrap()
      .then((res: RateSongResponse) => {
        setRateType(res.data.rate_type)
        setRating({ likes: res.data.likes, dislikes: res.data.dislikes })
      })
  }

  return(
      <section aria-label='Video details' className='video-details'>
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

                <Button props={{ content: LIKE_ICO, action: () => rateSongWrapper('like'),
                    tooltip: 'Like', extraAfter: rating.likes, 
                    modifiers: rateType === 'like' ? 'active' : ''}} />
                
                <Button props={{ content: DISLIKE_ICO, action: () => rateSongWrapper('dislike'),
                        tooltip: 'Dislike', extraAfter: rating.dislikes,
                        modifiers: rateType === 'dislike' ? 'active' : '' }} />

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

        <br></br>
      </div>

      <div className="video__desc">
      <p className="desc__text">{ videoDetails.description }</p>
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
      </section>
  )
};

export default VideoDetails;
