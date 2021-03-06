import React from 'react';
import { Link } from 'react-router-dom';
import { API_URL, ELLIPSE_V_ICO } from '../../consts';
import { calculateDuration } from '../funcs/videoPlayerFuncs';
import Button from './Button';

export interface INF_Video {
    id: number
    title: string;
    user: number;
    channel: number;
    username: string;
    thumbnail: string;
    profile: string;
    views: string;
    duration: number;
    description: string;
    created_at: string;
}

export interface I_INF_Video {
    [key: string]: INF_Video
}

const Video = ({ props, direction } : { props : INF_Video, direction: undefined | 'vertical' | 'side' }) => {
    console.log(props.duration)
  return(
    <div className={`video ${direction ? direction : ''}`}>
        <Link to={'/watch/' + props.id} className='video__thumbnail-link'>
            <div className="video__thumbnail skel" data-duration={calculateDuration(props.duration)}>
                <img src={ API_URL + props.thumbnail } alt={`${props.title}'s thumbnail`} />
            </div>
        </Link>

        <div className="video__details flex">
            <div className="video__channel-profile round profile">
                <img src={API_URL + props.profile} alt={`${props.username}'s profile`} />
            </div>

            <div className='video__inner-details'>
                <div className='video__info flex flex--col gap--05'>
                    <p className="video__title multi--ellipsis">{ props.title }</p>
                    <Link className='video__channel-name link--muted'
                        to={`/channels/${props.channel}`}>{ props.username }</Link>
                </div>

                <div className='video__stats flex flex--center txt--muted'>
                    <p>{ props.views } views</p>
                    <div className="dot--split"></div>
                    <p>{ props.created_at } ago</p>
                </div>

                <Button props={{ content: ELLIPSE_V_ICO, action: () => null,
                    id: 'home-video-options', tooltip: 'Options' }} />
            </div>
        </div>
    </div>
  )
};

export default Video;
