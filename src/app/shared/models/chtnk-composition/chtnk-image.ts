export interface ChtnkImage {
    src: string; // URL of the image (BLOB or external URL)
    id?: string; // Optional unique identifier for the image
    width?: number; // Optional width of the image in pixels
    height?: number; // Optional height of the image in pixels
    size?: number;  // Optional size of the image in bytes
    type?: string;  // Optional MIME type of the image (e.g., "image/jpeg")
    alt?: string; // Optional alternative text for the image
    nsfw?: string;  // Optional NSFW status of the image (e.g., "safe", "nsfw", "explicit")
}