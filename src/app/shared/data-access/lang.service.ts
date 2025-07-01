import { ChangeDetectorRef, Injectable, PLATFORM_ID, WritableSignal, inject, signal } from '@angular/core';
import { Phrases } from '../utils/phrases';
import { Observable, Subject, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ViewModeOption } from './viewer.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { VibrationService } from './vibration.service';

const LANG_OPTIONS: ViewModeOption[] = [
  { dir: "rtl", mode: "pages", hintPhraceKey: "english", code: "en", emoji: "🇬🇧" },
  { dir: "ltr", mode: "pages", hintPhraceKey: "ukrainian", code: "uk", emoji: "🇺🇦" }
]

const DEFAULT_LANG = 'en'
const LANG_STORAGE_NAME = 'lang'


@Injectable({
  providedIn: 'root'
})
export class LangService {
  public readonly manifests = new Map([
    ['en', "manifest.webmanifest"],
    ['uk', "manifest-uk.webmanifest"]
  ]);

  private langChanged = new Subject<void>();
  langChanged$ = this.langChanged.asObservable();

  langOpt = LANG_OPTIONS
  platformId = inject(PLATFORM_ID)
  private readonly document = inject(DOCUMENT);
  vibro = inject(VibrationService)


  lang: WritableSignal<string> = signal(
    (!isPlatformBrowser(this.platformId)) ? DEFAULT_LANG :

      localStorage?.getItem(LANG_STORAGE_NAME) ?? DEFAULT_LANG)
    ;
  linkManifestElement: WritableSignal<HTMLElement | null> = signal(this.document.querySelector('link[rel="manifest"]'))

  ph: WritableSignal<Phrases> = signal(new Phrases());

  getTemplate: (phrase: string, value: string) => string = Phrases.getTemplate;

  constructor(private http: HttpClient) { }

  setLang(lang: string) {
    this.lang.set(lang)
    this.document.documentElement.lang = lang
    this.updateTranslate();
    // this.langChanged.next();

    if (!isPlatformBrowser(this.platformId)) return;

    localStorage.setItem(LANG_STORAGE_NAME, lang)
    this.vibro.vibrateLangToggle(this.lang())
  }

  updateManifest() {
    this.linkManifestElement()?.setAttribute('href', this.manifests.get(this.lang()) ?? 'manifest.webmanifest');
  }

  updateTranslate() {
    if (this.lang() == 'en') {
      this.ph.set(new Phrases());
      this.langChanged.next();
      return;
    }

    this.getTranslate(this.lang()).subscribe(data => {
      this.ph.set(data)
      this.langChanged.next();

    })
  }

  getTranslate(lang: string): Observable<Phrases> {
    return this.http.get<Phrases>(`assets/langs/${lang}.json`).pipe(
      map(data => {
        const ph = new Phrases();
        const keys = Object.keys(ph);

        keys.forEach((key: string) => {
          const translatedValue: string = data[key as keyof Phrases] as string

          if (translatedValue) {
            (ph[key as keyof Phrases] as any) = data[key as keyof Phrases]
          }
        })

        return ph;
      })
    )
  }
}
