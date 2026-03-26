import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { DOCUMENT, isPlatformServer } from '@angular/common';
import { DomManipulationService } from '../../shared/data-access';
import { deadzone } from '../../shared/utils';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private platformId = inject(PLATFORM_ID)

  private doc = inject(DOCUMENT);
  private dom = inject(DomManipulationService);

  scroll(coords: { x: number; y: number }, cx: number, cy: number) {
    if(isPlatformServer(this.platformId)) return;

    const target = this.doc.elementFromPoint(cx, cy) as HTMLElement;
    const container = this.dom.getScrollableParent(target);

    const speed = 20 + Math.abs(coords.y) * 60;

    const dx = deadzone(coords.x) * speed;
    const dy = deadzone(coords.y) * speed;

    if (!container || (!dx && !dy)) return;

    container.scrollBy({ left: dx, top: dy });
  }
}