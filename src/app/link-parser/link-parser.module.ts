import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LinkParserRoutingModule } from './link-parser-routing.module';
import { LinkParserComponent } from './link-parser/link-parser.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { FaqComponent } from './ui/faq/faq.component';


@NgModule({
  declarations: [
    LinkParserComponent,
    FaqComponent
  ],
  imports: [
    CommonModule,
    LinkParserRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class LinkParserModule { }
