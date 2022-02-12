import React from 'react';
import { useFilters } from '../../hooks/useFilters';
import Video, { INF_Video } from '../modules/Video';

interface Videos {
    videos: INF_Video[]
    filters?: any | object | undefined;
}

const Videos = ({ props } : { props: Videos }) => {
    if(props.filters === undefined)
        return <>{
            props.videos.map((video, idx) => (
                <Video key={idx} props={video} />
            ))}</>
    else
        return <>{
            useFilters(props.videos, props.filters, '').map((video, idx) => (
                <Video key={idx} props={video} />
            ))}</>
};

export default Videos;
