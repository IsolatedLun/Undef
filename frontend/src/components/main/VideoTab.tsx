import React from 'react';
import VideoComments from '../combines/VideoComments';
import Videos from '../combines/Videos';
import VideoDetails from './VideoDetails';
import VideoPlayer from './VideoPlayer';

const VideoTab = () => {
  return(
      <div className="video-tab-container">
          <div>
              <VideoPlayer />
              <VideoDetails />
              <VideoComments />
          </div>

          <Videos props={{ videos: [] }} />
      </div>
  )
};

export default VideoTab;
