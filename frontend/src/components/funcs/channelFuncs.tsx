import React from "react";
import { emailRegex, urlRegex } from "../../consts";
import { useAutoState } from "../../hooks/useAutoState";
import { isValidUrl } from "./formFuncs";



export async function constructValue(key: string, clean_key: string, 
    val: string, isChannelOwner: boolean, setter: Function) {
    let el = null;
    let type = '';

    if(emailRegex.test(val))
        type = 'email';
    else if(urlRegex.test(val))
        type = 'url';
    else if(val.length < 1)
        type = 'empty';
    else
        type = 'text';

    switch(type) {
        case 'email':
        case 'url':
            if(type === 'email') {
                el = React.createElement('a', {
                    target: '_blank',
                    href: 'mailto:' + val,
                    className: 'link input--content--editable',
                    contentEditable: isChannelOwner,
                    suppressContentEditableWarning: true,
                    name: key,
                    'data-real-type': 'string',
                    onInput: (e => useAutoState(e, setter))
                }, val);
            }

            else if(type === 'url') {
                const res = await isValidUrl(val);
                el = React.createElement('a', {
                    target: '_blank',
                    href: res ? val : '',
                    className: (res ? 'link' : 'link--muted') + ' input--content--editable',
                    contentEditable: isChannelOwner,
                    suppressContentEditableWarning: true,
                    name: key,
                    'data-real-type': 'string',
                    onInput: (e => setter((prevState: any) => 
                        ({ ...prevState, [e.currentTarget.getAttribute('name') as string]: e.currentTarget.innerText })))
                }, val);
            }

            break;
        
        case 'empty':
        case 'text':
        default:
            el = React.createElement('p', {
                contentEditable: isChannelOwner,
                suppressContentEditableWarning: true,
                className: 'detail__value input--content--editable',
                name: key,
                'data-real-type': 'string',
                onInput: (e => { setter((prevState: any) => 
                    ({ ...prevState, [e.currentTarget.getAttribute('name') as string]: e.currentTarget.innerText }))
                })
            }, type === 'empty' ? 'No ' + clean_key : val);
            
            break;     
    }

    return el as any;
}