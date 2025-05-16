import { NgModule, Type } from '@angular/core';
import { DefaultExport, LoadChildrenCallback, Route, RouterModule, Routes, UrlSegment, UrlSegmentGroup } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';
import { Observable } from 'rxjs';

export function urlMatcher(segments: UrlSegment[], group: UrlSegmentGroup, route: Route) {

  if (segments.length > 1) {
    const url = segments.map(segment => segment.path).join('/');

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
export const YANDERE_PATH = `yandere`;
export const PIXIV_PATH = 'pixiv';
export const BLANKARY_PATH = 'blankary';
export const FILE_PATH = 'file';

const linkParserMod: LoadChildrenCallback = () => import('./link-parser/link-parser.module').then(m => m.LinkParserModule)
// const blankaryMod = () => import('./@site-modules/blankary/blankary-shell.component')
const comickMod = () => import('./@site-modules/comick/comick-shell.component')
const imgurMod = () => import('./@site-modules/imgur/imgur-shell.component')
const mangadexMod = () => import('./@site-modules/mangadex/mangadex-shell.component')
const nhentaiMod = () => import('./@site-modules/nhentai/nhentai-shell.component')
const pixivMod = () => import('./@site-modules/pixiv/pixiv-shell.component')
const readMod = () => import('./@site-modules/read/read-shell.component')
const redditMod = () => import('./@site-modules/reddit/reddit-shell.component')
const telegraphMod = () => import('./@site-modules/telegraph/telegraph-shell.component')
const yandereMod = () => import('./@site-modules/yandere/yandere-shell.component')
const zenkoMod = () => import('./@site-modules/zenko/zenko-shell.component')
const fileMod = () => import('./file/file.module').then(m => m.FileModule)

const COMPARE_OUTLET_NAME = 'right'

type LoadComponentType = (() => Type<unknown> | Observable<Type<unknown> | DefaultExport<Type<unknown>>> | Promise<Type<unknown> | DefaultExport<Type<unknown>>>) | undefined;

const siteModulesMap = new Map<string, LoadComponentType>()
  // .set(BLANKARY_PATH + '/:id', blankaryMod)
  .set(COMICK_PATH + '/:id', comickMod)
  .set(IMGUR_PATH + '/:id', imgurMod)
  .set(MANGADEX_PATH + '/:id', mangadexMod)
  .set(NHENTAI_PATH + '/:id', nhentaiMod)
  .set(PIXIV_PATH + '/:id', pixivMod)
  .set(READ_PATH + '/:url', readMod)
  .set(REDDIT_PATH + '/:id', redditMod)
  .set(TELEGRAPH_PATH + '/:path', telegraphMod)
  .set(YANDERE_PATH + '/:id', yandereMod)
  .set(ZENKO_PATH + '/:id', zenkoMod)

function getPairRoutesToCompare(map: Map<string, LoadComponentType>) {
  const routes: Routes = [];

  for (const item of map) {
    routes.push(
      { path: item[0], loadComponent: item[1] },
      { outlet: COMPARE_OUTLET_NAME, path: item[0], loadComponent: item[1] }
    )
  }

  return routes
}

const routes: Routes = [
  { path: '', loadChildren: linkParserMod },
  { path: LIST_PATH, loadChildren: () => import('./list/list.module').then(m => m.ListModule) },
  ...getPairRoutesToCompare(siteModulesMap),
  
  { path: FILE_PATH, loadChildren: fileMod },
  { outlet: COMPARE_OUTLET_NAME, path: FILE_PATH, loadChildren: fileMod },

  { matcher: urlMatcher, loadChildren: linkParserMod },
  { outlet: COMPARE_OUTLET_NAME, matcher: urlMatcher, loadChildren: linkParserMod },

  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
