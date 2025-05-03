import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from './utils/truncate.pipe';
import { TextEmbracerComponent } from './ui/text-embracer/text-embracer.component';
import { ViewerComponent } from './ui/viewer/viewer.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { WarmFilterComponent } from './ui/warm-filter/warm-filter.component';
import { OverlayComponent } from './ui/overlay/overlay.component';
import { ViewModeBarComponent } from './ui/view-mode-bar/view-mode-bar.component';
import { WarmControlComponent } from './ui/warm-control/warm-control.component';
import { PagesIndicatorComponent } from './ui/pages-indicator/pages-indicator.component';
import { NsfwWarningComponent } from './ui/nsfw-warning/nsfw-warning.component';
import { MadeInUkraineComponent } from './ui/made-in-ukraine/made-in-ukraine.component';
import { DialogComponent } from './ui/dialog/dialog.component';
import { LangToggleComponent } from './ui/lang-toggle/lang-toggle.component';
import { TitleCardComponent } from './ui/title-card/title-card.component';
import { LoadingComponent } from './ui/loading/loading.component';
import { SeparatorComponent } from './ui/separator/separator.component';
import { MangaPageComponent } from './ui/manga-page/manga-page.component';
import { HintPageComponent } from './ui/viewer/components/hint-page/hint-page.component';
import { ViewerFooterComponent } from './ui/viewer/components/viewer-footer/viewer-footer.component';
import { ViewerHeaderComponent } from './ui/viewer/components/viewer-header/viewer-header.component';
import { MangaPageEvenComponent } from './ui/manga-page/manga-page-even.component';
import { FileChangeComponent } from './ui/file-change/file-change.component';
import { ChytankaLogoWithTagsComponent } from './ui/chytanka-logo-with-tags/chytanka-logo-with-tags.component';
import { FileSizePipe } from './pipes/filesize.pipe';
import { RoughPaperComponent } from './ui/filters/rough-paper/rough-paper.component';
import { SharpenComponent } from './ui/filters/sharpen/sharpen.component';



@NgModule({
  declarations: [
    TruncatePipe,
    TextEmbracerComponent,
    ViewerComponent,
    WarmFilterComponent,
    OverlayComponent,
    ViewModeBarComponent,
    WarmControlComponent,
    PagesIndicatorComponent,
    NsfwWarningComponent,
    MadeInUkraineComponent,
    DialogComponent,
    LangToggleComponent,
    TitleCardComponent,
    LoadingComponent,
    SeparatorComponent,
    MangaPageComponent,
    HintPageComponent,
    ViewerFooterComponent,
    ViewerHeaderComponent,
    MangaPageEvenComponent,
    FileChangeComponent,
    ChytankaLogoWithTagsComponent,
    FileSizePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RoughPaperComponent,
    SharpenComponent
  ],
  exports: [TruncatePipe, TextEmbracerComponent, ViewerComponent, OverlayComponent, ViewModeBarComponent, MadeInUkraineComponent, DialogComponent, LangToggleComponent, TitleCardComponent, LoadingComponent, SeparatorComponent, FileChangeComponent, ChytankaLogoWithTagsComponent, FileSizePipe]
})
export class SharedModule { }
