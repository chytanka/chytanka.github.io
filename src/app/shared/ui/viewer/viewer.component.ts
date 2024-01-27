import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { CompositionEpisode } from '../../utils';
import { ViewerService, DomManipulationService } from '../../data-access';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: [
    './viewer.component.scss',
    './viewer.pages.component.scss',
    './viewer.long.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewerComponent {

  @Input() episode: CompositionEpisode | undefined = undefined;

  @ViewChild('viewRef', { static: true }) viewRef!: ElementRef;

  constructor(private el: ElementRef, public viewer: ViewerService, private dm: DomManipulationService) { }

  toggleFullScreen = () => this.dm.toggleFullScreen(this.el.nativeElement)

  showOverlay: boolean = true;
  toggleOverlay = () => this.showOverlay = !this.showOverlay;

  viewElement!: HTMLElement;
  ngAfterViewInit() {
    this.viewElement = this.viewRef.nativeElement;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if ((event.target as HTMLElement).nodeName === 'INPUT') return;

    const element: HTMLElement = this.el.nativeElement;
    const horAmount = element.clientWidth;
    const verAmount = 100;

    switch (event.code) {
      case 'KeyF':
        this.toggleFullScreen()
        break;
      case 'KeyA':
        this.dm.scrollHor(this.viewElement, -horAmount)
        break;
      case 'KeyD':
        this.dm.scrollHor(this.viewElement, horAmount)
        break;
      case 'KeyW':
        this.dm.scrollVer(element, -verAmount)
        break;
      case 'KeyS':
        this.dm.scrollVer(element, verAmount)
        break;
    }
  }

  @HostListener('wheel', ['$event'])
  handleWheelEvent(event: WheelEvent): void {

    if (this.viewer.viewModeOption.mode != "pages") return;

    const revers: number = this.viewer.viewModeOption.dir == "ltr" ? 1 : -1

    const scrollAmountX = this.viewElement.clientWidth;

    if (event.deltaY !== 0 && !event.shiftKey) {
      this.viewElement.scrollLeft += event.deltaY * revers > 0 ? scrollAmountX : -scrollAmountX;

      event.preventDefault();
    }
  }
}
