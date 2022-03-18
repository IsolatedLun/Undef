import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSearchMutation } from '../../services/channelApi';
import Loader from '../layouts/Loader';
import Channeltem from '../modules/Channeltem';
import Video, { INF_Video } from '../modules/Video';
import { INF_Channel } from './channel/ChannelRouter';

interface QuerySetList {
    obj: INF_Video | INF_Channel;
    type: 'video' | 'channel';
}

const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [getSearchQuerySets] = useSearchMutation();

    const [querySet, setQuerySet] = useState<QuerySetList[]>([]);

    useEffect(() => {
        setQuerySet([]);

        getSearchQuerySets({ query: searchParams.get('s'), searchType: 'queryset' })
            .unwrap()
            .then((res: any) => setQuerySet(res.data));
    }, [searchParams.get('s')])

    if(querySet.length > 0)
        return (
            <div className='search-items'>
                {
                    querySet.map(item => {
                        if(item.type === 'video')
                            return <Video props={{ ...(item.obj as INF_Video), direction: 'side' }} />
                        else if(item.type === 'channel')
                            return <Channeltem props={{ ...(item.obj as INF_Channel) }} />
                    })
                }
            </div>
        )

    else
        return <Loader />
}

export default Search