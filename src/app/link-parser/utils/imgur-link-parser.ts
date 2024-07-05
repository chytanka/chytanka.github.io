import { LinkParser } from "./link-parser";

export class ImgurLinkParser extends LinkParser {
    // override regex = /imgur\.com\/(?:a|gallery)\/(\w+)/;
    // override regex = /imgur\.com\/(?:a|gallery|t\/manga|t\/webtoon|t\/comics?)\/(\w+)/;
    override regex = /(?:https:\/\/)imgur\.com\/(?:a|gallery|t\/manga|t\/webtoon|t\/comics?)\/(?:[\w-]+-)?(\w+)/;
    override site = 'imgur'
};
