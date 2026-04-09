import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from './utils/truncate.pipe';
import { TextEmbracerComponent } from './ui/text-embracer/text-embracer.component';
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
import { FileChangeComponent } from './ui/file-change/file-change.component';
import { ChytankaLogoWithTagsComponent } from './ui/chytanka-logo-with-tags/chytanka-logo-with-tags.component';
import { FileSizePipe } from './pipes/filesize.pipe';
import { RoughPaperComponent } from './ui/filters/rough-paper/rough-paper.component';
import { SharpenComponent } from './ui/filters/sharpen/sharpen.component';
import { ImgMetaDirective } from './directives/img-meta.directive';
import { NewTabDirective } from './directives/new-tab.directive';
import { VibrateHapticDirective } from './directives/vibrate-haptic.directive';
import { GamepadCursorComponent } from './ui/gamepad-cursor/gamepad-cursor.component';
import { SircleBlurComponent } from './ui/filters/sircle-blur/sircle-blur.component';
import { DropZoneComponent } from './ui/drop-zone/drop-zone.component';
import { SourceCopyrightComponent } from './ui/source-copyright/source-copyright.component';
import { SourceCopyrightLogoComponent } from './ui/source-copyright-logo/source-copyright-logo.component';
import { SloganComponent } from './ui/slogan/slogan.component';
import { ToggleBarComponent } from './ui/toggle-bar/toggle-bar.component';

const components = [GamepadCursorComponent, TruncatePipe, TextEmbracerComponent, OverlayComponent, ViewModeBarComponent, MadeInUkraineComponent, DialogComponent, LangToggleComponent, TitleCardComponent, LoadingComponent, SeparatorComponent, FileChangeComponent, ChytankaLogoWithTagsComponent, FileSizePipe, VibrateHapticDirective, SircleBlurComponent, DropZoneComponent, SourceCopyrightComponent, SourceCopyrightLogoComponent, SloganComponent, NsfwWarningComponent, ImgMetaDirective, NewTabDirective, PagesIndicatorComponent, WarmFilterComponent, WarmControlComponent, ToggleBarComponent]

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RoughPaperComponent,
    SharpenComponent
  ],
  exports: [...components]
})
export class SharedModule { }
