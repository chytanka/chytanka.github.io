import { Component, inject } from '@angular/core';
import { LangService } from '../../../shared/data-access/lang.service';

const SOCIAL_LINKS: any[] = [
  {
    alt: "Github",
    link: "//github.com/chytanka",
    logoSrc: "/assets/logos/github-logo.svg"
  },
  {
    alt: "Reddit",
    link: "//www.reddit.com/r/chytanka",
    logoSrc: "/assets/logos/reddit-logo.svg"
  },
  {
    alt: "Blue Sky",
    link: "//bsky.app/profile/chytanka.github.io",
    logoSrc: "/assets/logos/bsky-logo.svg"
  }
];

@Component({
  selector: 'lp-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  public readonly version: string = 'v2024.9.19'
  public lang: LangService = inject(LangService);

  public social: any[] = SOCIAL_LINKS;
}
