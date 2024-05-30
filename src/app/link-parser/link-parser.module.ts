import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LinkParserRoutingModule } from './link-parser-routing.module';
import { LinkParserComponent } from './link-parser/link-parser.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { FaqComponent } from './ui/faq/faq.component';
import { SettingsComponent } from './ui/settings/settings.component';
import { FooterComponent } from './ui/footer/footer.component';
import { HeaderComponent } from './ui/header/header.component';
import { HistoryModule } from '../history/history.module';


@NgModule({
  declarations: [
    LinkParserComponent,
    FaqComponent,
    SettingsComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    LinkParserRoutingModule,
    FormsModule,
    SharedModule,
    HistoryModule
  ]
})
export class LinkParserModule { }
