/// <reference lib="webworker" />

import JSZip from 'jszip';

addEventListener('message', ({ data }) => {
  const arrayBuffer = data.arrayBuffer;

  const zip = new JSZip();

  zip.loadAsync(arrayBuffer)
    .then(async zip => {
      const filesName: string[] = Object.keys(zip.files);

      // console.dir(zip.files)

      const comicInfoFile = getComicInfoFile(filesName)

      if (comicInfoFile) {
        const comicinfo = zip.files[comicInfoFile]
        await comicinfo.async('text').then(text => { postMessage({ type: 'comicinfo', data: text }); })
      }

      const acbf = getAcbfFile(filesName)
      if (acbf) {
        const acbfF = zip.files[acbf]
        await acbfF.async('text').then(text => { postMessage({ type: 'acbf', data: text }); })
      }

      const images = filterImages(filesName).sort()
      postMessage({ type: 'zipopen', data: { count: images.length } });

      for (let i = 0; i < images.length; i++) {
        const filename = images[i];

        await zip.files[filename].async('blob').then(blob => {
          const url = URL.createObjectURL(blob);
          postMessage({ type: 'file', url: url, index: i });
        });
      }


    });
});

function filterImages(fileList: Array<string>) {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];

  return fileList.filter(file => {
    const extension = file.substring(file.lastIndexOf('.')).toLowerCase();
    return imageExtensions.includes(extension);
  });
}

function getComicInfoFile(fileList: Array<string>) {
  const resultArray = fileList.filter(f => f.toLowerCase() == 'comicinfo.xml')

  return resultArray.length > 0 ? resultArray[0] : false
}

function getAcbfFile(fileList: Array<string>) {
  const imageExtensions = ['.acbf'];

  const result = fileList.filter(file => {
    const extension = file.substring(file.lastIndexOf('.')).toLowerCase();
    return imageExtensions.includes(extension);
  })

  return result.length > 0 ? result[0] : null;
}