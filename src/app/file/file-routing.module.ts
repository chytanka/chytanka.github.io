import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'zip',
    loadComponent: () => import('./zip/zip.component').then(mod => mod.ZipComponent)
  },
  {
    path: 'pdf',
    loadComponent: () => import('./pdf/pdf.component').then(mod => mod.PdfComponent)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileRoutingModule { }
