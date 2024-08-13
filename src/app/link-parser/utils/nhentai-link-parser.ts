import { LinkParser } from "./link-parser";

export class NhentaiLinkParser extends LinkParser {
    override regex = /nhentai\.(?:net|to)\/g\/(\d+)/;
    override site = 'nhentai';
};
