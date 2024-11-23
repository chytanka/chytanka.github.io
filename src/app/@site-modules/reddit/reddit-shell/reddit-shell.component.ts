import { Component } from '@angular/core';
import { Base64 } from '../../../shared/utils';
import { of, switchMap } from 'rxjs';
import { RedditService } from '../data-access/reddit.service';
import { ReadBaseComponent } from '../../@common-read';
import { REDDIT_PATH } from '../../../app-routing.module';

@Component({
    selector: 'app-reddit-shell',
    template: `<app-common-read [episode$]="episode$" [error$]="error$" [loading$]="loading$" (refreshData)="refreshData()" [playlist]="playlistService.playlist()" [playlistLink]="playlistLink()" [currentPlaylistItem]="currentPlItem()" >

<p>{{lang.ph().imagesVia}}<a href="https://reddit.com" target="_blank" rel="noopener noreferrer">Reddit</a>
          API.
          {{lang.ph().thanks}}<br>{{lang.ph().detalisCopy}}</p>

</app-common-read>`,
    standalone: false
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
          this.tapSetMetaTags(REDDIT_PATH),
          this.tapSaveToHistory(REDDIT_PATH, id64), 
          this.tapSaveToCurrentPlaylistItem(REDDIT_PATH, id),

          this.finalizeLoading());
      })
    );

  constructor(public reddit: RedditService) { super() }
}