import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL, CLOCK_ICO, DISLIKE_ICO, 
  EDIT_ICO, ELLIPSE_V_ICO, FLAG_ICO, LIKE_ICO } from '../../../consts';
import { useAuth } from '../../../hooks/useAuth';
import { useRateVideoMutation, useReportVideoMutation } from '../../../services/videoApi';
import { positionTooltip } from '../../funcs/accessibilityFuncs';
import { loggedAction } from '../../funcs/authFuncs';
import { calculateRating, handleResponse } from '../../funcs/utilFuncs';
import Button from '../../modules/Button';
import ContextMenu from '../../modules/ContextMenu';
import { VideoData } from './VideoTab';

interface RateSongResponse {
  data: {
    rate_type: string;
    likes: number;
    dislikes: number;
  }
}

const VideoDetails = ({ videoDetails } : { videoDetails: VideoData }) => {
  const navigate = useNavigate();
  const { isLogged, user } = useAuth();
  const [rateType, setRateType] = useState(videoDetails.rate_type);
  const [rating, setRating] = useState({
    likes: videoDetails.likes,
    dislikes: videoDetails.dislikes
  })

  const [rateVideo, {  }] = useRateVideoMutation();
  const [reportVideo, {  }] = useReportVideoMutation();


  const videoOptionsMenu = <ContextMenu props={{ id: 'options-menu', options: [
    { action: () => null, icon: CLOCK_ICO, text: 'Add to watch later' },
    { action: () => {
      loggedAction(isLogged, () => 
      reportVideo(videoDetails.id).unwrap()
        .then(res => handleResponse(res, { popup: res.data.detail }))
        .catch(res => handleResponse(res)))
    }, 
      icon: FLAG_ICO, text: 'Report' },
  ] }} />

  function rateVideoWrapper(type: string) {
    rateVideo({ video_id: videoDetails.id, type: type }).unwrap()
      .then((res: RateSongResponse) => {
        setRateType(res.data.rate_type)
        setRating({ likes: res.data.likes, dislikes: res.data.dislikes })
      })
  }

  useEffect(() => {
    setRateType(videoDetails.rate_type);
    setRating({ likes: videoDetails.likes, dislikes: videoDetails.dislikes })
  }, [videoDetails])

  return(
      <section aria-label='Video details' className='video-details'>
        <div className="main-video__details">
        <p className="details__title multi--ellipsis">{ videoDetails.title }</p>
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

                <Button props={{ content: LIKE_ICO, action: () => 
                  loggedAction(isLogged, () => rateVideoWrapper('like'), true),
                    tooltip: 'Like', extraAfter: rating.likes, 
                    modifiers: rateType === 'like' ? 'active' : ''}} />
                
                <Button props={{ content: DISLIKE_ICO, action: () => 
                  loggedAction(isLogged, () => rateVideoWrapper('dislike'), true),
                        tooltip: 'Dislike', extraAfter: rating.dislikes,
                        modifiers: rateType === 'dislike' ? 'active' : '' }} />

                <Button props={{ content: ELLIPSE_V_ICO, action: () => null,
                  contextMenu: videoOptionsMenu, id: 'video-options-button', passEvent: true }} />

                { videoDetails.user === user.id && (
                  <Button props={{ content: EDIT_ICO, action: () => 
                    navigate(`/channels/${user.channel_id}/edit/video/${videoDetails.id}`), tooltip: 'Edit' }} />
                ) }
              </div>
              <div className="controls__rating-bar btn--tooltip">

                <div style={{ transform: `scaleX(${calculateRating(rating.likes, rating.dislikes)})` }}
                  className="rating-bar__display"></div>

                <div className="tooltip span" 
                  data-tooltip={`${Number(calculateRating(rating.likes, rating.dislikes)) * 100}% of people like this`}></div>
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
