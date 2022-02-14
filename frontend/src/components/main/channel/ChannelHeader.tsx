import React from 'react'
import { Link } from 'react-router-dom'
import Loader from '../../layouts/Loader'
import Profile from '../../layouts/Profile'
import Button from '../../modules/Button'
import { INF_Channel } from './ChannelRouter'

const ChannelHeader = ({ channel } : { channel: INF_Channel }) => {
    return (
        <nav className="channel__nav flex flex--col gap--1" role='channel navigation'>
          <Profile props={{ cls: 'channel__banner', 
            url: channel.banner, alt: '', loaderId: 'channel-banner-loader' }} />

          <div className="channel__details flex flex--center--between mt--1">

            <div className='flex gap--1'>
              <Profile props={{ cls: 'channel__user-profile profile round', 
                url: channel.user_data.profile, alt: '' }} />

              <div className='flex flex--col gap--025'>
                <p className="channel_username">{ channel.user_data.username }</p>
                <p className="channel_subscribers txt--muted txt--sm">
                { channel.user_data.subscribers } subscribers</p>
              </div>
            </div>

            <Button props={{ content: 'Subscribe', cls: 'button--primary btn--hollow',
              action: () => null }} />

          </div>

          <ul className="channel__links flex gap--025">
              <Link className="channel__link" to=''>Videos</Link>
              <Link className="channel__link" to='about'>About</Link>
          </ul>
        </nav>
  )
}

export default ChannelHeader;