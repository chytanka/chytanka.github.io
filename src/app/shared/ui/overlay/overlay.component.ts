import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-overlay',
  template: `<ng-content />`,
  styleUrl: './overlay.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverlayComponent {

}
