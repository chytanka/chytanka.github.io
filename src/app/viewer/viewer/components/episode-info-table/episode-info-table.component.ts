import { Component, inject, input } from '@angular/core';
import { LangService } from '../../../../shared/data-access/lang.service';
import { ChtnkEpisode } from '../../../../shared/models/chtnk-composition';

@Component({
  selector: 'episode-info-table',
  standalone: false,

  templateUrl: './episode-info-table.component.html',
  styleUrl: './episode-info-table.component.scss'
})
export class EpisodeInfoTableComponent {
  lang = inject(LangService)

  episode = input<ChtnkEpisode>({
    title: '',
    images: []
  })
}
