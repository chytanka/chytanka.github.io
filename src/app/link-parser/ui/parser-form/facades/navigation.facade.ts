import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LinkParserFacade } from './link-parser.facade';

@Injectable()
export class NavigationFacade {
    constructor(private router: Router, private linkFacade: LinkParserFacade) { }

    goToParsedLink() {
        const data = this.linkFacade.linkData();
        if (!data) return;
        this.router.navigateByUrl(`/${data.site}/${data.id64}`);
    }
}