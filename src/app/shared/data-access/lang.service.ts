import { Injectable, WritableSignal, signal } from '@angular/core';
import { Phrases } from '../utils/phrases';
import { Observable, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

type Langs = { en: string, uk: string }

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

  lang: WritableSignal<string> = signal(localStorage.getItem(LANG_STORAGE_NAME) ?? DEFAULT_LANG);
  linkManifestElement: WritableSignal<HTMLElement | null> = signal(document.querySelector('link[rel="manifest"]'))

  phrases: Phrases = new Phrases();

  constructor(private http: HttpClient) { }

  setLang(lang: string) {
    this.lang.set(lang)
    document.documentElement.lang = lang
    localStorage.setItem(LANG_STORAGE_NAME, lang)
    this.updateTranslate()
  }

  updateManifest() {
    this.linkManifestElement()?.setAttribute('href', this.manifests.get(this.lang()) ?? 'manifest.webmanifest');
  }

  updateTranslate() {
    if (this.lang() == 'en') { this.phrases = new Phrases(); return; }

    this.getTranslate(this.lang()).subscribe(data =>{
      this.phrases = data
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
