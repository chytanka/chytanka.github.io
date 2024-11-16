import { Component, inject, OnDestroy } from '@angular/core';
import { switchMap, of } from 'rxjs';
import { ZENKO_PATH } from '../../../app-routing.module';
import { ReadBaseComponent } from '../../@common-read';
import { Base64 } from '../../../shared/utils';
import { ZenkoService } from '../data-access/zenko.service';

@Component({
  selector: 'app-zenko-shell',
  templateUrl: './zenko-shell.component.html',
  styleUrl: './zenko-shell.component.scss'
})
export class ZenkoShellComponent extends ReadBaseComponent implements OnDestroy {
  zenko = inject(ZenkoService)

  override episode$ = this.combineParamMapAndRefresh()
    .pipe(this.tapStartLoading(),
      switchMap(([params]) => {
        const pathParam = params?.get('id');

        if (!pathParam) return of(null);

        const path = (Base64.isBase64(pathParam)) ? Base64.fromBase64(pathParam) : pathParam;

        return (this.zenko.getComposition(path)).pipe(this.catchError(), this.tapSetMetaTags(ZENKO_PATH),
          this.tapSaveToHistory(ZENKO_PATH, path),
          this.tapSaveToCurrentPlaylistItem(ZENKO_PATH, path),
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
