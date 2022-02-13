import { API_URL } from "../../consts"
import Loader from "./Loader"

interface ProfileState {
    url: string;
    cls: string;
    alt: string;
    loaderId?: string;
}

function removeLoader(el: HTMLElement) {
  el.style.display = 'none'
}

const Profile = ({ props } : { props: ProfileState }) => {
  return (
    <div className={`${props.cls} pos--relative`}>
        { props.loaderId && <Loader id={props.loaderId} /> }
        <img 

        src={API_URL + props.url} 
        alt={props.alt} 

        onLoad={() => {
          if(props.loaderId)
            removeLoader(document.getElementById(props.loaderId) as HTMLElement)
        }} />
    </div>
  )
}

export default Profile