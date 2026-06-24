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

    const tgWebAppStartParam = new URLSearchParams(location.search).get('tgWebAppStartParam');

    if (tgWebAppStartParam) {
      const rp = tgWebAppStartParam.split('-');

      if (rp[0] && rp[1]) {
        this.linkFacade.setRedirectParams({
          site: rp[0],
          id: rp[1]
        })
        return 'tgWebAppStartParam';
      }
    }

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