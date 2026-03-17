import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'gamepad-cursor',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '',
  styleUrl: './gamepad-cursor.component.scss',
  host: {
    '[style.left]': 'left()',
    '[style.top]': 'top()',
    '[class.visible]': 'cursorVisible()'
  }
})
export class GamepadCursorComponent {
  x = input(0);
  y = input(0);

  cursorVisible = input(false);

  protected left = computed(() => this.x() + 'px');
  protected top = computed(() => this.y() + 'px');
}
