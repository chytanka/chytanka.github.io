import { inject, Injectable, Signal } from "@angular/core";
import { parseTags, resolveViewMode } from "../../shared/utils";
import { ViewModeFacade } from "./view-mode.facade";
import { CompositionEpisode } from "../../@site-modules/@common-read";

/**
 * Facade for the viewer title tag. 
 * This is used to set view mode by tags in title
 * and set nsfw warning y tags in title.
 */

@Injectable()
export class ViewerTitleTagFacade {
    viewMode = inject(ViewModeFacade);

    private _episode!: Signal<CompositionEpisode>;

    initialize(ep: Signal<CompositionEpisode>) {
        this._episode = ep;

        const tags = parseTags(this._episode().title);
        this.applyEpisodeTitleTags(tags);
    }

    private applyEpisodeTitleTags(tags: Set<string>): void {
        const code = resolveViewMode(tags);

        if (code) this.viewMode.setModeByCode(code);

        if (tags.has('nsfw')) {
            this._episode().nsfw = true;
        }
    }
}