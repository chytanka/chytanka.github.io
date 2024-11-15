import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImgurShellComponent } from './imgur-shell/imgur-shell.component';

const routes: Routes = [
  { path: '',   redirectTo: '/', pathMatch: 'full' },
  {
    path: ':id',
    component: ImgurShellComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImgurRoutingModule { }
