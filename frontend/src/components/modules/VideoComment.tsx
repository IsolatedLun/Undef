import React from 'react';

const VideoComment = () => {
  return(
      <div className="video__comment flex gap--1 flex--g--1">
          <div className="comment__profile profile round">
            <img src="" alt="" />
          </div>

          <div className='flex flex--col gap--05'>
            <div className='flex gap--05'>
              <p className="comment__user">isolated</p>
              <p className="comment__date txt--muted">23 hours ago</p>
            </div>
            <p className="comment__text">lolasdadsfsdfsdfsdfdsfdsfdfsdfsdfsdfsdasdasdasdasdfsfssdas</p>
          </div>
      </div>
  )
};

export default VideoComment;
