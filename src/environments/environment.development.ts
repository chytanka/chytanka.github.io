const PROXY = `http://192.168.10.107:3003/api?url=`

export const environment = {
    version: "0.13.58-2026.4.11",
    prod: false,
    proxy: PROXY,
    blankaryoHost: `https://blankary.com/page/`,
    imgurHost: 'https://api.imgur.com/3/album/',
    imgchestHost: 'https://api.imgchest.com/v1/post/',
    mangadexHost: `https://api.mangadex.org/at-home/server/`,
    mangadexChapter: `https://api.mangadex.org/chapter/`,
    mangadexManga: `https://api.mangadex.org/manga/`,
    mangadexScanlationGroup: `https://api.mangadex.org/group/`,
    telegraphHost: `https://api.telegra.ph/getPage/`,
    redditHost: `https://www.reddit.com/r/all/comments/`,
    zenkoHost: `https:///api.zenko.online/chapters/`,
    nhentaiHost: `https://nhentai.net/api/v2/galleries/`,
    comickHost: `https://api.comick.fun/chapter/`,
    yanderePoolsHost: `https://yande.re/pool/show.json/`,
    pixivHost: `https://www.pixiv.net/touch/ajax/illust/details?illust_id=`
};
