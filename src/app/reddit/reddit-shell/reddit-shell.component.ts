import { Component } from '@angular/core';
import { Base64 } from '../../shared/utils';
import { of, switchMap } from 'rxjs';
import { RedditService } from '../data-access/reddit.service';
import { ReadBaseComponent } from '../../common/common-read';

@Component({
  selector: 'app-reddit-shell',
  template: `<app-common-read [episode$]="episode$" [error$]="error$" [loading$]="loading$" (refreshData)="refreshData()" />`
})
export class RedditShellComponent extends ReadBaseComponent {

  override episode$ = this.combineParamMapAndRefresh()
    .pipe(this.tapStartLoading(),
      switchMap(([params]) => {
        const idParam = params?.get('id');

        if (!idParam) return of(null);

        const id = (Base64.isBase64(idParam)) ? Base64.fromBase64(idParam) : idParam;
        const id64 = Base64.toBase64(id);

        return (this.reddit.getComposition(id)).pipe(
          this.catchError(),
          this.tapSetTitle(),
          this.tapSaveToHistory(`reddit`, id64), 
          this.finalizeLoading());
      })
    );

  constructor(public reddit: RedditService) { super() }
}