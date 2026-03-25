import { ChangeDetectionStrategy, Component, Signal, computed, input } from '@angular/core';

@Component({
  selector: 'app-text-embracer',
  templateUrl: './text-embracer.component.html',
  styleUrl: './text-embracer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class TextEmbracerComponent {

  text = input<string>('')

  public letters: Signal<string[]> = computed(() => this.split(this.text()));

  split(text: string) {
    return Array.from(text);
  }

}
