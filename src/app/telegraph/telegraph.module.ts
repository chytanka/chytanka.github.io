import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TelegraphRoutingModule } from './telegraph-routing.module';
import { TelegraphShellComponent } from './telegraph-shell/telegraph-shell.component';
import { CommonReadModule } from '../common/common-read';


@NgModule({
  declarations: [
    TelegraphShellComponent
  ],
  imports: [
    CommonModule,
    TelegraphRoutingModule,
    CommonReadModule
  ]
})
export class TelegraphModule { }
