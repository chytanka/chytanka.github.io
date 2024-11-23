import { Component, inject } from '@angular/core';
import { LangService } from '../../shared/data-access/lang.service';
import { MetaTagsService } from '../../shared/data-access/meta-tags.service';

@Component({
    selector: 'app-link-parser',
    templateUrl: './link-parser.component.html',
    styleUrls: [
        './link-parser.component.scss',
        './link-parser.dual-screen.component.scss'
    ],
    standalone: false
})
export class LinkParserComponent {
  private meta: MetaTagsService = inject(MetaTagsService);
  private lang: LangService = inject(LangService)

  /**
   *
   */
  constructor() {
    this.initMeta()
  }
  initMeta() {
    this.meta.setOg()
    this.meta.setTwiter()
    this.meta.setTitle(this.lang.ph().title)
    this.meta.setDesc(this.lang.ph().description)
    this.meta.setMetaImage('https://chytanka.ink/assets/og_image.png')
  }

}
