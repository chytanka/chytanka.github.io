import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComickShellComponent } from './comick-shell/comick-shell.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: ':id',
    component: ComickShellComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComickRoutingModule { }
