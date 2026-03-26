import { Component, OnDestroy, signal } from '@angular/core';
import { Base64 } from '../../shared/utils';
import { of, switchMap } from 'rxjs';
import { TelegraphService } from './telegraph.service';
import { ReadBaseComponent } from '../@common-read';
import { TELEGRAPH_PATH } from '../../app-routing.module';
import { CommonReadModule } from '../@common-read';

@Component({
  selector: 'app-telegraph-shell',
  imports: [CommonReadModule],
  template: `<app-common-read [episode$]="episode$" [error$]="error$" [loading$]="loading$" (refreshData)="refreshData()"
    [playlist]="playlistService.playlist()" [playlistLink]="playlistLink()" [currentPlaylistItem]="currentPlItem()" >
    <source-copyright [sourceName]="sourceName()" [sourceUrl]="sourceUrl()" />
<source-copyright-logo ngProjectAs="source-logo" [sourceName]="sourceName()" [sourceUrl]="sourceUrl()" [sourceImageSrc]="sourceImageSrc()" />
    
    </app-common-read>`
})
export default class TelegraphShellComponent extends ReadBaseComponent implements OnDestroy {
  protected readonly sourceName = signal('Telegra.ph');
  protected readonly sourceUrl = signal('https://telegra.ph');
  protected readonly sourceImageSrc = signal('/assets/logos/telegraph-logo.svg');
  override episode$ = this.combineParamMapAndRefresh()
    .pipe(this.tapStartLoading(),
      switchMap(([params]) => {
        const pathParam = params?.get('path');

        if (!pathParam) return of(null);

        const path = (Base64.isBase64(pathParam)) ? Base64.fromBase64(pathParam) : pathParam;

        return (this.telegraph.getComposition(path)).pipe(this.catchError(), this.tapSetMetaTags(TELEGRAPH_PATH),
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
