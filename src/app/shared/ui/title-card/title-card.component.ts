import { ChangeDetectionStrategy, Component, InputSignal, output, computed, inject, input } from '@angular/core';
import { LangService } from '../../data-access/lang.service';
import { CompositionEpisode } from '../../../@site-modules/@common-read';

export interface TitleCartItem {
  site: string[];
  post_id: string;
  cover: string;
  title: string;
  updated: string;
  episode?: CompositionEpisode;
  id: number;
  size: number;
  page: number;
  pages: number;
}

@Component({
  selector: 'app-title-card',
  templateUrl: './title-card.component.html',
  styleUrl: './title-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class TitleCardComponent {
  value: InputSignal<TitleCartItem> = input<TitleCartItem>({
    cover: '',
    id: 0,
    page: 0,
    pages: 0,
    post_id: '',
    site: [''],
    size: 0,
    title: '',
    updated: ''
  });

  routeLink = computed(() => ['', ...this.value().site, this.value().post_id])
  queryParams = computed(() => ({ page: this.value().page || 1 }));
  siteTag = computed(() => {
    const arr = [...this.value().site]
    return arr.pop();
  })

  delete = output<number>();

  onDelete(id: number) {
    if (!id) return;
    this.delete.emit(id);
  }

  lang = inject(LangService);
}
