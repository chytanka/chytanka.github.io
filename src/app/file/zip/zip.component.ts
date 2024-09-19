import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { FileService } from '../data-access/file.service';
import { SharedModule } from '../../shared/shared.module';
import { Router } from '@angular/router';
import { CompositionEpisode, CompositionImage } from '../../common/common-read';

@Component({
  selector: 'app-zip',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './zip.component.html',
  styleUrl: './zip.component.scss'
})
export class ZipComponent implements OnInit, OnDestroy {
  episode: CompositionEpisode | undefined;

  progress: number = 0;
  private worker!: Worker;

  router = inject(Router)

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

  initZipWorker() {
    this.terminateWorker()
    if (typeof Worker !== 'undefined') {

      this.worker = new Worker(new URL('../data-access/zip.worker', import.meta.url));
      this.worker.onmessage = ({ data }) => {
        if (data.type === 'progress') {
          this.progress = data.progress;
        } else if (data.type === 'file') {
          ``
          const { index, url } = data;

          if (this.episode)
            this.episode.images[index].src = url
        } else if (data.type === 'complete') {
          this.progress = data.progress;
        }
        else if (data.type === 'zipopen') {
          const imgs: CompositionImage[] = [...Array(data.data.count)].map((item: CompositionImage, index) => { return { src: `?id=${index}` } });          

          if (this.episode) {
            this.episode.images = imgs
          }
        }
      };
    } else {
      console.error('Web Workers are not supported in this environment.');
    }
  }

  fileChange() {
    // this.images = []
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
