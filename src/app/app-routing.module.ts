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
export const FILE_PATH = 'file';

const linkParserMod: LoadChildrenCallback = () => import('./link-parser/link-parser.module').then(m => m.LinkParserModule)
const imgurMod: LoadChildrenCallback = () => import('./imgur/imgur.module').then(m => m.ImgurModule);
const mangadexMod: LoadChildrenCallback = () => import('./mangadex/mangadex.module').then(m => m.MangadexModule);
const telegraphMod = () => import('./telegraph/telegraph.module').then(m => m.TelegraphModule)
const readMod = () => import('./read/read.module').then(m => m.ReadModule);
const redditMod = () => import('./reddit/reddit.module').then(m => m.RedditModule)
const zenkoMod = () => import('./zenko/zenko.module').then(m => m.ZenkoModule)
const nhentaiMod = () => import('./nhentai/nhentai.module').then(m => m.NhentaiModule)
const comickMod = () => import('./comick/comick.module').then(m => m.ComickModule)
const yandereMod = () => import('./yandere/yandere.module').then(m => m.YandereModule)
const pixivMod = () => import('./pixiv/pixiv.module').then(m => m.PixivModule)
const fileMod = () => import('./file/file.module').then(m => m.FileModule)

const moduleMap = new Map<string, LoadChildrenCallback>()
  .set(IMGUR_PATH, imgurMod)
  .set(MANGADEX_PATH, mangadexMod)
  .set(TELEGRAPH_PATH, telegraphMod)

const routes: Routes = [
  { path: '', loadChildren: linkParserMod },
  { path: LIST_PATH, loadChildren: () => import('./list/list.module').then(m => m.ListModule) },
  { path: IMGUR_PATH, loadChildren: imgurMod },
  { path: MANGADEX_PATH, loadChildren: mangadexMod },
  { path: READ_PATH, loadChildren: readMod },
  { path: TELEGRAPH_PATH, loadChildren: telegraphMod },
  { path: REDDIT_PATH, loadChildren: redditMod },
  { path: ZENKO_PATH, loadChildren: zenkoMod },
  { path: NHENTAI_PATH, loadChildren: nhentaiMod },
  { path: COMICK_PATH, loadChildren: comickMod },
  { path: YANDERE_PATH, loadChildren: yandereMod },
  { path: PIXIV_PATH, loadChildren: pixivMod },
  { path: FILE_PATH, loadChildren: fileMod },
  { matcher: urlMatcher, loadChildren: linkParserMod },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
