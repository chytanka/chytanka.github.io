import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankaryShellComponent } from './blankary-shell/blankary-shell.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: ':id',
    component: BlankaryShellComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlankaryRoutingModule { }
