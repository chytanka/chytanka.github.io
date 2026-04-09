import { Injectable, PLATFORM_ID, WritableSignal, inject, signal } from '@angular/core';
import { Phrases } from '../utils/phrases';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { VibrationService } from './vibration.service';
import { LANGUAGE_CONFIG } from './lang.token';

const LANG_STORAGE_NAME = 'lang'

@Injectable({
  providedIn: 'root'
})
export class LangService {
  private readonly document = inject(DOCUMENT);
  private readonly vibro = inject(VibrationService)

  private readonly _platformId = inject(PLATFORM_ID);
  private readonly _config = inject(LANGUAGE_CONFIG);
  private _lang = signal<string>('en');
  private _linkManifestElement = signal(this.document.querySelector('link[rel="manifest"]'))

  public readonly manifests = this._config.manifests;
  public readonly options = this._config.options;
  public readonly defaultLang = this._config.defaultLang;
  public readonly lang = this._lang.asReadonly();
  public readonly ph = signal(new Phrases());

  getTemplate: (phrase: string, value: string) => string = Phrases.getTemplate;

  constructor(private http: HttpClient) {
    const lang = this._initLang();
    this._lang.set(lang);
  }

  setLang(lang: string) {
    this._lang.set(lang)
    this.document.documentElement.lang = lang
    this.updateTranslate();

    if (!isPlatformBrowser(this._platformId)) return;

    localStorage.setItem(LANG_STORAGE_NAME, lang)
    this.vibro.vibrateLangToggle(this._lang())
  }

  updateManifest() {
    this._linkManifestElement()?.setAttribute('href', this.manifests.get(this._lang()) ?? 'manifest.webmanifest');
  }

  updateTranslate() {
    if (this._lang() == 'en') {
      this.ph.set(new Phrases());
      return;
    }

    this.getTranslate(this._lang()).subscribe(data => {
      this.ph.set(data)
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

  private _initLang(): string {
    return (!isPlatformBrowser(this._platformId)) ? this.defaultLang :

      localStorage?.getItem(LANG_STORAGE_NAME) ?? this.defaultLang;
  }
}
