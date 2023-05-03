import {blurARGB, dilate, invertColors, thresholdFilter} from 'tesseract.js'
function PreprocessImage(canvas) {
    const level = 0.4;
    const radius = 1;
    const ctx = canvas.getContext('2d');
   const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
    blurARGB(image.data, canvas, radius);
    dilate(image.data, canvas);
    invertColors(image.data);
    thresholdFilter(image.data, 0.5);
    return image;
}

export default PreprocessImage
