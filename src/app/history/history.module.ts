import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryListComponent } from './ui/history-list/history-list.component';
import { SharedModule } from '../shared/shared.module';
import { ChButtonComponent } from '../shared/ui/ch-button/ch-button.component';



@NgModule({
  declarations: [
    HistoryListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ChButtonComponent
  ],
  exports: [
    HistoryListComponent
  ]
})
export class HistoryModule { }
