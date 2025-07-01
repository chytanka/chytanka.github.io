import { Component } from '@angular/core';
import { ImgchestService } from './imgchest.service';
import { Base64 } from '../../shared/utils';
import { of, switchMap } from 'rxjs';
import { CommonReadModule, ReadBaseComponent } from '../@common-read';
import { IMGCHEST_PATH } from '../../app-routing.module';

@Component({
  imports: [CommonReadModule],
  selector: 'app-imgchest-shell',
  template: `<app-common-read [episode$]="episode$" [error$]="error$" [loading$]="loading$" (refreshData)="refreshData()"  [playlist]="playlistService.playlist()" [playlistLink]="playlistLink()" [currentPlaylistItem]="currentPlItem()">

  <a ngProjectAs="source-logo" href="https://imgchest.com" target="_blank" rel="noopener noreferrer" style="display: flex; gap: 1ch; ">
          <img style="max-width: 40px;" src="/assets/logos/imgchest.png" alt="Imgchest logo">
      </a>
  
  <div style="direction: ltr; user-select: text !important; text-wrap: balance; text-align: center; display: grid; place-content: center; justify-items: center;">
      <p>{{lang.ph().imagesVia}}<a href="https://imgchest.com" target="_blank" rel="noopener noreferrer">Imgchest</a>
          API.
          {{lang.ph().thanks}}<br>{{lang.ph().detalisCopy}}</p>
  </div></app-common-read>`
})
export default class ImgchestShellComponent extends ReadBaseComponent {

  override episode$ = this.combineParamMapAndRefresh()
    .pipe(this.tapStartLoading(),
      switchMap(([params]) => {
        const idParam = params?.get('id');

        if (!idParam) return of(null);

        const id = (Base64.isBase64(idParam)) ? Base64.fromBase64(idParam) : idParam;
        const id64 = Base64.toBase64(id);

        return (this.imgchest.getComposition(id)).pipe(this.catchError(), this.tapSetMetaTags(),
          this.tapSaveToHistory(IMGCHEST_PATH, id64),
          this.tapSaveToCurrentPlaylistItem(IMGCHEST_PATH, id),


          this.finalizeLoading());
      })
    );

  constructor(public imgchest: ImgchestService) { super() }
}
