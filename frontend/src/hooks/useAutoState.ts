import { FormEvent } from "react";

export function useAutoState(e: FormEvent<any>, setter: Function, data: any, 
    cb?: Function, params?: any[], override: boolean=false) {

    if(cb && params && override === true)
        cb(e, ...params)
        
    else {
        const target = e.target as HTMLInputElement;
        const value: any = target.value;
        const realType = target.getAttribute('data-real-type')!

        if(realType === 'string' || realType === 'password' || realType === 'email')
            setter({ ...data, [target.name]: value });

        else if(target.type === 'radio' || realType === 'oneWord') {
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

        if(cb && params)
            cb(e, ...params)
    }
}