import { effect, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { GamepadService } from '../../shared/data-access';
import { GamepadButton } from '../../shared/models';
import { ActionService, CursorService, ScrollService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class GamepadFacadeService {
  private platformId = inject(PLATFORM_ID);
  gamepad = inject(GamepadService);
  private cursor = inject(CursorService);
  private scroll = inject(ScrollService);
  private actions = inject(ActionService);

  constructor() {
    effect(() => this.handle());
  }

  private handle() {
    if (isPlatformServer(this.platformId)) return;

    const left = this.gamepad.leftStick();
    const right = this.gamepad.rightStick();
    const buttons = this.gamepad.buttons();

    this.cursor.move(left);
    this.cursor.showIfNeeded(left);

    this.scroll.scroll(right, this.gamepad.x(), this.gamepad.y());

    if (buttons[GamepadButton.Cross]?.pressed) {
      this.actions.click(this.gamepad.x(), this.gamepad.y());
    }

    if (buttons[GamepadButton.Circle]?.pressed) {
      this.actions.escape();
    }
  }
}
