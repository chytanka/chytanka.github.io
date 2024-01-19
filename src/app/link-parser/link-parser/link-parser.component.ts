import { Component, Signal, WritableSignal, computed, signal } from '@angular/core';
import { LinkParserService } from '../data-access/link-parser.service';
import { ImgurLinkParser, MangadexLinkParser } from '../utils';
import { ActivatedRoute , Router} from '@angular/router';

@Component({
  selector: 'app-link-parser',
  templateUrl: './link-parser.component.html',
  styleUrl: './link-parser.component.scss'
})
export class LinkParserComponent {

  link: WritableSignal<string> = signal('');
  linkParams: Signal<any> = computed(() => this.parser.parse(this.link()));


  constructor(private route: ActivatedRoute, private router: Router, public parser: LinkParserService) {
    this.initParser();
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
    const q: string | null = this.route.snapshot.queryParamMap.get('q');

    if (q) {
      this.link.set(q ?? '')
    } else {
      this.initFromclipboard();
    }
  }

  async initFromclipboard() {
    const text = await navigator.clipboard.readText()
    this.link.set(text ?? '')

    if (!this.linkParams()) { this.link.set('') }
  }


  onSubmit() {
    if(!this.linkParams) return;

    const link = `/${this.linkParams().site}/${this.linkParams().id}`

    this.router.navigateByUrl(link);
  }

}
