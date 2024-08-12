import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { LangService } from '../../data-access/lang.service';

@Component({
  selector: 'app-view-mode-bar',
  templateUrl: './view-mode-bar.component.html',
  styleUrl: './view-mode-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewModeBarComponent {
  @Input() options: any;
  @Input() value: any;
  @Input() seed: string = 'seed';

  @Output() valueChange = new EventEmitter<any>();

  onChange(value: any) {
    this.valueChange.emit(value)
  }

  constructor(public lang: LangService) {
  }
}
