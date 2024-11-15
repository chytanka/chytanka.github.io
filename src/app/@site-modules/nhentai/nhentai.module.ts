import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NhentaiRoutingModule } from './nhentai-routing.module';
import { NhentaiShellComponent } from './nhentai-shell/nhentai-shell.component';
import { CommonReadModule } from '../@common-read';


@NgModule({
  declarations: [
    NhentaiShellComponent
  ],
  imports: [
    CommonModule,
    NhentaiRoutingModule,
    CommonReadModule
  ]
})
export class NhentaiModule { }
