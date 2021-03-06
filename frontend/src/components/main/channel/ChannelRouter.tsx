import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth';
import { useGetChannelQuery } from '../../../services/channelApi';
import ProtectedRoute from '../../auth/ProtectedRoute';
import Loader from '../../layouts/Loader';
import EditVideo from '../forms/EditVideo';
import Upload from '../forms/Upload';
import { INF_Video } from '../../modules/Video';
import ChannelAbout from './ChannelAbout';
import ChannelHeader from './ChannelHeader';
import ChannelVideos from './ChannelVideos';
import { INF_ChannelDetail } from '../../combines/ChannelDetails';
import PageNotFound from '../../layouts/PageNotFound';

export interface ChannelData {
    channel: INF_Channel,
    videos: INF_Video[]
    
}

export interface INF_ChannelUser {
    id: number;
    channel_id: number;
    username: string;
    profile: string;
    subscribers: number;
}

export interface INF_Channel {
    id: number;
    banner: string;
    channel_description: string;
    channel_details: INF_ChannelDetail[];
    video_count: number;
    subscribed: boolean;
    total_views: number;
    created_at: string;
    
    user_data: INF_ChannelUser;
}

const ChannelRouter = () => {
    const { channel_id } = useParams();
    const user = useAuth();
    const { data: channel, isFetching,
        isSuccess } = useGetChannelQuery({ channel_id: Number(channel_id!), user_id: user.user.id });

    if(channel !== undefined)
        return(
            <section aria-labelledby='channel' id='channel' className='channel'>  
                <ChannelHeader channel={channel.channel} user={user} />
                <Routes>
                    <Route path='' element={<ChannelVideos videos={channel.videos} />} />
                    <Route path='about' element={<ChannelAbout channel={channel.channel} />} />
                    
                    <Route path='upload' 
                        element={<ProtectedRoute redirectTo='/auth/login'
                            condition={user.user.channel_id === Number(channel_id)}
                            children={<Upload />} />} />
                    
                    <Route path='edit/video/:video_id' 
                        element={<ProtectedRoute redirectTo='/auth/login'
                            condition={user.user.channel_id === Number(channel_id)}
                            children={<EditVideo />} />} />
                </Routes>
            </section>
        )
    else if(!isSuccess && !isFetching)
        return(<PageNotFound />)
    else
        return <Loader />
}

export default ChannelRouter;