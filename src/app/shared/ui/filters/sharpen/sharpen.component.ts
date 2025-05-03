import { Component } from '@angular/core';

@Component({
  selector: 'fx-sharpen',
  imports: [],
  template: `
  <svg xmlns="http://www.w3.org/2000/svg">
    <filter id="sharpen" x="-20%" y="-20%" width="140%" height="140%" >
    <feConvolveMatrix order="3" preserveAlpha="true" kernelMatrix="1 -1 1 -1 -1 -1 1 -1 1"/>
    </filter>
	</svg>`,
  styles: `
    svg {
      position: fixed;
      user-select: none;
      pointer-events: none;
      width: 0;
      height: 0;
      z-index: -1;
    }
  `
})
export class SharpenComponent {

}
