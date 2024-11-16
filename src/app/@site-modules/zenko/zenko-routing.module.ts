import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZenkoShellComponent } from './zenko-shell/zenko-shell.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: ':id',
    component: ZenkoShellComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZenkoRoutingModule { }
