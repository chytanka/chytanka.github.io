import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YandereRoutingModule } from './yandere-routing.module';
import { YandereShellComponent } from './yandere-shell/yandere-shell.component';
import { CommonReadModule } from '../@common-read';


@NgModule({
  declarations: [
    YandereShellComponent
  ],
  imports: [
    CommonModule,
    YandereRoutingModule,
    CommonReadModule
  ]
})
export class YandereModule { }
