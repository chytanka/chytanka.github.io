/// <reference lib="webworker" />

import JSZip from 'jszip';

addEventListener('message', ({ data }) => {
  const arrayBuffer = data.arrayBuffer;

  const zip = new JSZip();

  zip.loadAsync(arrayBuffer)
    .then(async zip => {
      const filePromises: any = [];
      const images = filterImages(Object.keys(zip.files)).sort()

      postMessage({ type: 'zipopen', data: {
        count: images.length
      } });

      for (let i = 0; i < images.length; i++) {
        const filename = images[i];

        const filePromise = await zip.files[filename].async('blob').then(blob => {
          const url = URL.createObjectURL(blob);
          postMessage({ type: 'file', url: url, index: i });
          postMessage({ type: 'progress', progress: [i, images.length] });
        });

        filePromises.push(filePromise);
      }

      Promise.all(filePromises).then(() => {
        postMessage({ type: 'complete', progress: [images.length, images.length] });
      });
    });
});

function filterImages(fileList: Array<string>) {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];

  return fileList.filter(file => {
    const extension = file.substring(file.lastIndexOf('.')).toLowerCase();
    return imageExtensions.includes(extension);
  });
}