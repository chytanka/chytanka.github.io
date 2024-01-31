import { Component, Signal, WritableSignal, computed, signal } from '@angular/core';
import { LinkParserService } from '../data-access/link-parser.service';
import { ImgurLinkParser, MangadexLinkParser } from '../utils';
import { ActivatedRoute , Router} from '@angular/router';
import { LangService } from '../../shared/data-access/lang.service';
import { ViewModeOption } from '../../shared/data-access';

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

  langOpt = LANG_OPTIONS

  optLangValue = () => this.langOpt.filter((opt: any)=>opt.code == this.lang.lang())[0]

  constructor(private route: ActivatedRoute, private router: Router, public parser: LinkParserService, public lang: LangService) {
    this.initParser();
  //  console.log( this.);
   
  }

  initParser() {
    this.parser.parsers.push(new ImgurLinkParser)
    this.parser.parsers.push(new MangadexLinkParser)
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
    const text = await navigator.clipboard?.readText()
    this.link.set(text ?? '')

    if (!this.linkParams()) { this.link.set('') }
  }


  onSubmit() {
    if(!this.linkParams) return;

    const link = `/${this.linkParams().site}/${this.linkParams().id}`

    this.router.navigateByUrl(link);
  }

}
