export class Acbf {
    constructor(xml: string) {
        this.fromXmlString(xml)
    }

    fromXmlString(xml: string) {
        const parser = new DOMParser();
        const doc: Document = parser.parseFromString(xml, "text/xml");
        const v = (tag: string) => doc.getElementsByTagName(tag)[0]?.textContent;
        console.log(doc);
        
    }
}