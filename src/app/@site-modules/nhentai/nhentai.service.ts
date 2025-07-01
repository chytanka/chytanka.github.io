import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CompositionEpisode } from '../@common-read';
import { ProxyService } from '../../shared/data-access/proxy.service';
import { isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NhentaiService {
  platformId = inject(PLATFORM_ID)
  http: HttpClient = inject(HttpClient)
  proxy: ProxyService = inject(ProxyService)

  getComposition(id: string): Observable<CompositionEpisode> {
    const url = isPlatformServer(this.platformId)
      ? environment.nhentaiHost + id
      : this.proxy.proxyUrl(environment.nhentaiHost + id);

    return this.http.get<any>(url)
      .pipe(map((data) => { return this.map(data) }))
  }

  imageType = new Map<string, string>().set('p', 'png').set('j', 'jpg').set('g', 'gif').set('w', 'webp')

  map(data: any): CompositionEpisode {
    const mediaId = data.media_id;
    const mappedResponse = {
      title: data.title.pretty,
      nsfw: true,
      images: (data.images.pages.map((item: any, index: number) => {
        return {
          src: `https://i7.nhentai.net/galleries/${mediaId}/${index + 1}.${this.imageType.get(item.t)}`,
          height: item.h,
          width: item.w
        };
      })).filter((i: any) => i.src)
        .map((img: any) => {
          return { src: this.proxy.proxyUrl(`${img.src}`) }
        })

    };

    return mappedResponse;
  }
}
