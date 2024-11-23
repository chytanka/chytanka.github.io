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
      --border-color: #166496;
      --border-width: 2px;
      color: #ffd60a;
      margin: auto;
      font-family: 'Troubleside', sans-serif;
      font-size: clamp(1rem, 8vw, 5rem);
      @media (max-aspect-ratio: 1) or (max-width: 640px)  {
          font-size: clamp(1rem, 10vw, 8rem);
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
