import { inject, Injectable, WritableSignal } from "@angular/core";
import { FileSettingsService } from "../../data-access/file-settings.service";
import { FileHistoryService } from "../../data-access/file-history.service";
import { ZipWorkerFacade } from "./zip-worker.facade";
import { CompositionEpisode } from "../../../@site-modules/@common-read";

@Injectable()
export class ZipHistoryFacade {
    workerFacade = inject(ZipWorkerFacade)
    fileHistory = inject(FileHistoryService)
    fileSetts = inject(FileSettingsService)


    async loadFromHistory(sha256: string, episode: WritableSignal<CompositionEpisode>) {
        const { arrayBuffer, title } = await this.fileHistory.getItemBySha256(sha256)
        if (!arrayBuffer) return;

        this.workerFacade.openArrayBuffer(arrayBuffer, title, sha256, episode)
    }

    saveToHistory(sha256: string, title: string, arrayBuffer: ArrayBuffer, pages: number, size: number) {
        // save to history only if enabled in settings, otherwise just save metadata, if retention time or storage limit is enabled, otherwise just save metadata
        const sfth = this.fileSetts.saveFileToHistory()
        // copy file to history only if retention time or storage limit is enabled, otherwise just save metadata
        const ctfth = this.fileSetts.copyFileToHistory()

        const obj = {
            arrayBuffer: (ctfth) ? arrayBuffer : null,
            sha256: sha256,
            pages: pages,
            size: (ctfth) ? size : 0,
            page: 1,
            cover: '',
            title: title,
            format: 'zip'
        }

        if (sfth) this.fileHistory.addHistory(obj)
    }
}