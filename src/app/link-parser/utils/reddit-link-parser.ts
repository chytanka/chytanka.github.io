import { LinkParser } from "./link-parser";

export class RedditLinkParser extends LinkParser {
    override regex = /(?:https:\/\/)reddit\.com\/[ur]\/\w+(?:\/comments\/)([a-zA-Z0-9]+)(?=[\/?]|$)/;
    // override regex = /reddit\.com\/[ur]\/\w+(?:(?:\/comments\/)|(?:\/s\/))([a-zA-Z0-9]+)(?=[\/?]|$)/;
    override site = 'reddit';
};
