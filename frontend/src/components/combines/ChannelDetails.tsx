import { useEffect, useState } from "react";
import { PLUS_ICO, SAVE_ICO, TRASH_ICO } from "../../consts";
import { useEditChannelDetailsMutation } from "../../services/channelApi";
import { constructValue } from "../funcs/channelFuncs";
import { areEqualObjs, handleResponse, toUnderscore } from "../funcs/utilFuncs";
import Loader from "../layouts/Loader";
import Button, { toggleButton } from "../modules/Button";

export interface INF_ChannelDetail {
    key: string;
    clean_key: string;
    value: string;
}

function getChannelDetailItems(setDetails: Function) {
    const inputContainers = document.querySelectorAll('.detail__part-inputs') as NodeListOf<HTMLDivElement>;
    let details: any = {};

    inputContainers.forEach(container => {
        const [keyInput, valueInput] = container.childNodes as NodeListOf<HTMLInputElement>;
        const [key, val] = [keyInput.value, valueInput.value]

        details[toUnderscore(key)] = { clean_key: key, value: val };
    })

    setDetails(details);
}

const ChannelDetailInput = ({ idx, state } : { idx: number, state: Function }) => {
    const [value, setValue] = useState('');
    return(
        <div className="detail__part flex gap--1">
            <div className="detail__part-inputs flex gap--1">
                <input 
                    data-real-type='text'
                    type='text'
                    className={`input--primary ${value.length > 0 ? 'disabled' : ''}`}
                    placeholder='Key'
                />
                
                <input 
                    data-real-type='text'
                    type='text'
                    className='input--primary'
                    placeholder='Value'
                    onInput={(e) => setValue(e.currentTarget.value)}
                />
            </div>

            <Button props={{ content: TRASH_ICO, action: () => state((prevState: any[]) => {
                return prevState.filter(el => Number(el.key) + 1 !== idx + 1);
            }), 
            cls: 'button--icon--primary btn--icon--sm' }} />
        </div>
    )
}

const ChannelDetail = ({ detail, setDetails, isChannelOwner } : 
    { detail: INF_ChannelDetail, setDetails: Function, isChannelOwner: boolean }) => {

    const el = constructValue(detail.key, detail.clean_key, detail.value);
    return(
        <div onClick={() => {
            if(isChannelOwner)
                setDetails((prevState: any) => {
                    let tempState = { ...prevState }; // new copy to avoid non-config error.
                    delete tempState[detail.key];
                    return tempState;
                })
        }}
            className={`channel__detail ${isChannelOwner ? 'editable' : ''} flex align--items--center gap--1`}>
            <p className="detail__key">{ detail.clean_key }: </p>
            { el }
        </div>
    )
}

let updateTimeout: number;
const ChannelDetails = ({ channelDetails, isChannelOwner, id } : 
{ channelDetails: INF_ChannelDetail[], isChannelOwner: boolean, id: number }) => {
    const [usePostChannelDetails, {  }] = useEditChannelDetailsMutation();

    const originalDetails = channelDetails;
    const [details, setDetails] = useState(channelDetails);
    const [detailInputs, setDetailInputs] = useState<any[]>([]);

    useEffect(() => {
        clearTimeout(updateTimeout);  

        updateTimeout = setTimeout(() => {
            if(!areEqualObjs(details, originalDetails)) {
                usePostChannelDetails({ channel_id: id, updatedDetails: details }).unwrap()
                    .then(res => {
                        handleResponse(res, { popup: 'Saved channel details. (Refresh to update)' });
                    });
                toggleButton('detail-save-loader', true);
            }
        }, 5000);
    }, [details])
    
    return (
        <>
            <h3>Details</h3>
            <div className="channel__user-details flex flex--col gap--075">
                {
                    ( typeof(details) === 'object' && Object.entries(details).map((detail, idx) => {
                        const toShow = { key: detail[0], ...(detail[1] as object) } as INF_ChannelDetail;
                        return <ChannelDetail isChannelOwner={isChannelOwner} 
                            key={idx} detail={toShow} 
                            setDetails={setDetails} />
                    }) )
                }

                { isChannelOwner && (
                    <>
                        { detailInputs.map((input: any) => input) }
                        <div className="btn--group">
                            <Button props={{ content: SAVE_ICO, action: () => {
                                toggleButton('detail-save-loader');
                                getChannelDetailItems(setDetails);
                            }, 
                                id: 'detail-save-loader',
                                cls: 'button--icon--primary', 
                                loaderCls: 'button--loader',
                                workCondition: detailInputs.length > 0 }} />

                            <Button props={{ content: PLUS_ICO, action: () => 
                                setDetailInputs([...detailInputs, 
                                    <ChannelDetailInput 
                                        state={setDetailInputs}
                                        key={detailInputs.length - 1} 
                                        idx={detailInputs.length - 1} />]), 
                                cls: 'button--icon--primary' }} />
                        </div>
                    </>
                ) }
            </div>
        </>
    )           
}

export default ChannelDetails;