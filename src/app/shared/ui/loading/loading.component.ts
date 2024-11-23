import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LangService } from '../../data-access/lang.service';

@Component({
    selector: 'loading',
    template: `<p><span>⏳</span> {{lang.ph().loading}}...</p>`,
    styles: [`
    :host {
      position: fixed;
      inset: 0;
      display: grid; 
      text-align: center;
      place-content: center; 
      width: min(50vw, 50vh); 
      margin: auto; 
      aspect-ratio: 1;
      z-index: 100;
      backdrop-filter: blur(1ch);
    }
    span {
      display: inline-block;
      animation-duration: 5s;
  animation-name: flip;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
    }
    @keyframes flip {
  from { transform: rotate(0deg); }
  25% { transform:  rotate(180deg); }
  50% { transform:  rotate(180deg); }
  75% { transform:  rotate(360deg); }
  to { transform:  rotate(360deg); }
}
    `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class LoadingComponent {
  lang = inject(LangService)
}
