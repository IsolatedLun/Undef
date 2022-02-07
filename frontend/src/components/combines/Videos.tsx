import React from 'react';
import Video, { INF_Video } from '../modules/Video';

interface Videos {
    videos: INF_Video[]
}

const Videos = ({ props } : { props: Videos }) => {
    return <>{
        props.videos.map((video, idx) => (
            <Video key={idx} props={{ video: video }} />
        ))
    }</>
};

export default Videos;
