import { Component, inject} from '@angular/core';
import { LinkParserSettingsService } from '../../data-access/link-parser-settings.service';
import { LangService } from '../../../shared/data-access/lang.service';
import { FileSettingsService } from '../../../file/data-access/file-settings.service';
import { VibrationService } from '../../../shared/data-access/vibration.service';
import { ToggleBarOption } from '../../../shared/ui/toggle-bar';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  standalone: false
})
export class SettingsComponent {
  setts = inject(LinkParserSettingsService)
  lang = inject(LangService)
  fileSetts = inject(FileSettingsService)
  vibro = inject(VibrationService)


  getLangValue(lang: string) {
    return this.lang.options.filter((opt: ToggleBarOption<string>) => opt.value == lang)[0]
  }

  setAutoPasteLink(e: Event) {
    this.setts.setAutoPasteLink((e.target as HTMLInputElement).checked)
    this.vibro.vibrateForSettings(this.setts.autoPasteLink())
  }

  setSeasonalTheme(e: Event) {
    this.setts.setSeasonalTheme((e.target as HTMLInputElement).checked)
  }

  setSaveFileToHistory(e: Event) {
    this.fileSetts.setSaveFileToHistory((e.target as HTMLInputElement).checked)

    this.vibro.vibrateForSettings(this.fileSetts.saveFileToHistory())
  }

  setCopyFileToHistory(e: Event) {
    this.fileSetts.setCopyFileToHistory((e.target as HTMLInputElement).checked)

    this.vibro.vibrateForSettings(this.fileSetts.copyFileToHistory())
  }

  setRetentionTime(e: Event) {
    this.fileSetts.setRetentionTime(Number((e.target as HTMLInputElement).value))

    this.vibro.vibrate()
  }

  setStorageLimit(e: Event) {
    this.fileSetts.setStorageLimit(Number((e.target as HTMLInputElement).value))

    this.vibro.vibrate()
  }

  setVibration(e: Event) {
    this.vibro.setVibrationOn((e.target as HTMLInputElement).checked)

    this.vibro.vibrateForSettings(this.vibro.vibrationOn())
  }

  vibrateLangToggle(e: string) {
    setTimeout(() => {
      this.vibro.vibrateLangToggle(e)
    }, 0);
  }
}
