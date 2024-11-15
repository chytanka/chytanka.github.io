import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadShellComponent } from './read-shell/read-shell.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: ':url',
    component: ReadShellComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReadRoutingModule { }
