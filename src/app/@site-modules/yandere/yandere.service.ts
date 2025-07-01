import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CompositionEpisode } from '../@common-read';
import { Base64 } from '../../shared/utils';
import { ProxyService } from '../../shared/data-access/proxy.service';
import { isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class YandereService {
  platformId = inject(PLATFORM_ID)
  http: HttpClient = inject(HttpClient)
  proxy: ProxyService = inject(ProxyService)

  getComposition(id: string): Observable<CompositionEpisode> {
    const url = isPlatformServer(this.platformId)
      ? environment.yanderePoolsHost + id
      : this.proxy.proxyUrl(environment.yanderePoolsHost + id);

    return this.http.get<any>(url)
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
            src: this.proxy.proxyUrl(img.src),
            width: img.width,
            height: img.height
          }
        })

    };

    return mappedResponse;
  }
}
