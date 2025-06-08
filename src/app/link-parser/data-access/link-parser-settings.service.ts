import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, WritableSignal, computed, inject, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LinkParserSettingsService {
  platformId = inject(PLATFORM_ID)

  autoPasteLink!: WritableSignal<boolean>;

  constructor() {
    this.initAutoPasteLink()
    this.initSeasonalTheme()
  }

  initAutoPasteLink() {
    if (!isPlatformBrowser(this.platformId)) return;

    const n = Boolean(localStorage.getItem('autoPasteLink') == 'true');
    this.autoPasteLink = signal(n);
  }

  setAutoPasteLink(n: boolean) {
    if (!isPlatformBrowser(this.platformId)) return;

    this.autoPasteLink.set(n);
    localStorage.setItem('autoPasteLink', n.toString())
  }

  /**
   * 
   */
  seasonalTheme!: WritableSignal<boolean>;

  initSeasonalTheme() {
    if (!isPlatformBrowser(this.platformId)) return;

    const n = localStorage.getItem('seasonalTheme') === null ? true : Boolean(localStorage.getItem('seasonalTheme') == 'true');
    this.seasonalTheme = signal(n);
    this.setSeasonalTheme(n);
  }

  setSeasonalTheme(n: boolean) {
    if (!isPlatformBrowser(this.platformId)) return;

    this.seasonalTheme.update(v => n);
    localStorage.setItem('seasonalTheme', n.toString())
  }

  getSeasonalTheme(): string {
    const now = new Date();
    const month = now.getMonth(); // 0-11
    const day = now.getDate();

    if (month === 5) return 'pride'; // June
    if (month === 9 && day > 15) return 'halloween'; // second half of Oct
    if (month === 11 || (month === 0 && day < 10)) return 'newyear';
    if (month === 1 && day <= 15) return 'valentine';
    return 'default';
  }

  theme = computed(() => {
    if (!this.seasonalTheme) return '';
    return this.seasonalTheme() ? this.getSeasonalTheme() : ''
  })
}
