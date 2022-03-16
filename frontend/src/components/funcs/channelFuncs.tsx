import { emailRegex, urlRegex } from "../../consts";

export function constructValue(key: string, clean_key: string, val: string) {
    let type = '';

    if(emailRegex.test(val))
        type = 'email';
    else if(urlRegex.test(val))
        type = 'url';
    else if(val.length === 0)
        type = 'empty';
    else
        type = 'text';

    console.log(['email', 'url'].includes(type))

    if(['email', 'url'].includes(type)) {
        return <a href={val}>{ val }</a>;
    }

    else {
        console.log('esh')
    }
        
    return <p>{ type === 'empty' ? `No ${clean_key}` : val }</p>
}