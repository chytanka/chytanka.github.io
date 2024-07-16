import { Component, signal } from '@angular/core';
import { of, switchMap } from 'rxjs';
import { ReadService } from '../data-access/read.service';
import { Base64 } from '../../shared/utils';
import { ReadBaseComponent } from '../../common/common-read';
import { READ_PATH } from '../../app-routing.module';

@Component({
  selector: 'app-read-shell',
  template: `<app-common-read [episode$]="episode$" [error$]="error$" [loading$]="loading$" (refreshData)="refreshData()" [playlist]="playlistService.playlist()" [playlistLink]="playlistLink()" [currentPlaylistItem]="currentPlItem()" >

<div style="direction: ltr; user-select: text !important; text-wrap: balance; padding: 1rem; text-align: center; display: grid; place-content: center; justify-items: center; min-height: 50vh;">
  <p>{{lang.ph().imagesVia}}<a [href]="url()?.origin" target="_blank" rel="noopener noreferrer">{{url()?.hostname}}.</a> {{lang.ph().thanks}}<br>{{lang.ph().detalisCopy}}</p>
    </div>
</app-common-read>`
})
export class ReadShellComponent extends ReadBaseComponent {

  url = signal<URL | null>(null);

  override episode$ = this.combineParamMapAndRefresh()
    .pipe(this.tapStartLoading(),
      switchMap(([params]) => {
        const urlParam = params?.get('url');

        if (!urlParam) return of(null);

        const url = (Base64.isBase64(urlParam)) ? Base64.fromBase64(urlParam) : urlParam;
        const id64 = Base64.toBase64(url);

        this.url.set(new URL(url))

        return this.read.getComposition(url).pipe(
          this.catchError(),
          this.tapSetTitle(),
          this.tapSaveToHistory(READ_PATH, id64),
          this.tapSaveToCurrentPlaylistItem(READ_PATH, url),

          this.finalizeLoading()
        );
      })
    );

  constructor(public read: ReadService) { super() }
}
