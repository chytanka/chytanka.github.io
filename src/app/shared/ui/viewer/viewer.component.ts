import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, Signal, ViewChild, WritableSignal, computed, effect, inject, signal } from '@angular/core';
import { CompositionEpisode } from '../../../common/common-read';
import { ViewerService, DomManipulationService } from '../../data-access';
import { ActivatedRoute, Router } from '@angular/router';
import { LangService } from '../../data-access/lang.service';
import { DialogComponent } from '../dialog/dialog.component';
import { DomSanitizer } from '@angular/platform-browser';
import { Playlist, PlaylistItem } from '../../../playlist/data-access/playlist.service';
import { EmbedHalperService } from '../../data-access/embed-halper.service';
import { DownloadService } from '../../data-access/download.service';
import { Base64 } from '../../utils';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: [
    './viewer.component.scss',
    './viewer.pages.component.scss',
    './viewer.long.component.scss',
    '/src/app/shared/ui/@styles/details.scss',
    '/src/app/shared/ui/@styles/input-group.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewerComponent {
  readonly separator: string = '│'
  showNsfw: WritableSignal<boolean> = signal(false);

  @Input() episode: CompositionEpisode | undefined = undefined;

  @Input() playlist: Playlist = [];
  @Input() playlistLink: string = "";
  @Input() currentPlaylistItem: PlaylistItem | undefined;



  getCyrrentIndex() {
    for (let i = 0; i < this.playlist.length; i++) {
      const item = this.playlist[i];
      if (this.currentPlaylistItem?.id == item.id && this.currentPlaylistItem?.site == item.site)
        return i;
    }

    return -1;
  }

  getNextIndex() {
    const index = this.getCyrrentIndex();
    if (index < 0) return -1;

    return ((index + 1) < this.playlist.length) ? index + 1 : -1;
  }

  getPrevIndex() {
    const index = this.getCyrrentIndex();
    if (index < 0) return -1;

    return ((index - 1) >= 0) ? (index - 1) : -1;
  }

  @ViewChild('viewRef', { static: true }) viewRef!: ElementRef;

  constructor(private el: ElementRef, public viewer: ViewerService, private dm: DomManipulationService, private router: Router, public lang: LangService) {
    this.initHotKeys()
  }

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
    const isPageMode = this.viewer.viewModeOption().mode == 'pages';

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

    this.showOverlay = false;
    this.activeIndexs.set(activeIndxs);

    this.embedHelper.postMessage({
      total: this.episode?.images.length,
      current: activeIndxs.map(i => i + 1)
    }, 'changepage');

  }


  @HostListener('scroll', ['$event'])
  onScroll(event: Event) {
    this.initActiveIndexes()
    this.showOverlay = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.initActiveIndexes()
  }

  hotKeys = new Map<string, Function>()

  initHotKeys() {
    this.hotKeys.set('KeyF', this.toggleFullScreen)
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.domMan.setHotkeys(event, this.hotKeys)


    const element: HTMLElement = this.el.nativeElement;
    const horAmount = element.clientWidth;
    const verAmount = 100;

    switch (event.code) {
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

  isDialogOpen = signal(false);

  @HostListener('wheel', ['$event'])
  handleWheelEvent(event: WheelEvent): void {

    if (this.isDialogOpen()) return;

    if (this.viewer.viewModeOption().mode != "pages") return;

    const revers: number = this.viewer.viewModeOption().dir == "ltr" ? 1 : -1

    const scrollAmountX = this.viewElement().clientWidth;

    if (event.deltaY !== 0 && !event.shiftKey) {
      this.viewElement().scrollLeft += event.deltaY * revers > 0 ? scrollAmountX : -scrollAmountX;

      this.showOverlay = false;
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
    if ((event.target as HTMLElement).nodeName === 'SUMMARY') return;

    console.log((event.target as HTMLElement).nodeName);


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

  

 

  //#region Inject

  route = inject(ActivatedRoute)
  domMan = inject(DomManipulationService)
  dl: DownloadService = inject(DownloadService);
  sanitizer: DomSanitizer = inject(DomSanitizer);
  embedHelper = inject(EmbedHalperService);

  //#endregion

  
}
