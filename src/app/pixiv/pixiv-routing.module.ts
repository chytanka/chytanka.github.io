import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PixivShellComponent } from './pixiv-shell/pixiv-shell.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: ':id',
    component: PixivShellComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PixivRoutingModule { }
