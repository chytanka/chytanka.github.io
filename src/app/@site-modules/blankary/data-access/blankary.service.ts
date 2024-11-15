import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CompositionEpisode } from '../../@common-read';
import { environment } from '../../../../environments/environment';
import { Base64 } from '../../../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class BlankaryService {
  http: HttpClient = inject(HttpClient)

  getComposition(id: string): Observable<CompositionEpisode> {
    return this.http.get<any>(environment.blankaryoHost + id)
      .pipe(map((data) => { return this.map(data) }))
  }

  map(data: any): CompositionEpisode {
    
    const mappedResponse = {
      title: data.title,
      
      images: JSON.parse(data.images).map((img: string) => {
        return {
          src: environment.proxy + Base64.toBase64(`https://blankary.com/image/${img}`)
        };
      })

    };

    return mappedResponse;
  }
}
