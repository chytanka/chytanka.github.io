import { Component, ElementRef, HostListener, Signal, ViewChild, WritableSignal, computed, effect, inject, signal } from '@angular/core';
import { LinkParserService } from '../data-access/link-parser.service';
import { ImgurLinkParser, JsonLinkParser, MangadexLinkParser, RedditLinkParser, TelegraphLinkParser } from '../utils';
import { ActivatedRoute, Router } from '@angular/router';
import { LangService } from '../../shared/data-access/lang.service';
import { DomManipulationService, ViewModeOption } from '../../shared/data-access';
import { Base64 } from '../../shared/utils';
import { Title } from '@angular/platform-browser';

const LANG_OPTIONS: ViewModeOption[] = [
  { dir: "rtl", mode: "pages", hintPhraceKey: "english", code: "en", emoji: "🇬🇧" },
  { dir: "ltr", mode: "pages", hintPhraceKey: "ukrainian", code: "uk", emoji: "🇺🇦" }
]
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
  private dm: DomManipulationService = inject(DomManipulationService)

  link: WritableSignal<string> = signal('');
  linkParams: Signal<any> = computed(() => this.parser.parse(this.link()));
  linkParams64: Signal<any> = computed(() => {
    const foo = this.linkParams()
    return {
      site: foo.site,
      id: Base64.toBase64(foo.id)
    };
  });

  langOpt = LANG_OPTIONS

  optLangValue = () => this.langOpt.filter((opt: any) => opt.code == this.lang.lang())[0]

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
      this.initFromclipboard();
    }
  }

  onSubmit() {
    if (!this.linkParams) return;

    const link = `/${this.linkParams().site}/${this.linkParams64().id}`

    this.router.navigateByUrl(link);
  }

  @ViewChild('dialog', { static: true }) dialogRef!: ElementRef;
  dialogElement: WritableSignal<HTMLDialogElement> = signal(document.createElement('dialog'));


  ngAfterViewInit() {
    this.dialogElement.set(this.dialogRef.nativeElement);
  }

  async showHelp() {
    this.dialogElement().showModal()
    // const mutate = () => {
    //   this.dialogElement().showModal()
    // }

    // this.dm.startViewTransition(mutate)
  }

  async closeDialog(event: Event) {
    if (event.target instanceof HTMLDialogElement) {
      const mutate = () => (event.target as HTMLDialogElement).close();

      this.dm.startViewTransition(mutate)
    }

  }

  @HostListener('window:keydown', ["$event"])
  helpHotKey(event: KeyboardEvent) {
    if (event.key === 'F1') {
      event.preventDefault()
      this.showHelp()
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
