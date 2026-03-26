// link-parser.facade.ts
import { Injectable, computed, signal, Signal } from '@angular/core';
import { LinkParserService } from '../../../data-access/link-parser.service';
import { Base64 } from '../../../../shared/utils';
import { LinkParseResult } from '../../../utils';

const FAVICONS: Map<string, string> = new Map([
  ['zenko', '//zenko.online/favicon.ico'],
  ['reddit', '//reddit.com/favicon.ico'],
  ['imgur', '//imgur.com/favicon.ico'],
  ['mangadex', '//mangadex.org/favicon.ico'],
  ['telegraph', '//telegra.ph/favicon.ico'],
  ['nhentai', '//nhentai.net/favicon.ico'],
  ['yandere', '//yande.re/favicon.ico'],
  ['pixiv', '//pixiv.net/favicon.ico'],
  ['imgchest', '//imgchest.com/assets/img/favicons/favicon-32x32.png?v=2'],
  ['read', 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🗯️</text></svg>']
]);

@Injectable()
export class LinkParserFacade {
  constructor(private parser: LinkParserService) { }

  readonly link = signal('');

  readonly linkParams: Signal<LinkParseResult | null> = computed(() =>
    this.parser.parse(this.link())
  );

  readonly linkData = computed(() => {
    const params = this.linkParams();
    if (!params) return null;

    return {
      site: params.site,
      id: params.id,
      id64: Base64.toBase64(params.id),
      favicon: FAVICONS.get(params.site)
    };
  });

  setLink(value: string) {
    this.link.set(value);
  }

  inputLink(event: Event) {
    const v: string = (event.target as HTMLInputElement).value;

    this.setLink(v)
  }

  clear() {
    this.setLink('');
  }
}