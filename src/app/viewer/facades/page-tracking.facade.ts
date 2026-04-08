import { isPlatformServer } from "@angular/common";
import { Injectable, signal, computed, PLATFORM_ID, inject, Signal, effect } from "@angular/core";
import { ViewModeFacade } from "./view-mode.facade";
import { EmbedFacade } from "./viewer-embed.facade";
import { CompositionEpisode } from "../../@site-modules/@common-read";
import { ActivatedRoute, Router } from "@angular/router";

@Injectable()
export class PageTrackingFacade {
    private embedFacade = inject(EmbedFacade);
    private viewMode = inject(ViewModeFacade);

    private _pagesElement = signal<HTMLElement | null>(null);
    private _longStripElement = signal<HTMLElement | null>(null);
    private _figuresElement = signal<NodeListOf<Element> | null>(null);

    platformId = inject(PLATFORM_ID);
    activeIndexes = signal<number[]>([]);
    pagesCount = signal(0);

    pageChangeFunction: ((total: number, current: number[]) => void) | null = null;

    setActive(indexes: number[]) {
        this.activeIndexes.set(indexes);
    }

    preloadIndexes = computed(() =>
        this.activeIndexes().map(i => i + 1)
    );

    shouldPreload(i: number): boolean {
        return this.preloadIndexes().includes(i);
    }

    initZone(pagesElement: HTMLElement, longStripElement: HTMLElement, figuresElement: NodeListOf<Element>) {
        this._pagesElement.set(pagesElement);
        this._longStripElement.set(longStripElement);
        this._figuresElement.set(figuresElement);
    }

    private scheduled = false;

    updateActiveIndexes() {
        if (this.scheduled || isPlatformServer(this.platformId)) return;

        this.scheduled = true;

        requestAnimationFrame(() => {
            this.scheduled = false;
            this._update();
        });
    }

    connectPagesCount(episode: Signal<CompositionEpisode>) {
        effect(() => this.pagesCount.set(episode().images.length));
    }

    private _update() {
        const prewActive = this.activeIndexes();
        if (this._pagesElement() == null || this._longStripElement() == null || this._figuresElement() == null) return;

        const isPageMode = this.viewMode.mode() == 'pages';

        const viewRect: DOMRect = isPageMode
            ? this._pagesElement()!.getBoundingClientRect()
            : this._longStripElement()!.getBoundingClientRect();

        let activeIndxs: number[] = [];

        for (let i = 0; i < this._figuresElement()!.length; i++) {
            const img = this._figuresElement()![i];
            const rect = img.getBoundingClientRect();

            const hor = rect.right > viewRect.x && rect.right < viewRect.x + viewRect.width + 1;

            const ver = rect.top < viewRect.height && rect.bottom > viewRect.top

            if (isPageMode ? hor : ver) {
                activeIndxs.push(i)
            }

        }

        this.activeIndexes.set(activeIndxs);

        if (JSON.stringify(prewActive) === JSON.stringify(activeIndxs)) return;

        const total = this.pagesCount() || this._figuresElement()!.length;
        const current = activeIndxs.map(i => i + 1)

        if(!current.length) return;
        
        this.embedFacade.postPageChange(total, current);

        this.setRoutePage(current[current.length - 1] - 1);

        if (this.pageChangeFunction) this.pageChangeFunction(total, current);
    }
    private router = inject(Router);

    setRoutePage(index: number) {
        if (!index || index < 0) return;

        const queryParams = { page: index + 1 };

        this.router.navigate([], {
            queryParams: { ...queryParams },
            queryParamsHandling: 'merge',
        });
    }

}