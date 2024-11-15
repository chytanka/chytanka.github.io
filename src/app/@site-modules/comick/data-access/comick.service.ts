import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CompositionEpisode } from '../../@common-read';
import { Base64 } from '../../../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class ComickService {
  http: HttpClient = inject(HttpClient)

  getComposition(id: string): Observable<CompositionEpisode> {
    // environment.proxy + Base64.toBase64
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
        //     src: environment.proxy + Base64.toBase64(`${img.src}`)
        //   }
        // })

    };

    return mappedResponse;
  }
}
