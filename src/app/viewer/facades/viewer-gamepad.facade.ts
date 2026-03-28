import { effect, inject, Injectable } from "@angular/core";
import { GamepadService } from "../../shared/data-access";
import { GamepadButton } from "../../shared/models";
import { ViewerUiFacade } from "./viewer-ui.facade";
import { ViewModeFacade } from "./view-mode.facade";
import { ViewerScrollFacade } from "./viewer-scroll.facade";

@Injectable()
export class GamepadFacade {
    private viewerUi = inject(ViewerUiFacade);
    private viewMode = inject(ViewModeFacade);
    private scroll = inject(ViewerScrollFacade);

    gamepad = inject(GamepadService);

    constructor() {
        this.initeGamepadKeys();
    }

    private initeGamepadKeys() {
        effect(() => {
            for (const [btn, action] of Object.entries(this.gamepadActionMap)) {
                if (this.gamepad.buttons()[parseInt(btn)]?.pressed) action();
            }
        })
    }

    private gamepadActionMap: Record<number, Function> = {
        [GamepadButton.L1]: () => this.scroll.scrollLeft(),
        [GamepadButton.R1]: () => this.scroll.scrollRight(),
        [GamepadButton.DPadLeft]: () => this.scroll.scrollLeft(),
        [GamepadButton.DPadRight]: () => this.scroll.scrollRight(),
        [GamepadButton.DPadUp]: () => this.scroll.scrollUp(),
        [GamepadButton.DPadDown]: () => this.scroll.scrollDown(),
        [GamepadButton.Square]: () => this.viewerUi.toggleFullScreen(),
        [GamepadButton.Options]: () => this.viewerUi.toggleOverlay(),
        [GamepadButton.Triangle]: () => this.viewMode.toggleViewModeOption(),
    };
}