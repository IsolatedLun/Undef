import { toggleButton } from '../modules/Button';
import { popup } from './popupFuncs'

export function toggleElement(e: Event | null, el: HTMLElement): void {
    el.classList.toggle('active')
}

export function focusElement(e: Event | null, el: HTMLElement): void {
    el.focus()
}

export function generateThumbnail(videoEl: HTMLVideoElement, t: number= 0) {
    const canvas = document.createElement('canvas');
    canvas.width = videoEl.videoWidth;
    canvas.height = videoEl.videoHeight;

    canvas.getContext('2d')!.drawImage(videoEl, 0, 0);
    const thumbnailUrl = canvas.toDataURL('image/png', 1);

    const imgEl = document.getElementById('thumbnail-preview-' + t) as HTMLImageElement;
    (document.getElementById(imgEl.id + '-loader') as HTMLDivElement).style.display = 'none';
    imgEl.src = thumbnailUrl;

    return thumbnailUrl;
}

export async function dataUrlToFile(url: string): Promise<File> {
    const res: Response = await fetch(url);
    const blob: Blob = await res.blob()

    return new File([blob], `preview-${new Date().getSeconds()}.png`, { type: 'image/png' });
}

export function previewImage(e: React.FormEvent<any>, imgEl: HTMLImageElement) {
    const target = e.target as HTMLInputElement;
    imgEl.src = window.URL.createObjectURL(target.files![0]);
}

export function resetThumbnails(t: number) {
    for(let i= 1; i < t + 1; i++) {
        const imgEl = document.getElementById('thumbnail-preview-' + i) as HTMLImageElement;
        imgEl.src = '';
        (document.getElementById(imgEl.id + '-loader') as HTMLDivElement).style.display = 'block';
    }
}

interface ResponseActions {
    redirectTo?: string;
    popup?: string;
}

export interface ExtraResponse extends Response {
    data: {
        detail: string;
    }
}

export function handleResponse(res: ExtraResponse, actions?: ResponseActions, btn?: HTMLButtonElement) {
    if(res.status >= 400)
        popup(res.data.detail, 'Error');
    else if(actions && actions.popup)
        popup(actions.popup, 'Info')
    else if(actions && actions.redirectTo)
        window.location.href = actions.redirectTo;

    if(btn)
        toggleButton(btn);
}

export function randomId(): string {
    function randomChar(): string {
        const charCode: number = (97 + Math.random() * (122 - 97));
        return String.fromCharCode(charCode);
    }

    const deci: number = window.crypto.getRandomValues(new Uint32Array(1))[0];

    return randomChar() + deci + randomChar();
}

export function areEqualObjs(a: any, b: any): boolean {
    try {
        return JSON.stringify(a) === JSON.stringify(b);
    }

    catch {
        return false
    }
}

export function unFocusGlb() {
    document.body.focus();
}