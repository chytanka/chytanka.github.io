import { Component, EventEmitter, HostListener, inject, input, InputSignal, output, signal, ViewChild } from '@angular/core';
import { BrowserService, DomManipulationService, ViewerService } from '../../../../data-access';
import { LangService } from '../../../../data-access/lang.service';
import { DialogComponent } from '../../../dialog/dialog.component';
import { Playlist, PlaylistItem } from '../../../../../playlist/data-access/playlist.service';
import { CompositionEpisode } from '../../../../../@site-modules/@common-read';

@Component({
  selector: 'app-viewer-footer',
  templateUrl: './viewer-footer.component.html',
  styleUrl: './viewer-footer.component.scss',
  standalone: false
})
export class ViewerFooterComponent {
  viewer: ViewerService = inject(ViewerService)
  lang: LangService = inject(LangService)
  domMan = inject(DomManipulationService)
  browser = inject(BrowserService);

  show = input(false);
  activeIndexs = input<number[]>([])
  episode = input<CompositionEpisode | undefined>();
  playlist = input<Playlist>([]);
  playlistLink = input("");
  currentPlaylistItem = input<PlaylistItem | undefined>();

  togglefulscreen = output<void>();
  pageactive = output<number>();
  onToggle = output<boolean>();


  isDialogOpen = signal(false);

  @ViewChild('playlistDialog') playlistDialogComponent!: DialogComponent;
  showPlayList = () => this.playlistDialogComponent.showDialog();

  hotKeys = new Map<string, Function>()
    .set('Ctrl+KeyP', this.showPlayList)

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.domMan.setHotkeys(event, this.hotKeys)
  }

  onActive(event: number) {
    this.pageactive.emit(event)
  }

  onToggleFullScreen() {
    this.togglefulscreen.emit()
  }
}
