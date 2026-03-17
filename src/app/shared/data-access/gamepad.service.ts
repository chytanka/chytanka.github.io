import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { getNormalizedAnalogInput } from '../utils';
import { GamepadButtonState, GamepadButton } from '../models';

@Injectable({
  providedIn: 'root'
})
export class GamepadService {
  platformId = inject(PLATFORM_ID)

  // Cursor position signals
  x = isPlatformBrowser(this.platformId) ? signal(window.innerWidth / 2) : signal(0);
  y = isPlatformBrowser(this.platformId) ? signal(window.innerHeight / 2) : signal(0);
  // Cursor visibility signal
  cursorVisible = signal(false);
  private hideCursorTimeout?: number;

  connected = signal(false);

  leftStick = signal({ x: 0, y: 0 });
  rightStick = signal({ x: 0, y: 0 });

  buttons = signal<GamepadButtonState[]>([]);
  L1 = computed(() => this.buttons()[GamepadButton.L1]?.pressed ?? false);
  R1 = computed(() => this.buttons()[GamepadButton.R1]?.pressed ?? false);

  private loopId?: number;

  constructor() {
    if (isPlatformServer(this.platformId)) return;
    window.addEventListener('gamepadconnected', () => {
      this.connected.set(true);
      this.startLoop();
    });

    window.addEventListener('gamepaddisconnected', () => {
      this.connected.set(false);
      this.stopLoop();
    });
  }

  private startLoop() {
    if (this.loopId) return;

    const loop = () => {
      this.poll();
      this.loopId = requestAnimationFrame(loop);
    };

    this.loopId = requestAnimationFrame(loop);
  }

  private stopLoop() {
    if (this.loopId) {
      cancelAnimationFrame(this.loopId);
      this.loopId = undefined;
    }
  }

  private poll() {
    if (document.visibilityState !== 'visible') return;

    const gp = navigator.getGamepads()[0];
    if (!gp) return;

    const leftStick = {
      x: getNormalizedAnalogInput(gp.axes[0] ?? 0),
      y: getNormalizedAnalogInput(gp.axes[1] ?? 0)
    };

    if (Math.abs(leftStick.x) > 0 || Math.abs(leftStick.y) > 0 || this.leftStick().x !== leftStick.x || this.leftStick().y !== leftStick.y)
      this.leftStick.set(leftStick);

    const rightStick = {
      x: getNormalizedAnalogInput(gp.axes[2] ?? 0),
      y: getNormalizedAnalogInput(gp.axes[3] ?? 0)
    };

    if (Math.abs(rightStick.x) > 0 || Math.abs(rightStick.y) > 0 || this.rightStick().x !== rightStick.x || this.rightStick().y !== rightStick.y)
      this.rightStick.set(rightStick);

    const btns = gp.buttons.map(b => ({ pressed: b.pressed, value: b.value, touched: b.touched }));

    if (this.buttonsChanged(this.buttons(), btns))
      this.buttons.set(btns);
  }

  private buttonsChanged(a: GamepadButtonState[], b: GamepadButtonState[]) {
    if (a.length !== b.length) return true;

    for (let i = 0; i < a.length; i++) {
      if (
        a[i].pressed !== b[i].pressed ||
        a[i].value !== b[i].value ||
        a[i].touched !== b[i].touched
      ) {
        return true;
      }
    }

    return false;
  }

  public showCursor() {

    this.cursorVisible.set(true);

    if (this.hideCursorTimeout) {
      clearTimeout(this.hideCursorTimeout);
    }

    this.hideCursorTimeout = window.setTimeout(() => {
      this.cursorVisible.set(false);
    }, 2000);

  }
}