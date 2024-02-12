import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedditShellComponent } from './reddit-shell/reddit-shell.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: ':id',
    component: RedditShellComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RedditRoutingModule { }
