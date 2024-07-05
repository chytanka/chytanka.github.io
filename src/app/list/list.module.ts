import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListShellComponent } from './list-shell/list-shell.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListShellComponent
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    FormsModule
  ]
})
export class ListModule { }
