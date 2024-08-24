import { LinkParser } from "./link-parser";

export class PixivLinkParser extends LinkParser {
    override regex = /pixiv\.net\/(?:en\/)?artworks\/(\d+)/;
    override site = 'pixiv';
};
