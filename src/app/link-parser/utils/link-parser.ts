export interface LinkParseResult {
    site: string;
    id: string;
}

export abstract class LinkParser {
    protected regex: RegExp = / /;
    protected site: string = ''

    public getRegex = () => this.regex;

    public parse(link: string): LinkParseResult | null {
        const match = link.match(this.regex);

        return match ? { site: this.site, id: match[1] } : null;
    }

    public parseAll(link: string): LinkParseResult[] {

        const reg = (!this.regex.global) ?
            new RegExp(this.regex.source, this.regex.flags + 'g') :
            this.regex;



        const matches = link.matchAll(reg);
        const results: LinkParseResult[] = [];

        for (const match of matches) {
            if (match && match[1]) {
                console.log(match);
                
                results.push({ site: this.site, id: match[1] });
            }
        }

        return results;
    }
}