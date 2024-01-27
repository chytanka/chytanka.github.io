import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-warm-control',
  templateUrl: './warm-control.component.html',
  styleUrl: './warm-control.component.scss'
})
export class WarmControlComponent {

  @Input() value: any;

  @Output() valueChange = new EventEmitter<any>();

  onChange(event: Event) {
    const v = parseFloat((event.target as HTMLInputElement).value)
    this.valueChange.emit(v)
  }
}
