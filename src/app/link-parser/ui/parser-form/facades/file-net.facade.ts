import { Injectable, computed } from '@angular/core';
import { FileService } from '../../../../file/data-access/file.service';
import { NetworkService } from '../../../../shared/data-access/network.service';
import { LangService } from '../../../../shared/data-access/lang.service';

@Injectable({ providedIn: 'root' })
export class FileNetFacade {
    constructor(
        public file: FileService,
        public net: NetworkService,
        private lang: LangService
    ) { }

    readonly openFileLabel = computed(() => {
        const ph = this.lang.ph();
        const label = this.net.online()
            ? `📃 ${ph.orOpenFile}`
            : `📃 ${ph.openFile}`;

        return `${label} (${this.file.supportFiles()})`;
    });
}