import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RedditRoutingModule } from './reddit-routing.module';
import { RedditShellComponent } from './reddit-shell/reddit-shell.component';
import { CommonReadModule } from '../@common-read';


@NgModule({
  declarations: [
    RedditShellComponent
  ],
  imports: [
    CommonModule,
    RedditRoutingModule,
    CommonReadModule
  ]
})
export class RedditModule { }
