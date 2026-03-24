import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { LangService } from '../../data-access/lang.service';

@Component({
  selector: 'app-view-mode-bar',
  templateUrl: './view-mode-bar.component.html',
  styleUrl: './view-mode-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class ViewModeBarComponent {
  options = input<any>();
  value = input<any>();
  seed = input<string>('seed');

  valueChange = output<any>();

  onChange(value: any) {
    this.valueChange.emit(value)
  }

  constructor(public lang: LangService) {
  }
}
