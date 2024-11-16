import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComickRoutingModule } from './comick-routing.module';
import { ComickShellComponent } from './comick-shell/comick-shell.component';
import { CommonReadModule } from '../@common-read';


@NgModule({
  declarations: [
    ComickShellComponent
  ],
  imports: [
    CommonModule,
    ComickRoutingModule,
    CommonReadModule
  ]
})
export class ComickModule { }
