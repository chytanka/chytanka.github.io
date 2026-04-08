import { Injectable, WritableSignal } from "@angular/core";
import { CompositionEpisode } from "../../../@site-modules/@common-read";
import { ZipWorkerCommandType } from "../../models";

@Injectable()
export class ZipWorkerFacade {
    private worker!: Worker;
    readonly batchSize = 4;

    initZipWorker(workerHandlers: Map<string, Function>) {
        this.terminateWorker()

        if (typeof Worker !== 'undefined') {
            this.worker = new Worker(new URL('../../data-access/zip.worker', import.meta.url));
            this.worker.onmessage = ({ data }) => {
                const fn = workerHandlers.get(data.type)
                if (fn) fn(data)
            };
        } else {
            console.error('Web Workers are not supported in this environment.');
        }
    }

    terminateWorker() {
        if (this.worker)
            this.worker.terminate();
    }

    // worker
    async openArrayBuffer(ab: ArrayBuffer, filename: string, sha256: string = '', episode: WritableSignal<CompositionEpisode | undefined>) {
        // if (sha256 == '') this.sha256 = await this.fileHash.sha256(this.fs.file() as File)

        episode.set({ title: filename, images: [] });
        this.worker.postMessage({ arrayBuffer: ab, type: ZipWorkerCommandType.Init });
    }

    loadNextBatch(startIndex: number) {
        const midBatchSize = this.batchSize / 2;
        const calculatedStartIndex = startIndex - midBatchSize;
        const start = calculatedStartIndex < 0 ? 0 : calculatedStartIndex;
        this.worker.postMessage({
            type: ZipWorkerCommandType.LoadBatch,
            start: start,
            count: this.batchSize,
        });
    }
}