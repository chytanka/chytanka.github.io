export enum ZipWorkerMessageType {
    ComicInfo = 'comicinfo',
    ZipOpen = 'zipopen',
    ImageLoad = 'imageload',
    Acbf = 'acbf'
}

export enum ZipWorkerCommandType {
    LoadBatch = 'loadBatch',
    Init = 'init'
}