import { Component } from '@angular/core';
import { of, switchMap } from 'rxjs';
import { ReadService } from '../data-access/read.service';
import { Base64 } from '../../shared/utils';
import { ReadBaseComponent } from '../../common/common-read';

@Component({
  selector: 'app-read-shell',
  template: `<app-common-read [episode$]="episode$" [error$]="error$" [loading$]="loading$" (refreshData)="refreshData()" />`
})
export class ReadShellComponent extends ReadBaseComponent {

  override episode$ = this.combineParamMapAndRefresh()
    .pipe(this.tapStartLoading(),
      switchMap(([params]) => {
        const urlParam = params?.get('url');

        if (!urlParam) return of(null);

        const url = (Base64.isBase64(urlParam)) ? Base64.fromBase64(urlParam) : urlParam;

        return this.read.getComposition(url).pipe(
          this.catchError(), 
          this.tapSetTitle(), 
          this.tapSaveToHistory(`read`, url), 
          this.finalizeLoading()
        );
      })
    );

  constructor(public read: ReadService) { super() }
}
