import { computed, inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { ToggleBarOption } from '../ui/toggle-bar';
import { DOCUMENT, isPlatformServer } from '@angular/common';

export const DISPLAY_MODES = ['softmode', 'truemode'];
const NAME_DISPLAY_MODE = 'displayMode';
const NAME_SEASONAL_THEME = 'seasonalTheme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID)

  constructor() {
    this.initDisplayMode()
    this.initSeasonalTheme()
  }

  //#region Display Mode

  displayMode!: WritableSignal<string>;
  private _lightMetaElement = signal(this.document.querySelector('meta[name="theme-color"][media="(prefers-color-scheme: light)"]') as HTMLMetaElement);
  private _darkMetaElement = signal(this.document.querySelector('meta[name="theme-color"][media="(prefers-color-scheme: dark)"]') as HTMLMetaElement);

  readonly displayModeOptions: ToggleBarOption<string>[] = [
    { value: 'true', emoji: '👑', label: 'trueMode' },
    { value: 'soft', emoji: '🧸', label: 'softMode' }
  ]

  readonly displayModeMetaThemeColors: Record<string, { light: string, dark: string }> = {
    'soft': { light: '#166496', dark: '#002741' },
    'true': { light: '#ffffff', dark: '#000000' }
  }

  private initDisplayMode() {
    if (isPlatformServer(this.platformId)) return;

    const n = localStorage.getItem(NAME_DISPLAY_MODE) === null ? 'soft' : localStorage.getItem(NAME_DISPLAY_MODE) as string;
    this.displayMode = signal(n);
    this.setDisplayMode(n);
  }

  private setMetaThemeColors(mode: string) {
    const colors = this.displayModeMetaThemeColors[mode];
    if (!colors) return;

    if (this._lightMetaElement()) this._lightMetaElement()!.content = colors.light;
    if (this._darkMetaElement()) this._darkMetaElement()!.content = colors.dark;
  }

  setDisplayMode(n: string) {
    if (isPlatformServer(this.platformId)) return;

    this.displayMode.update(v => n);
    localStorage.setItem(NAME_DISPLAY_MODE, n)

    this.setMetaThemeColors(n);
  }

  //#endregion

  //#region Seasonal Theme
  seasonalTheme: WritableSignal<boolean> = signal(false);

  private initSeasonalTheme() {
    if (isPlatformServer(this.platformId)) return;

    const n = localStorage.getItem(NAME_SEASONAL_THEME) === null ? true : Boolean(localStorage.getItem(NAME_SEASONAL_THEME) == 'true');
    this.seasonalTheme.set(n);
    this.setSeasonalTheme(n);
  }

  setSeasonalTheme(n: boolean) {
    if (isPlatformServer(this.platformId)) return;

    this.seasonalTheme.set(n);
    localStorage.setItem(NAME_SEASONAL_THEME, n.toString())
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
  //#endregion
}
