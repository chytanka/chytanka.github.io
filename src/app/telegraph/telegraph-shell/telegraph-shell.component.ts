import { Component, OnDestroy } from '@angular/core';
import { Base64 } from '../../shared/utils';
import { of, switchMap } from 'rxjs';
import { TelegraphService } from '../data-access/telegraph.service';
import { ReadBaseComponent } from '../../common/common-read';
import { TELEGRAPH_PATH } from '../../app-routing.module';

@Component({
  selector: 'app-telegraph-shell',
  template: `<app-common-read [episode$]="episode$" [error$]="error$" [loading$]="loading$" (refreshData)="refreshData()"
    [playlist]="playlistService.playlist()" [playlistLink]="playlistLink()" [currentPlaylistItem]="currentPlItem()" />`
})
export class TelegraphShellComponent extends ReadBaseComponent implements OnDestroy {

  override episode$ = this.combineParamMapAndRefresh()
    .pipe(this.tapStartLoading(),
      switchMap(([params]) => {
        const pathParam = params?.get('path');

        if (!pathParam) return of(null);

        const path = (Base64.isBase64(pathParam)) ? Base64.fromBase64(pathParam) : pathParam;

        return (this.telegraph.getComposition(path)).pipe(this.catchError(), this.tapSetTitle(),
          this.tapSaveToHistory(TELEGRAPH_PATH, path),
          this.tapSaveToCurrentPlaylistItem(TELEGRAPH_PATH, path),
          this.finalizeLoading());
      })
    );

  constructor(public telegraph: TelegraphService) {
    super()
  }

  ngOnDestroy(): void {
    this.plObserv?.unsubscribe();
  }
}
