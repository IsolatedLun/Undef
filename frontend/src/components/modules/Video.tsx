import React from 'react';
import { Link } from 'react-router-dom';
import { API_URL, ELLIPSE_V_ICO } from '../../consts';
import Button from './Button';

export interface INF_Video {
    id: number
    title: string;
    user: number;
    username: string;
    thumbnail: string;
    profile: string;
    views: string;
    created_at: string;

    url?: string
}

const Video = ({ props } : { props : INF_Video }) => {
  return(
    <Link to={`/watch/${props.id}`}>
        <div className="video">
            <div className="video__thumbnail skel">
                <img src={ API_URL + props.thumbnail } alt={`${props.title}'s thumbnails`} />
            </div>

            <div className="video__details flex">
                <div className="video__channel-profile round profile">
                    <img src={API_URL + props.profile} alt={`${props.username}'s profile`} />
                </div>

                <div className='video__inner-details'>
                    <div className='video__info flex flex--col gap--05'>
                        <p className="video__title">{ props.title }</p>
                        <a href={`/channels/${props.user}`}
                        className="video__channel-name link--muted">{ props.username }</a>
                    </div>

                    <div className='video__stats flex flex--center txt--muted'>
                        <p>{ props.views } views</p>
                        <div className="dot--split"></div>
                        <p>{ props.created_at } ago</p>
                    </div>

                    <Button props={{ content: ELLIPSE_V_ICO, action: () => null, default: true,
                        id: 'home-video-options', tooltip: 'Options', isIcon: true }} />
                </div>
            </div>
        </div>
    </Link>
  )
};

export default Video;
