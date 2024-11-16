import { Component, effect, inject } from '@angular/core';
import { CompositionEpisode } from '../../@site-modules/@common-read';
import { Router } from '@angular/router';
import { FileService } from '../data-access/file.service';
import { MobiFileReader } from 'readiverse';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-mobi',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './mobi.component.html',
  styleUrl: './mobi.component.scss'
})
export class MobiComponent {
  episode: CompositionEpisode | undefined;
  router = inject(Router)
  fs = inject(FileService)

  constructor() {
    effect(() => { this.fileChange(); });
  }

  async openMobi(arrayBuffer: ArrayBuffer) {
    const view = new DataView(arrayBuffer)
    const mobi = new MobiFileReader(view);

    const td = new TextDecoder("utf-8");
    const html = td.decode(mobi.readText())

    const dom = new DOMParser().parseFromString(html, 'text/html')

    const meta = mobi.exthHeader.readRecords() as Map<number, any>

    const title = meta.get(503), author = meta.get(100)

    const images = dom.querySelectorAll('img[recindex]')
    const imageIds: { src: string, alt: string }[] = []

    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const recindex = img.getAttribute('recindex') || ''
      const index = parseInt(recindex)
      const blob = mobi.readImage(index - 1)
      if (blob) {
        const src = URL.createObjectURL(blob)
        imageIds.push({ src, alt: recindex })
      }
    }

    this.episode = {
      title: author + ' — ' + title,
      images: imageIds
    }

  }


  fileChange() {
    const file = this.fs.file();

    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const arrayBuffer = reader.result as ArrayBuffer;

        await this.openMobi(arrayBuffer)
      };
      reader.readAsArrayBuffer(file);
    } else {
      this.router.navigateByUrl('/')
    }
  }

}
