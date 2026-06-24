import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, input, Signal, ViewChild, WritableSignal, computed, inject, signal, output } from '@angular/core';
import { LangService } from '../../shared/data-access/lang.service';
import { Playlist, PlaylistItem } from '../../playlist/data-access/playlist.service';
import { DOCUMENT } from '@angular/common';
import { EmbedFacade, GamepadFacade, KeyboardFacade, NsfwFacade, PageTrackingFacade, ReadlistFacade, ViewerScrollFacade, ViewerTitleTagFacade, ViewerUiFacade, ViewModeFacade } from '../facades';
import { DomManipulationService } from '../../shared/data-access';
import { ChtnkCaption, ChtnkEpisode, ChtnkFrame } from '../../shared/models/chtnk-composition';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: [
    './viewer.component.scss',
    './viewer.pages.component.scss',
    './viewer.long.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class ViewerComponent implements AfterViewInit {
  nsfw = inject(NsfwFacade);
  gamepad = inject(GamepadFacade);
  viewerUi = inject(ViewerUiFacade);
  viewMode = inject(ViewModeFacade);
  pageTracking = inject(PageTrackingFacade);
  keyboard = inject(KeyboardFacade);
  scroll = inject(ViewerScrollFacade);
  embedFacade = inject(EmbedFacade);
  readlist = inject(ReadlistFacade);
  tagTitle = inject(ViewerTitleTagFacade);

  private readonly dom = inject(DomManipulationService);
  private readonly document = inject(DOCUMENT);

  episode = input<ChtnkEpisode>({ title: '', images: [] });
  playlistLink = input("");
  currentPlaylistItem = input<PlaylistItem | undefined>();
  playlistInput = input<Playlist>([]);

  pageChange = output<{ total: number, current: number[] }>();

  @ViewChild('viewRef', { static: true }) viewRef!: ElementRef;

  constructor(private el: ElementRef, public lang: LangService) {
    this.nsfw.show.set(false);
    this.pageTracking.activeIndexes.set([]);
    this.readlist.connect(this.playlistInput, this.currentPlaylistItem);
    this.pageTracking.connectPagesCount(this.episode);
  }

  viewElement: WritableSignal<HTMLElement> = signal(this.document.createElement('div'));
  imageElements: Signal<NodeListOf<Element>> = computed(() => this.viewElement().querySelectorAll('.page img[id*=page_]'));

  ngAfterViewInit() {
    this.viewerUi.initViewElement(this.el.nativeElement);
    this.viewerUi.initFullscreenListener();
    this.viewElement.set(this.viewRef.nativeElement);
    this.pageTracking.initZone(this.viewElement(), this.el.nativeElement, this.imageElements());
    this.pageTracking.pageChangeFunction = this.onPageChange.bind(this);
    this.pageTracking.updateActiveIndexes();
    this.scroll.initZone(this.viewElement(), this.el.nativeElement);
    this.embedFacade.loadCurrentPlaylistItem();
    this.tagTitle.initialize(this.episode);

    setTimeout(() => { this.scroll.toRoutePage() }, 100);
  }

  onPageChange(total: number, current: number[]) {
    this.pageChange.emit({ total, current });
  }

  @HostListener('scroll')
  onScroll() {
    this.pageTracking.updateActiveIndexes();
    this.scroll.scrollStartVibration();
  }

  @HostListener('scrollend')
  onScrollEnd() {
    this.scroll.scrollEndVibration();
  }

  @HostListener('window:resize')
  onResize() {
    this.pageTracking.updateActiveIndexes();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.keyboard.handleKeyboardEvent(event);
  }

  @HostListener('wheel', ['$event'])
  handleWheelEvent(event: WheelEvent): void {
    if (this.viewerUi.isDialogOpen() || this.viewMode.mode() != "pages") return;

    this.scroll.scrollByWheel(event, this.viewMode.dir());
  }

  onViewClick(event: Event) {
    if (!this.dom.isInteractiveElement(event.target as HTMLElement)) this.viewerUi.toggleOverlay();
  }
  onViewDblClick(event: Event) {
    if (!this.dom.isInteractiveElement(event.target as HTMLElement)) this.viewerUi.toggleFullScreen();
  }

  //
  //
  //

  getCaption(filename: string | undefined): ChtnkCaption[] {
    return this.episode().captions?.filter(caption => caption.id === filename) || [];
  }

  getFrame(filename: string | undefined): ChtnkFrame[] {
    return this.episode().frames?.filter(frame => frame.id === filename) || [];
  }

  captionLang = signal<string>('en');
}
