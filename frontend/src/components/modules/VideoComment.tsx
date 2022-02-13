import React from 'react';
import { API_URL } from '../../consts';

export interface Comment {
  user: number;
  username: string;
  profile: string;
  created_at: string;
  text: string;
}

const VideoComment = ({ props } : { props: Comment }) => {
  return(
      <div className="video__comment flex gap--1 flex--g--1">
          <div className="comment__profile profile round">
            <img src={API_URL + props.profile} alt={props.username + "'s profile"} />
          </div>

          <div className='flex flex--col gap--05'>
            <div className='flex gap--05'>
              <p className="comment__user">{ props.username }</p>
              <p className="comment__date txt--muted">{ props.created_at }</p>
            </div>
            <p className="comment__text">{ props.text }</p>
          </div>
      </div>
  )
};

export default VideoComment;
