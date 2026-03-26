import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DISPLAY_MODES, LinkParserSettingsService } from '../../link-parser/data-access/link-parser-settings.service';

@Injectable({ providedIn: 'root' })
export class DisplayModeService {
  private doc = inject(DOCUMENT);
  private setts = inject(LinkParserSettingsService);

  update() {
    if (this.setts.displayMode == undefined) return;

    for (const mode of DISPLAY_MODES) {
      this.doc.documentElement.classList.remove(mode);
    }

    this.doc.documentElement.classList.add(this.setts.displayMode() + 'mode');
  }
}