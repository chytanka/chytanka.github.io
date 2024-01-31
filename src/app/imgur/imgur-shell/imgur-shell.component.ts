import { Component, OnDestroy, WritableSignal, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImgurService } from '../data-access/imgur.service';
import { CompositionEpisode } from '../../shared/utils';
import { BehaviorSubject, Subject, catchError, finalize, forkJoin, of, switchMap, takeUntil } from 'rxjs';
import { LangService } from '../../shared/data-access/lang.service';

@Component({
  selector: 'app-imgur-shell',
  templateUrl: './imgur-shell.component.html',
  styleUrl: './imgur-shell.component.scss'
})
export class ImgurShellComponent {
  error$ = new BehaviorSubject<string | null>(null);
  loading$ = new BehaviorSubject<boolean>(false);

  episode$ = this.route.paramMap.pipe(
    switchMap(params => {
      const id = params?.get('id');

      if (!id) return of(null);

      this.loading$.next(true);

      return (this.imgur.getComposition(id)).pipe(
        catchError(() => {
          this.error$.next(this.lang.phrases.dataLoadErr);

          return of(null);
        }),
        finalize(() => this.loading$.next(false))
      );
    })
  );

  constructor(private route: ActivatedRoute, public imgur: ImgurService, public lang: LangService) { }
}
