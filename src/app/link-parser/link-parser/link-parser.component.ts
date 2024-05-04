import { Component, HostListener, Signal, ViewChild, WritableSignal, computed, effect, inject, signal } from '@angular/core';
import { LinkParserService } from '../data-access/link-parser.service';
import { ImgurLinkParser, JsonLinkParser, MangadexLinkParser, RedditLinkParser, TelegraphLinkParser } from '../utils';
import { ActivatedRoute, Router } from '@angular/router';
import { LangService } from '../../shared/data-access/lang.service';
import { Base64 } from '../../shared/utils';
import { Title } from '@angular/platform-browser';
import { DialogComponent } from '../../shared/ui/dialog/dialog.component';
import { LinkParserSettingsService } from '../data-access/link-parser-settings.service';


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
    this.initHotKeys()
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
    const url: string | null = this.route.snapshot.queryParamMap.get('url');

    if (url) {
      this.link.set(url ?? '')
    } else {
      if(this.setts.autoPasteLink()) this.initFromclipboard();
    }
  }

  onSubmit() {
    if (!this.linkParams) return;

    const link = `/${this.linkParams().site}/${this.linkParams64().id}`

    this.router.navigateByUrl(link);
  }

  @ViewChild('faqDialog') faqDialogComponent!: DialogComponent;
  showHelp = () => this.faqDialogComponent.showDialog();

  @ViewChild('settingsDialog') settingsDialogComponent!: DialogComponent;
  showSettings = () => this.settingsDialogComponent.showDialog();

  hotKeys = new Map<string, Function>()

  initHotKeys() {
    this.hotKeys.set('F1', this.showHelp)
    this.hotKeys.set('F2', this.showSettings)
  }

  @HostListener('window:keydown', ["$event"])
  helpHotKey(event: KeyboardEvent) {
    
    if (this.hotKeys.has(event.key)) {
      event.preventDefault()
      const f: Function = this.hotKeys.get(event.key) as Function;
      f();
    }
  }

  social: any[] = [
    {
      alt: "Github",
      link: "//github.com/chytanka",
      logoSrc: "/assets/logos/github-logo.svg"
    },
    {
      alt: "Reddit",
      link: "//www.reddit.com/r/chytanka",
      logoSrc: "/assets/logos/reddit-logo.svg"
    },
    {
      alt: "Blue Sky",
      link: "//bsky.app/profile/chytanka.github.io",
      logoSrc: "/assets/logos/bsky-logo.svg"
    }
  ]

}
