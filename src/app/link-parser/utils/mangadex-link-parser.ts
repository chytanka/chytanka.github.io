import { LinkParser } from "./link-parser";

export class MangadexLinkParser extends LinkParser {
    override regex = /(?:https:\/\/)mangadex\.org\/chapter\/([a-f\d-]+)/;
    override site = 'mangadex';
};
