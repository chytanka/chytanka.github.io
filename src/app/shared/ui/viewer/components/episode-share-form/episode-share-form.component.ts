import { Component, computed, inject, input, output, PLATFORM_ID, Signal } from '@angular/core';
import { DomManipulationService, ViewerService } from '../../../../data-access';
import { CompositionEpisode } from '../../../../../@site-modules/@common-read';
import { isPlatformBrowser } from '@angular/common';
import { LangService } from '../../../../data-access/lang.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'episode-share-form',
  standalone: false,

  templateUrl: './episode-share-form.component.html',
  styleUrls: ['./episode-share-form.component.scss', '../../../../../shared/ui/@styles/input-group.scss']
})
export class EpisodeShareFormComponent {
  platformId = inject(PLATFORM_ID)
  domMan = inject(DomManipulationService)
  sanitizer = inject(DomSanitizer);
  lang = inject(LangService)
  viewer = inject(ViewerService)


  episode = input<CompositionEpisode>({
    title: '',
    images: []
  })
  playlistLink = input("");

  shareLinkUpdate = output<string>();


  link: Signal<string> = computed(() => {
    const L = (isPlatformBrowser(this.platformId)) ? window.location : { origin: '', pathname: '' }
    const link = (`${L.origin + L.pathname}?vm=${this.viewer.viewModeOption().code}&lang=${this.lang.lang()}&list=${this.playlistLink()}`);
    this.shareLinkUpdate.emit(link)
    return link;
  });

  iframe = computed(() =>
    `<iframe style="width: 100%; aspect-ratio: 3/2; overflow: auto; resize: vertical; max-height: 90dvh; padding-bottom: 1ch;" src="${this.link()}" frameborder="0" allowfullscreen title="Chytanka">\</iframe>`
  )
  embed = computed(() => this.sanitizer.bypassSecurityTrustUrl(this.link()));

  shareWith() {
    const shareData = {
      title: this.episode().title,
      url: this.link(),
    };
    navigator?.share(shareData)
  }
}
