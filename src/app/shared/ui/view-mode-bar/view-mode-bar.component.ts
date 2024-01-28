import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-view-mode-bar',
  templateUrl: './view-mode-bar.component.html',
  styleUrl: './view-mode-bar.component.scss'
})
export class ViewModeBarComponent {
  @Input() options: any;
  @Input() value: any;

  @Output() valueChange = new EventEmitter<any>();

  onChange(value: any) {
    this.valueChange.emit(value)
  }
}
