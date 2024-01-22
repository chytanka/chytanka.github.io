import { LinkParser } from "./link-parser";

export class ImgurLinkParser extends LinkParser {
    // override regex = /imgur\.com\/(?:a|gallery)\/(\w+)/;
    override regex = /imgur\.com\/(?:a|gallery|t\/manga|t\/webtoon|t\/comics?)\/(\w+)/;
    override site = 'imgur'
};
