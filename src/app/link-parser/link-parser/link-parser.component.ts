import { Component, Signal, WritableSignal, computed, signal } from '@angular/core';
import { LinkParserService } from '../data-access/link-parser.service';
import { ImgurLinkParser, JsonLinkParser, MangadexLinkParser, RedditLinkParser, TelegraphLinkParser } from '../utils';
import { ActivatedRoute , Router} from '@angular/router';
import { LangService } from '../../shared/data-access/lang.service';
import { ViewModeOption } from '../../shared/data-access';
import { Base64 } from '../../shared/utils';

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

  optLangValue = () => this.langOpt.filter((opt: any)=>opt.code == this.lang.lang())[0]

  constructor(private route: ActivatedRoute, private router: Router, public parser: LinkParserService, public lang: LangService) {
    this.initParser();
  //  console.log( this.);
   
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
    const url: string | null = this.route.snapshot.queryParamMap.get('url');

    if (url) {
      this.link.set(url ?? '')
    } else {
      this.initFromclipboard();
    }
  }

  async initFromclipboard() {
    try {
      const text = await navigator.clipboard?.readText()
      this.link.set(text ?? '')
    } catch (error) {
      
    }

    if (!this.linkParams()) { this.link.set('') }
  }


  onSubmit() {
    if(!this.linkParams) return;

    const link = `/${this.linkParams().site}/${this.linkParams64().id}`

    this.router.navigateByUrl(link);
  }

}
