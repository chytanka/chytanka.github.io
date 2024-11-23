import { Component, HostListener, PLATFORM_ID, WritableSignal, inject, signal } from '@angular/core';
import { LangService } from './shared/data-access/lang.service';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

const SCALE_GAP = 128;

@Component({
    selector: 'app-root',
    template: `<div><router-outlet></router-outlet></div><div><router-outlet name="right"></router-outlet></div>`,
    styles: [`
    // :host {
    //   display: flex;
    // }
    `],
    standalone: false
})
export class AppComponent {
  platformId = inject(PLATFORM_ID)
  constructor(public lang: LangService, private route: ActivatedRoute) {
    this.lang.updateManifest()
    this.lang.updateTranslate()

    if (isPlatformBrowser(this.platformId) && window.console) {
      const msg = `What are you looking for here? The plot twist is in the next volume!`
      console.log(`%c${msg}`,  "background-color: #166496; color: #ffd60a; font-size: 4rem; font-family:  monospace; padding: 8px 16px");
  }
  }

  ngOnInit() {
    this.initScaleDifference();

    this.route.pathFromRoot[0].queryParams.subscribe(q => {
      const l = q['lang']
      if (l && this.lang.manifests.has(l)) {
        this.lang.setLang(l)
        this.lang.updateManifest()
      }
    })
  }

  private readonly document = inject(DOCUMENT);

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
