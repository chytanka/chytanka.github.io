import JSZip from "jszip";

export async function processImagesInBatches(
    zip: JSZip,
    images: string[],
    batchSize = 20
) {
    for (let i = 0; i < images.length; i += batchSize) {
        const batch = images.slice(i, i + batchSize);

        await Promise.all(
            batch.map(async (filename, index) => {
                const blob = await zip.files[filename].async('blob');
                const url = URL.createObjectURL(blob);
                postMessage({
                    type: 'file',
                    url,
                    index: i + index,
                });
            })
        );
    }
}
