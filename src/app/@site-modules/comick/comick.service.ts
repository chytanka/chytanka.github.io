import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProxyService } from '../../shared/data-access/proxy.service';
import { isPlatformServer } from '@angular/common';
import { ChtnkEpisode } from '../../shared/models/chtnk-composition';

@Injectable({
  providedIn: 'root'
})
export class ComickService {
  platformId = inject(PLATFORM_ID)
  http: HttpClient = inject(HttpClient)
  proxy: ProxyService = inject(ProxyService)

  getComposition(id: string): Observable<ChtnkEpisode> {
    const url = isPlatformServer(this.platformId)
      ? environment.comickHost + id
      : this.proxy.proxyUrl(environment.comickHost + id);

    return this.http.get<any>(url)
      .pipe(map((data) => { return this.map(data) }))
  }

  map(data: any): ChtnkEpisode {
    const nsfw = data.matureContent;
    const mappedResponse = {
      title: data.chapTitle,
      nsfw: nsfw, //['erotica', 'suggestive'].includes(data.chapter.md_comics.content_rating),
      images: (data.chapter.md_images.map((item: any, index: number) => {
        return {
          src: `https://meo3.comick.pictures/${item.b2key}`,
          height: item.h,
          width: item.w
        };
      })).filter((i: any) => i.src)
      // .map((img: any) => {
      //   return {
      //     src:  this.proxy.proxyUrl(`${img.src}`)
      //   }
      // })

    };

    return mappedResponse;
  }
}
