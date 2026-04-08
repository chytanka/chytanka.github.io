import { Component, inject, OnDestroy, signal } from '@angular/core';
import { switchMap, of } from 'rxjs';
import { CommonReadModule, ReadBaseComponent } from '../@common-read';
import { Base64 } from '../../shared/utils';
import { YandereService } from './yandere.service';
import { YANDERE_PATH } from '../../app-routing.module';

@Component({
  selector: 'app-yandere-shell',
  imports: [CommonReadModule],
  template: `<app-common-read (pageChange)="onPageChange($event)" [episode$]="episode$" [error$]="error$" [loading$]="loading$" (refreshData)="refreshData()"
    [playlist]="playlistService.playlist()" [playlistLink]="playlistLink()" [currentPlaylistItem]="currentPlItem()">
<source-copyright [sourceName]="sourceName()" [sourceUrl]="sourceUrl()" />
<source-copyright-logo ngProjectAs="source-logo" [sourceName]="sourceName()" [sourceUrl]="sourceUrl()" [sourceImageSrc]="sourceImageSrc()" />

</app-common-read>`
})
export default class YandereShellComponent extends ReadBaseComponent implements OnDestroy {
  yandere = inject(YandereService)
  protected readonly sourceName = signal('Yande.re');
  protected readonly sourceUrl = signal('https://yande.re');
  protected readonly sourceImageSrc = signal('/assets/logos/yandere-logo.png');


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
