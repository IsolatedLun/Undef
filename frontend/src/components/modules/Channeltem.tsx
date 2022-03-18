import { Link } from "react-router-dom";
import { API_URL } from "../../consts";
import { INF_Channel } from "../main/channel/ChannelRouter";
import Profile from './Profile';

interface INF_ChannelItem {
    channel_name: string;
    channel_subsribers: number;
    profile: string;
}

const Channeltem = ({ props } : { props: INF_Channel }) => {
  return (
    <Link to={'/channels/' + props.id} className="channel-item">
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