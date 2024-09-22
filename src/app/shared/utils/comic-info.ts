export class ComicInfo {
    title: string | null = null
    writer: string | null = null
    summary: string | null = null
    volume: string | null = null
    series: string | null = null
    number: string | null = null
    notes: string | null = null
    year: string | null = null
    month: string | null = null
    day: string | null = null
    penciller: string | null = null
    inker: string | null = null
    letterer: string | null = null
    coverArtist: string | null = null
    editor: string | null = null
    publisher: string | null = null
    pageCount: string | null = null
    count: string | null = null
    manga: string | null = null
    alternateSeries: string | null = null
    alternateNumber: string | null = null
    alternateCount: string | null = null
    smprint: string | null = null
    genre: string | null = null
    web: string | null = null
    languageISO: string | null = null
    format: string | null = null
    ageRating: string | null = null
    characters: string | null = null
    teams: string | null = null
    locations: string | null = null
    scanInformation: string | null = null
    storyArc: string | null = null
    seriesGroup: string | null = null
    communityRating: string | null = null
    pages: any[] = []

    constructor(xml: string) {
        this.fromXmlString(xml)
    }

    fromXmlString(xml: string) {
        const parser = new DOMParser();
        const doc: Document = parser.parseFromString(xml, "text/xml");
        const v = (tag: string) => doc.getElementsByTagName(tag)[0]?.textContent;
        this.pages = [];

        for (let i = 0; i < doc.getElementsByTagName('Page').length; i++) {
            const p = doc.getElementsByTagName('Page')[i];
            this.pages.push({
                image: p.getAttribute('Image'),
                imageHeight: p.getAttribute('ImageHeight'),
                imageWidth: p.getAttribute('ImageWidth'),
                imageSize: p.getAttribute('ImageSize'),
                type: p.getAttribute('Type')
            })
        }

        this.title = v("Title");
            this.writer = v("Writer");
            this.summary = v("Summary");
            this.volume = v("Volume");
            this.series = v("Series");
            this.number = v("Number");
            this.notes = v("Notes");
            this.year = v("Year");
            this.month = v("Month");
            this.day = v("Day");
            this.penciller = v("Penciller");
            this.inker = v("Inker");
            this.letterer = v("Letterer");
            this.coverArtist = v("CoverArtist");
            this.editor = v("Editor");
            this.publisher = v("Publisher");
            this.pageCount = v("PageCount");
            this.count = v("Count");
            this.alternateSeries = v("AlternateSeries");
            this.alternateNumber = v("AlternateNumber");
            this.alternateCount = v("AlternateCount");
            this.smprint = v("Imprint");
            this.genre = v("Genre");
            this.web = v("Web");
            this.languageISO = v("LanguageISO");
            this.format = v("Format");
            this.ageRating = v("AgeRating");
            this.characters = v("Characters");
            this.teams = v("Teams");
            this.manga = v("Manga");
            this.locations = v("Locations");
            this.scanInformation = v("ScanInformation");
            this.storyArc = v("StoryArc");
            this.seriesGroup = v("SeriesGroup");
            this.communityRating = v("CommunityRating");
    }
}