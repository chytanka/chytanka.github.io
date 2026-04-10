import { Component, computed, inject, signal } from '@angular/core';
import { LinkParserSettingsService } from '../../../link-parser/data-access/link-parser-settings.service';
import { LangService } from '../../data-access';
import { ThemeService } from '../../data-access/theme.service';

@Component({
  selector: 'slogan',
  standalone: false,

  templateUrl: './slogan.component.html',
  styleUrl: './slogan.component.scss'
})
export class SloganComponent {
  private setts = inject(LinkParserSettingsService)
  private theme = inject(ThemeService)
  private lang = inject(LangService);

  private seasonalTheme = signal(new Map<string, { class: string, phrase: string, emoji: string }>([
    ["pride", { class: 'slogan-rainbow', phrase: "sloganPride", emoji: '🏳️‍🌈' }],
    ["halloween", { class: 'slogan-halloween', phrase: 'sloganHalloween', emoji: '🕷️' }],
    ["newyear", { class: 'slogan-newyear', phrase: 'sloganNewYear', emoji: '🎇' }],
    ["valentine", { class: 'slogan-valentine', phrase: 'sloganValentine', emoji: '❤️📖' }]
  ]));

  private readonly sloganData = computed(() => {
    const defaultSlogan = {
      text: this.lang.ph().slogan,
      class: null,
      emoji: '🌻'
    };

    if (!this.theme.seasonalTheme()) return defaultSlogan;

    const theme = this.seasonalTheme().get(this.theme.theme());

    if (!theme) return defaultSlogan;

    return {
      text: this.lang.ph().getByKey(theme.phrase),
      class: theme.class,
      emoji: theme.emoji
    };
  });

  protected readonly slogan = computed(() => this.sloganData().text);
  protected readonly sloganClass = computed(() => this.sloganData().class);
  protected readonly sloganEmoji = computed(() => this.sloganData().emoji);
}
