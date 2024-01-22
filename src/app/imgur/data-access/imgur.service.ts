import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CompositionEpisode, CompositionImage } from '../../shared/utils';
import { Observable, map } from 'rxjs';
interface ImgurRespCompImage {
  link: string;
  width: number;
  height: number;
  nsfw: string;
  size: number;
  type: string;
  description: string;
}
interface ImgurRespComp {
  link: string;
  nsfw: string;
  title: string;
  images: Array<ImgurRespCompImage>;
}
interface ImgurResp {
  data: any | ImgurRespComp
  success: boolean;
  status: number;
}

@Injectable({
  providedIn: 'root'
})
export class ImgurService {
  private clientId: string = 'b27980016250427';

  constructor(private http: HttpClient) { }

  getComposition(id: string): Observable<CompositionEpisode> {
    const headers = new HttpHeaders({
      'Authorization': `Client-ID ${this.clientId}`
    });

    return this.http.get<ImgurResp>(environment.imgurHost + id, { headers })
      .pipe(map((data: ImgurResp) => { return this.map(data.data) }))
  }


  map(data: ImgurRespComp): CompositionEpisode {
    const res: CompositionEpisode = {
      title: data.title,
      episode: 0,
      images: data.images.map((i): CompositionImage => {
        return {
          src: i.link,
          width: i.width,
          height: i.height,
          alt: i.description,
          size: i.size,
          type: i.type,
          nsfw: i.nsfw
        }
      })

    }
    return res;
  }

}

/**

{
    "data": {
        "id": "GkXtfkl",
        "title": "My Room Has Become A Dungeon\u2019s Rest Area",
        "description": null,
        "datetime": 1525654550,
        "cover": "xZve0i7",
        "cover_edited": null,
        "cover_width": 1242,
        "cover_height": 1759,
        "account_url": "Giagus",
        "account_id": 34203460,
        "privacy": "hidden",
        "layout": "blog",
        "views": 86474,
        "link": "https:\/\/imgur.com\/a\/GkXtfkl",
        "favorite": false,
        "nsfw": true,
        "section": null,
        "images_count": 21,
        "in_gallery": true,
        "is_ad": false,
        "include_album_ads": true,
        "is_album": true,
        "images": [
            {
                "id": "xZve0i7",
                "title": null,
                "description": null,
                "datetime": 1525654473,
                "type": "image\/jpeg",
                "animated": false,
                "width": 1242,
                "height": 1759,
                "size": 415223,
                "views": 83744,
                "bandwidth": 34772434912,
                "vote": null,
                "favorite": false,
                "nsfw": null,
                "section": null,
                "account_url": null,
                "account_id": null,
                "is_ad": false,
                "in_most_viral": false,
                "has_sound": false,
                "tags": [],
                "ad_type": 0,
                "ad_url": "",
                "edited": "0",
                "in_gallery": false,
                "link": "https:\/\/i.imgur.com\/xZve0i7.jpg"
            }
    },
    "success": true,
    "status": 200
}

 */