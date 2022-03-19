import { Link } from "react-router-dom";
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

    if(['email', 'url'].includes(type)) {
        return <Link to={val}>{ val }</Link>;
    }
        
    return <p>{ type === 'empty' ? `No ${clean_key}` : val }</p>
}