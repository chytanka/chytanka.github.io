import { Component } from '@angular/core';

@Component({
  selector: 'made-in-ukraine',
  template: `<span style="color: #4c95fb;">Made in</span>
  <span style="color: #FFDD00;">Ukraine</span>`,
  styles: [`
    :host {
      font-weight: bold;
      font-size: x-small;
      font-family: 'Courier New', Courier, monospace;
      display: grid;
      text-transform: uppercase;
      opacity: .4;
      transition: opacity .25s ease-in-out;

      &:hover {
          opacity: 1;
          cursor: none;
      }
    }
  `]
})
export class MadeInUkraineComponent {

}
