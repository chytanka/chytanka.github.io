import { inject, Injectable, signal } from "@angular/core";
import { EmbedFacade } from "./viewer-embed.facade";
import { Router } from "@angular/router";

@Injectable()
export class NsfwFacade {
    private embedFacade = inject(EmbedFacade);
    private router = inject(Router);

    show = signal(false);

    agree() {
        this.show.set(true);
        this.embedFacade.postNsfwChoice(true);
    }

    disagree() {
        this.show.set(false);
        this.embedFacade.postNsfwChoice(false);

        if (!this.embedFacade.embedHelper.isEmbedded())
            this.router.navigate(['/'])
    }
}