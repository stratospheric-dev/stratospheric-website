import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";

(async () => {
    let fullImages = await convertFullImages();
    let previewImages = await convertPreviewImages();
    let otherImages = await convertAllOtherImages();
    console.log('Converted ' + (fullImages.length + previewImages.length + otherImages.length) + ' images to WEBP format.');
})();

/**
 * Converts raw input images into full-sized WEBP images.
 */
function convertFullImages(){
    return imagemin(['raw-images/article-thumbnails/*.{jpg,png}'], {
		destination: 'static/images/articles/generated/full',
		plugins: [
			imageminWebp()
		]
    });
}

/**
 * Converts raw input images into preview-sized WEBP images.
 */
function convertPreviewImages(){
    return imagemin(['raw-images/article-thumbnails/*.{jpg,png}'], {
        destination: 'static/images/articles/generated/preview',
        plugins: [
            imageminWebp({
                resize: {
                    width: 510,
                    height: 267
                }
            })
        ]
    });
}

/**
 * Converts all images that are not feature images to optimized WEBP images.
 */
function convertAllOtherImages(){
    return imagemin(['raw-images/*.{jpg,png}'], {
        destination: 'static/images/',
        plugins: [
            imageminWebp()
        ]
    });
}
