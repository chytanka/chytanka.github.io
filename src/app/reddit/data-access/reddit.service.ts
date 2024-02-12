import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CompositionEpisode } from '../../common/common-read';

@Injectable({
  providedIn: 'root'
})
export class RedditService {

  constructor(private http: HttpClient) { }

  getComposition(postId: string): Observable<CompositionEpisode> {
    return this.http.get<any>(environment.redditHost + postId + '.json')
      .pipe(map((data: any) => { return this.map(data) }))
  }

  map(data: any): CompositionEpisode {

    const imgs = data[0]?.data.children[0]?.data?.gallery_data?.items
      ?? Object.keys(data[0].data.children[0].data.media_metadata).map(i => { return { media_id: i } });

    const post = data[0].data.children[0].data;
    const res: CompositionEpisode = {
      title: post.title,
      nsfw: post.thumbnail == "nsfw" || post.over_18,
      images: imgs.map((i: any): any => {
        return {
          src: `https://i.redd.it/${i.media_id}.jpg`,
        }
      })

    }
    return res;
  }
}
