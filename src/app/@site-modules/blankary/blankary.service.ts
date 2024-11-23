import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CompositionEpisode } from '../@common-read';
import { environment } from '../../../environments/environment';
import { ProxyService } from '../../shared/data-access/proxy.service';

@Injectable({
  providedIn: 'root'
})
export class BlankaryService {
  http: HttpClient = inject(HttpClient)
  proxy: ProxyService = inject(ProxyService)

  getComposition(id: string): Observable<CompositionEpisode> {
    return this.http.get<any>(this.proxy.proxyUrl(environment.blankaryoHost + id))
      .pipe(map((data) => { return this.map(data) }))
  }

  map(data: any): CompositionEpisode {
    const mappedResponse = {
      title: data.title,
      
      images: JSON.parse(data.images).map((img: string) => {
        return {
          src: this.proxy.proxyUrl(`https://blankary.com/image/${img}`)
        };
      })

    };

    return mappedResponse;
  }
}
