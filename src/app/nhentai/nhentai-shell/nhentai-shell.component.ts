import { Component, inject, OnDestroy } from '@angular/core';
import { NhentaiService } from '../data-access/nhentai.service';
import { switchMap, of } from 'rxjs';
import { NHENTAI_PATH } from '../../app-routing.module';
import { Base64 } from '../../shared/utils';
import { ReadBaseComponent } from '../../common/common-read';

@Component({
  selector: 'app-nhentai-shell',
  templateUrl: './nhentai-shell.component.html',
  styleUrl: './nhentai-shell.component.scss'
})
export class NhentaiShellComponent extends ReadBaseComponent implements OnDestroy {
  nhentai = inject(NhentaiService)

  override episode$ = this.combineParamMapAndRefresh()
    .pipe(this.tapStartLoading(),
      switchMap(([params]) => {
        const pathParam = params?.get('id');

        if (!pathParam) return of(null);

        const path = (Base64.isBase64(pathParam)) ? Base64.fromBase64(pathParam) : pathParam;

        return (this.nhentai.getComposition(path)).pipe(this.catchError(), this.tapSetTitle(),
          this.tapSaveToHistory(NHENTAI_PATH, path),
          this.tapSaveToCurrentPlaylistItem(NHENTAI_PATH, path),
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
