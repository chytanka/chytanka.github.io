import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { LangService } from '../../data-access/lang.service';

@Component({
  selector: 'app-warm-control',
  templateUrl: './warm-control.component.html',
  styleUrl: './warm-control.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WarmControlComponent {

  @Input() value: any;

  @Output() valueChange = new EventEmitter<any>();

  onChange(event: Event) {
    const v = parseFloat((event.target as HTMLInputElement).value)
    this.valueChange.emit(v)
  }

  constructor(public lang: LangService){}
}
