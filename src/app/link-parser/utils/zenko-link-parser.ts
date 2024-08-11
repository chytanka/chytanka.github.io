import { LinkParser } from "./link-parser";

export class ZenkoLinkParser extends LinkParser {
    override regex = /zenko\.online\/titles\/\d+\/(\d+)/;
    override site = 'zenko';
};
