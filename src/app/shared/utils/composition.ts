export interface CompositionImage {
    src: string;
    width?: number;
    height?: number;
    size?: number;
    type?: string;
    alt?:string;
    nsfw?: string;
}

export interface CompositionEpisode {
    title: string;
    episode: number;
    nsfw?: boolean | undefined;
    mangaId?: string;
    volume?: number;
    chapter?: number;
    part?: number;
    extra?: boolean;

    images: CompositionImage[];
}

export interface Composition {
    title: string;
    description: string;
    artist: string;
    author: string;
    cover: CompositionImage;

    episodes: CompositionEpisode[];
}