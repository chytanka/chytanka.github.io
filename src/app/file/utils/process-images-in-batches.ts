import JSZip from "jszip";
import { ZipWorkerMessageType } from "../models";

export async function processImagesInBatches(
    zip: JSZip,
    images: string[],
    batchSize = 20
) {
    for (let i = 0; i < images.length; i += batchSize) {
        const batch = images.slice(i, i + batchSize);

        await Promise.all(
            batch.map(async (filename, index) => {
                const file = zip.files[filename];
                if (!file) return;

                const svgExtensions = ['.svg', '.svgz'];
                let blob: Blob;

                if (svgExtensions.some(ext => filename.toLowerCase().endsWith(ext))) {
                    const text = await file.async('string');
                    blob = new Blob([text], { type: 'image/svg+xml' });
                } else {
                    blob = await file.async('blob');
                }

                const url = URL.createObjectURL(blob);

                console.log(`Processed image ${i + index}: ${filename}`);

                postMessage({
                    type: ZipWorkerMessageType.ImageLoad,
                    url,
                    index: i + index,
                });
            })
        );
    }
}
