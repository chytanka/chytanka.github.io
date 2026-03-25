import { inject, Injectable, PLATFORM_ID, signal, } from '@angular/core';
import { isPlatformServer } from '@angular/common';

export interface BrowserInfo {
  name: string;
  os: string;
  isMobile: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BrowserService {
  private platformId = inject(PLATFORM_ID)

  brouserInfo = signal(this.detectBrowser());

  constructor() { }

  detectBrowser(): BrowserInfo {
    if (isPlatformServer(this.platformId)) return {
      name: 'Unknown',
      os: 'Unknown',
      isMobile: false
    };

    const ua = navigator.userAgent;
    const platform = navigator.platform.toLowerCase();

    const isMobile = /Mobi|Android|iPhone|iPad|iPod|webOS|BlackBerry/i.test(ua);

    let name = 'Unknown';

    if (/Chrome|Chromium/i.test(ua) && !/Edg|OPR/i.test(ua)) {
      name = 'Chromium';
    } else if (/Edg/i.test(ua)) {
      name = 'Edge';
    } else if (/Firefox/i.test(ua)) {
      name = 'Firefox';
    } else if (/Safari/i.test(ua) && !/Chrome|Chromium|OPR|Edg/i.test(ua)) {
      name = 'Safari';
    } else if (/OPR|Opera/i.test(ua)) {
      name = 'Opera';
    }

    let os = 'Unknown';
    if (/Win/i.test(platform)) os = 'Windows';
    else if (/Mac/i.test(platform)) os = 'Mac';
    else if (/Linux/i.test(platform)) os = 'Linux';
    else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS';
    else if (/Android/i.test(ua)) os = 'Android';

    return {
      name,
      os,
      isMobile
    };
  }
}
