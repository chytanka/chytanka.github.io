import { Component, computed, Host, HostListener, inject, input, InputSignal, output, OutputEmitterRef, Signal, signal } from '@angular/core';
import { LangService } from '../../../../shared/data-access/lang.service';
import { ChtnkPage } from '../../../../shared/utils/acbf';

type TSpanChunk = {
  text: string;
  attrs: Record<string, string>;
};

@Component({
  selector: 'chtnk-page',
  standalone: false,

  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss', './page-long.component.scss', './page-pages.component.scss']
})
export class PageComponent {
  showLoading: InputSignal<boolean> = input(false);
  imageLoading = signal(true)
  lang: LangService = inject(LangService);

  nsfw: InputSignal<boolean | undefined> = input();
  preload: InputSignal<boolean> = input(false);
  showNsfw: InputSignal<boolean> = input(false);
  src: InputSignal<string> = input('');
  alt: InputSignal<string | undefined> = input();
  filename: InputSignal<string | undefined> = input();
  captions: InputSignal<ChtnkPage | undefined> = input();
  captionLang: InputSignal<string> = input('en');

  captionText = computed(() => {
    return this.captions()?.texts?.find(f => f.lang == this.captionLang())
  });

  inputWidth = input(1000);
  inputHeight = input(1000);

  naturalWidth = signal(1000);
  naturalHeight = signal(1000);

  width = computed(() => this.naturalWidth() ?? this.inputWidth());
  height = computed(() => this.naturalHeight() ?? this.inputHeight());

  viewBox = computed(() => `0 0 ${this.width()} ${this.height()}`);

  widthPx = computed(() => this.width().toString() + 'px');
  heightPx = computed(() => this.height().toString() + 'px');

  index: InputSignal<number> = input(0);

  agree: OutputEmitterRef<void> = output();
  disagree: OutputEmitterRef<void> = output();


  onAgree() {
    this.agree.emit();
  }

  onDisagree() {
    this.disagree.emit();
  }

  async imageLoad(event: Event) {
    const img = event.target as HTMLImageElement;
    this.image = img;
    this.imageLoading.set(false)
    this.naturalWidth.set(img.naturalWidth);
    this.naturalHeight.set(img.naturalHeight);

    try {
      const response = await fetch(img.src);
      const blob = await response.blob();

      if (blob.type === 'image/svg+xml' || blob.type === 'image/svg+xml-compressed') {
        const text = await blob.text();
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(text, 'image/svg+xml');
        const svgElement: SVGSVGElement = svgDoc.documentElement as unknown as SVGSVGElement;

        this.naturalWidth.set(svgElement.viewBox.baseVal.width);
        this.naturalHeight.set(svgElement.viewBox.baseVal.height);
      }
    } catch (e) {
      console.warn('Failed to get bitmap size, fallback to naturalWidth/naturalHeight', e);
    }

    this.calcScale();
    this.detectLongPage(this.naturalWidth(), this.naturalHeight())
  }

  //#region Detect Long Page

  longPageRatio = input(3);

  longPageDetected: OutputEmitterRef<void> = output();

  detectLongPage(w: number, h: number) {
    const ratio = h / w;

    if (ratio >= this.longPageRatio()) {
      this.longPageDetected.emit();
    }
  }

  //#endregion

  ///// 

  image: HTMLImageElement | null = null;

  imageWidth = signal(0);
  imageHeight = signal(0);
  scale = signal(1);

  @HostListener('window:resize')
  calcScale() {
    if (!this.image) return;

    this.imageWidth.set(this.image.width);
    this.imageHeight.set(this.image.height);

    this.scale.set( this.image.width / this.naturalWidth());

  }


  getCenter(pointsStr: string) {
    const pts = pointsStr.split(' ').map(p => p.split(',').map(Number));
    const xs = pts.map(p => p[0]);
    const ys = pts.map(p => p[1]);

    return {
      x: (Math.min(...xs) + Math.max(...xs)) / 2,
      y: (Math.min(...ys) + Math.max(...ys)) / 2,
      w: Math.max(...xs) - Math.min(...xs),
      h: Math.max(...ys) - Math.min(...ys),
    };
  }

  ///

  xmlToHtml(xml: string): string {
    const result = xml
      .replace('<emphasis>','<span class="emphasis">').replace('</emphasis>','</span>')
      .replace('<strong>','<span class="strong">').replace('</strong>','</span>');
    return result;
  }
}
