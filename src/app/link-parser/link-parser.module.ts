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
import { ParserFormComponent } from './ui/parser-form/parser-form.component';
import { GoButtonComponent } from './ui/go-button/go-button.component';
import { parserProviders } from './data-access/parser.providers';
import { LinkParserService } from './data-access/link-parser.service';
import { LinkParserFacade, LinkInitFacade, NavigationFacade, FileNetFacade } from './ui/parser-form/facades';

const FACADES = [
  LinkParserFacade,
  LinkInitFacade,
  NavigationFacade,
  FileNetFacade
];

@NgModule({
  declarations: [
    LinkParserComponent,
    FaqComponent,
    SettingsComponent,
    FooterComponent,
    HeaderComponent,
    ParserFormComponent,
    GoButtonComponent
  ],
  imports: [
    CommonModule,
    LinkParserRoutingModule,
    FormsModule,
    SharedModule,
    HistoryModule
  ],
  providers: [
    ...FACADES
  ]
})
export class LinkParserModule { }
