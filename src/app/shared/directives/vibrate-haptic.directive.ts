import { Directive, HostListener, inject, Input } from '@angular/core';
import { VibrationService } from '../data-access/vibration.service';

@Directive({
  selector: '[vibrateHaptic]',
  standalone: false
})
export class VibrateHapticDirective {
  vibration = inject(VibrationService);

  @Input() vibrateHaptic: number | number[] = 10;

  @Input() vibrateTouch: boolean = false;
  @Input() vibrateClick: boolean = true;
  @Input() vibrateInput: boolean = false;

  constructor() { }

  @HostListener('pointerdown')
  onPointerDown() {
    if (!this.vibrateTouch) return;

    this.vibration.vibrate(this.vibrateHaptic);
  }

  @HostListener('touchstart')
  onTouchStart() {
    if (!this.vibrateTouch) return;

    this.vibration.vibrate(this.vibrateHaptic);
  }

  @HostListener('click')
  onClick() {
    if (!this.vibrateClick) return;

    this.vibration.vibrate(this.vibrateHaptic);
  }

  @HostListener('input')
  onInput() {
    if (!this.vibrateInput) return;

    this.vibration.vibrate(this.vibrateHaptic);
  }

}
