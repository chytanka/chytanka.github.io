import { LinkParser } from "./link-parser";

export class BlankaryLinkParser extends LinkParser {
    override regex = /blankary\.com\/([\w\d-]+)/;
    override site = 'blankary';
};
