import { Component, EffectCleanupRegisterFn, WritableSignal, computed, effect, inject, signal } from '@angular/core';
import { LinkParserService } from '../../link-parser/data-access/link-parser.service';
import { BlankaryLinkParser, ImgurLinkParser, JsonLinkParser, LinkParser, MangadexLinkParser, NhentaiLinkParser, PixivLinkParser, RedditLinkParser, TelegraphLinkParser, YandereParser, ZenkoLinkParser } from '../../link-parser/utils';
import { DomManipulationService } from '../../shared/data-access';
import { LangService } from '../../shared/data-access/lang.service';
import { ComickLinkParser } from '../../link-parser/utils/comick-link-parser';


@Component({
    selector: 'app-list-shell',
    templateUrl: './list-shell.component.html',
    styleUrls: [
        './list-shell.component.scss',
        '../../shared/ui/@styles/input-group.scss'
    ],
    standalone: false
})
export class ListShellComponent {
  public inputValue: WritableSignal<string> = signal<string>('')

  //     signal<string>(`https://telegra.ph/YAk-kozaki-kulіsh-varili-06-28
  // https://telegra.ph/YAk-kozaki-kulіsh-varili-ch2-07-03`);

  listValue = computed(() => this.parseAllUrls(this.inputValue()))

  outputValue = computed(() => this.listValue().map((i: string) => {
    const saved = this.getItem(i);

    const res = {
      link: i,
      title: saved?.title ?? '',
      nsfw: saved?.nsfw ?? false
    }

    if (!saved) this.outputValueCopy.push(res)

    if (saved ?? saved?.link == res.link) {
      saved.title = res.title
      saved.snfw = res.nsfw
    }
    return res
  }))

  outputValueCopy: any[] = [];

  rawJsonLink = signal('');

  public parser: LinkParserService = inject(LinkParserService);
  public domMan: DomManipulationService = inject(DomManipulationService);
  public lang: LangService = inject(LangService);

  urlParser: LinkParser[] = [new JsonLinkParser];
  await: any;
  parseAllUrls(text: string) {
    const matches: any = [];
    this.urlParser.forEach(regex => {

      const origReg = regex.getRegex();
      const reg = (!origReg.global) ? new RegExp(origReg.source, origReg.flags + 'g') : origReg;

      let match;
      while ((match = reg.exec(text)) !== null) {
        matches.push(match[0]);
      }
    });

    return matches;
  }

  getItem(link: string) {
    for (let i = 0; i < this.outputValueCopy.length; i++) {
      const item = this.outputValueCopy[i];
      if (item.link == link) return item;
    }
  }

  constructor() {
    this.initParser();
  }

  firstLink = computed(() => this.listValue()[0] ?? '');
  parsedFirstLink = computed(() => this.parser.parse(this.firstLink() ?? ''))

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

  copy() {
    this.domMan.copyToClipboard(JSON.stringify(this.outputValue()))
  }


  async fetchTitle(url: string) {
    const apiUrl = `https://api.microlink.io?url=${encodeURIComponent(url)}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      return data.data.title;
    } catch (error) {
      console.error('Error fetching title:', error);
      return ''
    }
  }

  async setAutoTitle(url: string, field: any) {
    const t = await this.fetchTitle(url);
    field.title = t
  }

}
