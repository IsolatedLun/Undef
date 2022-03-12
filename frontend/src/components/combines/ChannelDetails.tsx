import { useEffect, useState } from "react";
import { constructValue } from "../funcs/channelFuncs";
import Loader from "../layouts/Loader";

export interface INF_ChannelDetail {
    key: string;
    value: string;
    type: string;
}

const ChannelDetail = ({ detail, isChannelOwner } : { detail: INF_ChannelDetail, isChannelOwner: boolean }) => {
    const [el, setEl] = useState(<div className="pos--relative"><Loader radius={20} /></div>)

    useEffect(() => {
        constructValue(detail.key, detail.value, isChannelOwner).then(res => setEl(res))
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

const ChannelDetails = ({ details, isChannelOwner } : { details: INF_ChannelDetail[], isChannelOwner: boolean }) => {
    if(details instanceof Array)
    return (
        <>
            <h3>Details</h3>
            <div className="channel__user-details flex flex--col gap--1">
                {
                    details.map((detail: any) => <ChannelDetail 
                        detail={detail} 
                        isChannelOwner={isChannelOwner} /> )
                }
            </div>
        </>
    )
    else
        return(<></>)
                
}

export default ChannelDetails