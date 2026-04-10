import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LinkParserSettingsService } from '../../link-parser/data-access/link-parser-settings.service';
import { DISPLAY_MODES, ThemeService } from '../../shared/data-access/theme.service';

@Injectable({ providedIn: 'root' })
export class DisplayModeService {
  private doc = inject(DOCUMENT);
  private setts = inject(LinkParserSettingsService);
  private theme = inject(ThemeService)

  update() {
    if (this.theme.displayMode == undefined) return;

    for (const mode of DISPLAY_MODES) {
      this.doc.documentElement.classList.remove(mode);
    }

    this.doc.documentElement.classList.add(this.theme.displayMode() + 'mode');
  }
}