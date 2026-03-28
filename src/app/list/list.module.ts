import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListShellComponent } from './list-shell/list-shell.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LinkParserService } from '../link-parser/data-access/link-parser.service';
import { parserProviders } from '../link-parser/data-access/parser.providers';


@NgModule({
  declarations: [
    ListShellComponent
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class ListModule { }
