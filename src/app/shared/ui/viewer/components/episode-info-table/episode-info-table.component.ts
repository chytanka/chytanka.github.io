import { Component, inject, input } from '@angular/core';
import { CompositionEpisode } from '../../../../../@site-modules/@common-read';
import { LangService } from '../../../../data-access/lang.service';

@Component({
  selector: 'episode-info-table',
  standalone: false,

  templateUrl: './episode-info-table.component.html',
  styleUrl: './episode-info-table.component.scss'
})
export class EpisodeInfoTableComponent {
  lang = inject(LangService)

  episode = input<CompositionEpisode>({
    title: '',
    images: []
  })
}
