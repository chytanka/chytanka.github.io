export async function processFile(
    fileName: string | false | null,
    zip: any,
    type: string
) {
    if (!fileName) return;

    const file = zip.files[fileName];
    if (!file) return;

    const text = await file.async('text');
    postMessage({ type, data: text });
}