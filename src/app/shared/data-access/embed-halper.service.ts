import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmbedHalperService {

  isEmbedded = signal(window.top !== window)

  constructor() { }

  postMessage(message: any, type: string, targetOrigin: string = "*") {
    if (!window.top) return

    const msg = { type, message }

    window.top.postMessage(msg, targetOrigin);

    return msg;
  }
}
