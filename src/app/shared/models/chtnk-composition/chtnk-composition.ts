import { ChtnkEpisode } from "./chtnk-episode";
import { ChtnkImage } from "./chtnk-image";

export interface ChtnkComposition {
    title: string;
    episodes: ChtnkEpisode[];
    
    description?: string;
    artist?: string;
    author?: string;
    cover?: ChtnkImage;
}