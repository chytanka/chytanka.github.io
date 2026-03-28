import { Component, computed, inject, input, InputSignal, output, OutputEmitterRef, Signal, signal } from '@angular/core';
import { LangService } from '../../../../shared/data-access/lang.service';

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

  inputWidth = input(1000);
  inputHeight = input(1000);

  naturalWidth = signal(1000);
  naturalHeight = signal(1000);

  width = computed(() => this.naturalWidth() ?? this.inputWidth());
  height = computed(() => this.naturalHeight() ?? this.inputHeight());

  index: InputSignal<number> = input(0);

  agree: OutputEmitterRef<void> = output();
  disagree: OutputEmitterRef<void> = output();


  onAgree() {
    this.agree.emit();
  }

  onDisagree() {
    this.disagree.emit();
  }

  imageLoad(event: Event) {
    const img = event.target as HTMLImageElement;
    this.imageLoading.set(false)
    this.naturalWidth.set(img.naturalWidth);
    this.naturalHeight.set(img.naturalHeight);

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
}
