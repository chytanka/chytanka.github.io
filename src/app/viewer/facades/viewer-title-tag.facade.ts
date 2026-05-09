import { inject, Injectable, Signal } from "@angular/core";
import { parseTags, resolveViewMode } from "../../shared/utils";
import { ViewModeFacade } from "./view-mode.facade";
import { ChtnkEpisode } from "../../shared/models/chtnk-composition";

/**
 * Facade for the viewer title tag. 
 * This is used to set view mode by tags in title
 * and set nsfw warning y tags in title.
 */

@Injectable()
export class ViewerTitleTagFacade {
    viewMode = inject(ViewModeFacade);

    private _episode!: Signal<ChtnkEpisode>;

    initialize(ep: Signal<ChtnkEpisode>) {
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