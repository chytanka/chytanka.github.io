import { Component, inject, OnDestroy } from '@angular/core';
import { PixivService } from './pixiv.service';
import { PIXIV_PATH } from '../../app-routing.module';
import { switchMap, of } from 'rxjs';
import { CommonReadModule, ReadBaseComponent } from '../@common-read';
import { Base64 } from '../../shared/utils';

@Component({
  selector: 'app-pixiv-shell',
  imports: [CommonReadModule],
  template: `<app-common-read [episode$]="episode$" [error$]="error$" [loading$]="loading$" (refreshData)="refreshData()"
    [playlist]="playlistService.playlist()" [playlistLink]="playlistLink()" [currentPlaylistItem]="currentPlItem()">

    <p>{{lang.ph().imagesVia}}<a href="https://pixiv.net" target="_blank" rel="noopener noreferrer">Pixiv</a>
        API.
        {{lang.ph().thanks}}<br>{{lang.ph().detalisCopy}}</p>

</app-common-read>`
})
export default class PixivShellComponent extends ReadBaseComponent implements OnDestroy {
  pixiv = inject(PixivService)

  override episode$ = this.combineParamMapAndRefresh()
    .pipe(this.tapStartLoading(),
      switchMap(([params]) => {
        const pathParam = params?.get('id');

        if (!pathParam) return of(null);

        const path = (Base64.isBase64(pathParam)) ? Base64.fromBase64(pathParam) : pathParam;

        return (this.pixiv.getComposition(path)).pipe(this.catchError(), this.tapSetMetaTags(),
          this.tapSaveToHistory(PIXIV_PATH, path),
          this.tapSaveToCurrentPlaylistItem(PIXIV_PATH, path),
          this.finalizeLoading());
      })
    );

  constructor() {
    super()
  }

  ngOnDestroy(): void {
    this.plObserv?.unsubscribe();
  }
}
