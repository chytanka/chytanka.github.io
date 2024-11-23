import { Component } from '@angular/core';
import { forkJoin, map, of, switchMap } from 'rxjs';
import { MangadexService } from '../data-access/mangadex.service';
import { Base64 } from '../../../shared/utils';
import { ReadBaseComponent } from '../../@common-read';
import { MANGADEX_PATH } from '../../../app-routing.module';

@Component({
    selector: 'app-mangadex-shell',
    template: `<app-common-read [episode$]="episode$" [error$]="error$" [loading$]="loading$" (refreshData)="refreshData()" [playlist]="playlistService.playlist()" [playlistLink]="playlistLink()" [currentPlaylistItem]="currentPlItem()" >

<div style="direction: ltr; user-select: text !important; text-wrap: balance; padding: 1rem; text-align: center; display: grid;
    place-content: center;
    justify-items: center; min-height: 50vh;">
        <a href="http://mangadex.org" target="_blank" rel="noopener noreferrer" style="display: flex; gap: 1ch; ">
            <img src="/assets/logos/mangadex-logo.svg" alt="MangaDex logo">
            <img src="/assets/logos/mangadex-wordmark.svg" alt="MangaDex wordmark">
        </a>
        <p>Images via <a href="http://mangadex.org" target="_blank" rel="noopener noreferrer">Mangadex</a> API.
            Thanks!<br>Details on their site. Respect copyrights.</p>
    </div>

</app-common-read>`,
    standalone: false
})
export class MangadexShellComponent extends ReadBaseComponent {

  override episode$ = this.combineParamMapAndRefresh()
    .pipe(this.tapStartLoading(),
      switchMap(([params]) => {
        const idParam = params?.get('id');

        if (!idParam) return of(null);

        const id = (Base64.isBase64(idParam)) ? Base64.fromBase64(idParam) : idParam;
        const id64 = Base64.toBase64(id);
        const ch$ = this.mangadex.getChapter(id);

        return ch$.pipe(
          switchMap(ch => {
            const imgs$ = this.mangadex.getChapterImages(id);
            const manga$ = (ch.mangaId) ? this.mangadex.getManga(ch.mangaId) : of(null);

            return forkJoin([imgs$, manga$]).pipe(
              map(([imgs, manga]) => {
                ch.images = imgs;
                ch.nsfw = manga?.nsfw ?? undefined;
                return ch;
              }),
              this.catchError()
            );
          }),
          this.catchError(),
          this.tapSetMetaTags(MANGADEX_PATH),
          this.tapSaveToHistory(MANGADEX_PATH, id64),
          this.tapSaveToCurrentPlaylistItem(MANGADEX_PATH, id),

          this.finalizeLoading()
        );
      })
    );

  constructor(public mangadex: MangadexService) { super() }
}
