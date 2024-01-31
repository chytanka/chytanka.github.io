import { Injectable } from '@angular/core';

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

  public warm: number = 0;

  constructor() { }

}
