export function getComicInfoFile(fileList: Array<string>) {
    const resultArray = fileList.filter(f => f.toLowerCase() == 'comicinfo.xml')

    return resultArray.length > 0 ? resultArray[0] : false
}

export function getAcbfFile(fileList: Array<string>) {
    const imageExtensions = ['.acbf'];

    const result = fileList.filter(file => {
        const extension = file.substring(file.lastIndexOf('.')).toLowerCase();
        return imageExtensions.includes(extension);
    })

    return result.length > 0 ? result[0] : null;
}