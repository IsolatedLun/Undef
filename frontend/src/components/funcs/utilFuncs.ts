import { saveAs } from "file-saver";

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
    imgEl.src = thumbnailUrl;
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
    }
}