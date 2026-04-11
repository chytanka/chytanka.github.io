import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LangService } from '../../shared/data-access';

@Injectable({
  providedIn: 'root'
})
export class LanguageFacadeService {
  constructor(private lang: LangService) { }

  init(route: ActivatedRoute) {
    this.lang.updateManifest();
    this.lang.updateTranslate();

    route.queryParams.subscribe(q => {
      const l = q['lang'];

      if (l == this.lang.lang()) return;

      if (l) this.lang.setLang(l);
      if (l && this.lang.manifests.has(l)) {
        this.lang.updateManifest();
      }
    });
  }
}
