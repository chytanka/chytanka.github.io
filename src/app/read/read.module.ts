import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadShellComponent } from './read-shell/read-shell.component';
import { ReadRoutingModule } from './read-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ReadShellComponent
  ],
  imports: [
    CommonModule,
    ReadRoutingModule,
    SharedModule
  ]
})
export class ReadModule { }
