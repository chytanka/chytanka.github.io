import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VIEWER_DECLARABLES } from './viewer.declarables';
import { SharedModule } from '../shared/shared.module';
import { EmbedFacade, GamepadFacade, KeyboardFacade, NsfwFacade, PageTrackingFacade, ReadlistFacade, ViewerScrollFacade, ViewerTitleTagFacade, ViewerUiFacade, ViewModeFacade } from './facades';
import { ViewerService } from './services';
import { TextComponent } from './viewer/components/text/text.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  providers: [
    ViewerService,
    NsfwFacade,
    GamepadFacade,
    EmbedFacade,
    ViewerUiFacade,
    ViewModeFacade,
    PageTrackingFacade,
    KeyboardFacade,
    ViewerScrollFacade,
    ReadlistFacade,
    ViewerTitleTagFacade
  ],
  declarations: [...VIEWER_DECLARABLES, TextComponent],
  exports: [...VIEWER_DECLARABLES]
})
export class ViewerModule { }
