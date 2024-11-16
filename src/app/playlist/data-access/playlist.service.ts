import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { LinkParserService } from '../../link-parser/data-access/link-parser.service';
import { BlankaryLinkParser, ImgurLinkParser, JsonLinkParser, MangadexLinkParser, NhentaiLinkParser, PixivLinkParser, RedditLinkParser, TelegraphLinkParser, YandereParser, ZenkoLinkParser } from '../../link-parser/utils';
import { ComickLinkParser } from '../../link-parser/utils/comick-link-parser';

export interface EpisodeOptionalField {
  episode?: number;
  nsfw?: boolean | undefined;
  mangaId?: string;
  volume?: number;
  chapter?: number;
  part?: number;
  extra?: boolean;
}

export interface EpisodePlaylistItem extends EpisodeOptionalField {
  title: string;
  link: string;
}

export type EpisodePlaylist = Array<EpisodePlaylistItem | string>;

export function isPlaylist(data: any): data is EpisodePlaylist {
  return (
    Array.isArray(data) &&
    data.every((item: EpisodePlaylistItem | string) => {
      return (
        typeof item === 'string' ||
        (typeof item.title === 'string' && typeof item.link === 'string')
      );
    })
  );
}

export interface PlaylistItem extends EpisodeOptionalField {
  id: string;
  site: string;
  title?: string;
}

export type Playlist = PlaylistItem[];

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  playlist: WritableSignal<Playlist> = signal([])

  constructor(private http: HttpClient, public parser: LinkParserService) {
    this.initParser();
  }

  initParser() {
    this.parser.parsers = [];
    this.parser.parsers.push(new ImgurLinkParser)
    this.parser.parsers.push(new MangadexLinkParser)
    this.parser.parsers.push(new TelegraphLinkParser)
    this.parser.parsers.push(new RedditLinkParser)
    this.parser.parsers.push(new ZenkoLinkParser)
    this.parser.parsers.push(new NhentaiLinkParser)
    this.parser.parsers.push(new ComickLinkParser)
    this.parser.parsers.push(new YandereParser)
    this.parser.parsers.push(new PixivLinkParser)
    this.parser.parsers.push(new BlankaryLinkParser)
    this.parser.parsers.push(new JsonLinkParser)
  }

  getPlaylist(url: string): Observable<EpisodePlaylist> {
    return this.http.get<EpisodePlaylist>(url)
      .pipe(
        tap(data => { if (!isPlaylist(data)) throw new Error() }),
        catchError(error => throwError(() => error))
      );
  }


  resetPlaylist() {
    this.playlist.set([])
  }

  setPlaylist(episodePl: EpisodePlaylist) {
    const res: Playlist = episodePl.map((v: string | EpisodePlaylistItem): PlaylistItem => {
      if (typeof v == 'string') {
        const foo = this.parser.parse(v)

        return {
          id: foo?.id ?? "",
          site: foo?.site ?? "",
        }
      } else {
        const foo = this.parser.parse(v.link)

        return {
          id: foo?.id ?? "",
          site: foo?.site ?? "",

          episode: v.episode,
          nsfw: v.nsfw,
          mangaId: v.mangaId,
          volume: v.volume,
          chapter: v.chapter,
          part: v.part,
          extra: v.extra,
          title: v.title
        }
      }
    }).filter(v => v.id && v.site);

    this.playlist.set(res)
  }
}
