import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from './utils/truncate.pipe';
import { TextEmbracerComponent } from './ui/text-embracer/text-embracer.component';
import { ViewerComponent } from './ui/viewer/viewer.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { WarmFilterComponent } from './ui/warm-filter/warm-filter.component';



@NgModule({
  declarations: [
    TruncatePipe,
    TextEmbracerComponent,
    ViewerComponent,
    WarmFilterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [TruncatePipe, TextEmbracerComponent, ViewerComponent]
})
export class SharedModule { }
