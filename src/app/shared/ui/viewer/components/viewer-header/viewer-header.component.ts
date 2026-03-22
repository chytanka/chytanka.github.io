import { Component, computed, effect, HostListener, inject, input, output, PLATFORM_ID, Signal, signal, ViewChild } from '@angular/core';
import { DomManipulationService, ViewerService } from '../../../../data-access';
import { CompositionEpisode } from '../../../../../@site-modules/@common-read';
import { PlaylistItem } from '../../../../../playlist/data-access/playlist.service';
import { LangService } from '../../../../data-access/lang.service';
import { DialogComponent } from '../../../dialog/dialog.component';
import { EmbedHalperService } from '../../../../data-access/embed-halper.service';
import { parseTags, resolveViewMode } from '../../../../utils';
import { isPlatformBrowser } from '@angular/common';
import { GamepadService } from '../../../../data-access/gamepad.service';
import { GamepadButton } from '../../../../models';

@Component({
  selector: 'app-viewer-header',
  templateUrl: './viewer-header.component.html',
  styleUrls: [
    './viewer-header.component.scss'
  ],
  standalone: false
})
export class ViewerHeaderComponent {
  // #region 🔧 Dependencies (inject)
  platformId = inject(PLATFORM_ID)
  domMan = inject(DomManipulationService)
  viewer = inject(ViewerService)
  lang = inject(LangService)
  embedHelper = inject(EmbedHalperService);
  gamepad = inject(GamepadService);
  // #endregion

  // #region 📥 Inputs / Outputs
  show = input(false);
  playlistLink = input("");
  currentPlaylistItem = input<PlaylistItem | undefined>();

  episode = input<CompositionEpisode>({
    title: '',
    images: []
  })

  onToggle = output<boolean>();
  //#endregion

  // #region 🧠 State (signals)
  isDialogOpen = signal(false);
  link = signal('');
  // #endregion

  // #region 🧮 Computed
  titleText = computed(() => {
    const { volume: v, chapter: ch, title: t } = this.episode();

    return [
      v && `${this.lang.ph().vol} ${v}`,
      ch && `${this.lang.ph().ch} ${ch}`,
      t ?? this.lang.ph().untitled
    ].filter(Boolean).join(' ')

  });
  isFileRoute = computed(() => {
    const L = (isPlatformBrowser(this.platformId)) ? window.location : { pathname: '' }

    return L.pathname.startsWith('/file/')
  })
  //#endregion

  // #region 🎮 ViewChild
  @ViewChild('shareDialog') shareDialogComponent!: DialogComponent;
  @ViewChild('downloadDialog') dlDialogComponent!: DialogComponent;
  @ViewChild('infoDialog') infoDialogComponent!: DialogComponent;
  // #endregion

  // #region ⚙️ Lifecycle / Effects
  constructor() {
    effect(() => {
      const episode = this.episode();
      if (!episode) return;
      const tags = this.parseTagsFromTitle(episode.title);
      this.applyEpisodeTitleTags(tags);

      if (this.gamepad.buttons()[GamepadButton.Share]?.pressed) this.showShare();
    })
  }
  //#endregion

  // #region 🏷️ Episode Tags Logic
  parseTagsFromTitle = (title: string): Set<string> => parseTags(title);

  applyEpisodeTitleTags(tags: Set<string>): void {
    const code = resolveViewMode(tags);

    if (code)
      this.viewer.setViewModeOptionByCode(code);

    if (tags.has('nsfw')) {
      this.episode().nsfw = true;
    }
  }
  //#endregion

  // #region 🧭 Actions (UI)
  showShare = () => this.shareDialogComponent.showDialog();
  showDownload = () => this.dlDialogComponent.showDialog();
  showInfo = () => this.infoDialogComponent.showDialog();

  setViewModeOption(e: any) {
    this.viewer.setViewModeOption(e);
    this.viewer.saveViewModeOption();
  }
  //#endregion

  //#region 📅 Events
  onShareLinkUpdate(link: string) {
    this.link.set(link)
  }
  //#endregion

  // #region ⌨️ Hotkeys
  hotKeys = new Map<string, Function>()
    .set('Ctrl+KeyE', this.showShare)
    .set('Ctrl+KeyS', this.showDownload)
    .set('Ctrl+KeyI', this.showInfo)

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.domMan.setHotkeys(event, this.hotKeys)
  }
  //#endregion
}
