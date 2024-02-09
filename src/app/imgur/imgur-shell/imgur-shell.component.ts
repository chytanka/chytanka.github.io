import { Component } from '@angular/core';
import { ImgurService } from '../data-access/imgur.service';
import { Base64, ReadBaseComponent } from '../../shared/utils';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-imgur-shell',
  templateUrl: './imgur-shell.component.html',
  styleUrl: './imgur-shell.component.scss'
})
export class ImgurShellComponent extends ReadBaseComponent {

  override episode$ = this.combineParamMapAndRefresh()
    .pipe(this.tapStartLoading(),
      switchMap(([params]) => {
        const idParam = params?.get('id');

        if (!idParam) return of(null);

        const id = (Base64.isBase64(idParam)) ? Base64.fromBase64(idParam) : idParam;

        return (this.imgur.getComposition(id)).pipe(this.catchError(), this.tapSetTitle(), this.finalizeLoading());
      })
    );

  constructor(public imgur: ImgurService) { super() }
}
