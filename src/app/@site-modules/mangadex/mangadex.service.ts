import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, catchError, map, throwError } from 'rxjs';
import { CompositionEpisode, CompositionImage, CompositionPublisher } from '../@common-read';
import { ProxyService } from '../../shared/data-access/proxy.service';
import { isPlatformServer } from '@angular/common';

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
interface MdScanlationGroup {
  id: string;
  type: string;
  attributes: {
    name: string,
    altNames: any[],
    website: string,
    ircServer: string,
    ircChannel: string,
    discord: string,
    contactEmail: string,
    description: string,
    twitter: string,
    mangaUpdates: string,
    focusedLanguage: string[],
    locked: boolean,
    official: boolean,
    verified: boolean,
    inactive: boolean,
    exLicensed: boolean,
    publishDelay: string,
    version: number,
    createdAt: string,
    updatedAt: string
  }
}
@Injectable({
  providedIn: 'root'
})
export class MangadexService {
  platformId = inject(PLATFORM_ID)
  http: HttpClient = inject(HttpClient)
  proxy: ProxyService = inject(ProxyService)

  getChapterImages(id: string): Observable<CompositionImage[]> {
    const url = isPlatformServer(this.platformId)
      ? environment.mangadexHost + id
      : this.proxy.proxyUrl(environment.mangadexHost + id);

    return this.http.get<MdChapterImagesResp>(url)
      .pipe(
        map((data: MdChapterImagesResp) => data.chapter.dataSaver.map((item: string) => {
          return {
            src: this.proxy.proxyUrl(`${data.baseUrl}/data-saver/${data.chapter.hash}/${item}`) + '&ref=https://mangadex.org' as string
          }
        })

        )
      )
  }

  getChapter(id: string): Observable<CompositionEpisode> {
    const url = isPlatformServer(this.platformId)
      ? environment.mangadexChapter + id
      : this.proxy.proxyUrl(environment.mangadexChapter + id);

    return this.http.get<MdChapterResp>(url)
      .pipe(
        map((data: MdChapterResp) => {
          const mangaId = data.data.relationships.filter(r => r.type == "manga")[0].id ?? null;
          const publisherId = data.data.relationships.filter(r => r.type == "scanlation_group")[0].id ?? null;
          
          return {
            mangaId: mangaId,
            publisher: {
              id: publisherId,
            },
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
    const url = isPlatformServer(this.platformId)
      ? environment.mangadexManga + id
      : this.proxy.proxyUrl(environment.mangadexManga + id);

    return this.http.get<MdMangaResp>(url).pipe(this.nsfwMap())
  }

  nsfwMap() {
    return map((data: MdMangaResp) => {
      const contentRating = data.data.attributes.contentRating;
      return {
        nsfw: (contentRating == "pornographic" || contentRating == "erotica")
      }
    })
  }

  getScanlationGroup(id: string): Observable<CompositionPublisher | undefined> {
    const endpoint = environment.mangadexScanlationGroup + id;
    const url = isPlatformServer(this.platformId) ? endpoint : this.proxy.proxyUrl(endpoint);

    return this.http.get<{ result: string, response: string, data: MdScanlationGroup }>(url)
      .pipe(map(res => {
        const data = res.data;

        return {
          id: data.id,
          name: data.attributes.name,
          description: data.attributes.description,
          site: data.attributes.website ? data.attributes.website : `https://mangadex.org/group/${data.id}`,
        };
      }));

  }


}
