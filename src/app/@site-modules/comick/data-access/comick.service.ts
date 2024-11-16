import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CompositionEpisode } from '../../@common-read';
import { ProxyService } from '../../../shared/data-access/proxy.service';

@Injectable({
  providedIn: 'root'
})
export class ComickService {
  http: HttpClient = inject(HttpClient)
  proxy: ProxyService = inject(ProxyService)

  getComposition(id: string): Observable<CompositionEpisode> {
    // this.proxy.proxyUrl()
    return this.http.get<any>((environment.comickHost + id))
      .pipe(map((data) => { return this.map(data) }))
  }

  map(data: any): CompositionEpisode {
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
