import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { CompositionEpisode, isCompositionEpisode } from '../../common/common-read';

@Injectable({
  providedIn: 'root'
})
export class ReadService {

  constructor(private http: HttpClient) { }

  getComposition(url: string): Observable<CompositionEpisode> {
    return this.http.get<CompositionEpisode>(url)
      .pipe(
        tap(data => { if (!isCompositionEpisode(data)) throw new Error() }),
        catchError(error => throwError(() => error))
      );
  }
}
