import { Component, WritableSignal, signal } from '@angular/core';
import { LangService } from './shared/data-access/lang.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  constructor(public lang: LangService, private route: ActivatedRoute) {
    this.lang.updateManifest()
    this.lang.updateTranslate()
  }

  ngOnInit() {
    this.route.pathFromRoot[0].queryParams.subscribe(q => {
      const l = q['lang']
      if (l && this.lang.manifests.has(l)) {
        this.lang.setLang(l)
        this.lang.updateManifest()
      }
    })
  }
}
