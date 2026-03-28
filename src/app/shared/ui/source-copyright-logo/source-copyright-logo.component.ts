import { Component, input } from '@angular/core';

@Component({
  selector: 'source-copyright-logo',
  standalone: false,

  templateUrl: './source-copyright-logo.component.html',
  styleUrl: './source-copyright-logo.component.scss'
})
export class SourceCopyrightLogoComponent {
  sourceUrl = input.required<string>();
  sourceImageSrc = input.required<string>();
  sourceName = input.required<string>();
}
