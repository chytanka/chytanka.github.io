import { Component, output, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-nsfw-warning',
  templateUrl: './nsfw-warning.component.html',
  styleUrl: './nsfw-warning.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class NsfwWarningComponent {
  title = input(`⚠️🔞 NSFW Content`);
  text = input("The following content may be <b>Not Safe For Work</b>. Viewer discretion is advised.");

  labelAgree = input("Ready for the wild side!")
  labelDisagree = input("I'll pass, let's keep it safe.")

  agree = output()
  disagree = output()

  onAgree() {
    this.agree.emit();
  }

  onDisagree() {
    this.disagree.emit();
  }
}

