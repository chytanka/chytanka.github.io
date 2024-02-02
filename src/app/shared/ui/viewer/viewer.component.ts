import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, Signal, ViewChild, WritableSignal, computed, effect, signal } from '@angular/core';
import { CompositionEpisode } from '../../utils';
import { ViewerService, DomManipulationService } from '../../data-access';
import { Router } from '@angular/router';
import { LangService } from '../../data-access/lang.service';

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
  showNsfw: WritableSignal<boolean> = signal(false);

  @Input() episode: CompositionEpisode | undefined = undefined;

  @ViewChild('viewRef', { static: true }) viewRef!: ElementRef;

  constructor(private el: ElementRef, public viewer: ViewerService, private dm: DomManipulationService, private router: Router, public lang: LangService) { }

  toggleFullScreen = () => this.dm.toggleFullScreen(this.el.nativeElement)

  showOverlay: boolean = true;
  toggleOverlay = () => this.showOverlay = !this.showOverlay;

  // viewElement!: HTMLElement;
  viewElement: WritableSignal<HTMLElement> = signal(document.createElement('div'));
  imageElements: Signal<NodeListOf<Element>> = computed(() => this.viewElement().querySelectorAll('.page img[id*=page_]'));
  imgsPos: any[] = []

  ngAfterViewInit() {
    this.viewElement.set(this.viewRef.nativeElement);
    this.initActiveIndexes()
  }

  activeIndexs: WritableSignal<number[]> = signal([])
  initActiveIndexes() {
    const isPageMode = this.viewer.viewModeOption.mode == 'pages';

    const viewRect: DOMRect = isPageMode
      ? this.viewElement().getBoundingClientRect()
      : this.el.nativeElement.getBoundingClientRect();

    let activeIndxs: number[] = [];

    for (let i = 0; i < this.imageElements().length; i++) {
      const img = this.imageElements()[i];
      const rect = img.getBoundingClientRect();

      const hor = rect.right > viewRect.x && rect.right < viewRect.x + viewRect.width + 1;

      const ver = rect.top < viewRect.height && rect.bottom > viewRect.top

      if (isPageMode ? hor : ver) {
        activeIndxs.push(i)
      }

    }

    this.activeIndexs.set(activeIndxs);
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: Event) {
    this.initActiveIndexes()
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.initActiveIndexes()
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
        this.dm.scrollHor(this.viewElement(), -horAmount)
        break;
      case 'KeyD':
        this.dm.scrollHor(this.viewElement(), horAmount)
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

    const scrollAmountX = this.viewElement().clientWidth;

    if (event.deltaY !== 0 && !event.shiftKey) {
      this.viewElement().scrollLeft += event.deltaY * revers > 0 ? scrollAmountX : -scrollAmountX;

      event.preventDefault();
    }
  }

  onActive(pageIndex: number) {
    const foo = this.viewElement().querySelector(`#page_${pageIndex + 1}`)
    const opt: ScrollIntoViewOptions = { behavior: "smooth", block: "start", inline: "center" }
    foo?.scrollIntoView(opt)
  }

  showNsfwToggle() {
    this.showNsfw.set(!this.showNsfw())
  }

  onViewClick(event: Event) {
    if ((event.target as HTMLElement).nodeName === 'INPUT') return;

    this.toggleOverlay();
  }
  onViewDblClick(event: Event) {
    if ((event.target as HTMLElement).nodeName === 'INPUT') return;

    this.toggleFullScreen();
  }

  onAgree() {
    this.showNsfw.set(true);
  }

  onDisagree() {
    this.router.navigate(['/'])
  }

  preloadIndexes: Signal<number[]> = computed(() => this.activeIndexs().map(item => item + 1));

  preLoad(i: number): boolean {
    return (this.preloadIndexes()).includes((i))
  }
}
