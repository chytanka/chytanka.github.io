import { Component } from '@angular/core';
import { of, switchMap } from 'rxjs';
import { ReadService } from '../data-access/read.service';
import { Base64 } from '../../shared/utils';
import { ReadBaseComponent } from '../../shared/utils/read-base-component';

@Component({
  selector: 'app-read-shell',
  templateUrl: './read-shell.component.html',
  styleUrl: './read-shell.component.scss'
})
export class ReadShellComponent extends ReadBaseComponent {

  override episode$ = this.combineParamMapAndRefresh()
    .pipe(this.tapStartLoading(),
      switchMap(([params]) => {
        const urlParam = params?.get('url');

        if (!urlParam) return of(null);

        const url = (Base64.isBase64(urlParam)) ? Base64.fromBase64(urlParam) : urlParam;

        return this.read.getComposition(url).pipe(this.catchError(), this.tapSetTitle(), this.finalizeLoading());
      })
    );

  constructor(public read: ReadService) { super() }
}
