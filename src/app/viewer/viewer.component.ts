import { Component, input, signal } from '@angular/core';
import { CompositionEpisode } from '../@site-modules/@common-read';
import { PageComponent } from "./components/page/page.component";
import { PagesComponent } from "./components/pages/pages.component";

@Component({
  standalone: true,
  selector: 'chtnk-viewer',
  templateUrl: './viewer.component.html',
  styleUrl: './viewer.component.scss',
  imports: [PageComponent, PagesComponent],
  host: {
    '[class.panels]': 'panels()',
    '(click)': 'tooglePanels()',
  }
})
export class ViewerComponent {
  panels = signal(true);
  episode = input<CompositionEpisode>();

  tooglePanels() {
    this.panels.update(v => !v);
  }
}
