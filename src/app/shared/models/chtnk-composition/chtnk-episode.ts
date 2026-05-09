import { ChtnkCaption } from "./chtnk-captions";
import { ChtnkFrame } from "./chtnk-frame";
import { ChtnkImage } from "./chtnk-image";
import { ChtnkPublisher } from "./chtnk-publisher";

export interface ChtnkEpisode {
    title: string;
    images: ChtnkImage[];

    frames?: ChtnkFrame[];
    captions?: ChtnkCaption[];
    
    episode?: number;
    nsfw?: boolean | undefined;
    mangaId?: string;
    volume?: number;
    chapter?: number;
    part?: number;
    extra?: boolean;
    publisher?: ChtnkPublisher,
}