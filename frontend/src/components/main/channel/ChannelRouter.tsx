import React from 'react'
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom'
import { useGetChannelQuery } from '../../../services/channelApi';
import Loader from '../../layouts/Loader';
import { INF_Video } from '../../modules/Video';
import ChannelHeader from './ChannelHeader';
import ChannelVideos from './ChannelVideos';

export interface ChannelData {
    channel: INF_Channel,
    videos: INF_Video[]
    
}

export interface INF_Channel {
    id: number;
    banner: string;
    channel_description: string;
    business_email: string;
    created_at: string;
    
    user_data: {
      id: number;
      username: string;
      profile: string;
      subscribers: number;
    }
}

const ChannelRouter = () => {
    const { channel_id } = useParams();
    const { data: channel, isFetching } = useGetChannelQuery(Number(channel_id!));

    if(channel !== undefined)
        return(
            <div className='channel'>  
                <ChannelHeader channel={channel.channel} />
                <Routes>
                    <Route path='' element={<ChannelVideos videos={channel.videos} />} />
                    <Route path='about' element={<p>About</p>} />
                </Routes>
            </div>
        )
    else
        return <Loader />
}

export default ChannelRouter;