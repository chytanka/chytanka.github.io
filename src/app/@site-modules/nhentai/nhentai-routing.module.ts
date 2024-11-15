import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NhentaiShellComponent } from './nhentai-shell/nhentai-shell.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: ':id',
    component: NhentaiShellComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NhentaiRoutingModule { }
