import React from "react";

export function toggleVideo(videoEl: HTMLVideoElement): void {
    if(videoEl.paused)
      videoEl.play();
    else
      videoEl.pause();
}

export function handleVideoBar(innerBarEl: HTMLElement, currTime: number, duration: number): void {
  innerBarEl.style.transform = `scaleX(${currTime / duration})`;
}

export function calculateDuration(t: number): string {
  if (t < 3600) {
    return new Date(t * 1000).toISOString().substr(14, 5);
  }
  
  return new Date(t * 1000).toISOString().substr(11, 8);
}

export function updateCurrentTime(el: HTMLElement, t: number) {
  el.textContent = calculateDuration(t);
}

export function updateVideoData(videoEl: HTMLVideoElement, barEl: HTMLElement, currDurationEl: HTMLElement) {
  handleVideoBar(barEl, videoEl.currentTime, videoEl.duration);
  updateCurrentTime(currDurationEl, videoEl.currentTime);
}

export function changeTime(e: React.MouseEvent<HTMLDivElement>, videoEl: HTMLVideoElement): void {
    const pct: number = e.nativeEvent.offsetX / (e.target as HTMLDivElement).offsetWidth;
    videoEl.currentTime = pct * videoEl.duration;
}