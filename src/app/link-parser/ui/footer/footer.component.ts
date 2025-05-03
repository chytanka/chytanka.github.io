import { Component, inject } from '@angular/core';
import { LangService } from '../../../shared/data-access/lang.service';
import { environment } from '../../../../environments/environment';

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
    link: "//bsky.app/profile/chytanka.ink",
    logoSrc: "/assets/logos/bsky-logo.svg"
  },
  {
    alt: "X",
    link: "//x.com/chytanka_ink",
    logoSrc: "//x.com/favicon.ico"
  },
  {
    alt: "TikTok",
    link: "//tiktok.com/@chytanka.ink",
    logoSrc: "//tiktok.com/favicon.ico"
  }
];

@Component({
    selector: 'lp-footer',
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
    standalone: false
})
export class FooterComponent {
  public readonly version: string = environment.version
  public lang: LangService = inject(LangService);

  public social: any[] = SOCIAL_LINKS;
}
