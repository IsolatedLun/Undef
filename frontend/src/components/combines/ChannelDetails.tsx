import { useEffect, useState } from "react";
import { emailRegex, urlRegex } from "../../consts";
import { isValidUrl } from "../funcs/formFuncs";
import Loader from "../layouts/Loader";

export interface INF_ChannelDetail {
    key: string;
    value: string;
    type: string;
}

async function constructValue(val: string, setter: Function) {
    if(emailRegex.test(val))
        setter(<a className="link" href={`mailto:${val}`} target="_blank">{ val }</a>);

    else if(urlRegex.test(val)) {
        const res = await isValidUrl(val);
        if(res)
            setter(<a className="link" href={val} target="_blank">{ val }</a>);
        else
            setter(<p className="link--muted">{ val }</p>);
    }
    
    else
        setter(<p>{ val }</p>)
}

const ChannelDetail = ({ detail } : { detail: INF_ChannelDetail }) => {
    const [el, setEl] = useState(<div className="pos--relative"><Loader radius={20} /></div>)

    useEffect(() => {
        constructValue(detail.value, setEl);
    }, [detail])

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
    if(details == [])
    return (
        <>
            <h3>Details</h3>
            <div className="channel__user-details flex flex--col gap--1">
                {
                    details.map((detail: any) => <ChannelDetail detail={detail} /> )
                }
            </div>
        </>
    )
    else
        return(<></>)
                
}

export default ChannelDetails