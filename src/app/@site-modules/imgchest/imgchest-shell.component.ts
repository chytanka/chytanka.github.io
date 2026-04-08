import { Component, signal } from '@angular/core';
import { ImgchestService } from './imgchest.service';
import { Base64 } from '../../shared/utils';
import { of, switchMap } from 'rxjs';
import { CommonReadModule, ReadBaseComponent } from '../@common-read';
import { IMGCHEST_PATH } from '../../app-routing.module';

@Component({
  imports: [CommonReadModule],
  selector: 'app-imgchest-shell',
  template: `<app-common-read (pageChange)="onPageChange($event)" [episode$]="episode$" [error$]="error$" [loading$]="loading$" (refreshData)="refreshData()"  [playlist]="playlistService.playlist()" [playlistLink]="playlistLink()" [currentPlaylistItem]="currentPlItem()">
<source-copyright [sourceName]="sourceName()" [sourceUrl]="sourceUrl()" />
<source-copyright-logo ngProjectAs="source-logo" [sourceName]="sourceName()" [sourceUrl]="sourceUrl()" [sourceImageSrc]="sourceImageSrc()" />
  </app-common-read>`
})
export default class ImgchestShellComponent extends ReadBaseComponent {
  protected readonly sourceName = signal('Imgchest');
  protected readonly sourceUrl = signal('https://imgchest.com');
  protected readonly sourceImageSrc = signal('/assets/logos/imgchest.png');

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
