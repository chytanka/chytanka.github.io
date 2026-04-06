/// <reference lib="webworker" />

// TODO: change to https://github.com/101arrowz/fflate
// because jszip is toooo slow
// https://chatgpt.com/c/68cadcf9-6c28-8329-add8-cb20abaa2f85

import JSZip from 'jszip';
import { filterImages, getAcbfFile, getComicInfoFile, processFile, processImagesInBatches } from '../utils';
import { ZipWorkerMessageType } from '../models';

const metadataFiles = [
  { getter: getComicInfoFile, type: ZipWorkerMessageType.ComicInfo },
  { getter: getAcbfFile, type: ZipWorkerMessageType.Acbf },
];

// addEventListener('message', ({ data }) => {
//   const arrayBuffer = data.arrayBuffer;

//   const zip = new JSZip();

//   zip.loadAsync(arrayBuffer)
//     .then(async zip => {
//       const filesName: string[] = Object.keys(zip.files);

//       // metadata
//       for (const { getter, type } of metadataFiles) {
//         await processFile(getter(filesName), zip, type);
//       }

//       // images
//       const images = filterImages(filesName).sort();
//       postMessage({ type: ZipWorkerMessageType.ZipOpen, data: { count: images.length } });

//       await processImagesInBatches(zip, images, 30);

//     });
// });

let zipRef: JSZip;
let imagesRef: string[] = [];

addEventListener('message', async ({ data }) => {
  if (data.type === 'init') {
    zipRef = await new JSZip().loadAsync(data.arrayBuffer);

    const filesName = Object.keys(zipRef.files);

    // metadata
    for (const { getter, type } of metadataFiles) {
      await processFile(getter(filesName), zipRef, type);
    }

    imagesRef = filterImages(filesName).sort();

    postMessage({
      type: ZipWorkerMessageType.ZipOpen,
      data: { count: imagesRef.length },
    });
  }
});

addEventListener('message', async ({ data }) => {
  if (data.type === 'loadBatch') {
    const { start, count } = data;

    const batch = imagesRef.slice(start, start + count);

    await Promise.all(
      batch.map(async (filename, index) => {
        const file = zipRef.files[filename];
        if (!file) return;

        let blob: Blob;

        if (filename.endsWith('.svg') || filename.endsWith('.svgz')) {
          const text = await file.async('string');
          blob = new Blob([text], { type: 'image/svg+xml' });
        } else {
          blob = await file.async('blob');
        }

        const url = URL.createObjectURL(blob);

        postMessage({
          type: ZipWorkerMessageType.ImageLoad,
          url,
          index: start + index,
        });
      })
    );
  }
});