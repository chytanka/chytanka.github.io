import { Component, HostListener, PLATFORM_ID, effect, inject } from '@angular/core';
import { LangService } from './shared/data-access/lang.service';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { environment } from '../environments/environment';
import { DISPLAY_MODES, LinkParserSettingsService } from './link-parser/data-access/link-parser-settings.service';
import { GamepadService } from './shared/data-access/gamepad.service';
import { GamepadButton } from './shared/models';
import { deadzone } from './shared/utils';
import { DomManipulationService } from './shared/data-access';

const SCALE_GAP = 64;

@Component({
  selector: 'chtnk-root',
  template: `<gamepad-cursor [cursorVisible]="gamepad.cursorVisible()" [x]="gamepad.x()" [y]="gamepad.y()" /><div><router-outlet></router-outlet></div><div><router-outlet name="right"></router-outlet></div><sircle-blur [radius]="8" />`,
  styles: [``],
  standalone: false
})
export class AppComponent {
  private readonly document = inject(DOCUMENT);
  platformId = inject(PLATFORM_ID)
  setts = inject(LinkParserSettingsService)
  gamepad = inject(GamepadService);
  dom = inject(DomManipulationService);

  constructor(public lang: LangService, private route: ActivatedRoute) {
    this.lang.updateManifest()
    this.lang.updateTranslate()

    this.handleLanguageQueryParams();

    this.displayWelcomeMessage();

    effect(() => {
      // Update display mode based on settings
      this.updateDisplayMode();
      // Handle gamepad input
      this.handleGamepadInput();
    });
  }

  private handleLanguageQueryParams() {
    this.route.pathFromRoot[0].queryParams.subscribe(async (q) => {
      const l = q['lang'];

      if (l) {
        this.lang.setLang(l);
      }

      if (l && this.lang.manifests.has(l)) {
        this.lang.updateManifest();
      }
    });
  }

  private displayWelcomeMessage() {
    if (isPlatformBrowser(this.platformId) && window.console && environment.prod) {
      const msg = `What are you looking for here? The plot twist is in the next volume!`;
      console.log(`%c${msg}`, "background-color: #166496; color: #ffd60a; font-size: 4rem; font-family:  monospace; padding: 8px 16px");
    }
  }

  private handleGamepadInput() {
    // Move cursor based on left gamepad stick input
    this.cursorMove(this.gamepad.leftStick());
    this.showCursor(this.gamepad.leftStick());
    this.scrollByStick(this.gamepad.rightStick());

    // Imitate click if the Cross/A button is pressed
    if (this.gamepad.buttons()[GamepadButton.Cross]?.pressed)
      this.imitateClick({ x: this.gamepad.x(), y: this.gamepad.y() });

    // Imitate Escape key press if the Circle/B button is pressed
    if (this.gamepad.buttons()[GamepadButton.Circle]?.pressed)
      this.imitateEscape();
  }

  private showCursor(coords: { x: number, y: number }) {
    const { x, y } = coords;

    if (Math.abs(x) > 0.01 || Math.abs(y) > 0.01) {
      this.gamepad.showCursor();
    }
  }

  private imitateEscape() {
    const event = new KeyboardEvent('keydown', {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      which: 27,
      bubbles: true
    });

    document.dispatchEvent(event);
  }

  private imitateClick(coords: { x: number, y: number }) {
    const { x, y } = coords;
    const el = document.elementFromPoint(x - window.scrollX, y - window.scrollY) as HTMLElement;
    if (el) {
      el.focus();
      el.click();
    }
  }

  private cursorMove(coords: { x: number, y: number }) {
    if (isPlatformServer(this.platformId)) return;

    const { x, y } = coords;
    const speed = 16;
    const halfCursor = 8;
    this.gamepad.x.update(v => {
      const result = v + x * speed;
      return Math.max(halfCursor, Math.min(this.document.documentElement.scrollWidth - halfCursor, result));
    });
    this.gamepad.y.update(v => {
      const result = v + y * speed;
      return Math.max(halfCursor, Math.min(this.document.documentElement.scrollHeight - halfCursor, result));
    });
    this.dom.updateHover(this.gamepad.x() - window.scrollX, this.gamepad.y() - window.scrollY);
  }

  private scrollByStick(coords: { x: number, y: number }) {
    if (isPlatformServer(this.platformId)) return;

    const { x, y } = coords;
    const target = this.document.elementFromPoint(this.gamepad.x(), this.gamepad.y()) as HTMLElement;
    const scrollContainer = this.dom.getScrollableParent(target);
    const scrollSpeed = 20 + Math.abs(y) * 60;
    const scrollX = deadzone(x) * scrollSpeed;
    const scrollY = deadzone(y) * scrollSpeed;

    if (!scrollContainer || (scrollX === 0 && scrollY === 0)) return;

    scrollContainer.scrollBy({
      left: scrollX,
      top: scrollY,
    });
  }

  ngOnInit() {
    this.initScaleDifference();
    this.updateDisplayMode();
  }

  updateDisplayMode() {
    if (this.setts.displayMode != undefined) {
      for (const mode of DISPLAY_MODES) {
        this.document.documentElement.classList.remove(mode);
      }
      this.document.documentElement.classList.add(this.setts.displayMode() + 'mode');
    }
  }

  @HostListener('window:resize')
  initScaleDifference() {
    const w = this.document.documentElement.clientWidth;
    const h = this.document.documentElement.clientHeight;
    const scalex = 1 - ((w - SCALE_GAP) / w)
    const scaley = 1 - ((h - SCALE_GAP) / h)

    this.document.documentElement.style.setProperty('--scale-diff-x', scalex.toString())
    this.document.documentElement.style.setProperty('--scale-diff-y', scaley.toString())
  }
}
