// Type alias for the callback function to be executed once all images have loaded.
type ImageLoadCallback = () => void;

/**
 * Runs the provided callback function after all images in the list have loaded.
 * @param images - An array of image URLs to load.
 * @param callback - The function to be executed once all images have loaded.
 */
export const runAfterImagesLoaded = (
  images: HTMLImageElement | HTMLImageElement[],
  callback: ImageLoadCallback
): void => {
  // make images an array if it isn't already
  if (!Array.isArray(images)) images = [images];

  //   get the number of images to load
  let loadedImagesCount = 0;
  const totalImagesCount = images.length;

  // If there are no images in the list, execute the callback immediately.
  if (totalImagesCount === 0) {
    callback();
    return;
  }

  /**
   * Increments the loaded images count and checks if all images have loaded.
   * If all images have loaded, executes the callback function.
   */
  function imageLoaded(): void {
    loadedImagesCount += 1;
    if (loadedImagesCount === totalImagesCount) callback();
  }

  // Iterate through the list of image URLs, create Image objects, and set their `onload` and `onerror` event handlers.
  for (const imageUrl of images) {
    const image = new Image();
    image.src = imageUrl;
    image.onload = imageLoaded;
    // In case an image fails to load, still count it as "loaded" to not block the callback.
    image.onerror = imageLoaded;
  }
};
