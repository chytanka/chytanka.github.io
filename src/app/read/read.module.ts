import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadShellComponent } from './read-shell/read-shell.component';
import { ReadRoutingModule } from './read-routing.module';
import { CommonReadModule } from '../common/common-read';



@NgModule({
  declarations: [
    ReadShellComponent
  ],
  imports: [
    CommonModule,
    ReadRoutingModule,
    CommonReadModule
  ]
})
export class ReadModule { }
