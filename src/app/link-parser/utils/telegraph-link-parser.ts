import { LinkParser } from "./link-parser";

export class TelegraphLinkParser extends LinkParser {
    override regex = /telegra\.ph\/([\w\-_іїґ]+)/;
    override site = 'telegr'
};
