import { Component, HostListener, PLATFORM_ID, WritableSignal, effect, inject, signal } from '@angular/core';
import { LangService } from './shared/data-access/lang.service';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { environment } from '../environments/environment';
import { DISPLAY_MODES, LinkParserSettingsService } from './link-parser/data-access/link-parser-settings.service';

const SCALE_GAP = 128;

@Component({
  selector: 'chtnk-root',
  template: `<div><router-outlet></router-outlet></div><div><router-outlet name="right"></router-outlet></div>`,
  styles: [``],
  standalone: false
})
export class AppComponent {
  private readonly document = inject(DOCUMENT);
  platformId = inject(PLATFORM_ID)
  setts = inject(LinkParserSettingsService)


  constructor(public lang: LangService, private route: ActivatedRoute) {
    this.lang.updateManifest()
    this.lang.updateTranslate()

    this.route.pathFromRoot[0].queryParams.subscribe(async q => {
      const l = q['lang']

      if (l) {
        this.lang.setLang(l)
      }

      if (l && this.lang.manifests.has(l)) {
        this.lang.updateManifest()
      }
    })

    if (isPlatformBrowser(this.platformId) && window.console && environment.prod) {
      const msg = `What are you looking for here? The plot twist is in the next volume!`
      console.log(`%c${msg}`, "background-color: #166496; color: #ffd60a; font-size: 4rem; font-family:  monospace; padding: 8px 16px");
    }

    effect(() => {
      this.updateDisplayMode();
    });
  }

  ngOnInit() {
    this.initScaleDifference();
    this.updateDisplayMode();
  }

  updateDisplayMode() {
    if (this.setts.displayMode != undefined) {
      for (const mode of DISPLAY_MODES) {
        this.document.documentElement.classList.remove(mode);
      }
      this.document.documentElement.classList.add(this.setts.displayMode() + 'mode');

    }

  }

  @HostListener('window:resize')
  initScaleDifference() {
    const w = this.document.documentElement.clientWidth;
    const h = this.document.documentElement.clientHeight;
    const scalex = 1 - ((w - SCALE_GAP) / w)
    const scaley = 1 - ((h - SCALE_GAP) / h)

    this.document.documentElement.style.setProperty('--scale-diff-x', scalex.toString())
    this.document.documentElement.style.setProperty('--scale-diff-y', scaley.toString())
  }
}
