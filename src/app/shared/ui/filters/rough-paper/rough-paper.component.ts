import { Component, input } from '@angular/core';

@Component({
  selector: 'fx-rough-paper',
  imports: [],
  template: `<svg>
    <filter id='roughpaper'>
        <!-- <feTurbulence type="fractalNoise" [attr.baseFrequency]="baseFrequency()" result='noise' [attr.numOctaves]="numOctaves()" />

        <feDiffuseLighting result="rough" in='noise' [attr.lighting-color]='lightingColor()' surfaceScale='2' diffuseConstant="1">
            <feDistantLight [attr.azimuth]='azimuth()' [attr.elevation]='elevation()' />
        </feDiffuseLighting>

        <feComposite in="rough" in2="SourceGraphic" operator="arithmetic" k1="1" k2="0" k3="0" k4="0"/> -->

        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="texture" />
        <feDisplacementMap in="SourceGraphic" in2="texture" scale="10" xChannelSelector="R" yChannelSelector="G" />
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
export class RoughPaperComponent {
  baseFrequency = input<number>(0.04)
  numOctaves = input<number>(5)
  azimuth = input<number>(45)
  elevation = input<number>(100)
  lightingColor = input<string>("#ffffff")
}
