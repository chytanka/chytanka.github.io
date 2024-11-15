import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlankaryRoutingModule } from './blankary-routing.module';
import { BlankaryShellComponent } from './blankary-shell/blankary-shell.component';
import { CommonReadModule } from '../@common-read';


@NgModule({
  declarations: [
    BlankaryShellComponent
  ],
  imports: [
    CommonModule,
    BlankaryRoutingModule,
    CommonReadModule
  ]
})
export class BlankaryModule { }
