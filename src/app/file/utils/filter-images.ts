export function filterImages(fileList: Array<string>) {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.tiff', '.svg', '.svgz'];

    return fileList.filter(file => {
        const extension = file.substring(file.lastIndexOf('.')).toLowerCase();
        return imageExtensions.includes(extension);
    });
}