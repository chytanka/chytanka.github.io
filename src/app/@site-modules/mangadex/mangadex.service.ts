import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, catchError, map, throwError } from 'rxjs';
import { CompositionEpisode, CompositionImage } from '../@common-read';
import { ProxyService } from '../../shared/data-access/proxy.service';

interface MdChapterImages {
  hash: string;
  data: string[];
  dataSaver: string[];
}
interface MdChapterImagesResp {
  result: string;
  baseUrl: string;
  chapter: MdChapterImages
}

interface MdChapterDataAttribute {
  volume: string;
  chapter: string;
  title: string;
  translatedLanguage: string;
  externalUrl: string;
  publishAt: string;
  readableAt: string;
  createdAt: string;
  updatedAt: string;
  pages: number;
  version: string;
}

interface MdChapterDataRelationship {
  id: string;
  type: string;
}
interface MdChapterData {
  id: string;
  type: string;
  attributes: MdChapterDataAttribute;
  relationships: MdChapterDataRelationship[]
}
interface MdChapterResp {
  result: string;
  response: string;
  data: MdChapterData
}

interface MdMangaDataAttr {
  contentRating: "pornographic" | "erotica" | "safe" | "suggestive"
}
interface MdMangaData {
  id: string;
  type: string;
  attributes: MdMangaDataAttr;
}
interface MdMangaResp {
  result: string,
  response: string,
  data: MdMangaData
}
@Injectable({
  providedIn: 'root'
})
export class MangadexService {
  http: HttpClient = inject(HttpClient)
  proxy: ProxyService = inject(ProxyService)

  getChapterImages(id: string): Observable<CompositionImage[]> {
    return this.http.get<MdChapterImagesResp>(this.proxy.proxyUrl(environment.mangadexHost + id))
      .pipe(
        map((data: MdChapterImagesResp) => data.chapter.dataSaver.map((item: string) => {
          return {
            src: this.proxy.proxyUrl(`${data.baseUrl}/data-saver/${data.chapter.hash}/${item}`)
            // src: `${data.baseUrl}/data/${data.chapter.hash}/${item}`
          }
        })

        )
      )
  }

  getChapter(id: string): Observable<CompositionEpisode> {
    return this.http.get<MdChapterResp>(this.proxy.proxyUrl(environment.mangadexChapter + id))
      .pipe(
        map((data: MdChapterResp) => {
          return {
            mangaId: data.data.relationships.filter(r => r.type == "manga")[0].id ?? null,
            title: data.data.attributes.title,
            episode: data.data.attributes.chapter,
            volume: data.data.attributes.volume,
            chapter: data.data.attributes.chapter,
            images: []
          } as unknown as CompositionEpisode
        }),
        catchError(error => throwError(() => error))
      )
  }


  getManga(id: string): Observable<{ nsfw: boolean }> {
    return this.http.get<MdMangaResp>(this.proxy.proxyUrl(environment.mangadexManga + id)).pipe(this.nsfwMap())
  }

  nsfwMap() {
    return map((data: MdMangaResp) => {
      const contentRating = data.data.attributes.contentRating;
      return {
        nsfw: (contentRating == "pornographic" || contentRating == "erotica")
      }
    })
  }


}


/*

{
  "result": "ok",
  "baseUrl": "https://uploads.mangadex.org",
  "chapter": {
    "hash": "3303dd03ac8d27452cce3f2a882e94b2",
    "data": [
      "1-f7a76de10d346de7ba01786762ebbedc666b412ad0d4b73baa330a2a392dbcdd.png"
    ],
    "dataSaver": [
      "1-27e7476475e60ad4cc4cefdb9b2dce29d84f490e145211f6b2e14b13bdb57f33.jpg"
    ]
  }
}

*/