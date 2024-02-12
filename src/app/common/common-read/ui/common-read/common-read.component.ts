import { Component, EventEmitter, Input, Output, inject, input } from '@angular/core';
import { LangService } from '../../../../shared/data-access/lang.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CompositionEpisode } from '../../utils';

@Component({
  selector: 'app-common-read',
  templateUrl: './common-read.component.html',
  styleUrl: './common-read.component.scss'
})
export class CommonReadComponent {
  public lang: LangService = inject(LangService);

  @Input({ required: true }) error$!: BehaviorSubject<string | null>;
  @Input({ required: true }) loading$!: BehaviorSubject<boolean>;
  @Input({ required: true }) episode$!: Observable<CompositionEpisode | null>;

  @Output() refreshData: EventEmitter<any> = new EventEmitter<any>();

  onRefreshData() {
    this.refreshData.emit();
  }
}
