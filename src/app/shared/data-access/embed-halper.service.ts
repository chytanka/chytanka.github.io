import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmbedHalperService {

  platformId = inject(PLATFORM_ID)

  isEmbedded = signal(isPlatformBrowser(this.platformId) && window.top !== window)

  constructor() { }

  postMessage(message: any, type: string, targetOrigin: string = "*") {
    if (!isPlatformBrowser(this.platformId) || !window.top) return

    const msg = { type, message }

    window.top.postMessage(msg, targetOrigin);

    return msg;
  }
}
