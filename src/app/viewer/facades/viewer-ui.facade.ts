import { DOCUMENT, isPlatformServer } from "@angular/common";
import { inject, Injectable, PLATFORM_ID, signal } from "@angular/core";
import { DomManipulationService } from "../../shared/data-access";

@Injectable()
export class ViewerUiFacade {
    private platformId = inject(PLATFORM_ID);

    private _viewElement = signal<HTMLElement | null>(null);
    private document = inject(DOCUMENT);
    private dm = inject(DomManipulationService);

    isFullScreen = signal(false);
    showOverlay = signal(false);
    isDialogOpen = signal(false);

    toggleOverlay = () => {
        this.showOverlay.update(v => !v);
    }

    // TODO: Fix scroll position reset after exiting fullscreen in pages mode
    toggleFullScreen = () => {
        if (this._viewElement() == null) return;
        // const activeIndexs = this.activeIndexs();
        // const page = (activeIndexs.length == 1) ? activeIndexs[0] : activeIndexs.filter(v => v+1 % 2 != 0)[0];
        // console.log(activeIndexs, page);

        this.dm.toggleFullScreen(this._viewElement()!);

        // if (page != undefined)
        //   setTimeout(() => {this.onActive(page)}, 100);
    }

    setDialog(open: boolean) {
        this.isDialogOpen.set(open);
    }

    initViewElement(element: HTMLElement) {
        this._viewElement.set(element);
    }

    initFullscreenListener() {
        if (this._viewElement() == null || isPlatformServer(this.platformId)) return;

        addEventListener("fullscreenchange", () => {
            this.isFullScreen.set(this.document.fullscreenElement === this._viewElement());
        });
    }
}