import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonReadComponent } from './ui/common-read/common-read.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CommonReadComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    CommonReadComponent
  ]
})
export class CommonReadModule { }
