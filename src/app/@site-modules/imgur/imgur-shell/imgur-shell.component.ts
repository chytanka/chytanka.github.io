import { Component } from '@angular/core';
import { ImgurService } from '../data-access/imgur.service';
import { Base64 } from '../../../shared/utils';
import { of, switchMap } from 'rxjs';
import { ReadBaseComponent } from '../../@common-read';
import { IMGUR_PATH } from '../../../app-routing.module';

@Component({
    selector: 'app-imgur-shell',
    template: `<app-common-read [episode$]="episode$" [error$]="error$" [loading$]="loading$" (refreshData)="refreshData()"  [playlist]="playlistService.playlist()" [playlistLink]="playlistLink()" [currentPlaylistItem]="currentPlItem()"><div style="direction: ltr; user-select: text !important; text-wrap: balance; padding: 1rem; text-align: center; display: grid;
  place-content: center;
  justify-items: center; min-height: 50vh;">
      <a href="https://imgur.com" target="_blank" rel="noopener noreferrer" style="display: flex; gap: 1ch; ">
          <img src="/assets/logos/imgur-logo.svg" alt="Imgur logo">
      </a>
      <p>{{lang.ph().imagesVia}}<a href="https://imgur.com" target="_blank" rel="noopener noreferrer">Imgur</a>
          API.
          {{lang.ph().thanks}}<br>{{lang.ph().detalisCopy}}</p>
  </div></app-common-read>`,
    standalone: false
})
export class ImgurShellComponent extends ReadBaseComponent {

  override episode$ = this.combineParamMapAndRefresh()
    .pipe(this.tapStartLoading(),
      switchMap(([params]) => {
        const idParam = params?.get('id');

        if (!idParam) return of(null);

        const id = (Base64.isBase64(idParam)) ? Base64.fromBase64(idParam) : idParam;
        const id64 = Base64.toBase64(id);

        return (this.imgur.getComposition(id)).pipe(this.catchError(), this.tapSetMetaTags(), 
        this.tapSaveToHistory(IMGUR_PATH, id64), 
        this.tapSaveToCurrentPlaylistItem(IMGUR_PATH, id),

        
        this.finalizeLoading());
      })
    );

  constructor(public imgur: ImgurService) { super() }
}
