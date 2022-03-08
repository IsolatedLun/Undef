import { FormEvent } from "react";

/**
 * @param e - Event (Used for getting the value and attrs)
 * @param setter - Sets the state
 * @param callback - Callback function if needed
 * @param callbackParams - Parameters for the callback
 * @param override - If true then immediately calls the callback function
*/
export function useAutoState(e: FormEvent<any>, setter: React.SetStateAction<any>, 
    cb?: Function, cbParams?: any[] , override: boolean=false) {

    if(cb && override === true)
        cb(e);
        
    else {
        const target = e.target as HTMLInputElement;
        const value: any = target.value;
        const realType = target.getAttribute('data-real-type')!

        if(realType === 'string' || realType === 'password' || realType === 'email' || target.type === 'radio')
            setter((prevState: any) => ({ ...prevState, [target.name]: target.value }));

        else if(realType === 'oneWord') {
            setter(value);
        }
            
        else if(['image', 'video', 'file'].includes(realType)) {
            setter((prevState: any) => ({ ...prevState, [target.name]: target.files![0] }));

            try {
                if(realType === 'image') {
                    const fileUrl = window.URL.createObjectURL(target.files![0]);
                    (document.getElementById(target.id + '-preview') as HTMLImageElement).src = fileUrl;
                }
    
                else if(realType === 'video') {
                    const videoEl = document.getElementById(target.id + '-video')! as HTMLVideoElement;
                    const fileUrl = window.URL.createObjectURL(target.files![0]);
                    videoEl.src = fileUrl;
                }
            }

            catch {  }

        }

        if(cb)
            cb(e, ...cbParams!);
    }
}