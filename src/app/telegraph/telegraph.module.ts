import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TelegraphRoutingModule } from './telegraph-routing.module';
import { TelegraphShellComponent } from './telegraph-shell/telegraph-shell.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    TelegraphShellComponent
  ],
  imports: [
    CommonModule,
    TelegraphRoutingModule,
    SharedModule
  ]
})
export class TelegraphModule { }
