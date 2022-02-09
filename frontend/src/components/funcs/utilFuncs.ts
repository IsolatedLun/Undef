export function toggleElement(e: Event | null, el: HTMLElement): void {
    el.classList.toggle('active')
}

export function focusElement(e: Event | null, el: HTMLElement): void {
    el.focus()
}