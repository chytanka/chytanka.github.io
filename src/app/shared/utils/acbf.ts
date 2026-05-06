export interface ChtnkCaption {
    points: string;
    text: string;
    fill?: string;
    color?: string;
    type?: string;
}

export interface ChtnkTextLayer {
    lang: string;
    captions: ChtnkCaption[]
}

export interface ChtnkFrameLayer {
    points: string;
    bgcolor?: string;
}

export interface ChtnkPage {
    id?: string;
    texts: ChtnkTextLayer[];
    frames: ChtnkFrameLayer[]
    bgcolor?: string;
}

export class Acbf {
    private _doc: Document | undefined;

    constructor(xml: string) {
        this.fromXmlString(xml)
    }

    private fromXmlString(xml: string) {
        const parser = new DOMParser();
        const doc: Document = parser.parseFromString(xml, "text/xml");
        this._doc = doc;
    }

    get pages(): ChtnkPage[] {
        if (!this._doc) return [];
        const pageElements = this._doc.getElementsByTagName('page');
        const pages: ChtnkPage[] = [];
        for (let i = 0; i < pageElements.length; i++) {
            const pageElement = pageElements[i];
            const page: ChtnkPage = {
                id: pageElement.getElementsByTagName('image')[0]?.getAttribute('href') || undefined,
                bgcolor: pageElement.getAttribute('bgcolor') || undefined,
                texts: [],
                frames: []
            };

            // Process text layers
            const textLayerElements = pageElement.getElementsByTagName('text-layer');
            for (let j = 0; j < textLayerElements.length; j++) {
                const textLayerElement = textLayerElements[j];
                const textLayer: ChtnkTextLayer = {
                    lang: textLayerElement.getAttribute('lang') || '',
                    captions: []
                };

                // Process captions
                const captionElements = textLayerElement.getElementsByTagName('text-area');
                for (let k = 0; k < captionElements.length; k++) {
                    const captionElement = captionElements[k];
                    const caption: ChtnkCaption = {
                        points: captionElement.getAttribute('points') || '',
                        text: captionElement.innerHTML || '',
                        fill: captionElement.getAttribute('bgcolor') || undefined,
                        color: captionElement.getAttribute('color') || undefined,
                        type: captionElement.getAttribute('type') || undefined
                    };
                    textLayer.captions.push(caption);
                }
                page.texts.push(textLayer);
            }

            // Process frame layers
            const frameLayerElements = pageElement.getElementsByTagName('frame');
            for (let j = 0; j < frameLayerElements.length; j++) {
                const frameLayerElement = frameLayerElements[j];
                const frameLayer: ChtnkFrameLayer = {
                    points: frameLayerElement.getAttribute('points') || '',
                    bgcolor: frameLayerElement.getAttribute('bgcolor') || undefined
                };
                page.frames.push(frameLayer);
            }

            pages.push(page);
        }
        return pages;
    }


}