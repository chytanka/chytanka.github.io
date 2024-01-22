import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImgurRoutingModule } from './imgur-routing.module';
import { ImgurShellComponent } from './imgur-shell/imgur-shell.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ImgurShellComponent
  ],
  imports: [
    CommonModule,
    ImgurRoutingModule,
    SharedModule
  ]
})
export class ImgurModule { }
