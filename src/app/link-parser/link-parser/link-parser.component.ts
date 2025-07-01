import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LangService } from '../../shared/data-access/lang.service';
import { MetaTagsService } from '../../shared/data-access/meta-tags.service';
import { LinkParserService } from '../data-access/link-parser.service';
import { LinkParserSettingsService } from '../data-access/link-parser-settings.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-link-parser',
  templateUrl: './link-parser.component.html',
  styleUrls: [
    './link-parser.component.scss',
    './link-parser.dual-screen.component.scss'
  ],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'this.setts.theme()'
  }
})
export class LinkParserComponent {
  private meta: MetaTagsService = inject(MetaTagsService);
  private lang: LangService = inject(LangService)
  public parser: LinkParserService = inject(LinkParserService)
  public setts = inject(LinkParserSettingsService)

  constructor() { }

  ngOnInit() {
    // this.initMeta()
    this.lang.langChanged$.pipe(take(1)).subscribe(() => {
      this.initMeta()
    });
  }

  initMeta() {
    this.meta.setOg()
    this.meta.setTwiter()
    this.meta.setTitle(this.lang.ph().title)
    this.meta.setDesc(this.lang.ph().description)
    this.meta.setMetaImage('https://chytanka.ink/assets/og_image.png')
  }

}
