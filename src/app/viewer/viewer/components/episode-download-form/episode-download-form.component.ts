import { Component, inject, input } from '@angular/core';
import { CompositionEpisode } from '../../../../@site-modules/@common-read';
import { DownloadService } from '../../../../shared/data-access/download.service';
import { Base64 } from '../../../../shared/utils';
import { PlaylistItem } from '../../../../playlist/data-access/playlist.service';


@Component({
  selector: 'episode-download-form',
  standalone: false,

  templateUrl: './episode-download-form.component.html',
  styleUrl: './episode-download-form.component.scss'
})
export class EpisodeDownloadFormComponent {
  dl = inject(DownloadService);

  currentPlaylistItem = input<PlaylistItem | undefined>();
  episode = input<CompositionEpisode>({
    title: '',
    images: []
  })

  // #region 🧰 Utils
  genId(): string {
    return Base64.toBase64(JSON.stringify(this.currentPlaylistItem))
  }
  //#endregion
}
