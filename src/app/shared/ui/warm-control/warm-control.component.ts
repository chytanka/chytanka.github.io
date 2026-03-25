import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { LangService } from '../../data-access/lang.service';

@Component({
  selector: 'app-warm-control',
  templateUrl: './warm-control.component.html',
  styleUrl: './warm-control.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class WarmControlComponent {
  lang: LangService = inject(LangService);
  
  active = signal(false)

  value = input<number>(6500);
  valueChange = output<any>();

  onChange(event: Event) {
    const v = parseFloat((event.target as HTMLInputElement).value)
    this.valueChange.emit(v)
  }

  toggleActive() {
    this.active.update(v => !v);
  }
}
