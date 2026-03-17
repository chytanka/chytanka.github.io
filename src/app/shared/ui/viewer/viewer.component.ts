import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, Input, PLATFORM_ID, Signal, ViewChild, WritableSignal, computed, effect, inject, output, signal } from '@angular/core';
import { CompositionEpisode } from '../../../@site-modules/@common-read';
import { ViewerService, DomManipulationService } from '../../data-access';
import { ActivatedRoute, Router } from '@angular/router';
import { LangService } from '../../data-access/lang.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Playlist, PlaylistItem } from '../../../playlist/data-access/playlist.service';
import { EmbedHalperService } from '../../data-access/embed-halper.service';
import { DownloadService } from '../../data-access/download.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { VibrationService } from '../../data-access/vibration.service';
import { GamepadService } from '../../data-access/gamepad.service';
import { GamepadButton } from '../../models';

const CHTNK_LOAD_EVENT_NAME = 'chtnkload'
const CHTNK_CHANGE_PAGE_EVENT_NAME = 'changepage';
const CHTNK_NSFW_CHOICE_EVENT_NAME = 'nsfwchoice'
const CHTNK_LIST_RESPONCE_EVENT_NAME = 'listresponse'
const CHTNK_LIST_REQUEST_EVENT_NAME = 'listrequest'

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: [
    './viewer.component.scss',
    './viewer.pages.component.scss',
    './viewer.long.component.scss',
    '../../../shared/ui/@styles/details.scss',
    '../../../shared/ui/@styles/input-group.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class ViewerComponent implements AfterViewInit {
  readonly separator: string = '│'
  showNsfw: WritableSignal<boolean> = signal(false);
  gamepad = inject(GamepadService);

  pagechange = output<{ total: number, current: number[] }>()

  @Input() episode: CompositionEpisode | undefined = undefined;
  @Input() playlist: Playlist = [];
  @Input() playlistLink: string = "";
  @Input() currentPlaylistItem: PlaylistItem | undefined;

  platformId = inject(PLATFORM_ID)
  private readonly document = inject(DOCUMENT);
  vibration = inject(VibrationService);

  initListFromParrentWindow() {
    if (!this.embedHelper.isEmbedded() || !isPlatformBrowser(this.platformId)) return

    this.embedHelper.postMessage(this.currentPlaylistItem, CHTNK_LIST_REQUEST_EVENT_NAME);

    window.addEventListener('message', ({ data }) => {
      if (data.event != CHTNK_LIST_RESPONCE_EVENT_NAME) return;

      this.playlist = data.data as Playlist // !!! 

      this.cdr.detectChanges()

    }, false);
  }

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

    effect(() => {
      for (const [btn, action] of Object.entries(this.gamepadActionMap)) {
        if (this.gamepad.buttons()[parseInt(btn)]?.pressed) action();
      }
    })

    addEventListener("fullscreenchange", (event) => {
      this.isFullScreen.set(document.fullscreenElement === this.el.nativeElement)
    })
  }

  private gamepadActionMap: Record<number, Function> = {
    [GamepadButton.L1]: () => this.scrollLeft(),
    [GamepadButton.R1]: () => this.scrollRight(),
    [GamepadButton.DPadLeft]: () => this.scrollLeft(),
    [GamepadButton.DPadRight]: () => this.scrollRight(),
    [GamepadButton.DPadUp]: () => this.scrollUp(),
    [GamepadButton.DPadDown]: () => this.scrollDown(),
    [GamepadButton.Square]: () => this.toggleFullScreen(),
    [GamepadButton.Options]: () => this.toggleOverlay(),
    [GamepadButton.Triangle]: () => this.toggleViewModeOption(),
  };
  private _isViewOptToggle = false;
  toggleViewModeOption() {
    if (!this._isViewOptToggle) {
      this.viewer.toggleViewModeOption();
      this.viewer.saveViewModeOption();
      setTimeout(() => { this._isViewOptToggle = false }, 100);
    }

    this._isViewOptToggle = true;
  }

  // TODO: Fix scroll position reset after exiting fullscreen in pages mode
  toggleFullScreen = () => {
    // const activeIndexs = this.activeIndexs();
    // const page = (activeIndexs.length == 1) ? activeIndexs[0] : activeIndexs.filter(v => v+1 % 2 != 0)[0];
    // console.log(activeIndexs, page);

    this.dm.toggleFullScreen(this.el.nativeElement);

    // if (page != undefined)
    //   setTimeout(() => {this.onActive(page)}, 100);
  }
  isFullScreen = signal(document.fullscreenElement === this.el.nativeElement);

  showOverlay = signal(false);
  toggleOverlay = () => this.showOverlay.update(v => !v);

  viewElement: WritableSignal<HTMLElement> = signal(this.document.createElement('div'));
  imageElements: Signal<NodeListOf<Element>> = computed(() => this.viewElement().querySelectorAll('.page img[id*=page_]'));
  imgsPos: any[] = []

  ngAfterViewInit() {
    this.viewElement.set(this.viewRef.nativeElement);
    this.initActiveIndexes()
    this.embedHelper.postMessage(this.currentPlaylistItem, CHTNK_LOAD_EVENT_NAME);
    this.initListFromParrentWindow();
  }

  activeIndexs: WritableSignal<number[]> = signal([])
  initActiveIndexes() {
    if (!isPlatformBrowser(this.platformId)) return

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

    // this.showOverlay = false;
    // console.log();

    // if (JSON.stringify(this.activeIndexs()) !== JSON.stringify(activeIndxs))
    this.activeIndexs.set(activeIndxs);


    const total = this.episode?.images.length
    const current = activeIndxs.map(i => i + 1)

    this.embedHelper.postMessage({ total, current }, CHTNK_CHANGE_PAGE_EVENT_NAME);

    this.pagechange.emit({ total: Number(total), current })

  }

  isScrollStart: boolean = false;

  @HostListener('scroll', ['$event'])
  onScroll(event: Event) {
    this.initActiveIndexes()

    if (!this.isScrollStart) {
      this.isScrollStart = true;
      this.vibration.vibrate(10);
    }
  }

  @HostListener('scrollend', ['$event'])
  onScrollEnd(event: Event) {
    this.vibration.vibrate([5, 5, 10]);
    this.isScrollStart = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.initActiveIndexes()
  }

  private hotKeys = new Map<string, Function>()

  private initHotKeys() {
    this.hotKeys.set('KeyF', this.toggleFullScreen)
    this.hotKeys.set('KeyE', this.toggleOverlay)
    this.hotKeys.set('KeyA', () => this.scrollLeft())
    this.hotKeys.set('KeyD', () => this.scrollRight())
    this.hotKeys.set('KeyW', () => this.scrollUp())
    this.hotKeys.set('KeyS', () => this.scrollDown())
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.domMan.setHotkeys(event, this.hotKeys)
  }

  private readonly verAmount = 256;

  private scrollLeft() {
    this.dm.scrollHor(this.viewElement(), -this.el.nativeElement.clientWidth)
  }

  private scrollRight() {
    this.dm.scrollHor(this.viewElement(), this.el.nativeElement.clientWidth)
  }

  private scrollUp() {
    this.dm.scrollVer(this.el.nativeElement, -this.verAmount)
  }
  private scrollDown() {
    this.dm.scrollVer(this.el.nativeElement, this.verAmount)
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

    this.toggleOverlay();
  }
  onViewDblClick(event: Event) {
    if ((event.target as HTMLElement).nodeName === 'INPUT') return;

    this.toggleFullScreen();
  }

  onAgree() {
    this.showNsfw.set(true);
    this.embedHelper.postMessage(true, CHTNK_NSFW_CHOICE_EVENT_NAME);
  }

  onDisagree() {
    this.showNsfw.set(false);
    this.embedHelper.postMessage(false, CHTNK_NSFW_CHOICE_EVENT_NAME);

    if (!this.embedHelper.isEmbedded())
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
  cdr = inject(ChangeDetectorRef)

  //#endregion


}
