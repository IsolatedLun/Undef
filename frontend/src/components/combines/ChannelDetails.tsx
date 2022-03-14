import { useEffect, useState } from "react";
import { EDIT_ICO, PLUS_ICO, SAVE_ICO, TRASH_ICO } from "../../consts";
import { constructValue } from "../funcs/channelFuncs";
import { toUnderscore } from "../funcs/utilFuncs";
import Loader from "../layouts/Loader";
import Button from "../modules/Button";

export interface INF_ChannelDetail {
    key: string;
    clean_key: string;
    value: string;
    type: string;
}

function getChannelDetailItems(setDetails: Function) {
    const inputContainers = document.querySelectorAll('.detail__part-inputs') as NodeListOf<HTMLDivElement>;
    let details: any = {};

    inputContainers.forEach(container => {
        const [keyInput, valueInput] = container.childNodes as NodeListOf<HTMLInputElement>;
        const [key, val] = [keyInput.value, valueInput.value]

        details[toUnderscore(key)] = val;
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

let updateTimeout: number;
const ChannelDetails = ({ isChannelOwner, id } : 
    { details: INF_ChannelDetail[], isChannelOwner: boolean, id: number }) => {
    const [details, setDetails] = useState<string[]>([])
    const [detailInputs, setDetailInputs] = useState<any[]>([]);

    useEffect(() => {
        clearTimeout(updateTimeout);
        updateTimeout = setTimeout(() => {

        }, 5000);
    }, [])

    useEffect(() => {
        console.log(details);
    }, [details])
    
    return (
        <>
            <h3>Details</h3>
            <div className="channel__user-details flex flex--col gap--1">
                {
                    detailInputs.map((input: any) => input)
                }

                <div className="btn--group">
                    <Button props={{ content: SAVE_ICO, action: () => getChannelDetailItems(setDetails), 
                        cls: 'button--icon--primary', workCondition: detailInputs.length > 0 }} />

                    <Button props={{ content: PLUS_ICO, action: () => 
                        setDetailInputs([...detailInputs, 
                            <ChannelDetailInput 
                                state={setDetailInputs}
                                key={detailInputs.length - 1} 
                                idx={detailInputs.length - 1} />]), 
                        cls: 'button--icon--primary' }} />
                </div>
            </div>
        </>
    )           
}

export default ChannelDetails