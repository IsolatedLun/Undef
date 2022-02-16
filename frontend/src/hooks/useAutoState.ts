import { FormEvent } from "react";

export function useAutoState
    (e: FormEvent<HTMLInputElement>, setter: Function, obj: any | null , data: any, setType: string) {

    const target = e.target as HTMLInputElement

    if(obj !== null) {
        setter({ ...obj, [target.name]: target.value });
    }

    else if(setType === 'oneWord')
        setter(target.value);
}