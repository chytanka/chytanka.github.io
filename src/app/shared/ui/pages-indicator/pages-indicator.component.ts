import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pages-indicator',
  templateUrl: './pages-indicator.component.html',
  styleUrl: './pages-indicator.component.scss'
})
export class PagesIndicatorComponent {
  @Input() images: any;

  @Input() activeIndexs: number[] = [];

  @Output() active: EventEmitter<number> = new EventEmitter();

  isActive(index: number) {
    return this.activeIndexs.includes(index)
  }

  onActive(index: number) {
    this.active.emit(index)
  }
}
