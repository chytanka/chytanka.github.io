import { Component, inject, OnDestroy } from '@angular/core';
import { ComickService } from '../data-access/comick.service';
import { switchMap, of } from 'rxjs';
import { ReadBaseComponent } from '../../@common-read';
import { Base64 } from '../../../shared/utils';
import { COMICK_PATH } from '../../../app-routing.module';

@Component({
    selector: 'app-comick-shell',
    templateUrl: './comick-shell.component.html',
    styleUrl: './comick-shell.component.scss',
    standalone: false
})
export class ComickShellComponent extends ReadBaseComponent implements OnDestroy {
  comick = inject(ComickService)

  override episode$ = this.combineParamMapAndRefresh()
    .pipe(this.tapStartLoading(),
      switchMap(([params]) => {
        const pathParam = params?.get('id');

        if (!pathParam) return of(null);

        const path = (Base64.isBase64(pathParam)) ? Base64.fromBase64(pathParam) : pathParam;

        return (this.comick.getComposition(path)).pipe(this.catchError(), this.tapSetMetaTags(),
          this.tapSaveToHistory(COMICK_PATH, path),
          this.tapSaveToCurrentPlaylistItem(COMICK_PATH, path),
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
