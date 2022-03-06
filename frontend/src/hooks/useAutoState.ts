import { FormEvent } from "react";

/**
 * @param e - Event (Used for getting the value and attrs)
 * @param setter - Sets the state
 * @param data - Used for updating someting in an object {  ...data, variableToUpdate }
 * @param callback - Callback function if needed
 * @param override - If true then immediately calls the callback function.
*/
export function useAutoState(e: FormEvent<any>, setter: Function, data: any, 
    cb?: Function, override: boolean=false) {

    if(cb && override === true)
        cb(e);
        
    else {
        const target = e.target as HTMLInputElement;
        const value: any = target.value;
        const realType = target.getAttribute('data-real-type')!

        if(realType === 'string' || realType === 'password' || realType === 'email' || target.type === 'radio')
            setter({ ...data, [target.name]: value });

        else if(realType === 'oneWord') {
            setter(value);
        }
            
        else {
            if(realType === 'image') {
                setter({ ...data, [target.name]: target.files![0] });
                const fileUrl = window.URL.createObjectURL(target.files![0]);
                (document.getElementById(target.id + '-preview') as HTMLImageElement).src = fileUrl;
            }

            else {
                setter({ ...data, [target.name]: target.files![0] });
                const videoEl = document.getElementById(target.id + '-video')! as HTMLVideoElement;
                const fileUrl = window.URL.createObjectURL(target.files![0]);
                videoEl.src = fileUrl;
            }

        }

        if(cb)
            cb(e)
    }
}