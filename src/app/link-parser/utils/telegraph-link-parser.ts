import { LinkParser } from "./link-parser";

export class TelegraphLinkParser extends LinkParser {
    // override regex = /telegra\.ph\/([\w\-_іїґ]+)/;
    override regex = /(?:https:\/\/)telegra\.ph\/([\p{L}\p{N}\p{M}\-_%]+)/u;
    override site = 'telegraph'
};
