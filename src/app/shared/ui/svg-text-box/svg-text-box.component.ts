import { AfterViewInit, Component, computed, ElementRef, input, signal, ViewChild } from '@angular/core';

@Component({
  selector: 'svg-text-box',
  standalone: false,

  templateUrl: './svg-text-box.component.html',
  styleUrl: './svg-text-box.component.scss'
})
export class SvgTextBoxComponent implements AfterViewInit {

  link = input<string | any[]>("");
  params = input<any>({});

  box = signal({ x: 0, y: 0, width: 0, height: 0 });

  viewBox = computed(() => {
    const box = this.box();
    return `0 0 ${box.width} ${box.height}`;
  });

  maxWidth = computed(() => this.box().width + 'px');

  ngAfterViewInit(): void {
    queueMicrotask(() => this.updateBox());
  }

  updateBox() {
    const bbox = this.textEl.nativeElement.getBBox();
    this.box.set({
      x: bbox.x - this.padding(),
      y: bbox.y - this.padding(),
      width: bbox.width + this.padding() * 2,
      height: bbox.height + this.padding() * 2
    });
  }

  @ViewChild('textEl', { static: true }) textEl!: ElementRef<SVGTextElement>;

  lines = input<string[]>([]);

  fontSize = input<number>(14);
  width = input<number>(280);
  padding = input<number>(10);
  lineHeightRatio = input<number>(1.15);


  protected getTspanY(index: number): string {
    const lineHeight = this.fontSize() * this.lineHeightRatio();

    return `${lineHeight * index + this.fontSize() + this.padding()}`;
  }
}