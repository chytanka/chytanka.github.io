import { Component } from '@angular/core';
import { forkJoin, map, of, switchMap } from 'rxjs';
import { MangadexService } from '../data-access/mangadex.service';
import { Base64, ReadBaseComponent } from '../../shared/utils';

@Component({
  selector: 'app-mangadex-shell',
  templateUrl: './mangadex-shell.component.html',
  styleUrl: './mangadex-shell.component.scss'
})
export class MangadexShellComponent extends ReadBaseComponent {

  override episode$ = this.combineParamMapAndRefresh()
    .pipe(this.tapStartLoading(),
      switchMap(([params]) => {
        const idParam = params?.get('id');

        if (!idParam) return of(null);

        const id = (Base64.isBase64(idParam)) ? Base64.fromBase64(idParam) : idParam;
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
          this.tapSetTitle(),
          this.finalizeLoading()
        );
      })
    );

  constructor(public mangadex: MangadexService) { super() }
}
