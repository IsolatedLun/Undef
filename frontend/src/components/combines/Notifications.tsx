import { Link } from "react-router-dom";
import Profile from "../modules/Profile";

interface INF_Notification {
    video: number;
    video_data: {
        profile: string;
        title: string;
    },
    created_at: string;
}

const Notification = ({ props } : { props: INF_Notification }) => {
    return (
        <Link to={'/watch/' + props.video} className="notification">
            <Profile props={{ url: props.video_data.profile, cls: 'notification__profile', alt: '' }} />
            <div className="notification__details">
                <p className="notification__text text--elliptic">{ props.video_data.title }</p>
                <p className="notification__date">Uploaded { props.created_at } ago</p>
            </div>
        </Link>
    )
}

const Notifications = ({ notifications } : { notifications: INF_Notification[] }) => {
  if(notifications.length > 0)
        return (
            <div className='notifications flex flex--col'>
            {
                notifications.map((notification, idx: number) => (
                    <Notification key={idx} props={{ ...notification }} />
                ))
            }
            </div>
        )
    else
        return (
            <div className="notifications">
                <p>No notifications.</p>
            </div>
        )
}

export default Notifications