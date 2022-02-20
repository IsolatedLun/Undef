export function validateForm(inputsCls: string, callback?: Function | null): void | boolean {
    const inputs = document.querySelectorAll('.' + inputsCls) as NodeListOf<HTMLInputElement>;
    let valid: number = 0;

    inputs.forEach(input => {
        if(validateInput(input))
            valid++;
    })

    if(valid === inputs.length && callback)
        callback();
    else
        return valid === inputs.length - 1;
}

export function validateInput(input: HTMLInputElement) {
    const type: string = input.type;
    const realType: string = input.getAttribute('data-real-type') as string;
    const inputVal: any = input.value;
    const errors: string[] = [];

    clearHelpText(input);
    if(realType === 'string' || realType === 'email' || type ===  'textarea') {
        const res = isValidateText(inputVal) as any;

        if(res === true)   
            return res
        else
            errors.push(res as string)
    }

    else if(realType === 'image') {
        try {
            const res = isValidFile(input.files![0], 'image') as any;

            if(res === true)   
                return res
            else
                errors.push(res as string)
        }

        catch {
            errors.push('Must contain an image file.')
        }
    }

    if(errors.length > 0)
        addHelpText(input, errors);
}

// Validators
function isValidateText(val: string): boolean | string {
    if(val.length > 1)
        return true
    else
        return 'Must contain atleast 2 or more characters.'
}

function isValidPassword(val: string) {
    if(val.length > 7 && /^[a-zA-Z0-9 !@#$%&*]+$/.test(val))
        return true
    else
        return 'Must contain atleast 7 or more characters.'
}

function isValidFile(f: File, type: string) {
    if(getExt(f) === type)
        return true
    else
        return `Invalid ${type}.`
}

// Helptext related
function addHelpText(input: HTMLInputElement, errors: string[]) {
    const helpList = document.getElementById(input.id + '-help-list') as HTMLUListElement;

    errors.forEach(err => {
        const li = document.createElement('li') as HTMLLIElement;
        li.textContent = err;

        helpList?.appendChild(li);
    })
}

function clearHelpText(input: HTMLInputElement) {
    (document.getElementById(input.id + '-help-list') as HTMLUListElement).innerHTML = '';
}

// Misc
function getExt(f: File) {
    return f.type.split('/')[0];
}