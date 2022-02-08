import React from 'react';
import VideoComments from '../combines/VideoComments';
import Videos from '../combines/Videos';
import Video from '../modules/Video';
import VideoDetails from './VideoDetails';
import VideoPlayer from './VideoPlayer';

const VideoTab = () => {
  return(
      <div className="video-tab-container">
          <section>
              <VideoPlayer />
              <VideoDetails />
              <VideoComments props={{ id: 'desktop-comments' }} />
          </section>

          {/* <Videos props={{ videos: [] }} /> */}
          <section className="other-videos flex flex--col gap--1">
            <Video props={{ title: 'Ll' }} />
            <VideoComments props={{ id: 'mobile-comments' }} />
          </section>
          
      </div>
  )
};

export default VideoTab;
