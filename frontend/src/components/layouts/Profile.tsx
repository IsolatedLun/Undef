import { API_URL } from "../../consts"

interface ProfileState {
    url: string;
    cls: string;
    alt: string;
}

const Profile = ({ props } : { props: ProfileState }) => {
  return (
    <div className={props.cls}>
        <img src={API_URL + props.url} alt={props.alt} />
    </div>
  )
}

export default Profile