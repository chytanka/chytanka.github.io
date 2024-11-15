import { Component, computed, inject, PLATFORM_ID, signal, Signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LangService } from '../../../shared/data-access/lang.service';
import { Base64 } from '../../../shared/utils';
import { LinkParserSettingsService } from '../../data-access/link-parser-settings.service';
import { LinkParserService } from '../../data-access/link-parser.service';
import { ImgurLinkParser, MangadexLinkParser, TelegraphLinkParser, RedditLinkParser, ZenkoLinkParser, NhentaiLinkParser, YandereParser, PixivLinkParser, BlankaryLinkParser, JsonLinkParser } from '../../utils';
import { ComickLinkParser } from '../../utils/comick-link-parser';

@Component({
  selector: 'app-parser-form',
  templateUrl: './parser-form.component.html',
  styleUrl: './parser-form.component.scss'
})
export class ParserFormComponent {
 
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  setts = inject(LinkParserSettingsService)
  platformId = inject(PLATFORM_ID)


  link: WritableSignal<string> = signal('');
  linkParams: Signal<any> = computed(() => this.parser.parse(this.link()));
  linkParams64: Signal<any> = computed(() => {
    const foo = this.linkParams()
    return {
      site: foo.site,
      id: Base64.toBase64(foo.id)
    };
  });

  supportSites = signal([
    "Imgur", 
    "Telegra.ph", 
    "Reddit", 
    "MangaDex", 
    "Zenko", 
    "Comick", 
    "NHentai", 
    "Yandere Pools", 
    "Blankary", 
    "Pixiv"
  ].sort())

  constructor(public parser: LinkParserService, public lang: LangService) {
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

  inputLink(event: Event) {
    const v: string = (event.target as HTMLInputElement).value;

    this.link.set(v)
  }

  ngOnInit() {
    this.initUrl()
  }

  async initFromclipboard() {
    try {
      const text = await navigator.clipboard?.readText()
      this.link.set(text ?? '')
    } catch (error) {}

    if (!this.linkParams()) { this.link.set('') }
  }

  

  initUrl() {

    const routeParamUrl: string | null = this.route.snapshot.paramMap.get('url');

    if (routeParamUrl) {

      this.link.set(routeParamUrl);

      this.onSubmit();

      return;
    }

    const queryParamUrl: string | null = this.route.snapshot.queryParamMap.get('url');
    
    if (queryParamUrl) {
      this.link.set(queryParamUrl ?? '')
    } else {
      if (this.setts.autoPasteLink()) this.initFromclipboard();
    }
  }

  onSubmit() {
    if (!this.linkParams) return;

    const link = `/${this.linkParams().site}/${this.linkParams64().id}`

    this.router.navigateByUrl(link);
  }

  favicons: any = {
    zenko: '//zenko.online/favicon.ico',
    reddit: '//reddit.com/favicon.ico',
    imgur: '//imgur.com/favicon.ico',
    mangadex: '//mangadex.org/favicon.ico',
    telegraph: '//telegra.ph/favicon.ico',
    nhentai: '//nhentai.net/favicon.ico',
    comick: '//comick.io/favicon.ico',
    yandere: '//yande.re/favicon.ico',
    pixiv: '//pixiv.net/favicon.ico',
    blankary: '//blankary.com/favicon.ico',
    read: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🗯️</text></svg>'
  }
}
