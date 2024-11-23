import { ChangeDetectionStrategy, Component, computed, effect, EventEmitter, input, Output, Signal } from '@angular/core';
import { pairPagination } from 'pair-pagination'

@Component({
  selector: 'app-pages-indicator',
  templateUrl: './pages-indicator.component.html',
  styleUrl: './pages-indicator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagesIndicatorComponent {
  images = input<any>([]);

  activeIndexs = input<number[]>([]);

  constructor() { }

  @Output() active: EventEmitter<number> = new EventEmitter();

  isActive(index: number) {
    return this.activeIndexs().includes(index)
  }

  onActive(index: number) {

    this.active.emit(index)
  }

  pagination: Signal<number[]> = computed(() => {
    if(this.activeIndexs().length ==0) return []
    const totalPages = this.images().length
    const currentPage = Math.max(...this.activeIndexs().map(v => v + 1))
    console.log(currentPage);

    return pairPagination({ totalPages, currentPage }) as number[]
  })
}
