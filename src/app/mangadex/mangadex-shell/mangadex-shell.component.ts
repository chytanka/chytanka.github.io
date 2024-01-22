import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, catchError, finalize, forkJoin, map, of, switchMap, tap, throwError } from 'rxjs';
import { MangadexService } from '../data-access/mangadex.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-mangadex-shell',
  templateUrl: './mangadex-shell.component.html',
  styleUrl: './mangadex-shell.component.scss'
})
export class MangadexShellComponent {
  error$ = new BehaviorSubject<string | null>(null);
  loading$ = new BehaviorSubject<boolean>(false);

  episode$ = this.route.paramMap.pipe(
    switchMap(params => {
      const id = params?.get('id');

      if (!id) return of(null);

      this.loading$.next(true);

      const ch$ = this.mangadex.getChapter(id);
      const imgs$ = this.mangadex.getChapterImages(id);

      return forkJoin([ch$, imgs$]).pipe(
        map(([ch, imgs]) => {
          ch.images = imgs;
          return ch
        }),
        tap(episode=>{
          this.title.setTitle(`${episode.title} | Chytanka`)
        }),
        catchError(() => {
          this.error$.next('Data loading error. Please try again later.');

          return of(null);
        }),
        finalize(() => this.loading$.next(false))
      );
    })
  );

  constructor(private route: ActivatedRoute, public mangadex: MangadexService, private title: Title) { }
}
