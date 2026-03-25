import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'separator',
  styles: [`:host{ user-select: none; opacity: .5;}`],
  template: `{{separator()}}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class SeparatorComponent {
  separator = input<string>('│')
}
