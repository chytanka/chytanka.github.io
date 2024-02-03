import { Injectable, WritableSignal, signal } from '@angular/core';

export interface ViewModeOption {
  dir: "rtl" | "ltr";
  mode: "pages" | "long"
  code: string;
  emoji: string;
  hintPhraceKey: string;
}

export const VIEV_MODE_OPTIONS: ViewModeOption[] = [
  { dir: "rtl", mode: "pages", hintPhraceKey: "scrollLeft", code: "", emoji: "⬅️" },
  { dir: "ltr", mode: "pages", hintPhraceKey: "scrollRight", code: "", emoji: "➡️" },
  { dir: "ltr", mode: "long", hintPhraceKey: "scrollDown", code: "", emoji: "⬇️" },
]

@Injectable({
  providedIn: 'root'
})
export class ViewerService {
  public viewModeOptions = VIEV_MODE_OPTIONS;

  public viewModeOption = VIEV_MODE_OPTIONS[0];

  nightlight: WritableSignal<number> = signal(0);

  constructor() { 
    this.initNightlight();
    this.initViewModeOption();
  }

  initNightlight() {
    const n = Number(localStorage.getItem('nightlight')) ?? 0;
    this.nightlight.set(n);
  }

  setNightlight(n: number) {
    this.nightlight.set(n);
    localStorage.setItem('nightlight', n.toString())
  }

  initViewModeOption() {
    const localOpt: ViewModeOption = JSON.parse(localStorage.getItem('viewModeOption')?? '{}');
    const opt:ViewModeOption = VIEV_MODE_OPTIONS.filter(o=>(o.dir == localOpt?.dir && o.mode == localOpt?.mode))[0] ?? VIEV_MODE_OPTIONS[0]
    this.viewModeOption = opt;
  }

  setViewModeOption(opt: ViewModeOption) {
    this.viewModeOption = opt;
    localStorage.setItem('viewModeOption', JSON.stringify(opt))
  }
}
