import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, HostListener, Input, Renderer2, ViewChild } from '@angular/core';
import { CompositionEpisode } from '../../utils';

interface ViewModeOption {
  dir: "rtl" | "ltr";
  mode: "pages" | "long"
  title: string;
}

const VIEV_MODE_OPTIONS: ViewModeOption[] = [
  { dir: "rtl", mode: "pages", title: "⬅️" },
  { dir: "ltr", mode: "pages", title: "➡️" },
  { dir: "ltr", mode: "long", title: "⬇️" },
]

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrl: './viewer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewerComponent {

  public viewModeOptions = VIEV_MODE_OPTIONS;

  viewModeOption = VIEV_MODE_OPTIONS[0]


  showOverlay: boolean = true;


  // @HostListener("click" )
  onClick() {
    this.showOverlay = !this.showOverlay
  }

  @Input() episode: CompositionEpisode | undefined = undefined;

  /**
   *
   */
  constructor(private el: ElementRef, private renderer: Renderer2) {

  }

  toggleFullScreen() {
    const elem = this.el.nativeElement;

    if (!document.fullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
        this.showOverlay = false;
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }


  }

  @ViewChild('viewRef', { static: true }) viewRef!: ElementRef;

  viewElement!: HTMLElement;
  ngAfterViewInit() {
    this.viewElement = this.viewRef.nativeElement;
  }


  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if ((event.target as HTMLElement).nodeName === 'INPUT') return;

    if (event.code == "KeyF") { this.toggleFullScreen() }


    // 
    const element: HTMLElement = this.el.nativeElement;

    const scrollAmount = 100;
    const scrollAmountX = element.clientWidth;
    switch (event.code) {
      case 'KeyA':
        this.viewElement.scrollLeft -= scrollAmountX;
        break;
      case 'KeyD':
        this.viewElement.scrollLeft += scrollAmountX;
        break;
      case 'KeyW':
        element.scrollTo({
          top: element.scrollTop - scrollAmount,
          behavior: "smooth",
        });
        break;
      case 'KeyS':
        element.scrollTo({
          top: element.scrollTop + scrollAmount,
          behavior: "smooth",
        });
        break;


    }


  }


  @HostListener('wheel', ['$event'])
  handleWheelEvent(event: WheelEvent): void {

    if (this.viewModeOption.mode != "pages") return;

    const revers: number = this.viewModeOption.dir == "ltr" ? 1 : -1

    const scrollAmountX = this.viewElement.clientWidth;

    if (event.deltaY !== 0 && !event.shiftKey) {
      this.viewElement.scrollLeft += event.deltaY * revers > 0 ? scrollAmountX : -scrollAmountX;

      event.preventDefault();
    }
  }


  warm: number = 0;

}
