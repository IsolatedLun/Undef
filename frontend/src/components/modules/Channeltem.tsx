import { Link } from "react-router-dom";
import { API_URL } from "../../consts";
import { INF_Channel, INF_ChannelUser } from "../main/channel/ChannelRouter";
import Profile from './Profile';

export interface INF_ChannelItem {
  user_data: INF_ChannelUser,
  video_count: number;
}

const Channeltem = ({ props } : { props: INF_ChannelItem }) => {
  return (
    <Link to={'/channels/' + props.user_data.channel_id} className="channel-item">
        <Profile props={{ url: props.user_data.profile, cls: 'channel-item__profile round', alt: '' }} />

        <div className="channel-item__info">
            <p className="channel__name">{ props.user_data.username }</p>
            <div className="flex flex--center--all gap--05">
              <p className="channel__subscribers txt--muted">{ props.user_data.subscribers } subscribers</p>
              <div className="dot--split"></div>
              <p className="channel__subscribers txt--muted">{ props.video_count } videos</p>
            </div>
        </div>
    </Link>
  )
}

export default Channeltem