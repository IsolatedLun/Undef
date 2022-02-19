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

export function handleBufferBar(videoEl: HTMLVideoElement, barEl: HTMLElement) {
  barEl.style.transform = `scaleX(${calculateBufferPct(videoEl)})`;
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

export function updateVideoData(videoEl: HTMLVideoElement, barEl: HTMLElement, currDurationEl: HTMLElement,
    bufferBarEl: HTMLElement) {
  handleVideoBar(barEl, videoEl.currentTime, videoEl.duration);
  handleBufferBar(videoEl, bufferBarEl);
  updateCurrentTime(currDurationEl, videoEl.currentTime);
}

export function changeTime(e: React.MouseEvent<HTMLDivElement>, videoEl: HTMLVideoElement): void {
    const pct: number = e.nativeEvent.offsetX / (e.target as HTMLDivElement).offsetWidth;
    videoEl.currentTime = pct * videoEl.duration;
}

export function changeVolume(e: React.ChangeEvent<any>, videoElStr: string): void {
    const videoEl = document.getElementById(videoElStr) as HTMLVideoElement;
    videoEl.volume = Number((e.target as HTMLInputElement).value) / 100;
}

export function calculateBufferPct(videoEl: HTMLVideoElement): number {
    try {
      let range = 0;
      const bf = videoEl.buffered;
      const time = videoEl.currentTime;

      while(!(bf.start(range) <= time && time <= bf.end(range))) {
          range += 1;
      }

      const loadStartPercentage = bf.start(range) / videoEl.duration;
      const loadEndPercentage = bf.end(range) / videoEl.duration;
      return loadEndPercentage - loadStartPercentage;
    }

    catch {
      return 0;
    }
}