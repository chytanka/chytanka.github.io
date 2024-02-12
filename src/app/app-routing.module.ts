import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./link-parser/link-parser.module').then(m => m.LinkParserModule)
  },
  {
    path: 'imgur',
    loadChildren: () => import('./imgur/imgur.module').then(m => m.ImgurModule)
  },
  {
    path: 'md',
    loadChildren: () => import('./mangadex/mangadex.module').then(m => m.MangadexModule)
  },
  {
    path: 'read',
    loadChildren: () => import('./read/read.module').then(m => m.ReadModule)
  },
  {
    path: 'telegr',
    loadChildren: () => import('./telegraph/telegraph.module').then(m => m.TelegraphModule)
  },
  {
    path: 'reddit',
    loadChildren: () => import('./reddit/reddit.module').then(m => m.RedditModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
