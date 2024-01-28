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
    NsfwWarningComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [TruncatePipe, TextEmbracerComponent, ViewerComponent]
})
export class SharedModule { }
