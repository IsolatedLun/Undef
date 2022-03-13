import { useEffect, useState } from "react";
import { useEditChannelDetailsMutation } from "../../services/channelApi";
import { constructValue } from "../funcs/channelFuncs";
import { popup } from "../funcs/popupFuncs";
import { areEqualObjs, handleResponse } from "../funcs/utilFuncs";
import Loader from "../layouts/Loader";

export interface INF_ChannelDetail {
    key: string;
    clean_key: string;
    value: string;
    type: string;
}

const ChannelDetail = ({ detail, isChannelOwner, setter } : 
    { detail: any, isChannelOwner: boolean, setter: Function }) => {
    const [el, setEl] = useState(<div className="pos--relative"><Loader radius={20} /></div>)

    useEffect(() => {
        const [key, { clean_key, value }] = detail;
        constructValue(key, clean_key, value, isChannelOwner, setter).then(res => setEl(res))
    }, [detail])

    return (
        <>
            <div className="flex flex--center gap--1">
                <p className="txt--muted upper detail__key">{ detail[1].clean_key }:</p>
                { el }
            </div>
        </>
    )
  }

let updateTimeout: number;
const ChannelDetails = ({ details, isChannelOwner, id } : 
    { details: INF_ChannelDetail[], isChannelOwner: boolean, id: number }) => {

    const [editChannelDetails, {  }] = useEditChannelDetailsMutation();
    const [realDetails, setDetails] = useState({});
    const [updateDetails, setUpdateDetails] = useState({});

    useEffect(() => {
        Object.entries(details).forEach((arr) => {
            const [key, detail] = arr;
            setDetails(prevState => ({ ...prevState, [key]: detail }));
        })

        setUpdateDetails(realDetails);

        return () => {
            if(!areEqualObjs(realDetails, updateDetails))
                popup('Saved changes undone.', 'Error');
        }
    }, [])

    useEffect(() => {
        clearTimeout(updateTimeout);
        updateTimeout = setTimeout(() => {
            if(!areEqualObjs(realDetails, updateDetails))
                editChannelDetails({ updateDetails, channel_id: id  }).unwrap()
                    .then(res => handleResponse(res, { popup: 'Changes saved.' }))
                    .catch(res => handleResponse(res));
        }, 5000);
    }, [updateDetails])
    
    return (
        <>
            <h3>Details</h3>
            <div className="channel__user-details flex flex--col gap--1">
                {
                    Object.entries(realDetails).map((detail) => 
                    <ChannelDetail 
                        detail={detail} 
                        setter={setUpdateDetails}
                        isChannelOwner={isChannelOwner} /> 
                    )
                }
            </div>
        </>
    )           
}

export default ChannelDetails