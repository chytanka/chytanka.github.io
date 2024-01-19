export interface LinkParseResult {
    site: string;
    id: string;
}

export abstract class LinkParser {
    protected regex: RegExp = / /;
    protected site: string = ''

    public parse(link: string): LinkParseResult | null {
        const match = link.match(this.regex);

        return match ? { site: this.site, id: match[1] } : null;
    }
}