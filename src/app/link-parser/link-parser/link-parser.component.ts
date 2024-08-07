import { Component, Signal, ViewChild, WritableSignal, computed, effect, inject, signal } from '@angular/core';
import { LinkParserService } from '../data-access/link-parser.service';
import { ImgurLinkParser, JsonLinkParser, MangadexLinkParser, RedditLinkParser, TelegraphLinkParser } from '../utils';
import { ActivatedRoute, Router } from '@angular/router';
import { LangService } from '../../shared/data-access/lang.service';
import { Base64 } from '../../shared/utils';
import { Title } from '@angular/platform-browser';
import { LinkParserSettingsService } from '../data-access/link-parser-settings.service';
import { HistoryService } from '../../history/data-access/history.service';
import { DialogComponent } from '../../shared/ui/dialog/dialog.component';

@Component({
  selector: 'app-link-parser',
  templateUrl: './link-parser.component.html',
  styleUrls: [
    './link-parser.component.scss',
    './link-parser.dual-screen.component.scss'
  ]
})
export class LinkParserComponent {
  private title: Title = inject(Title);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  setts = inject(LinkParserSettingsService)

  link: WritableSignal<string> = signal('');
  linkParams: Signal<any> = computed(() => this.parser.parse(this.link()));
  linkParams64: Signal<any> = computed(() => {
    const foo = this.linkParams()
    return {
      site: foo.site,
      id: Base64.toBase64(foo.id)
    };
  });

  constructor(public parser: LinkParserService, public lang: LangService) {
    this.initParser();

    effect(() => {
      this.initTitle()
    })
  }

  initParser() {
    this.parser.parsers = [];
    this.parser.parsers.push(new ImgurLinkParser)
    this.parser.parsers.push(new MangadexLinkParser)
    this.parser.parsers.push(new TelegraphLinkParser)
    this.parser.parsers.push(new RedditLinkParser)
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
    } catch (error) {

    }

    if (!this.linkParams()) { this.link.set('') }
  }

  initTitle() {
    this.title.setTitle(this.lang.ph().title)
  }

  initUrl() {

    const routeParamUrl: string | null = this.route.snapshot.paramMap.get('url');

    if(routeParamUrl) {
      
      this.link.set(routeParamUrl); 

      this.onSubmit();

      return;
    }

    const queryParamUrl: string | null = this.route.snapshot.queryParamMap.get('url');

    // const url: string | null =
    //   this.route.snapshot.queryParamMap.get('url')
    //   ?? this.route.snapshot.paramMap.get('url');

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
    reddit: '//reddit.com/favicon.ico',
    imgur: '//imgur.com/favicon.ico',
    mangadex: '//mangadex.org/favicon.ico',
    telegraph: '//telegra.ph/favicon.ico',
    read: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🗯️</text></svg>'
  }

}
