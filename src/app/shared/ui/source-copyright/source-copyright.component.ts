import { Component, inject, input } from '@angular/core';
import { LangService } from '../../data-access';

@Component({
  selector: 'source-copyright',
  standalone: false,

  templateUrl: './source-copyright.component.html',
  styleUrl: './source-copyright.component.scss'
})
export class SourceCopyrightComponent {
  protected lang: LangService = inject(LangService)

  sourceUrl = input.required<string>();
  sourceName = input.required<string>();
}
