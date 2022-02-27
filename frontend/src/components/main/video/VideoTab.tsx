import { useParams } from 'react-router-dom';
import { useGetVideoQuery, useGetVideosQuery } from '../../../services/videoApi';
import VideoComments from '../../combines/VideoComments';import Videos from '../../combines/Videos';
import Loader from '../../layouts/Loader';
import { INF_Video } from '../../modules/Video';
;
import VideoDetails from './VideoDetails';
import VideoPlayer from './VideoPlayer';

export interface VideoData extends INF_Video {
  video: string;
  likes: number;
  dislikes: number;
  subscribers: number;
  ratio: number;
}

const VideoTab = () => {
  const { video_id } = useParams();
  const { data: video, isFetching: hasRecVideo } = useGetVideoQuery(Number(video_id)!);
  const { data: nextVideos, isFetching: hasRecVideos } = useGetVideosQuery();

  if(video && nextVideos)
    return(
        <div className="video-tab-container">
            <section>
                <VideoPlayer videoData={{ 
                  videoUrl: video.video, thumbnailUrl: video.thumbnail, duration: video.duration }} />

                <VideoDetails videoDetails={video} />
                <VideoComments props={{ id: 'desktop-comments', comments: [] }} />
            </section>
            
            <div>
              <h1 className='txt--center mb--1'>Watch Next</h1>
              <div className='flex flex--col gap--1'>
                <Videos props={{ videos: nextVideos, filters: {'id': [Number(video_id), true]} }} />
              </div>
            </div>
            <section className="other-videos flex flex--col gap--1">
              <VideoComments props={{ id: 'mobile-comments', comments: [] }} />
            </section>
            
        </div>
    )
  else
      return(<Loader />)
};

export default VideoTab;
