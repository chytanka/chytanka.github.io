import { DOCUMENT, isPlatformServer } from "@angular/common";
import { effect, inject, Injectable, PLATFORM_ID, signal } from "@angular/core";
import { DomManipulationService } from "../../shared/data-access";
import { ViewerScrollFacade } from "./viewer-scroll.facade";
import { PageTrackingFacade } from "./page-tracking.facade";
import { ViewModeFacade } from "./view-mode.facade";

@Injectable()
export class ViewerUiFacade {
    private platformId = inject(PLATFORM_ID);
    private scroll = inject(ViewerScrollFacade);
    private pageTracking = inject(PageTrackingFacade);

    private _viewElement = signal<HTMLElement | null>(null);
    private document = inject(DOCUMENT);
    private dm = inject(DomManipulationService);

    isFullScreen = signal(false);
    showOverlay = signal(false);
    isDialogOpen = signal(false);

    toggleOverlay = () => {
        this.showOverlay.update(v => !v);
    }

    toggleFullScreen = () => {
        if (this._viewElement() == null) return;

        const page = this.getCurentPage();
        this.dm.toggleFullScreen(this._viewElement()!);
        this.scrollToCurrentPage(page);
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

    private getCurentPage() {
        const activeIndexs = this.pageTracking.activeIndexes();
        const page = (activeIndexs.length == 1) ? activeIndexs[0] : activeIndexs.filter(v => v + 1 % 2 != 0)[0];

        return page;
    }

    private scrollToCurrentPage(page: number) {
        if (page != undefined)
            setTimeout(() => {
                this.scroll.scrollToPage(page, 'instant');
            }, 100);
    }
}