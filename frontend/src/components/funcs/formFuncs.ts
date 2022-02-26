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
        return valid === inputs.length;
}

export function validateInput(input: HTMLInputElement) {
    const type: string = input.type;
    const realType: string = input.getAttribute('data-real-type') as string;
    const inputVal: any = input.value;
    const isOptional: string = input.getAttribute('data-optional') as string;
    let errors: string[] = [];

    if(isOptional === 'true')
        return true;

    clearHelpText(input);
    if(realType === 'string' || realType === 'email' || type ===  'textarea') {
        const res = isValidateText(inputVal);
        errors = handleValidator(res, errors)
    }

    else if(realType === 'password') {
        const res = isValidPassword(inputVal) as any;
        errors = handleValidator(res, errors)
    }

    else if(realType === 'image') {
        try {
            const res = isValidFile(input.files![0], 'image') as any;
            errors = handleValidator(res, errors)
        }

        catch {
            errors.push('Must contain an image file.')
        }
    }

    else if(realType === 'radios') {
        const res = hasCheckedInput(input.querySelectorAll('input') as NodeListOf<HTMLInputElement>);
        errors = handleValidator(res, errors);
    }

    if(errors.length > 0)
        addHelpText(input, errors);
    else
        return true;
}

// Validators
function isValidateText(val: string): boolean | string {
    if(val.length > 1)
        return true
    else
        return 'Must contain atleast 2 or more characters.'
}

function isValidPassword(val: string): string | string[] | boolean {
    let invalids: string[] = [];

    const hasLetters = val.match(/[a-z]/g);
    const hasNums = val.match(/[0-9]/g);
    const hasSpecials = val.match(/[#$%&*]/g);

    if(val.length > 7 && hasLetters && hasNums && hasSpecials)
        return true
    else
        invalids.push('Must contain atleast 7 or more characters.');
    
    if(!hasLetters)
        invalids.push('Must contain letters.')
    if(!hasNums)
        invalids.push('Must contain numbers.')
    if(!hasSpecials)
        invalids.push('Must contain atleast 1 of these special characters [#$%&*].')
    
    return invalids;
    
}

function isValidFile(f: File, type: string) {
    if(getExt(f) === type)
        return true
    else
        return `Invalid ${type}.`
}

function hasCheckedInput(inputs: NodeListOf<HTMLInputElement>): string | boolean {
    for(let i= 0; i < inputs.length; i++) {
        if(inputs[i].checked)
            return true;
    }

    return 'Must select one of the choices above.';
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

function handleValidator(res: any, errors: string[]) {
    if(res === true)
        return errors;

    else if(res instanceof Array) 
        res.forEach(err => errors.push(err));
        
    else 
        errors.push(res);

    return errors;
}

export function constructFormData(obj: object): FormData | null {
    if(obj instanceof Object) {
        let formData = new FormData();

        Object.entries(obj).forEach(tup => {
            formData.append(tup[0], tup[1])
        })

        return formData
    }

    return null;
}