import { NgModule } from '@angular/core';
import { LoadChildrenCallback, Route, RouterModule, Routes, UrlSegment, UrlSegmentGroup } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';

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
const imgurMod: LoadChildrenCallback = () => import('./@site-modules/imgur/imgur.module').then(m => m.ImgurModule);
const mangadexMod: LoadChildrenCallback = () => import('./@site-modules/mangadex/mangadex.module').then(m => m.MangadexModule);
const telegraphMod = () => import('./@site-modules/telegraph/telegraph.module').then(m => m.TelegraphModule)
const readMod = () => import('./@site-modules/read/read.module').then(m => m.ReadModule);
const redditMod = () => import('./@site-modules/reddit/reddit.module').then(m => m.RedditModule)
const zenkoMod = () => import('./@site-modules/zenko/zenko.module').then(m => m.ZenkoModule)
const nhentaiMod = () => import('./@site-modules/nhentai/nhentai.module').then(m => m.NhentaiModule)
const comickMod = () => import('./@site-modules/comick/comick.module').then(m => m.ComickModule)
const yandereMod = () => import('./@site-modules/yandere/yandere.module').then(m => m.YandereModule)
const pixivMod = () => import('./@site-modules/pixiv/pixiv.module').then(m => m.PixivModule)
const blankaryMod = () => import('./@site-modules/blankary/blankary.module').then(m => m.BlankaryModule)
const fileMod = () => import('./file/file.module').then(m => m.FileModule)

const COMPARE_OUTLET_NAME = 'right'

const siteModulesMap = new Map<string, LoadChildrenCallback>()
  .set(BLANKARY_PATH, blankaryMod)
  .set(COMICK_PATH, comickMod)
  .set(IMGUR_PATH, imgurMod)
  .set(MANGADEX_PATH, mangadexMod)
  .set(NHENTAI_PATH, nhentaiMod)
  .set(PIXIV_PATH, pixivMod)
  .set(REDDIT_PATH, redditMod)
  .set(TELEGRAPH_PATH, telegraphMod)
  .set(YANDERE_PATH, yandereMod)
  .set(ZENKO_PATH, zenkoMod)
  .set(READ_PATH, readMod)

function getPairRoutesToCompare(map: Map<string, LoadChildrenCallback>) {
  const routes: Routes = [];

  for (const item of map) {
    routes.push(
      { path: item[0], loadChildren: item[1] },
      { outlet: COMPARE_OUTLET_NAME, path: item[0], loadChildren: item[1] }
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
