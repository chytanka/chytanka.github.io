import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, map } from 'rxjs';
import { CompositionEpisode, CompositionImage } from '../@common-read';
import { ProxyService } from '../../shared/data-access/proxy.service';
import { isPlatformServer } from '@angular/common';
interface ImgchestRespCompImage {
  id: string;
  description: string;
  link: string;
  position: number
  created: string;
}
interface ImgchestRespComp {
  id: string;
  title: string;
  username: string;
  privacy: string;
  report_status: number;
  views: number;
  nsfw: number;
  image_count: number;
  created: string;
  images: Array<ImgchestRespCompImage>;
}
interface ImgchestResp {
  data: any | ImgchestRespComp
}

@Injectable({
  providedIn: 'root'
})
export class ImgchestService {
  private readonly clientId: string = 'T0eSFX9IOg0Okcg7g3UN7jp8MDreLglRyYKYkw2Gd74de321';
  platformId = inject(PLATFORM_ID)

  proxy: ProxyService = inject(ProxyService)
  http: HttpClient = inject(HttpClient)

  constructor() { }

  getComposition(id: string): Observable<CompositionEpisode> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.clientId}`
    });

    const url = isPlatformServer(this.platformId)
      ? environment.imgchestHost + id
      : this.proxy.proxyUrl(environment.imgchestHost + id);

    return this.http.get<ImgchestResp>(url, { headers })
      .pipe(map((data: ImgchestResp) => { return this.map(data.data) }))
  }


  map(data: ImgchestRespComp): CompositionEpisode {
    const res: CompositionEpisode = {
      title: data.title,
      episode: 0,
      nsfw: (data.nsfw) as unknown as boolean,
      images: data.images.map((i): CompositionImage => {
        return {
          src: this.proxy.proxyUrl(i.link),
          alt: i.description,
        }
      })

    }
    return res;
  }

}

/**
{
  "data": {
    "id": "wl7l2rvgo4x",
    "title": null,
    "username": "Anonymous",
    "privacy": "hidden",
    "report_status": 1,
    "views": 1,
    "nsfw": 0,
    "image_count": 3,
    "created": "2025-06-13T13:37:01.000000Z",
    "images": [
      {
        "id": "46acqe3zkk7",
        "description": null,
        "link": "https:\/\/cdn.imgchest.com\/files\/46acqe3zkk7.jpg",
        "position": 1,
        "created": "2025-06-13T13:37:01.000000Z"
      },
      {
        "id": "yvdcwog6vpy",
        "description": null,
        "link": "https:\/\/cdn.imgchest.com\/files\/yvdcwog6vpy.jpg",
        "position": 2,
        "created": "2025-06-13T13:37:02.000000Z"
      },
      {
        "id": "yxkczok2ro7",
        "description": null,
        "link": "https:\/\/cdn.imgchest.com\/files\/yxkczok2ro7.jpg",
        "position": 3,
        "created": "2025-06-13T13:37:03.000000Z"
      }
    ]
  }
}

 */