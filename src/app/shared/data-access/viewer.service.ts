import { Injectable } from '@angular/core';

export interface ViewModeOption {
  dir: "rtl" | "ltr";
  mode: "pages" | "long"
  title: string;
  code: string;
  emoji: string;
}

export const VIEV_MODE_OPTIONS: ViewModeOption[] = [
  { dir: "rtl", mode: "pages", title: "Scroll left", code: "", emoji: "⬅️" },
  { dir: "ltr", mode: "pages", title: "Scroll right", code: "", emoji: "➡️" },
  { dir: "ltr", mode: "long", title: "Scroll down", code: "", emoji: "⬇️" },
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
