import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LinkParserRoutingModule } from './link-parser-routing.module';
import { LinkParserComponent } from './link-parser/link-parser.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LinkParserComponent
  ],
  imports: [
    CommonModule,
    LinkParserRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class LinkParserModule { }
