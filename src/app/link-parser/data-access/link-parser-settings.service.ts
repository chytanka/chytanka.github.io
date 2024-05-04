import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LinkParserSettingsService {
  autoPasteLink: WritableSignal<boolean> = signal(false);

  constructor() {
    this.initAutoPasteLink()
  }

  initAutoPasteLink() {
    const n = Boolean(localStorage.getItem('autoPasteLink') == 'true') ?? false;
    this.autoPasteLink.set(n);
  }

  setAutoPasteLink(n: boolean) {
    this.autoPasteLink.set(n);
    localStorage.setItem('autoPasteLink', n.toString())
  }
}
