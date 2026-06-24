import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ChtnkEpisode, isChtnkEpisode } from '../../shared/models/chtnk-composition';

@Injectable({
  providedIn: 'root'
})
export class ReadService {

  constructor(private http: HttpClient) { }

  getComposition(url: string): Observable<ChtnkEpisode> {
    return this.http.get<ChtnkEpisode>(url)
      .pipe(
        tap(data => { if (!isChtnkEpisode(data)) throw new Error() }),
        catchError(error => throwError(() => error))
      );
  }
}
