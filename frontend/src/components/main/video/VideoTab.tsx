import { useParams } from 'react-router-dom';
import { useGetVideoQuery, useGetVideosQuery } from '../../../services/videoApi';
import VideoComments, { Comment } from '../../combines/VideoComments';import Videos from '../../combines/Videos';
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
  rate_type: string;
  visibility: number;
  comments: Comment[]
}

const VideoTab = () => {
  const { video_id } = useParams();
  const { data: video, isFetching: hasRecVideo } = useGetVideoQuery({ video_id: Number(video_id)!, type: 'all' });
  const { data: nextVideos, isFetching: hasRecVideos } = useGetVideosQuery();

  if(video && nextVideos)
    return(
        <div className="video-tab-container">
            <section>
                <VideoPlayer videoData={{ 
                  videoUrl: video.video, thumbnailUrl: video.thumbnail, duration: video.duration }} />

                <VideoDetails videoDetails={video} />
                <VideoComments props={{ id: 'desktop-comments', comments: video.comments }} />
            </section>
            
            <div>
              <h1 className='txt--center mb--1'>Watch Next</h1>
              <section aria-label='Watch next videos' className='flex flex--col gap--1'>
                <Videos props={{ videos: nextVideos, filters: {'id': [Number(video_id), true]} }} />
              </section>
            </div>
            <section className="other-videos flex flex--col gap--1">
              <VideoComments props={{ id: 'mobile-comments', comments: video.comments }} />
            </section>
            
        </div>
    )
  else
      return(<Loader />)
};

export default VideoTab;
