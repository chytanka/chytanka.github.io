import { ChtnkImage } from "./chtnk-image";

export interface ChtnkPublisher {
    id: string;
    site: string;
    description: string
    name: string;
    avatar?: ChtnkImage;
    links?: Array<{
        link: string,
        title: string
    }>
}