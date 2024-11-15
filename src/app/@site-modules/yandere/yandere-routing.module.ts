import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YandereShellComponent } from './yandere-shell/yandere-shell.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: ':id',
    component: YandereShellComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YandereRoutingModule { }
