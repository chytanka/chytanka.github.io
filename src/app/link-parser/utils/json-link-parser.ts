import { LinkParser } from "./link-parser";

export class JsonLinkParser extends LinkParser {
    // override regex = /((?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    protected override regex: RegExp = /((?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[іІїЇа-яА-Я-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    override site = 'read'
};
