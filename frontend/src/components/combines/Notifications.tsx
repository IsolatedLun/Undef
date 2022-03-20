import Profile from "../modules/Profile";

interface INF_Notification {
    profile: string;
    text: string;
}

const Notification = ({ props } : { props: INF_Notification }) => {
    return (
        <div className="notification">
            <Profile props={{ url: props.profile, cls: 'notification__profile', alt: '' }} />
            <p className="notification__text">{ props.text }</p>
        </div>
    )
}

const Notifications = ({ notifications } : { notifications: INF_Notification[] }) => {
  if(notifications.length > 0)
        return (
            <div className='notifications flex flex--col'>
            {
                notifications.map(notification => (
                    <Notification props={{ ...notification }} />
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