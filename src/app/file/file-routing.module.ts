import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const zip = () => import('./zip/zip.component').then(mod => mod.ZipComponent);
const pdf = () => import('./pdf/pdf.component').then(mod => mod.PdfComponent);
const mobi = () => import('./mobi/mobi.component').then(mod => mod.MobiComponent);

const routes: Routes = [
  { path: 'zip/:sha256', loadComponent: zip },
  { path: 'zip', loadComponent: zip },
  
  { path: 'pdf/:sha256', loadComponent: pdf },
  { path: 'pdf', loadComponent: pdf },

  { path: 'mobi/:sha256', loadComponent: mobi },
  { path: 'mobi', loadComponent: mobi }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileRoutingModule { }
