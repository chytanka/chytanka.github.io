import { Component, inject, input } from '@angular/core';
import { ViewerService } from '../../../services';
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
    for (let i = 0; i < this.playlist().length; i++) {
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

  splitPhrase(str: string, lines: number = 2): string[] {
    const words = str.split(" ");
    const result: string[] = [];

    const chunkSize = Math.ceil(words.length / lines);

    for (let i = 0; i < lines; i++) {
      const start = i * chunkSize;
      const end = start + chunkSize;

      const chunk = words.slice(start, end).join(" ");
      if (chunk) result.push(chunk);
    }

    return result;
  }

  getTspanY(index: number, total: number): string {
    const start = 40;      // де починаємо (%)
    const end = 60;        // де закінчуємо (%)

    const step = total > 1 ? (end - start) / (total - 1) : 0;

    return `${start + step * index}%`;
  }

}
