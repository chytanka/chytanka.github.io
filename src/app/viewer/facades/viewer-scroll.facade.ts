import { inject, Injectable, signal } from "@angular/core";
import { DomManipulationService } from "../../shared/data-access";
import { VibrationService } from "../../shared/data-access/vibration.service";
import { ActivatedRoute } from "@angular/router";
import { PageTrackingFacade } from "./page-tracking.facade";

@Injectable()
export class ViewerScrollFacade {
    pageTracking = inject(PageTrackingFacade);

    private _isScrollStart: boolean = false;

    private readonly _verAmount = 256;
    private _pagesElement = signal<HTMLElement | null>(null);
    private _longStripElement = signal<HTMLElement | null>(null);
    private dm = inject(DomManipulationService);
    private vibration = inject(VibrationService);

    initZone(pagesElement: HTMLElement, longStripElement: HTMLElement) {
        this._pagesElement.set(pagesElement);
        this._longStripElement.set(longStripElement);
    }

    scrollLeft() {
        this.dm.scrollHor(this._pagesElement()!, -this._longStripElement()!.clientWidth)
    }

    scrollRight() {
        this.dm.scrollHor(this._pagesElement()!, this._longStripElement()!.clientWidth)
    }

    scrollUp() {
        this.dm.scrollVer(this._longStripElement()!, -this._verAmount)
    }
    scrollDown() {
        this.dm.scrollVer(this._longStripElement()!, this._verAmount)
    }

    scrollStartVibration() {
        if (!this._isScrollStart) {
            this._isScrollStart = true;
            this.vibration.vibrate(10);
        }
    }
    scrollEndVibration() {
        this.vibration.vibrate([5, 5, 10]);
        this._isScrollStart = false;
    }

    scrollByWheel(event: WheelEvent, dir: "ltr" | "rtl" = "ltr") {
        if (!this._pagesElement()) return;

        const revers: number = dir == "ltr" ? 1 : -1
        const scrollAmountX = this._pagesElement()!.clientWidth;

        if (event.deltaY !== 0 && !event.shiftKey) {
            this._pagesElement()!.scrollLeft += event.deltaY * revers > 0 ? scrollAmountX : -scrollAmountX;
            event.preventDefault();
        }
    }

    scrollToPage(index: number, behavior: ScrollBehavior = 'smooth') {
        // const el = this._pagesElement()!.querySelector(`#page_${index + 1}`);
        const el = this._pagesElement()!.querySelector(`[data-page-index="${index}"]`);

        el?.scrollIntoView({
            behavior: behavior,
            block: 'start',
            inline: 'center'
        });
    }

    private route = inject(ActivatedRoute);

    toRoutePage() {
        const routePage = this.route.snapshot.queryParamMap.get('page');
        if (routePage) {
            const pageIndex = parseInt(routePage, 10) - 1;

            if (!isNaN(pageIndex) && pageIndex >= 0) {
                this.scrollToPage(pageIndex, 'instant');
            }
        }
    }
}