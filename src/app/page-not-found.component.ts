import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <app-text-embracer [text]="'4😵4'"/>
    <h1><a [routerLink]="'/'">🏠</a></h1>
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
      font-family: 'Rampart One', sans-serif;
      font-size: clamp(1rem, 8vw, 5rem);
      @media (max-aspect-ratio: 1) or (max-width: 640px)  {
          font-size: clamp(1rem, 10vw, 8rem);
      }
    }
  `
})
export class PageNotFoundComponent {

}
