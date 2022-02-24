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
    const thumbnailUrl = canvas.toDataURL();
    (document.getElementById('thumbnail-preview-' + t) as HTMLImageElement).src = thumbnailUrl;
}