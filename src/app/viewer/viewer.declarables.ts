import { Type } from "@angular/core";
import { ViewerComponent } from "./viewer/viewer.component";
import { EpisodeDownloadFormComponent, EpisodeInfoTableComponent, EpisodeShareFormComponent, HintPageComponent, MangaPageComponent, MangaPageEvenComponent, PageComponent, ThanksPageComponent, ViewerFooterComponent, ViewerHeaderComponent } from "./viewer/components";

export const VIEWER_DECLARABLES: Type<any>[] = [
    ViewerComponent,
    PageComponent,
    HintPageComponent,
    ThanksPageComponent,
    EpisodeInfoTableComponent,
    EpisodeShareFormComponent,
    EpisodeDownloadFormComponent,
    MangaPageComponent,
    MangaPageEvenComponent,
    ViewerFooterComponent,
    ViewerHeaderComponent,
];