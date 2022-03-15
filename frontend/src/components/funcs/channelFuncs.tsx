import { emailRegex, urlRegex } from "../../consts";

export function constructValue(key: string, clean_key: string, val: string) {
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
            return <a href={type === 'email' ? `mailto:${val}` : val}>{ val }</a>
        
        case 'empty':
        case 'text':
        default:
            return <p>{ type === 'empty' ? `No ${clean_key}` : val }</p>
    }
}