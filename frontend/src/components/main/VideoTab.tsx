import { useParams } from 'react-router-dom';
import { useGetVideoQuery } from '../../services/videoApi';
import VideoComments from '../combines/VideoComments';import { INF_Video } from '../modules/Video';
;
import VideoDetails from './VideoDetails';
import VideoPlayer from './VideoPlayer';

export interface VideoData extends INF_Video {
  video: string;
  likes: number;
  dislikes: number;
}

const VideoTab = () => {
  const { video_id } = useParams();
  const { data: video } = useGetVideoQuery(Number(video_id)!);

  if(video)
    return(
        <div className="video-tab-container">
            <section>
                <VideoPlayer videoData={{ videoUrl: video.video, thumbnailUrl: video.thumbnail }} />
                <VideoDetails videoDetails={video} />
                <VideoComments props={{ id: 'desktop-comments', comments: [] }} />
            </section>

            {/* <Videos props={{ videos: [] }} /> */}
            <section className="other-videos flex flex--col gap--1">
              <VideoComments props={{ id: 'mobile-comments', comments: [] }} />
            </section>
            
        </div>
    )
  else
      return(<></>)
};

export default VideoTab;
