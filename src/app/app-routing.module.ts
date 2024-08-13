import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes, UrlSegment, UrlSegmentGroup } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';

export function urlMatcher(segments: UrlSegment[], group: UrlSegmentGroup, route: Route) {

  if (segments.length > 1) {
    const url = segments.map(segment => segment.path).join('/');

    console.log(url);
    
    return {
      consumed: segments,
      posParams: { url: new UrlSegment(url, {}) }
    };
  }
  return null;
}

export const MANGADEX_PATH = `mangadex`;
export const TELEGRAPH_PATH = `telegraph`;
export const IMGUR_PATH = `imgur`;
export const REDDIT_PATH = `reddit`;
export const READ_PATH = `read`;
export const LIST_PATH = `list`;
export const ZENKO_PATH = `zenko`;
export const NHENTAI_PATH = `nhentai`;
export const COMICK_PATH = `comick`;

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./link-parser/link-parser.module').then(m => m.LinkParserModule)
  },
  {
    path: LIST_PATH,
    loadChildren: () => import('./list/list.module').then(m => m.ListModule)
  },
  {
    path: IMGUR_PATH,
    loadChildren: () => import('./imgur/imgur.module').then(m => m.ImgurModule)
  },
  {
    path: MANGADEX_PATH,
    loadChildren: () => import('./mangadex/mangadex.module').then(m => m.MangadexModule)
  },
  {
    path: READ_PATH,
    loadChildren: () => import('./read/read.module').then(m => m.ReadModule)
  },
  {
    path: TELEGRAPH_PATH,
    loadChildren: () => import('./telegraph/telegraph.module').then(m => m.TelegraphModule)
  },
  {
    path: REDDIT_PATH,
    loadChildren: () => import('./reddit/reddit.module').then(m => m.RedditModule)
  },
  {
    path: ZENKO_PATH,
    loadChildren: () => import('./zenko/zenko.module').then(m => m.ZenkoModule)
  },
  {
    path: NHENTAI_PATH,
    loadChildren: () => import('./nhentai/nhentai.module').then(m => m.NhentaiModule)
  },
  {
    path: COMICK_PATH,
    loadChildren: () => import('./comick/comick.module').then(m => m.ComickModule)
  },
  {
    matcher: urlMatcher,
    loadChildren: () => import('./link-parser/link-parser.module').then(m => m.LinkParserModule)
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
