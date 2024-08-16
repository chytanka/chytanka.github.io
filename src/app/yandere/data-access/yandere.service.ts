import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CompositionEpisode, CompositionPublisher } from '../../common/common-read';
import { Base64 } from '../../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class YandereService {
  http: HttpClient = inject(HttpClient)

  getComposition(id: string): Observable<CompositionEpisode> {
    return this.http.get<any>(environment.yanderePoolsHost + id)
      .pipe(map((data) => { return this.map(data) }))
  }

  map(data: any): CompositionEpisode {
    const mappedResponse = {
      title: data.name,

      images: (data.posts.map((item: any) => {
        return {
          src: item.sample_url,
          width: item.sample_width,
          height: item.sample_height
        };
      })).filter((i: any) => i.src)
        .map((img: any) => {
          return {
            src: environment.proxy + Base64.toBase64(img.src),
            width: img.width,
            height: img.height
          }
        })

    };

    return mappedResponse;
  }
}
