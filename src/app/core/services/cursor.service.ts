import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DomManipulationService, GamepadService } from '../../shared/data-access';

const SPEED = 16;
const HALF = 8;

@Injectable({ providedIn: 'root' })
export class CursorService {
  private doc = inject(DOCUMENT);
  private gamepad = inject(GamepadService);
  private dom = inject(DomManipulationService);

  move({ x, y }: { x: number; y: number }) {
    this.gamepad.x.update(v => {
      const result = v + x * SPEED;
      return Math.max(HALF, Math.min(this.doc.documentElement.scrollWidth - HALF, result));
    });
    this.gamepad.y.update(v => {
      const result = v + y * SPEED;
      return Math.max(HALF, Math.min(this.doc.documentElement.scrollHeight - HALF, result));
    });
    this.dom.updateHover(this.gamepad.x() - window.scrollX, this.gamepad.y() - window.scrollY);
  }

  showIfNeeded({ x, y }: { x: number; y: number }) {
    if (Math.abs(x) > 0.01 || Math.abs(y) > 0.01) {
      this.gamepad.showCursor();
    }
  }
}