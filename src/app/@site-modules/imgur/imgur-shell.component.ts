import { Component, signal } from '@angular/core';
import { ImgurService } from './imgur.service';
import { Base64 } from '../../shared/utils';
import { of, switchMap } from 'rxjs';
import { CommonReadModule, ReadBaseComponent } from '../@common-read';
import { IMGUR_PATH } from '../../app-routing.module';

@Component({
  imports: [CommonReadModule],
  selector: 'app-imgur-shell',
  template: `<app-common-read [episode$]="episode$" [error$]="error$" [loading$]="loading$" (refreshData)="refreshData()"  [playlist]="playlistService.playlist()" [playlistLink]="playlistLink()" [currentPlaylistItem]="currentPlItem()">
    <source-copyright [sourceName]="sourceName()" [sourceUrl]="sourceUrl()" />
<source-copyright-logo ngProjectAs="source-logo" [sourceName]="sourceName()" [sourceUrl]="sourceUrl()" [sourceImageSrc]="sourceImageSrc()" />
</app-common-read>`
})
export default class ImgurShellComponent extends ReadBaseComponent {
  protected readonly sourceName = signal('Imgur');
  protected readonly sourceUrl = signal('https://imgur.com');
  protected readonly sourceImageSrc = signal('/assets/logos/imgur-logo.svg');
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
