import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VIEWER_DECLARABLES } from './viewer.declarables';
import { SharedModule } from '../shared/shared.module';
import { EmbedFacade, GamepadFacade, KeyboardFacade, NsfwFacade, PageTrackingFacade, ReadlistFacade, ViewerScrollFacade, ViewerUiFacade, ViewModeFacade } from './facades';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  providers: [
    NsfwFacade,
    GamepadFacade,
    EmbedFacade,
    ViewerUiFacade,
    ViewModeFacade,
    PageTrackingFacade,
    KeyboardFacade,
    ViewerScrollFacade,
    ReadlistFacade
  ],
  declarations: [...VIEWER_DECLARABLES],
  exports: [...VIEWER_DECLARABLES]
})
export class ViewerModule { }
