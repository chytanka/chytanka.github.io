import { Component, inject, OnDestroy } from '@angular/core';
import { switchMap, of } from 'rxjs';
import { BLANKARY_PATH } from '../../app-routing.module';
import { CommonReadModule, ReadBaseComponent } from '../@common-read';
import { Base64 } from '../../shared/utils';
import { BlankaryService } from './blankary.service';

@Component({
  imports: [CommonReadModule],
  selector: 'app-blankary-shell',
  template: `<app-common-read [episode$]="episode$" [error$]="error$" [loading$]="loading$" (refreshData)="refreshData()"
    [playlist]="playlistService.playlist()" [playlistLink]="playlistLink()" [currentPlaylistItem]="currentPlItem()">

    <p>{{lang.ph().imagesVia}}<a href="https://blankary.com" target="_blank" rel="noopener noreferrer">Blankary</a>
        API.
        {{lang.ph().thanks}}<br>{{lang.ph().detalisCopy}}</p>

</app-common-read>`
})
export default class BlankaryShellComponent extends ReadBaseComponent implements OnDestroy {
  blankary = inject(BlankaryService)


  override episode$ = this.combineParamMapAndRefresh()
    .pipe(this.tapStartLoading(),
      switchMap(([params]) => {
        const pathParam = params?.get('id');

        if (!pathParam) return of(null);

        const path = (Base64.isBase64(pathParam)) ? Base64.fromBase64(pathParam) : pathParam;

        return (this.blankary.getComposition(path)).pipe(
          this.catchError(),
          this.tapSetMetaTags(),
          this.tapSaveToHistory(BLANKARY_PATH, path),
          this.tapSaveToCurrentPlaylistItem(BLANKARY_PATH, path),
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
