import React from 'react';

export interface Comment {
  user_id: number;
  user_name: string;
  created_at: string;
  text: string;
}

const VideoComment = ({ props } : { props: Comment }) => {
  return(
      <div className="video__comment flex gap--1 flex--g--1">
          <div className="comment__profile profile round">
            <img src="" alt="" />
          </div>

          <div className='flex flex--col gap--05'>
            <div className='flex gap--05'>
              <p className="comment__user">{ props.user_name }</p>
              <p className="comment__date txt--muted">{ props.created_at }</p>
            </div>
            <p className="comment__text">{ props.text }</p>
          </div>
      </div>
  )
};

export default VideoComment;
