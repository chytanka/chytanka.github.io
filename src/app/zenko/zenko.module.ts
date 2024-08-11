import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZenkoRoutingModule } from './zenko-routing.module';
import { ZenkoShellComponent } from './zenko-shell/zenko-shell.component';
import { CommonReadModule } from '../common/common-read';


@NgModule({
  declarations: [
    ZenkoShellComponent
  ],
  imports: [
    CommonModule,
    ZenkoRoutingModule,
    CommonReadModule
  ]
})
export class ZenkoModule { }
