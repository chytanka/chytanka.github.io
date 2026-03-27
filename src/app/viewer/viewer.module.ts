import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VIEWER_DECLARABLES } from './viewer.declarables';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [...VIEWER_DECLARABLES],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [...VIEWER_DECLARABLES]
})
export class ViewerModule { }
