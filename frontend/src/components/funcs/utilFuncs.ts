import React from "react";

export function toggleElement(e: Event | null, el: HTMLElement): void {
    el.classList.toggle('active')
}

export function focusElement(e: Event | null, el: HTMLElement): void {
    el.focus()
}

export function generateThumbnail(videoEl: HTMLVideoElement, t: number= 0) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;

    ctx.drawImage(videoEl, 0, 0, 512, 256);
    const thumbnailUrl = canvas.toDataURL('image/png');
    (document.getElementById('thumbnail-preview-' + t) as HTMLImageElement).src = thumbnailUrl;
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