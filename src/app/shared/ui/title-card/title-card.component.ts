import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { LangService } from '../../data-access/lang.service';

@Component({
    selector: 'app-title-card',
    templateUrl: './title-card.component.html',
    styleUrl: './title-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class TitleCardComponent {
  @Input() value: any = {};

  @Output() delete: EventEmitter<number> = new EventEmitter();

  onDelete(id: number) {
    this.delete.emit(id);
  }

  lang = inject(LangService);
}
