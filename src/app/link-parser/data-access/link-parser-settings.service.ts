import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, WritableSignal, inject, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LinkParserSettingsService {
  autoPasteLink: WritableSignal<boolean> = signal(false);
  platformId = inject(PLATFORM_ID)

  constructor() {
    this.initAutoPasteLink()
  }

  initAutoPasteLink() {
    if(!isPlatformBrowser(this.platformId)) return;

    const n = Boolean(localStorage.getItem('autoPasteLink') == 'true');
    this.autoPasteLink.set(n);
  }

  setAutoPasteLink(n: boolean) {
    if(!isPlatformBrowser(this.platformId)) return;
    
    this.autoPasteLink.set(n);
    localStorage.setItem('autoPasteLink', n.toString())
  }
}
