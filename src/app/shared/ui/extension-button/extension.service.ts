import { inject, Injectable, signal } from '@angular/core';
import { BrowserService } from '../../data-access';

@Injectable({
  providedIn: 'root'
})
export class ExtensionService {
  isInstalled = signal<boolean | null>(null);

  brawser = inject(BrowserService);

  // Chrome + Edge ID
  private EXT_IDS = [
    'nfmpooealaccocijodheenpfmndpiake', // Chrome
    'jneiemmgkdnlighokokpgknglniiebmc',  // Edge
  ];

  readonly links = new Map<string, string>([
    ['chrome', 'https://chromewebstore.google.com/detail/chytanka-helper/nfmpooealaccocijodheenpfmndpiake'],
    ['opera', 'https://chromewebstore.google.com/detail/chytanka-helper/nfmpooealaccocijodheenpfmndpiake'],
    ['edge', 'https://microsoftedge.microsoft.com/addons/detail/jneiemmgkdnlighokokpgknglniiebmc']
  ]);


  async detectExtension() {
    for (const id of this.EXT_IDS) {
      try {
        const res = await fetch(`chrome-extension://${id}/installed.json`, {
          method: 'GET',
        });

        if (res.ok) {
          this.isInstalled.set(true);
          return;
        }
      } catch (e) {
        // ignore
      }
    }

    this.isInstalled.set(false);
  }

  installChrome() {
    window.open(
      'https://chromewebstore.google.com/detail/chytanka-helper/nfmpooealaccocijodheenpfmndpiake',
      '_blank'
    );
  }

  installEdge() {
    window.open(
      'https://microsoftedge.microsoft.com/addons/detail/jneiemmgkdnlighokokpgknglniiebmc',
      '_blank'
    );
  }
}
