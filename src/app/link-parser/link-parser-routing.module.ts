import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LinkParserComponent } from './link-parser/link-parser.component';

const routes: Routes = [
  {
    path: '',
    component: LinkParserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinkParserRoutingModule { }
