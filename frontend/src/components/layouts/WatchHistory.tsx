import React, { useState } from 'react'
import { useGetVideoHistoryQuery } from '../../services/videoApi';
import Videos from '../combines/Videos';

const WatchHistory = () => {
    const [historyType, setHistoryType] = useState('videos');

    const { data: videoHistory } = useGetVideoHistoryQuery();

    return (
        <>
            <h1 className="view--header">Your watch history</h1>
            <div className="search-items">
                { historyType && ( <Videos props={{ videos: videoHistory, direction: 'side' }} /> ) }
            </div>
        </>
    )
}

export default WatchHistory