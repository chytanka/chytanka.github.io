import { Component, signal } from '@angular/core';
import { forkJoin, map, of, switchMap } from 'rxjs';
import { MangadexService } from './mangadex.service';
import { Base64 } from '../../shared/utils';
import { CommonReadModule, ReadBaseComponent } from '../@common-read';
import { MANGADEX_PATH } from '../../app-routing.module';

@Component({
  imports: [CommonReadModule],
  selector: 'app-mangadex-shell',
  template: `<app-common-read (pageChange)="onPageChange($event)" [episode$]="episode$" [error$]="error$" [loading$]="loading$" (refreshData)="refreshData()" [playlist]="playlistService.playlist()" [playlistLink]="playlistLink()" [currentPlaylistItem]="currentPlItem()" >
  <source-copyright [sourceName]="sourceName()" [sourceUrl]="sourceUrl()" />
<source-copyright-logo ngProjectAs="source-logo" [sourceName]="sourceName()" [sourceUrl]="sourceUrl()" [sourceImageSrc]="sourceImageSrc()" />
</app-common-read>`
})
export default class MangadexShellComponent extends ReadBaseComponent {
  protected readonly sourceName = signal('MangaDex');
  protected readonly sourceUrl = signal('https://mangadex.org');
  protected readonly sourceImageSrc = signal('/assets/logos/mangadex-logo.svg');

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
            const group$ = (ch.publisher?.id !== null) ? this.mangadex.getScanlationGroup(ch.publisher?.id!) : of(null); 

            return forkJoin([imgs$, manga$, group$]).pipe(
              map(([imgs, manga, group]) => {
                ch.images = imgs;
                ch.nsfw = manga?.nsfw ?? undefined;
                ch.publisher = group ?? undefined;
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
