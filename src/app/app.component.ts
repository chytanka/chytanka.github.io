import { Component, effect, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageFacadeService, GamepadFacadeService } from './core/facades';
import { DisplayModeService, ConsoleWelcomeService, ViewportService } from './core/services';

@Component({
  selector: 'chtnk-root',
  templateUrl: 'app.component.html',
  styles: [``],
  standalone: false,
  host: {
    '(window:resize)': 'this.viewport.updateScaleDiff()'
  }
})
export class AppComponent {
  private route = inject(ActivatedRoute);
  private lang = inject(LanguageFacadeService);
  private display = inject(DisplayModeService);
  private welcome = inject(ConsoleWelcomeService);
  protected viewport = inject(ViewportService);
  protected gamepad = inject(GamepadFacadeService);

  constructor() {
    this.lang.init(this.route);
    this.welcome.show();

    effect(() => this.display.update());
  }
}
