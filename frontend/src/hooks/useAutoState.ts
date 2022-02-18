import { FormEvent } from "react";

export function useAutoState(e: FormEvent<HTMLInputElement>, setter: Function, data: any) {
    const target = e.target as HTMLInputElement;
    const value: any = target.value;
    const file: File | null = target.files![0];

    if(file === null)
        setter({ ...data, [target.name]: value });
    else
        setter({ ...data, [target.name]: file });
}