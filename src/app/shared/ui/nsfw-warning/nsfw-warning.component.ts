import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-nsfw-warning',
  templateUrl: './nsfw-warning.component.html',
  styleUrl: './nsfw-warning.component.scss'
})
export class NsfwWarningComponent {
  title: string = `⚠️🔞 NSFW Content`;
  @Input() text = "The following content may be <b>Not Safe For Work</b>. Viewer discretion is advised.";
  @Output() agree: EventEmitter<void> = new EventEmitter();
  @Output() disagree: EventEmitter<void> = new EventEmitter();

  onAgree() {
    this.agree.emit();
  }

  onDisagree() {
    this.disagree.emit();
  }
}

