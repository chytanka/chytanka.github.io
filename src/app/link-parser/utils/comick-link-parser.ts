import { LinkParser } from "./link-parser";

export class ComickLinkParser extends LinkParser {
    override regex = /comick\.io\/comic\/(?:[\w-]+)\/(\w+)/;
    override site = 'comick';
};
