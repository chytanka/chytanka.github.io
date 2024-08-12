import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'separator',
  styles: [`:host{ user-select: none; opacity: .5;}`],
  template: `{{separator}}`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeparatorComponent {
  @Input() separator: string = '│'
}
