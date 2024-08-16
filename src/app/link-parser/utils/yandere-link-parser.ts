import { LinkParser } from "./link-parser";

export class YandereParser extends LinkParser {
    override regex = /yande\.re\/pool\/show\/(\d+)/;
    override site = 'yandere';
};
