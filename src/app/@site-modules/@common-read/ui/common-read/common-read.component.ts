import { Component, output, inject, input } from '@angular/core';
import { LangService } from '../../../../shared/data-access/lang.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CompositionEpisode } from '../../utils';
import { Playlist, PlaylistItem } from '../../../../playlist/data-access/playlist.service';

@Component({
  selector: 'app-common-read',
  templateUrl: './common-read.component.html',
  styleUrl: './common-read.component.scss',
  standalone: false
})
export class CommonReadComponent {
  public lang: LangService = inject(LangService);

  error$ = input.required<BehaviorSubject<string | null>>();
  loading$ = input.required<BehaviorSubject<boolean>>();
  episode$ = input.required<Observable<CompositionEpisode | null>>();

  playlist = input<Playlist>([]);
  playlistLink = input("");
  currentPlaylistItem = input<PlaylistItem | undefined>();

  refreshData = output();

  onRefreshData() {
    this.refreshData.emit();
  }
}
