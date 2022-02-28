import React from 'react'
import { INF_Channel } from './ChannelRouter';

const ChannelAbout = ({ channel } : { channel: INF_Channel }) => {
  return (
    <div className="channel__about flex flex--center--between">
        <div>
            <h2>Description</h2>
            <p className="channel__description">{ channel.channel_description }</p>

            <h3>Details</h3>
            <div className="channel__user-links flex gap--1">
                <div>
                    <p className="txt--muted upper btn--muted">Business email</p>
                </div>
                <div>
                    <p>esh</p>
                </div>
            </div>
        </div>

        <div className="channel__stats flex flex--col gap--05">
            <p className="txt--muted">Joined at { channel.created_at }</p>
            <div className="line--split"></div>
            <p>{ channel.total_views } views</p>
        </div>
    </div>
  )
}

export default ChannelAbout;