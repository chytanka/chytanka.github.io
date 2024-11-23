import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'made-in-ukraine',
    template: `<span style="color: #4c95fb;">Made©in</span>
  <span class="uk">Ukraine</span>`,
    styles: [`
    :host {
      font-weight: bold;
      font-size: x-small;
      font-family: 'Courier New', Courier, monospace;
      display: grid;
      text-transform: uppercase;
      opacity: .4;
      transition: opacity var(--t) ease-in-out;
      @media (prefers-color-scheme: light) {
        opacity: .64;
        }
      &:hover {
          opacity: 1;
          cursor: none;
      }
      .uk {
        color: #FFDD00;
        @media (prefers-color-scheme: light) {
            color: #cfb500
        }
      }
    } 
  `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class MadeInUkraineComponent {

}
// ♆