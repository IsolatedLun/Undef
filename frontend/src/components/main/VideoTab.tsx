import React from 'react';
import VideoComments from '../combines/VideoComments';
import Videos from '../combines/Videos';
import VideoPlayer from './VideoPlayer';

const VideoTab = () => {
  return(
      <div className="video-tab-container">
          <div>
              <VideoPlayer />
              <VideoComments />
          </div>

          <Videos props={{ videos: [] }} />
      </div>
  )
};

export default VideoTab;
