import { Link } from "react-router-dom"
import { API_URL } from "../../consts"
import Loader from "./Loader"

interface ProfileState {
    url: string;
    cls: string;
    alt: string;
    loaderId?: string;
    to?: string
}

function removeLoader(el: HTMLElement) {
  el.style.display = 'none'
}

const Profile = ({ props } : { props: ProfileState }) => {
  const element = 
  (
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
  return (
   props.to !== undefined ? <Link to={props.to}>{ element }</Link> : element
  )
}

export default Profile