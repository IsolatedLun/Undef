import React from "react";
import { emailRegex, urlRegex } from "../../consts";
import { isValidUrl } from "./formFuncs";



export async function constructValue(key: string, val: string, isChannelOwner: boolean) {
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
                    className: 'link',
                    contentEditable: isChannelOwner,
                    suppressContentEditableWarning: true
                }, val);
            }

            else if(type === 'url') {
                const res = await isValidUrl(val);
                el = React.createElement('a', {
                    target: '_blank',
                    href: res ? val : '',
                    className: res ? 'link' : 'link--muted',
                    contentEditable: isChannelOwner,
                    suppressContentEditableWarning: true
                }, val);
            }

            break;
        
        case 'empty':
        case 'text':
        default:
            el = React.createElement('p', {
                contentEditable: isChannelOwner,
                suppressContentEditableWarning: true,
                className: 'detail__value'
            }, type === 'empty' ? 'No ' + key : val);
            
            break;     
    }

    return el as any;
}