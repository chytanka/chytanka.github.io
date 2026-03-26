import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ActionService {
  click(x: number, y: number) {
    const el = document.elementFromPoint(
      x - window.scrollX,
      y - window.scrollY
    ) as HTMLElement;

    if (el) {
      el.focus();
      el.click();
    }
  }

  escape() {
    document.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Escape',
        code: 'Escape',
        keyCode: 27,
        which: 27,
        bubbles: true,
      })
    );
  }
}