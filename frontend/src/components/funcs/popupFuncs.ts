import { ERROR_ICO } from "../../consts";

let popupTimeout = null;

export function popup(s: string, type: string): void {
    const popup: HTMLElement = document.getElementById('popup')!;
    const popupText: HTMLElement = document.getElementById('popup-text')!;
    const popupIcon: HTMLElement = document.getElementById('popup-icon')!;
    const popupType: HTMLElement = document.getElementById('popup-type')!;

    if(!popup.classList.contains('active')) {
        popup.classList.add('active');
        popupText.textContent = s;
        popupType.textContent = type;

        if(type === 'Error') {
            popupIcon.textContent = ERROR_ICO;
        }

        popupTimeout = setTimeout(() => {
            popup.classList.remove('active');
        }, 5000)
    }
}