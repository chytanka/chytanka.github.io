import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CompositionEpisode, CompositionPublisher } from '../../@common-read';
import { Base64 } from '../../../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class PixivService {
  http: HttpClient = inject(HttpClient)

  getComposition(id: string): Observable<CompositionEpisode> {
    return this.http.get<any>(environment.proxy + Base64.toBase64(environment.pixivHost + id))
      .pipe(map((data) => { return this.map(data.body) }))
  }

  map(data: any): CompositionEpisode {

    const mappedResponse = {
      title: data.illust_details.title,
      nsfw: data.illust_details.tags.includes('R-18'),
      publisher: {
        id: data.author_details.user_id as string,
        site: `https://pixiv.net/en/users/` + data.author_details.user_id as string,
        name: data.author_details.user_name as string,
        avatar: environment.proxy + Base64.toBase64(data.author_details.profile_img.main) + '&ref=https://www.pixiv.net' as string,
        description: '',
        links: []
      } as unknown as CompositionPublisher,

      images: (data.illust_details.manga_a ? data.illust_details.manga_a.map((item: any, index: number) => {
        return {
          src: item.url,
          width: data.illust_details.illust_images[index].illust_image_width,
          height: data.illust_details.illust_images[index].illust_image_height
        };
      }) : [
        {
          src: data.illust_details.url,
          width: data.illust_details.illust_images[0].illust_image_width,
          height: data.illust_details.illust_images[0].illust_image_height
        }
      ])

        .filter((i: any) => i.src).map((img: any) => {
          return {
            src: environment.proxy + Base64.toBase64(img.src) + '&ref=https://www.pixiv.net',
            width: img.width,
            height: img.height
          }
        })

    };
    // ugoira_meta.frames for animation
    return mappedResponse;
  }
}
