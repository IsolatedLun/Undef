import React from 'react'
import { Link } from 'react-router-dom'
import { SETTINGS_ICO } from '../../../consts'
import { UserState } from '../../../slices/auth-slice'
import Loader from '../../layouts/Loader'
import Profile from '../../layouts/Profile'
import Button from '../../modules/Button'
import { INF_Channel } from './ChannelRouter'

const ChannelHeader = ({ channel, user } : { channel: INF_Channel, user: UserState }) => {
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

            {
              user.user.id !== channel.user_data.id && 
              (
                <Button props={{ content: 'Subscribe', cls: 'button--primary btn--hollow',
                  action: () => null }} />
              )
            }

            {
              user.user.id === channel.user_data.id && 
              (
                <div className="btn--group">
                  <Button props={{ content: 'Upload', action: () => null }} />
                  <Button props={{ content: SETTINGS_ICO, action: () => null, tooltip: 'Edit channel' }} />
                </div>
              )
            }

          </div>

          <ul className="channel__links flex gap--025">
              <Link className="channel__link" to=''>Videos</Link>
              <Link className="channel__link" to='about'>About</Link>
          </ul>
        </nav>
  )
}

export default ChannelHeader;