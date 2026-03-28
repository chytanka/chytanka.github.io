import { Injectable, inject } from "@angular/core";
import { ViewerUiFacade } from "./viewer-ui.facade";
import { DomManipulationService } from "../../shared/data-access";
import { ViewerScrollFacade } from "./viewer-scroll.facade";
import { ViewModeFacade } from "./view-mode.facade";

@Injectable()
export class KeyboardFacade {
    domMan = inject(DomManipulationService)

    private viewerUi = inject(ViewerUiFacade);
    private viewMode = inject(ViewModeFacade);
    private scroll = inject(ViewerScrollFacade);


    private _hotKeys = new Map<string, Function>()

    constructor() {
        this.initHotKeys();
    }

    private initHotKeys() {
        this._hotKeys.set('KeyF', () => this.viewerUi.toggleFullScreen())
        this._hotKeys.set('KeyE', () => this.viewerUi.toggleOverlay())
        this._hotKeys.set('KeyM', () => this.viewMode.toggleViewModeOption())
        this._hotKeys.set('KeyA', () => this.scroll.scrollLeft())
        this._hotKeys.set('KeyD', () => this.scroll.scrollRight())
        this._hotKeys.set('KeyW', () => this.scroll.scrollUp())
        this._hotKeys.set('KeyS', () => this.scroll.scrollDown())
    }

    handleKeyboardEvent(event: KeyboardEvent) {
        this.domMan.setHotkeys(event, this._hotKeys)
    }
}