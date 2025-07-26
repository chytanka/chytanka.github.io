import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[newTab]',
  standalone: false
})
export class NewTabDirective {

  @Input('newTab') href!: string;

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnChanges(): void {
    if (!this.href) return;

    this.renderer.setAttribute(this.el.nativeElement, 'href', this.href);
    this.renderer.setAttribute(this.el.nativeElement, 'target', '_blank');
    this.renderer.setAttribute(this.el.nativeElement, 'rel', 'noopener noreferrer');
  }

}
