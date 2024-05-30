import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryListComponent } from './ui/history-list/history-list.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    HistoryListComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    HistoryListComponent
  ]
})
export class HistoryModule { }
