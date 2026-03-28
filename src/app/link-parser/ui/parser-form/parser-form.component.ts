import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LangService } from '../../../shared/data-access/lang.service';
import { FileNetFacade, LinkInitFacade, LinkParserFacade, NavigationFacade } from './facades';

@Component({
  selector: 'app-parser-form',
  templateUrl: './parser-form.component.html',
  styleUrl: './parser-form.component.scss',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParserFormComponent {
  protected lang = inject(LangService);
  protected linkFacade = inject(LinkParserFacade);
  protected navFacade = inject(NavigationFacade);
  protected fileNetFacade = inject(FileNetFacade);
  protected linkInit = inject(LinkInitFacade);

  ngOnInit() {
    this.linkFacade.setLink('');
    this.linkInit.init().then(source => {
      if (source === 'route') {
        this.navFacade.goToParsedLink();
      }
    });
  }
}
