import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { FileService } from '../data-access/file.service';
import { SharedModule } from '../../shared/shared.module';
import { Router } from '@angular/router';
import { CompositionEpisode, CompositionImage } from '../../@site-modules/@common-read';
import { DomManipulationService } from '../../shared/data-access';
import { ComicInfo } from '../../shared/utils/comic-info';
import { Acbf } from '../../shared/utils/acbf';

@Component({
    selector: 'app-zip',
    imports: [SharedModule],
    templateUrl: './zip.component.html',
    styleUrl: './zip.component.scss'
})
export class ZipComponent implements OnInit, OnDestroy {
  private worker!: Worker;
  
  episode: CompositionEpisode | undefined;

  router = inject(Router)
  dm = inject(DomManipulationService)
  fs = inject(FileService)

  constructor() {
    this.initZipWorker()

    effect(() => { this.fileChange(); });
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.terminateWorker()
  }

  terminateWorker() {
    if (this.worker)
      this.worker.terminate();
  }

  private workerHandlers = new Map<string, Function>()
    .set('comicinfo', this.comicinfoHandler.bind(this))
    .set('zipopen', this.zipopenHandler.bind(this))
    .set('file', this.fileHandler.bind(this))
    .set('acbf', this.acbfHandler.bind(this))


    private acbfHandler(msg: any) {
      const acbf = new Acbf(msg.data)
  
    }

  private comicinfoHandler(msg: any) {
    const comicInfo = new ComicInfo(msg.data)

    if (this.episode && comicInfo.title) {
      this.episode.title = comicInfo.title
      this.episode.volume = parseInt(comicInfo.volume ?? '')
    }

  }

  private zipopenHandler(msg: any) {
    const imgs: CompositionImage[] = [...Array(msg.data.count)].map((item: CompositionImage, index) => { return { src: `?id=${index}` } });

    if (this.episode) {
      this.episode.images = imgs
    }
  }
  private fileHandler(msg: any) {
    const { index, url } = msg;

    if (this.episode)
      this.episode.images[index].src = url
  }

  initZipWorker() {
    this.terminateWorker()

    if (typeof Worker !== 'undefined') {
      this.worker = new Worker(new URL('../data-access/zip.worker', import.meta.url));
      this.worker.onmessage = ({ data }) => {
        const fn = this.workerHandlers.get(data.type)
        if (fn) fn(data)
      };
    } else {
      console.error('Web Workers are not supported in this environment.');
    }
  }

  fileChange() {
    const file = this.fs.file();
    if (file && this.worker) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = reader.result as ArrayBuffer;
        this.episode = {
          title: file.name,
          images: []
        }
        this.worker.postMessage({ arrayBuffer: arrayBuffer });
      };
      reader.readAsArrayBuffer(file);
    } else {
      this.router.navigateByUrl('/')
    }
  }
}
