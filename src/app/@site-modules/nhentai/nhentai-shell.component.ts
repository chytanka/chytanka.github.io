import { Component, inject, OnDestroy } from '@angular/core';
import { NhentaiService } from './nhentai.service';
import { switchMap, of } from 'rxjs';
import { NHENTAI_PATH } from '../../app-routing.module';
import { Base64 } from '../../shared/utils';
import { CommonReadModule, ReadBaseComponent } from '../@common-read';

@Component({
  imports: [CommonReadModule],
  selector: 'app-nhentai-shell',
  template: `<app-common-read [episode$]="episode$" [error$]="error$" [loading$]="loading$" (refreshData)="refreshData()"
    [playlist]="playlistService.playlist()" [playlistLink]="playlistLink()" [currentPlaylistItem]="currentPlItem()">

    <p>{{lang.ph().imagesVia}}<a href="https://nhentai.net" target="_blank" rel="noopener noreferrer">Nhentai</a>
        API.
        {{lang.ph().thanks}}<br>{{lang.ph().detalisCopy}}</p>

</app-common-read>`
})
export default class NhentaiShellComponent extends ReadBaseComponent implements OnDestroy {
  nhentai = inject(NhentaiService)

  override episode$ = this.combineParamMapAndRefresh()
    .pipe(this.tapStartLoading(),
      switchMap(([params]) => {
        const pathParam = params?.get('id');

        if (!pathParam) return of(null);

        const path = (Base64.isBase64(pathParam)) ? Base64.fromBase64(pathParam) : pathParam;

        return (this.nhentai.getComposition(path)).pipe(this.catchError(), this.tapSetMetaTags(),
          this.tapSaveToHistory(NHENTAI_PATH, path),
          this.tapSaveToCurrentPlaylistItem(NHENTAI_PATH, path),
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
