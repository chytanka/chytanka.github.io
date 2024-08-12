import { Component, EventEmitter, Output, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-nsfw-warning',
  templateUrl: './nsfw-warning.component.html',
  styleUrl: './nsfw-warning.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NsfwWarningComponent {
  @Input() title: string = `⚠️🔞 NSFW Content`;
  @Input() text = "The following content may be <b>Not Safe For Work</b>. Viewer discretion is advised.";

  @Input() labelAgree: string = "Ready for the wild side!"
  @Input() labelDisagree: string = "I'll pass, let's keep it safe."

  @Output() agree: EventEmitter<void> = new EventEmitter();
  @Output() disagree: EventEmitter<void> = new EventEmitter();

  onAgree() {
    this.agree.emit();
  }

  onDisagree() {
    this.disagree.emit();
  }
}

