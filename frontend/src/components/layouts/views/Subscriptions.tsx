import React, { useEffect } from 'react'
import { useGetChannelPreviewsQuery } from '../../../services/channelApi'
import Videos from '../../combines/Videos'
import Channeltem from '../../modules/Channeltem';
import Loader from '../Loader';

const Subscriptions = () => {
  const { data } = useGetChannelPreviewsQuery();

  if(data)
    return (
      <>
          <h1 className='view--header'>My subscriptions</h1>
          {
            <div className="search-items">
              {
                data.map(channel => (
                  <Channeltem props={{ ...channel }} />
                ))
              }
            </div>
          }
      </>
    )
  else
    return <Loader />
}

export default Subscriptions