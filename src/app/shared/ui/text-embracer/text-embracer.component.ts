import { ChangeDetectionStrategy, Component, Input, Signal, WritableSignal, computed, signal } from '@angular/core';

@Component({
    selector: 'app-text-embracer',
    templateUrl: './text-embracer.component.html',
    styleUrl: './text-embracer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class TextEmbracerComponent {

  private _text: WritableSignal<string> = signal('');

  public letters: Signal<string[]> = computed(() => this.split(this._text()));

  @Input() set text(v: string) { this._text.set(v); }


  split(text: string) {
    return Array.from(text);
  }


}
