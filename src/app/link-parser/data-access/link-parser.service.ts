import { Inject, Injectable, signal, Type } from '@angular/core';
import { LinkParseResult, LinkParser } from '../utils';
import { LINK_PARSERS } from './parser.tokens';

@Injectable({
  providedIn: 'root'
})
export class LinkParserService {
  supportSites = signal([
    "Imgur",
    "Telegra.ph",
    "Reddit",
    "MangaDex",
    "Zenko",
    // "Comick",
    "NHentai",
    "Yandere Pools",
    "Imgchest",
    // "Blankary",
    "Pixiv"
  ].sort())

  parsers: LinkParser[] = [];

  constructor(@Inject(LINK_PARSERS) parserClasses: Type<LinkParser>[]) {
    this.parsers = parserClasses.map(Parser => new Parser());
  }

  parse(link: string): LinkParseResult | null {

    for (let i = 0; i < this.parsers.length; i++) {
      const p = this.parsers[i];

      const res = p.parse(link);

      if (res != null) { return res; }
    }

    return null;
  }
}
