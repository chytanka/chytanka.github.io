import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'app-warm-filter',
    templateUrl: './warm-filter.component.html',
    styleUrl: './warm-filter.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class WarmFilterComponent {

  @Input() 
  @HostBinding('style.opacity')
  value: number = 0;
}
