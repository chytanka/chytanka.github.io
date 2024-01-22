import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-warm-filter',
  templateUrl: './warm-filter.component.html',
  styleUrl: './warm-filter.component.scss'
})
export class WarmFilterComponent {

  @Input() 
  @HostBinding('style.opacity')
  value: number = 0;
}
