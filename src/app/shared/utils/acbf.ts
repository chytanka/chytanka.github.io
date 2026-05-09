import { ChtnkFrame, ChtnkCaption } from "../models/chtnk-composition";

export type ChtnkScene = {
    frames?: ChtnkFrame[];
    captions?: ChtnkCaption[];
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

    get scene(): ChtnkScene {
        if (!this._doc) return { frames: [], captions: [] };
        const pageElements = this._doc.getElementsByTagName('page');

        const frames: ChtnkFrame[] = [];
        const captions: ChtnkCaption[] = [];

        for (let i = 0; i < pageElements.length; i++) {
            const pageElement = pageElements[i];

            const id = pageElement.getElementsByTagName('image')[0]?.getAttribute('href') || undefined;
            const pageColor = pageElement.getAttribute('bgcolor') || undefined;

            // Process text layers
            const textLayerElements = pageElement.getElementsByTagName('text-layer');
            for (let j = 0; j < textLayerElements.length; j++) {
                const textLayerElement = textLayerElements[j];
                const lang = textLayerElement.getAttribute('lang') || '';


                // Process captions
                const captionElements = textLayerElement.getElementsByTagName('text-area');
                for (let k = 0; k < captionElements.length; k++) {
                    const captionElement = captionElements[k];
                    const caption: ChtnkCaption = {
                        lang: lang,
                        id: id,
                        points: captionElement.getAttribute('points') || '',
                        text: captionElement.innerHTML || '',
                        fill: captionElement.getAttribute('bgcolor') || undefined,
                        color: captionElement.getAttribute('color') || undefined,
                        type: captionElement.getAttribute('type') || undefined
                    };
                    captions.push(caption);
                }
            }

            // Process frame layers
            const frameLayerElements = pageElement.getElementsByTagName('frame');
            for (let j = 0; j < frameLayerElements.length; j++) {
                const frameLayerElement = frameLayerElements[j];
                const frameLayer: ChtnkFrame = {
                    id: id,
                    points: frameLayerElement.getAttribute('points') || '',
                    fill: frameLayerElement.getAttribute('bgcolor') || pageColor || undefined
                };
                frames.push(frameLayer);
            }

        }
        return { frames, captions };
    }


}