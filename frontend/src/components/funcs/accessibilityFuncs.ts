export function positionTooltip(el: HTMLElement) {
    const bounds = el.getBoundingClientRect();

    if(bounds.y > 560)
        el.classList.add('goto--bottom')
    else
        el.classList.remove('goto--bottom')
}