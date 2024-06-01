import { Component } from '@angular/core';
import { Base64 } from '../../shared/utils';
import { of, switchMap } from 'rxjs';
import { TelegraphService } from '../data-access/telegraph.service';
import { ReadBaseComponent } from '../../common/common-read';

@Component({
  selector: 'app-telegraph-shell',
  templateUrl: './telegraph-shell.component.html',
  styleUrl: './telegraph-shell.component.scss'
})
export class TelegraphShellComponent extends ReadBaseComponent {

  override episode$ = this.combineParamMapAndRefresh()
    .pipe(this.tapStartLoading(),
      switchMap(([params]) => {
        const pathParam = params?.get('path');

        if (!pathParam) return of(null);

        const path = (Base64.isBase64(pathParam)) ? Base64.fromBase64(pathParam) : pathParam;

        return (this.telegraph.getComposition(path)).pipe(this.catchError(), this.tapSetTitle(), 
        this.tapSaveToHistory(`telegr`, path), 
        this.finalizeLoading());
      })
    );

  constructor(public telegraph: TelegraphService){
    super()
  }
}
