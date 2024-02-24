import { Component, inject } from '@angular/core';
import { LangService } from '../../../shared/data-access/lang.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  public lang = inject(LangService)

  gistLinkHref: string = `<a href="//gist.github.com" target="_blank" rel="noopener noreferrer">Github Gist</a>`
}
