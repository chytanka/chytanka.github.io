import {
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
} from '@angular/core';

type Zone =
  | 'top-left' | 'top-center' | 'top-right'
  | 'middle-left' | 'middle-center' | 'middle-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right';

@Directive({
  selector: '[viewportZone]',
  standalone: false
})
export class ViewportZoneDirective {
  private currentZone: Zone | null = null;

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  @HostListener('pointerover', ['$event'])
  onPointerOver(event: PointerEvent) {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const x = event.clientX;
    const y = event.clientY;

    const col = this.getColumn(x, vw);
    const row = this.getRow(y, vh);

    const zone = `${row}-${col}` as Zone;

    if (zone !== this.currentZone) {
      this.updateClass(zone);
      this.currentZone = zone;
    }
  }

  private getColumn(x: number, vw: number) {
    if (x < vw / 3) return 'left';
    if (x < (vw / 3) * 2) return 'center';
    return 'right';
  }

  private getRow(y: number, vh: number) {
    if (y < vh / 3) return 'top';
    if (y < (vh / 3) * 2) return 'middle';
    return 'bottom';
  }

  private updateClass(zone: Zone) {
    if (this.currentZone) {
      this.renderer.removeClass(
        this.el.nativeElement,
        `zone-${this.currentZone}`
      );
    }

    this.renderer.addClass(
      this.el.nativeElement,
      `zone-${zone}`
    );
  }
}