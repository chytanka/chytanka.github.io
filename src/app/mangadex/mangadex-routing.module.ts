import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MangadexShellComponent } from './mangadex-shell/mangadex-shell.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: ':id',
    component: MangadexShellComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MangadexRoutingModule { }
