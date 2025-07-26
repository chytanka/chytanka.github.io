import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { Playlist, PlaylistItem } from '../../../../../playlist/data-access/playlist.service';
import { ViewerService } from '../../../../data-access';
import { LangService } from '../../../../data-access/lang.service';
import { CompositionEpisode } from '../../../../../@site-modules/@common-read';

@Component({
  selector: 'app-thanks-page',
  standalone: false,
  templateUrl: './thanks-page.component.html',
  styleUrl: './thanks-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThanksPageComponent {
  viewer: ViewerService = inject(ViewerService)
  lang: LangService = inject(LangService)
  @Input() episode: CompositionEpisode | undefined = undefined;

  @Input() playlist: Playlist = [];
  @Input() currentPlaylistItem: PlaylistItem | undefined;
  @Input() playlistLink: string = "";


  getCyrrentIndex() {
    for (let i = 0; i < this.playlist.length; i++) {
      const item = this.playlist[i];
      if (this.currentPlaylistItem?.id == item.id && this.currentPlaylistItem?.site == item.site)
        return i;
    }

    return -1;
  }

  getNextIndex() {
    const index = this.getCyrrentIndex();
    if (index < 0) return -1;

    return ((index + 1) < this.playlist.length) ? index + 1 : -1;
  }

  readonly logo = {
    src: '/assets/icons/chtnk.svg',
    alt: 'Chytanka logo'
  }
  readonly heart = {
    src: '/assets/images/heart-hand-drawn-symbol-outline-svgrepo-com.svg',
    alt: 'Heart icon'
  }
  readonly map = {
    src: '/assets/images/web-comics-svgrepo-com.svg',
    alt: 'Map hand-drawn'
  }

}
