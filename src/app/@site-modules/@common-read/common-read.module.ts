import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonReadComponent } from './ui/common-read/common-read.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ViewerModule } from '../../viewer/viewer.module';
import { LinkParserModule } from '../../link-parser/link-parser.module';



@NgModule({
  declarations: [
    CommonReadComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ViewerModule,
    LinkParserModule
  ],
  exports: [
    CommonReadComponent,
    SharedModule
  ]
})
export class CommonReadModule { }
