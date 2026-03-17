import { inject, Injectable, signal } from '@angular/core';
import { copyText } from '../utils/clipboard';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DomManipulationService {
  private readonly document = inject(DOCUMENT);
  private _lastHover: HTMLElement | null = null;
  fullscreenEnabled = signal(this.document.fullscreenEnabled);
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

  getScrollableParent(el: HTMLElement | null): HTMLElement | null {
    while (el) {
      const style = getComputedStyle(el);
      const canScroll =
        /(auto|scroll)/.test(style.overflowY) ||
        /(auto|scroll)/.test(style.overflowX);

      if (canScroll) return el;

      el = el.parentElement;
    }

    return this.document.scrollingElement as HTMLElement;
  }

  updateHover(x: number, y: number) {
    const el = this.document
      .elementFromPoint(x, y)
      ?.closest('button, a, input, [tabindex], label') as HTMLElement;

    if (el === this._lastHover) return;

    if (this._lastHover) {
      this._lastHover.classList.remove('gamepad-hover');
    }

    if (el) {
      el.classList.add('gamepad-hover');
    }

    this._lastHover = el;
  }
}
