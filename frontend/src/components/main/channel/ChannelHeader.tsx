import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SETTINGS_ICO } from '../../../consts'
import { useSubscribleMutation } from '../../../services/channelApi'
import { UserState } from '../../../slices/auth-slice'
import { loggedAction } from '../../funcs/authFuncs'
import Profile from '../../modules/Profile'
import Button from '../../modules/Button'
import { INF_Channel } from './ChannelRouter'
import { useAppDispatch, useAppSelector } from '../../../hooks/state'
import { setCurrentlySubscribed } from '../../../slices/channel-slice'

const ChannelHeader = ({ channel, user } : { channel: INF_Channel, user: UserState }) => {
    const subbed = useAppSelector(state => state.channel.isCurrentlySubscribed);
    const dispatch = useAppDispatch();

    const [subCount, setSubCount] = useState(0);
    const [subscribe, {  }] = useSubscribleMutation();

    useEffect(() => {
      setSubCount(channel.user_data.subscribers);
      if(subbed === undefined)
        dispatch(setCurrentlySubscribed(channel.subscribed));
    }, [channel])
    
    return (
        <nav className="channel__nav flex flex--col gap--1" role='Channel Navigation' aria-label='Channel Header'>
          <Profile props={{ cls: 'channel__banner', ariaLabel: 'Channel Banner',
            url: channel.banner, alt: '', isEditable: channel.user_data.id === user.user.id,
            loaderId: 'channel-banner-loader' }} />

          <div className="channel__details flex flex--center--between mt--1">

            <div className='flex gap--1'>
              <Profile props={{ cls: 'channel__user-profile profile round', 
                url: channel.user_data.profile, alt: '', ariaLabel: 'Channel Profile' }} />

              <div className='flex flex--col gap--025'>
                <p className="channel_username">{ channel.user_data.username }</p>
                <p className="channel_subscribers txt--muted txt--sm">
                { subCount } subscribers {channel.subscribed}</p>
              </div>
            </div>

            {
              user.user.id !== channel.user_data.id && 
              (
                <Button props={{ content: subbed ? 'Unsubscribe' : 'Subscribe', 
                  cls: 'button--primary btn--hollow',
                  action: () => loggedAction(user.isLogged, async() => {
                    await subscribe(channel.id).unwrap()
                      .then(res => {
                        setSubCount(res.data.subscribers);
                      })
                  }, true)}} />
              )
            }

            {
              user.user.id === channel.user_data.id && 
              (
                <div className="btn--group">
                  <Link to='upload' className='button--primary'>Upload</Link>
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