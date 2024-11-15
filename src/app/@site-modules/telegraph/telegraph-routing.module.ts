import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TelegraphShellComponent } from './telegraph-shell/telegraph-shell.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: ':path',
    component: TelegraphShellComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TelegraphRoutingModule { }
