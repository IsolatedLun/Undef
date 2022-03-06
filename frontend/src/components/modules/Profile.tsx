import { Link } from "react-router-dom"
import { API_URL } from "../../consts"
import Loader from "../layouts/Loader"
import Contextmenu from "./Contextmenu";

interface ProfileState {
    url: string;
    cls: string;
    alt: string;
    loaderId?: string;
    to?: string;
    contextMenu?: JSX.Element;
    ariaLabel?: string;
}

function removeLoader(el: HTMLElement) {
  el.style.display = 'none'
}

const Profile = ({ props } : { props: ProfileState }) => {
  const element = 
  (
    <div className={`${props.cls} pos--relative`} aria-label={props.ariaLabel + ' container'}>
      { props.loaderId && <Loader id={props.loaderId} /> }
      <img aria-label={props.ariaLabel}

      src={API_URL + props.url} 
      alt={props.alt} 

      onLoad={() => {
        if(props.loaderId)
          removeLoader(document.getElementById(props.loaderId) as HTMLElement)
      }} />
    </div>
)
  return (

   props.to !== undefined && props.contextMenu === undefined
    ? <Link to={props.to}>{ element }</Link> 
    : props.contextMenu !== undefined

    ? (
      <div className="pos--relative" onClick={(e) => {
        const target = e.target as HTMLElement;
        const menu = target.parentElement!.parentElement!.lastChild! as HTMLElement
        menu.focus();
      }}>
        { element }

        { props.contextMenu }
      </div>
    )
    : element

  )
}

export default Profile