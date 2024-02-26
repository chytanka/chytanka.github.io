import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomManipulationService {

  scrollInterval: any;

  constructor() { }

  toggleFullScreen(el: HTMLElement) {
    if (!document.fullscreenElement) {
      if (el.requestFullscreen) {
        el.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  scrollHor(el: HTMLElement, amount: number) {
    el.scrollTo({
      left: el.scrollLeft + amount,
      behavior: "smooth",
    });
  }

  scrollVer(el: HTMLElement, amount: number) {
    el.scrollTo({
      top: el.scrollTop + amount,
      behavior: "smooth",
    });
  }

  async startViewTransition(fn: Function) {
    ((document as any).startViewTransition)
      ? await (document as any).startViewTransition(fn)
      : fn();
  }
}
