// parser.providers.ts
import { JsonLinkParser, NhentaiLinkParser, PixivLinkParser, RedditLinkParser, TelegraphLinkParser, YandereParser, ZenkoLinkParser, ImgurLinkParser, MangadexLinkParser } from '../utils';
import { ImgchestLinkParser } from '../utils/imgchest-link-parser';
import { LINK_PARSERS } from './parser.tokens';

export const parserProviders = [{
    provide: LINK_PARSERS, useValue: [
        ImgurLinkParser,
        MangadexLinkParser,
        TelegraphLinkParser,
        RedditLinkParser,
        ZenkoLinkParser,
        NhentaiLinkParser,
        YandereParser,
        PixivLinkParser,
        ImgchestLinkParser,
        JsonLinkParser
    ]
}];