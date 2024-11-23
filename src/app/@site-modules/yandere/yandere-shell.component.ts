import { Component, inject, OnDestroy } from '@angular/core';
import { switchMap, of } from 'rxjs';
import { CommonReadModule, ReadBaseComponent } from '../@common-read';
import { Base64 } from '../../shared/utils';
import { YandereService } from './yandere.service';
import { YANDERE_PATH } from '../../app-routing.module';

@Component({
  selector: 'app-yandere-shell',
  imports: [CommonReadModule],
  template: `<app-common-read [episode$]="episode$" [error$]="error$" [loading$]="loading$" (refreshData)="refreshData()"
    [playlist]="playlistService.playlist()" [playlistLink]="playlistLink()" [currentPlaylistItem]="currentPlItem()">

    <p>{{lang.ph().imagesVia}}<a href="https://yande.re" target="_blank" rel="noopener noreferrer">Yande.re</a>
        API.
        {{lang.ph().thanks}}<br>{{lang.ph().detalisCopy}}</p>

</app-common-read>`
})
export default class YandereShellComponent extends ReadBaseComponent implements OnDestroy {
  yandere = inject(YandereService)

  override episode$ = this.combineParamMapAndRefresh()
    .pipe(this.tapStartLoading(),
      switchMap(([params]) => {
        const pathParam = params?.get('id');

        if (!pathParam) return of(null);

        const path = (Base64.isBase64(pathParam)) ? Base64.fromBase64(pathParam) : pathParam;

        return (this.yandere.getComposition(path)).pipe(this.catchError(), this.tapSetMetaTags(),
          this.tapSaveToHistory(YANDERE_PATH, path),
          this.tapSaveToCurrentPlaylistItem(YANDERE_PATH, path),
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
