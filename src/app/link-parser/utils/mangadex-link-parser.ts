import { LinkParser } from "./link-parser";

export class MangadexLinkParser extends LinkParser {
    override regex = /mangadex\.org\/chapter\/([a-f\d-]+)/;
    override site = 'md';
};
