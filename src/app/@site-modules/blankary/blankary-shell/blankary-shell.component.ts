import { Component, inject, OnDestroy } from '@angular/core';
import { switchMap, of, MonoTypeOperatorFunction, tap } from 'rxjs';
import { BLANKARY_PATH } from '../../../app-routing.module';
import { ReadBaseComponent } from '../../@common-read';
import { Base64 } from '../../../shared/utils';
import { BlankaryService } from '../data-access/blankary.service';
import { MetaTagsService } from '../../../shared/data-access/meta-tags.service';

@Component({
    selector: 'app-blankary-shell',
    templateUrl: './blankary-shell.component.html',
    styleUrl: './blankary-shell.component.scss',
    standalone: false
})
export class BlankaryShellComponent extends ReadBaseComponent implements OnDestroy {
  blankary = inject(BlankaryService)
  

  override episode$ = this.combineParamMapAndRefresh()
    .pipe(this.tapStartLoading(),
      switchMap(([params]) => {
        const pathParam = params?.get('id');

        if (!pathParam) return of(null);

        const path = (Base64.isBase64(pathParam)) ? Base64.fromBase64(pathParam) : pathParam;

        return (this.blankary.getComposition(path)).pipe(
          this.catchError(),
          this.tapSetMetaTags(),
          this.tapSaveToHistory(BLANKARY_PATH, path),
          this.tapSaveToCurrentPlaylistItem(BLANKARY_PATH, path),
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
