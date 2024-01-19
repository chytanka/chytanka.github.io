import { LinkParser } from "./link-parser";

export class ImgurLinkParser extends LinkParser {
    override regex = /imgur\.com\/(?:a|gallery)\/(\w+)/;
    override site = 'imgur'
};
