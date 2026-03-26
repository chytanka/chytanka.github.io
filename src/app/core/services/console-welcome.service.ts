import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ConsoleWelcomeService {
  private platformId = inject(PLATFORM_ID);

  show() {
    if (!isPlatformBrowser(this.platformId)) return;
    if (!environment.prod) return;
    if (!window?.console) return;

    const msg = `What are you looking for here? The plot twist is in the next volume!`;

    console.log(
      `%c${msg}`,
      `
      background-color: #166496;
      color: #ffd60a;
      font-size: 4rem;
      font-family: monospace;
      padding: 8px 16px;
      `
    );
  }
}