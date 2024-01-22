const PROXY = `http://localhost:3000/api/?url=`

export const environment = {
    proxy: PROXY,
    imgurHost: 'https://api.imgur.com/3/album/',
    mangadexHost: `${PROXY}https://api.mangadex.org/at-home/server/`,
    mangadexChapter: `${PROXY}https://api.mangadex.org/chapter/`
};