import { FormEvent } from "react";

export function useAutoState(e: FormEvent<any>, setter: Function, data: any) {
    const target = e.target as HTMLInputElement;
    const value: any = target.value;

    if(target.type !== 'file')
        setter({ ...data, [target.name]: value });
    else {
        setter({ ...data, [target.name]: target.files![0] });
        const fileUrl = window.URL.createObjectURL(target.files![0]);
        (document.getElementById(target.id + '-preview') as HTMLImageElement).src = fileUrl;
    }
}