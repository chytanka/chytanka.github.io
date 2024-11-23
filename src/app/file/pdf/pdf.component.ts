import { Component, effect, inject } from '@angular/core';

import { FileService } from '../data-access/file.service';
import { SharedModule } from '../../shared/shared.module';
import { Router } from '@angular/router';
import { getDocument, GlobalWorkerOptions, PDFPageProxy } from 'pdfjs-dist';
import { RenderParameters } from 'pdfjs-dist/types/src/display/api';
import { CompositionEpisode } from '../../@site-modules/@common-read';

GlobalWorkerOptions.workerSrc = '/assets/pdf.worker.min.mjs'

const MDASH = '—';

@Component({
    selector: 'app-pdf',
    imports: [SharedModule],
    templateUrl: './pdf.component.html',
    styleUrl: './pdf.component.scss'
})
export class PdfComponent {
  episode: CompositionEpisode | undefined;
  router = inject(Router)
  fs = inject(FileService)

  constructor() {
    effect(() => { this.fileChange(); });
  }

  async openPdf(arrayBuffer: ArrayBuffer) {
    const pdf = await getDocument({
      data: arrayBuffer,
      disableFontFace: true,
    }).promise;

    const meta = await pdf.getMetadata()
    const title = (meta.info as any)['Title']
    const author = (meta.info as any)['Author']

    console.dir(meta.info)

    this.episode = {
      title: title ? (author ? author + ` ${MDASH} ` : '') + title : this.fs.file()?.name ?? '',
      images: [...Array(pdf.numPages)].map((item: any, index) => { return { src: index + '' } })
    }

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      await this.renderPage(page)
    }
  }

  async renderPage(page: PDFPageProxy) {
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = document.createElement('canvas');

    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const context: CanvasRenderingContext2D = canvas.getContext('2d') as unknown as CanvasRenderingContext2D;

    const renderContext: RenderParameters = {
      canvasContext: context,
      viewport: viewport,
      intent: 'print'
    };

    await page.render(renderContext).promise;

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve));
    if (blob) {
      const url = URL.createObjectURL(blob);
      if (this.episode)
        this.episode.images[page.pageNumber - 1].src = url
    }
  }

  fileChange() {
    const file = this.fs.file();

    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const arrayBuffer = reader.result as ArrayBuffer;

        await this.openPdf(arrayBuffer)
      };
      reader.readAsArrayBuffer(file);
    } else {
      this.router.navigateByUrl('/')
    }
  }


}
