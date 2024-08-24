import { Component, inject, OnDestroy } from '@angular/core';
import { PixivService } from '../data-access/pixiv.service';
import { PIXIV_PATH } from '../../app-routing.module';
import { switchMap, of } from 'rxjs';
import { ReadBaseComponent } from '../../common/common-read';
import { Base64 } from '../../shared/utils';

@Component({
  selector: 'app-pixiv-shell',
  templateUrl: './pixiv-shell.component.html',
  styleUrl: './pixiv-shell.component.scss'
})
export class PixivShellComponent extends ReadBaseComponent implements OnDestroy {
  pixiv = inject(PixivService)

  override episode$ = this.combineParamMapAndRefresh()
    .pipe(this.tapStartLoading(),
      switchMap(([params]) => {
        const pathParam = params?.get('id');

        if (!pathParam) return of(null);

        const path = (Base64.isBase64(pathParam)) ? Base64.fromBase64(pathParam) : pathParam;

        return (this.pixiv.getComposition(path)).pipe(this.catchError(), this.tapSetTitle(),
          this.tapSaveToHistory(PIXIV_PATH, path),
          this.tapSaveToCurrentPlaylistItem(PIXIV_PATH, path),
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
