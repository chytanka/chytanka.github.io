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
    TitleCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [TruncatePipe, TextEmbracerComponent, ViewerComponent, OverlayComponent, ViewModeBarComponent, MadeInUkraineComponent, DialogComponent, LangToggleComponent, TitleCardComponent]
})
export class SharedModule { }
