import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, WritableSignal, inject, signal } from '@angular/core';

export interface ViewModeOption {
  dir: "rtl" | "ltr";
  mode: "pages" | "long"
  code: string;
  emoji: string;
  hintPhraceKey: string;
}

export const VIEV_MODE_OPTIONS: ViewModeOption[] = [
  { dir: "rtl", mode: "pages", hintPhraceKey: "scrollLeft", code: "1", emoji: "⬅️" },
  { dir: "ltr", mode: "pages", hintPhraceKey: "scrollRight", code: "2", emoji: "➡️" },
  { dir: "ltr", mode: "long", hintPhraceKey: "scrollDown", code: "3", emoji: "⬇️" },
]

const VIEW_MODE_OPT_NAME = `viewModeOption`;

@Injectable({
  providedIn: 'root'
})
export class ViewerService {
  public viewModeOptions = VIEV_MODE_OPTIONS;
  platformId = inject(PLATFORM_ID)

  public viewModeOption: WritableSignal<ViewModeOption> = signal(VIEV_MODE_OPTIONS[0]);

  nightlight: WritableSignal<number> = signal(0);

  keyboard: boolean = (navigator as any).keyboard;

  constructor() {
    this.initNightlight();
    this.initViewModeOption();
  }

  initNightlight() {
    if(!isPlatformBrowser(this.platformId)) return;
    
    const n = Number(localStorage.getItem('nightlight')) ?? 0;
    this.nightlight.set(n);
  }

  setNightlight(n: number) {
    if(!isPlatformBrowser(this.platformId)) return;
    
    this.nightlight.set(n);
    localStorage.setItem('nightlight', n.toString())
  }

  initViewModeOption() {
    const localOpt: ViewModeOption = JSON.parse(localStorage?.getItem(VIEW_MODE_OPT_NAME) ?? '{}');
    const opt: ViewModeOption = this.getViewModeOptionByCode(localOpt?.code) ?? VIEV_MODE_OPTIONS[0]
    this.setViewModeOption(opt);
  }

  setViewModeOption(opt: ViewModeOption) {
    this.viewModeOption.set(opt);
  }

  saveViewModeOption() {
    localStorage.setItem(VIEW_MODE_OPT_NAME, JSON.stringify(this.viewModeOption()))
  }

  getViewModeOptionByCode(code: string) {
    return VIEV_MODE_OPTIONS.filter(o => o.code == code)[0]
  }

  setViewModeOptionByCode(code: string) {
    const opt: ViewModeOption = this.getViewModeOptionByCode(code);

    if (!opt) return;

    this.setViewModeOption(opt);
  }
}
