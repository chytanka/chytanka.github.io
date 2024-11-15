import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PixivRoutingModule } from './pixiv-routing.module';
import { CommonReadModule } from '../@common-read';
import { PixivShellComponent } from './pixiv-shell/pixiv-shell.component';


@NgModule({
  declarations: [
    PixivShellComponent
  ],
  imports: [
    CommonModule,
    PixivRoutingModule,
    CommonReadModule
  ]
})
export class PixivModule { }
