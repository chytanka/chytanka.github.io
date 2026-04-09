import { Injectable, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LinkParserSettingsService } from '../../../data-access/link-parser-settings.service';
import { LinkParserFacade } from './link-parser.facade';

@Injectable()
export class LinkInitFacade {
  private route = inject(ActivatedRoute);
  public setts = inject(LinkParserSettingsService);
  private linkFacade = inject(LinkParserFacade);

  async init() {
    const routeUrl = this.route.root.firstChild?.snapshot.params['url'];
    const queryUrl = this.route.root.firstChild?.snapshot.queryParamMap.get('url');

    if (routeUrl) {
      this.linkFacade.setLink(routeUrl);
      return 'route';
    }

    if (queryUrl) {
      this.linkFacade.setLink(queryUrl);
      return 'query';
    }

    if (this.setts.autoPasteLink && this.setts.autoPasteLink()) {
      try {
        const text = await navigator.clipboard.readText();
        this.linkFacade.setLink(text ?? '');
        if (!this.linkFacade.linkParams()) this.linkFacade.clear();
        return 'clipboard';
      } catch {
        return 'none';
      }
    }

    return 'none';
  }
}