import { Injectable, signal } from '@angular/core';
import { LinkParseResult, LinkParser } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class LinkParserService {

  supportFiles = signal([".zip", ".cbz", ".pdf", ".mobi"])

  supportSites = signal([
    "Imgur",
    "Telegra.ph",
    "Reddit",
    "MangaDex",
    "Zenko",
    "Comick",
    "NHentai",
    "Yandere Pools",
    // "Blankary",
    "Pixiv"
  ].sort())

  parsers: LinkParser[] = [];

  constructor() { }

  parse(link: string): LinkParseResult | null {

    for (let i = 0; i < this.parsers.length; i++) {
      const p = this.parsers[i];

      const res = p.parse(link);

      if (res != null) { return res; }
    }

    return null;
  }
}
