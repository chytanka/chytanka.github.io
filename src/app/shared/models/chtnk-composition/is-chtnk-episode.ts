import { ChtnkEpisode } from "./chtnk-episode";
import { ChtnkImage } from "./chtnk-image";

export function isChtnkEpisode(data: any): data is ChtnkEpisode {
    return (
        typeof data.title === 'string' &&
        Array.isArray(data.images) &&
        data.images.every((image: ChtnkImage) => typeof image.src === 'string')
    );
}