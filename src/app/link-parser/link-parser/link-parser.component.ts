import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { LangService } from '../../shared/data-access/lang.service';
import { MetaTagsService } from '../../shared/data-access/meta-tags.service';
import { LinkParserService } from '../data-access/link-parser.service';
import { LinkParserSettingsService } from '../data-access/link-parser-settings.service';
import { FileService } from '../../file/data-access/file.service';
import { ThemeService } from '../../shared/data-access/theme.service';

@Component({
  selector: 'app-link-parser',
  templateUrl: './link-parser.component.html',
  styleUrls: [
    './link-parser.component.scss',
    './link-parser.dual-screen.component.scss',
    './themes/pride.scss',
    './themes/halloween.scss',
    './themes/newyear.scss',
    './themes/valentine.scss'
  ],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'this.theme.theme()'
  }
})
export class LinkParserComponent {
  private meta: MetaTagsService = inject(MetaTagsService);
  private lang: LangService = inject(LangService)
  public parser: LinkParserService = inject(LinkParserService)
  public setts = inject(LinkParserSettingsService)
  public file = inject(FileService)
  protected theme = inject(ThemeService);

  constructor() {
    effect(() => {
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
