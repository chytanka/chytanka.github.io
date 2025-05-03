import { Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FileService } from '../data-access/file.service';
import { SharedModule } from '../../shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { CompositionEpisode, CompositionImage } from '../../@site-modules/@common-read';
import { DomManipulationService } from '../../shared/data-access';
import { ComicInfo } from '../../shared/utils/comic-info';
import { Acbf } from '../../shared/utils/acbf';
import { FileHashService } from '../data-access/file-hash.service';
import { FileHistoryService } from '../data-access/file-history.service';
import { FileSettingsService } from '../data-access/file-settings.service';
import { map } from 'rxjs';
import { ViewerComponent } from "../../viewer/viewer.component";

@Component({
  selector: 'app-zip',
  imports: [SharedModule, /*ViewerComponent*/],
  templateUrl: './zip.component.html',
  styleUrl: './zip.component.scss'
})
export class ZipComponent implements OnInit, OnDestroy {
  private worker!: Worker;
  fileHash = inject(FileHashService)
  fileHistory = inject(FileHistoryService)
  fileSetts = inject(FileSettingsService)

  sha256: string | undefined;
  arrayBuffer: ArrayBuffer | undefined

  episode: CompositionEpisode | undefined;

  router = inject(Router)
  private activatedRoute = inject(ActivatedRoute);
  dm = inject(DomManipulationService)
  fs = inject(FileService)
  status = signal('')

  constructor() {
    this.initZipWorker()

    effect(() => { this.fileChange(); });
  }
  sha256Params: string = '';
  ngOnInit() {
    this.sha256Params = this.activatedRoute.snapshot.params['sha256']

    if (this.sha256Params && this.sha256Params != '')
      this.loadFromHistory(this.sha256Params)
  }

  async loadFromHistory(sha256: string) {
    const { arrayBuffer, title } = await this.fileHistory.getItemBySha256(sha256)
    if (!arrayBuffer) return;

    this.sha256 = sha256
    this.arrayBuffer = arrayBuffer
    this.openArrayBuffer(arrayBuffer, title, sha256)
  }

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

      const obj = {
        arrayBuffer: (this.fileSetts.copyFileToHistory()) ? this.arrayBuffer : null,
        sha256: this.sha256,
        pages: this.episode.images.length,
        size: this.fs.file()?.size,
        page: 1,
        cover: '',
        title: this.fs.file()?.name,
        format: 'zip'
      }

      if (this.fileSetts.saveFileToHistory()) this.fileHistory.addHistory(obj)

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
    this.status.set(`Opening file: ${this.fs.file()?.name}`)
    const file = this.fs.file();
    if (file && this.worker) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.arrayBuffer = reader.result as ArrayBuffer;

        this.openArrayBuffer(this.arrayBuffer, file.name)
      };
      reader.readAsArrayBuffer(file);
    } else {
      // this.router.navigateByUrl('/')
    }
  }

  async openArrayBuffer(ab: ArrayBuffer, filename: string, sha256: string = '') {
    if (sha256 == '') this.sha256 = await this.fileHash.sha256(this.fs.file() as File)

    this.episode = { title: filename, images: [] }
    this.worker.postMessage({ arrayBuffer: ab });
  }

  onPageChange(e: { total: number, current: number[] }) {
    const { current, total } = e
    console.log(`${current}/${total}`);
  }
}
