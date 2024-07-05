import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListShellComponent } from './list-shell/list-shell.component';

const routes: Routes = [
  { path: '', component: ListShellComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule { }
