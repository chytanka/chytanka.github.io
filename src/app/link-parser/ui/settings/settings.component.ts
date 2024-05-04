import { Component, WritableSignal, effect, inject, signal } from '@angular/core';
import { LinkParserSettingsService } from '../../data-access/link-parser-settings.service';
import { LangService } from '../../../shared/data-access/lang.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  setts = inject(LinkParserSettingsService)
  lang = inject(LangService)


  getLangValue(lang: string) {
    return this.lang.langOpt.filter((opt: any) => opt.code == lang)[0]
  }

  setAutoPasteLink(e: Event) {
    this.setts.setAutoPasteLink((e.target as HTMLInputElement).checked)
  }

}
