import { LinkParser } from "./link-parser";

export class ImgchestLinkParser extends LinkParser {
    override regex = /imgchest\.com\/p\/([\w\d-]+)/;
    override site = 'imgchest';
};
