import { Component, computed, EventEmitter, HostListener, inject, Input, Output, PLATFORM_ID, Signal, signal, ViewChild } from '@angular/core';
import { DomManipulationService, ViewerService } from '../../../../data-access';
import { CompositionEpisode } from '../../../../../@site-modules/@common-read';
import { Playlist, PlaylistItem } from '../../../../../playlist/data-access/playlist.service';
import { LangService } from '../../../../data-access/lang.service';
import { DialogComponent } from '../../../dialog/dialog.component';
import { EmbedHalperService } from '../../../../data-access/embed-halper.service';
import { DownloadService } from '../../../../data-access/download.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Base64 } from '../../../../utils';
import { isPlatformBrowser } from '@angular/common';

// const L = window.location;

@Component({
  selector: 'app-viewer-header',
  templateUrl: './viewer-header.component.html',
  styleUrls: [
    './viewer-header.component.scss',
    '/src/app/shared/ui/@styles/input-group.scss'
  ]
})
export class ViewerHeaderComponent {
  viewer: ViewerService = inject(ViewerService)
  lang: LangService = inject(LangService)
  embedHelper = inject(EmbedHalperService);
  dl: DownloadService = inject(DownloadService);
  domMan = inject(DomManipulationService)
  sanitizer: DomSanitizer = inject(DomSanitizer);

  platformId = inject(PLATFORM_ID)

  isDialogOpen = signal(false);


  @Input() show: boolean = false;
  @Input() playlistLink: string = "";
  @Input() currentPlaylistItem: PlaylistItem | undefined;

  // @Input() playlist: Playlist = [];
  @Input() episode: CompositionEpisode | undefined = undefined;
  @Output() onToggle: EventEmitter<boolean> = new EventEmitter<boolean>();


  @ViewChild('shareDialog') shareDialogComponent!: DialogComponent;
  showShare = () => this.shareDialogComponent.showDialog();

  @ViewChild('downloadDialog') dlDialogComponent!: DialogComponent;
  showDownload = () => this.dlDialogComponent.showDialog();

  setViewModeOption(e: any) {
    this.viewer.setViewModeOption(e);
    this.viewer.saveViewModeOption();
  }

  hotKeys = new Map<string, Function>()
    .set('Ctrl+KeyE', this.showShare)
    .set('Ctrl+KeyS', this.showDownload)

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.domMan.setHotkeys(event, this.hotKeys)
  }

  isFileRoute =  computed(() => {
    const L = (isPlatformBrowser(this.platformId)) ? window.location : { pathname: '' }

    return L.pathname.startsWith('/file/')
})

  link: Signal<string> =
    //decodeURIComponent
    computed(() => {
      const L = (isPlatformBrowser(this.platformId)) ? window.location : { origin: '', pathname: '' }
      return (`${L.origin + L.pathname}?vm=${this.viewer.viewModeOption().code}&lang=${this.lang.lang()}&list=${this.playlistLink}`)
    });

  iframe = computed(() =>
    `<iframe style="width: 100%; aspect-ratio: 3/2; overflow: auto; resize: vertical; max-height: 90dvh; padding-bottom: 1ch;" src="${this.link()}" frameborder="0" allowfullscreen title="Chytanka">\</iframe>`
  )
  embed = computed(() => this.sanitizer.bypassSecurityTrustUrl(this.link()));

  genId(): string {
    return Base64.toBase64(JSON.stringify(this.currentPlaylistItem))
  }
}
