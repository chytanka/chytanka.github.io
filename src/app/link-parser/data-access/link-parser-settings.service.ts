import { isPlatformServer } from '@angular/common';
import { Injectable, PLATFORM_ID, WritableSignal, inject, signal } from '@angular/core';

const NAME_AUTO_PASTE_LINK = 'autoPasteLink';

@Injectable({
  providedIn: 'root'
})
export class LinkParserSettingsService {
  platformId = inject(PLATFORM_ID)

  autoPasteLink!: WritableSignal<boolean>;

  constructor() {
    this.initAutoPasteLink()
  }

  initAutoPasteLink() {
    if (isPlatformServer(this.platformId)) return;

    const n = Boolean(localStorage.getItem(NAME_AUTO_PASTE_LINK) == 'true');
    this.autoPasteLink = signal(n);
  }

  setAutoPasteLink(n: boolean) {
    if (isPlatformServer(this.platformId)) return;

    this.autoPasteLink.set(n);
    localStorage.setItem(NAME_AUTO_PASTE_LINK, n.toString())
  }
}
