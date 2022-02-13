import React from 'react'
import { useParams } from 'react-router-dom'
import { API_URL } from '../../consts'
import { useGetChannelQuery } from '../../services/channelApi'
import Videos from '../combines/Videos'
import Loader from '../layouts/Loader'
import Profile from '../layouts/Profile'
import Button from '../modules/Button'
import { INF_Video } from '../modules/Video'

export interface ChannelData {
  channel: {
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
  },
  videos: INF_Video[]
}

const Channel = () => {
  const { channel_id } = useParams();
  const { data: channel, isFetching } = useGetChannelQuery(Number(channel_id!));

  if(channel !== undefined)
    return (
      <div className="channel">
        <nav className="channel__nav" role='channel navigation'>
          <Profile props={{ cls: 'channel__banner', 
            url: channel.channel.banner, alt: '' }} />

          <div className="flex flex--center--between mt--1">

            <div className='flex gap--1'>
              <Profile props={{ cls: 'channel__user-profile profile', 
                url: channel.channel.user_data.profile, alt: '' }} />

              <div className='flex flex--col gap--025'>
                <p className="channel_username">{ channel.channel.user_data.username }</p>
                <p className="channel_subscribers txt--muted txt--sm">
                { channel.channel.user_data.subscribers } subscribers</p>
              </div>
            </div>

            <Button props={{ content: 'Subscribe', cls: 'button--primary btn--hollow',
              action: () => null }} />

          </div>

          <ul className="channel__links flex">
            <li className="channel__link">Videos</li>
            <li className="channel__link">About</li>
          </ul>
        </nav>

        <div className="videos">
          <Videos props={{ videos: channel.videos }} />
        </div>
      </div>
  )
  else
      return(<Loader />)
}

export default Channel