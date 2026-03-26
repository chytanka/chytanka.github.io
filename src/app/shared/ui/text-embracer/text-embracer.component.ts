import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-text-embracer',
  templateUrl: './text-embracer.component.html',
  styleUrl: './text-embracer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class TextEmbracerComponent {
  text = input<string>('')
  protected letters = computed(() => Array.from(this.text()));
}
