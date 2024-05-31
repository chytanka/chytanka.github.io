import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-title-card',
  templateUrl: './title-card.component.html',
  styleUrl: './title-card.component.scss'
})
export class TitleCardComponent {
  @Input() value: any = {};

  @Output() delete: EventEmitter<number> = new EventEmitter();

  onDelete(id: number) {
    this.delete.emit(id);
  }
}
