import { inject, Injectable } from '@angular/core';
import { copyText } from '../utils/clipboard';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DomManipulationService {
  private readonly document = inject(DOCUMENT);

  scrollInterval: any;

  constructor() { }

  getTextByTagName(doc: Document, tagName: string) {
    return doc.getElementsByTagName(tagName)[0]?.textContent;
  }

  toggleFullScreen(el: HTMLElement) {
    if (!this.document.fullscreenElement) {
      if (el.requestFullscreen) {
        el.requestFullscreen();
      }
    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
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

  copyToClipboard = async (text: string) => {
    await copyText(text);
    
  };

  setHotkeys(event: KeyboardEvent, hotKeys: Map<string, Function>) {
    if ((event.target as HTMLElement).nodeName === 'INPUT') return;

    const code = event.ctrlKey ? `Ctrl+${event.code}` : event.code

    if (hotKeys.has(code)) {
      event.preventDefault()
      const f: Function = hotKeys.get(code) as Function;
      f();
      return;
    }
  }
}
