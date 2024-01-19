import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from './utils/truncate.pipe';
import { TextEmbracerComponent } from './ui/text-embracer/text-embracer.component';



@NgModule({
  declarations: [
    TruncatePipe,
    TextEmbracerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [TruncatePipe, TextEmbracerComponent]
})
export class SharedModule { }
