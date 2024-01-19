import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MangadexRoutingModule } from './mangadex-routing.module';
import { MangadexShellComponent } from './mangadex-shell/mangadex-shell.component';


@NgModule({
  declarations: [
    MangadexShellComponent
  ],
  imports: [
    CommonModule,
    MangadexRoutingModule
  ]
})
export class MangadexModule { }
