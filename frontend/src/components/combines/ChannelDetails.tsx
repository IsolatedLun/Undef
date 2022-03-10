import { emailRegex, urlRegex } from "../../consts";
import { isValidUrl } from "../funcs/formFuncs";

export interface INF_ChannelDetail {
    key: string;
    value: string;
    type: string;
}

const ChannelDetail = ({ detail } : { detail: INF_ChannelDetail }) => {
    let el: JSX.Element | null = null;

    if(emailRegex.test(detail.value))
        el = <a className="link" href={`mailto:${detail.value}`}>{ detail.value }</a>
    else if(urlRegex.test(detail.value))
        el = <a className="link" href={detail.value}>{ detail.value }</a>
    else
        el = <p>{ detail.value }</p>

    return (
        <>
            <div className="flex flex--center gap--1">
                <p className="txt--muted upper detail__key">{ detail.key }:</p>
                { el }
            </div>
        </>
    )
  }

const ChannelDetails = ({ details } : { details: INF_ChannelDetail[] }) => {
  return (
    <>
        <h3>Details</h3>
        <div className="channel__user-details flex gap--1">
            {
                details.map((detail: any) => <ChannelDetail detail={detail} /> )
            }
        </div>
    </>
  )
}

export default ChannelDetails