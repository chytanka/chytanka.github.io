import { Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FileService } from '../data-access/file.service';
import { SharedModule } from '../../shared/shared.module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CompositionEpisode, CompositionImage } from '../../@site-modules/@common-read';
import { DomManipulationService } from '../../shared/data-access';
import { ComicInfo } from '../../shared/utils/comic-info';
import { Acbf } from '../../shared/utils/acbf';
import { FileHashService } from '../data-access/file-hash.service';
import { ViewerModule } from '../../viewer/viewer.module';
import { ZipHistoryFacade, ZipWorkerFacade } from './facades';
import { ZipWorkerMessageType } from '../models';

@Component({
  selector: 'app-zip',
  imports: [SharedModule, ViewerModule, RouterModule],
  templateUrl: './zip.component.html',
  styleUrl: './zip.component.scss',
  providers: [ZipWorkerFacade, ZipHistoryFacade]
})
export class ZipComponent implements OnInit, OnDestroy {
  workerFacade = inject(ZipWorkerFacade)
  historyFacade = inject(ZipHistoryFacade)

  episode = signal<CompositionEpisode>({ title: '', images: [] });

  fileHash = inject(FileHashService)

  arrayBuffer: ArrayBuffer | undefined

  loading = signal(true);

  router = inject(Router)
  private activatedRoute = inject(ActivatedRoute);
  dm = inject(DomManipulationService)
  fs = inject(FileService)

  constructor() {
    this.workerFacade.initZipWorker(this.workerHandlers)

    effect(() => { this.fileChange(); });
  }

  sha256Params: string = '';
  ngOnInit() {
    this.sha256Params = this.activatedRoute.snapshot.params['sha256']

    if (this.sha256Params && this.sha256Params != '') {
      this.historyFacade.loadFromHistory(this.sha256Params, this.episode)
      this.loading.set(true);
    }
  }

  ngOnDestroy() {
    this.workerFacade.terminateWorker();
  }

  private workerHandlers = new Map<string, Function>()
    .set(ZipWorkerMessageType.ComicInfo, this.comicinfoHandler.bind(this))
    .set(ZipWorkerMessageType.ZipOpen, this.zipopenHandler.bind(this))
    .set(ZipWorkerMessageType.ImageLoad, this.imageloadHandler.bind(this))
    .set(ZipWorkerMessageType.Acbf, this.acbfHandler.bind(this))


  private acbfHandler(msg: any) {
    const acbf = new Acbf(msg.data)
  }

  private comicinfoHandler(msg: any) {
    const comicInfo = new ComicInfo(msg.data)

    if (this.episode() && comicInfo.title) {
      this.episode().title = comicInfo.title
      this.episode().volume = parseInt(comicInfo.volume ?? '')
    }

  }

  private async zipopenHandler(msg: any) {
    this.loading.set(false);
    if (msg.data.count == 0) return;

    const imgs: CompositionImage[] = [...Array(msg.data.count)].map((item: CompositionImage, index) => { return { src: `/assets/no-image.svg?id=${index}` } });

    this.workerFacade.loadNextBatch(0);

    if (this.episode) {
      this.episode().images = imgs

      const inputFile = this.fs.file() as File;

      if (!inputFile) return;

      const sha256 = await this.fileHash.sha256(inputFile);
      this.historyFacade.saveToHistory(sha256, this.episode().title, this.arrayBuffer!, this.episode().images.length, inputFile.size)

    }
  }

  private imageloadHandler(msg: any) {
    const { index, url } = msg;

    if (this.episode() && this.episode().images[index])
      this.episode().images[index].src = url
  }

  fileChange() {
    const file = this.fs.file();
    if (file && this.workerFacade) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.arrayBuffer = reader.result as ArrayBuffer;

        this.workerFacade.openArrayBuffer(this.arrayBuffer, file.name, '', this.episode)
        this.loading.set(true);
      };
      reader.readAsArrayBuffer(file);
    } else if (!this.sha256Params) {
      this.router.navigateByUrl('/')
    }
  }

  onPageChange(event: { total: number, current: number[] }) {
    const lastPageIndex = event.current[event.current.length - 1] - 1;
    this.workerFacade.loadNextBatch(lastPageIndex);
    const sha256 = this.sha256Params;
    if (sha256) {
      this.historyFacade.updateHistory(sha256, lastPageIndex + 1);
    }
  }

}
