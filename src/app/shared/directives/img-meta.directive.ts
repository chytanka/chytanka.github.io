import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[imgMeta]',
  standalone: false
})
export class ImgMetaDirective {

  constructor(private el: ElementRef<HTMLImageElement>) { }

  @Input('imgMeta') set meta(value: { src: string; alt: string } | null) {
    if (!value) return;

    if (value.src) {
      this.el.nativeElement.src = value.src;
    }
    if (value.alt) {
      this.el.nativeElement.alt = value.alt;
    }
  }

}
