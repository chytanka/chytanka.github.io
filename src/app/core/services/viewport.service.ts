import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

const GAP = 64;

@Injectable({ providedIn: 'root' })
export class ViewportService {
  private doc = inject(DOCUMENT);

  updateScaleDiff() {
    const w = this.doc.documentElement.clientWidth;
    const h = this.doc.documentElement.clientHeight;

    const sx = 1 - (w - GAP) / w;
    const sy = 1 - (h - GAP) / h;

    this.doc.documentElement.style.setProperty('--scale-diff-x', sx.toString());
    this.doc.documentElement.style.setProperty('--scale-diff-y', sy.toString());
  }
}