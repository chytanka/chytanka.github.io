import { Component, inject, input } from '@angular/core';
import { ViewerService } from '../../../../shared/data-access';
import { LangService } from '../../../../shared/data-access/lang.service';
import { Playlist, PlaylistItem } from '../../../../playlist/data-access/playlist.service';

@Component({
    selector: 'app-hint-page',
    templateUrl: './hint-page.component.html',
    styleUrl: './hint-page.component.scss',
    standalone: false
})
export class HintPageComponent {
  viewer: ViewerService = inject(ViewerService)
  lang: LangService = inject(LangService)

  playlist = input<Playlist>([]);
  playlistLink = input("");
  currentPlaylistItem = input<PlaylistItem | undefined>();


  getCyrrentIndex() {
    for (let i = 0; i < this.playlist.length; i++) {
      const item = this.playlist()[i];
      if (this.currentPlaylistItem()?.id == item.id && this.currentPlaylistItem()?.site == item.site)
        return i;
    }

    return -1;
  }

  getPrevIndex() {
    const index = this.getCyrrentIndex();
    if (index < 0) return -1;

    return ((index - 1) >= 0) ? (index - 1) : -1;
  }

}
