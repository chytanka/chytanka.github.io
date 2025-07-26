import { Component, computed, inject, PLATFORM_ID } from '@angular/core';
import { LangService } from './shared/data-access/lang.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-page-not-found',
  template: `
    <app-text-embracer [text]="'4😵4'"/>
    <h1>{{selectedMessage()}} <br> <a [routerLink]="'/'">🏠</a></h1>
  `,
  styles: `
    :host {
      display: grid;
      min-height: 100dvh;
      place-content: center;
      text-align: center;
    }
    app-text-embracer {
    --mono-color-1: #4c93c8;
    --mono-color-2: #002741;
    --border-color: var(--mono-color-1);
    --border-width: 2px;
    color: #ffd60a;
    font-family: 'Troubleside', sans-serif;
    font-weight: 900;
    font-size: clamp(1rem, 16vw, 10rem);
    justify-content: center;
    -webkit-text-stroke: var(--mono-color-2) var(--border-width);
    --dot-color: var(--mono-color-1);
    paint-order: stroke fill;

    @media (prefers-color-scheme: light) {
        --mono-color-1: #166496;
        --mono-color-2: #eceff2;
        color: var(--mono-color-1);
        -webkit-text-stroke: var(--mono-color-1) var(--border-width);

        color: var(--mono-color-2);
    }

    @media (max-width: 1080px) {
        font-size: clamp(1rem, 14vw, 16rem);
    }

    @media ((orientation: portrait) and (max-aspect-ratio: 1)) {
        font-size: clamp(1rem, 20vw, 16rem);
    }
}
  `,
  standalone: false
})
export class PageNotFoundComponent {
  platformId = inject(PLATFORM_ID)
  lang = inject(LangService)

  selectedMessage = computed(() => this.getRandomMessage())

  getRandomMessage(): string {
    const m = this.lang.ph().pageNotFound;
    const randomIndex = Math.floor(Math.random() * m.length);
    return m[randomIndex];
  }
}
