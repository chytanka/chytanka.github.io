/// <reference lib="webworker" />

// TODO: change to https://github.com/101arrowz/fflate
// because jszip is toooo slow

import JSZip from 'jszip';
import { filterImages, getAcbfFile, getComicInfoFile, processFile, processImagesInBatches } from '../utils';

const metadataFiles = [
  { getter: getComicInfoFile, type: 'comicinfo' },
  { getter: getAcbfFile, type: 'acbf' },
];

addEventListener('message', ({ data }) => {
  const arrayBuffer = data.arrayBuffer;

  const zip = new JSZip();

  zip.loadAsync(arrayBuffer)
    .then(async zip => {
      const filesName: string[] = Object.keys(zip.files);

      console.log(filesName);
      

      // metadata
      for (const { getter, type } of metadataFiles) {
        await processFile(getter(filesName), zip, type);
      }

      // images
      const images = filterImages(filesName).sort();
      postMessage({ type: 'zipopen', data: { count: images.length } });

      await processImagesInBatches(zip, images, 30);

    });
});