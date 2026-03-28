import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, WritableSignal, computed, inject, signal } from '@angular/core';

export const DISPLAY_MODES = ['softmode', 'truemode'];
const NAME_DISPLAY_MODE = 'displayMode';
const NAME_AUTO_PASTE_LINK = 'autoPasteLink';
const NAME_SEASONAL_THEME = 'seasonalTheme';

@Injectable({
  providedIn: 'root'
})
export class LinkParserSettingsService {
  platformId = inject(PLATFORM_ID)

  autoPasteLink!: WritableSignal<boolean>;

  constructor() {
    this.initAutoPasteLink()
    this.initSeasonalTheme()
    this.initDisplayMode()
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

  displayMode!: WritableSignal<string>;

  initDisplayMode() {
    if (!isPlatformBrowser(this.platformId)) return;

    const n = localStorage.getItem(NAME_DISPLAY_MODE) === null ? 'soft' : localStorage.getItem(NAME_DISPLAY_MODE) as string;
    this.displayMode = signal(n);
    this.setDisplayMode(n);
  }

  setDisplayMode(n: string) {
    if (!isPlatformBrowser(this.platformId)) return;

    this.displayMode.update(v => n);
    localStorage.setItem(NAME_DISPLAY_MODE, n)
  }

  /**
   * 
   */
  seasonalTheme: WritableSignal<boolean> = signal(false);

  initSeasonalTheme() {
    if (!isPlatformBrowser(this.platformId)) return;

    const n = localStorage.getItem('seasonalTheme') === null ? true : Boolean(localStorage.getItem('seasonalTheme') == 'true');
    this.seasonalTheme.set(n);
    this.setSeasonalTheme(n);
  }

  setSeasonalTheme(n: boolean) {
    if (!isPlatformBrowser(this.platformId)) return;

    this.seasonalTheme.set(n);
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
