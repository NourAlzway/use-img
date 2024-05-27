import { useEffect, useState } from "react";

/**
 * useImg is a custom hook that loads an image and returns its status, the image itself and an error if one occurred.
 * @param src the source of the image to load (URL)
 */

export const useImg = (src: string) => {
  /**
   * the status of the image loading
   * - loading: the image is being loaded
   * - loaded: the image has been loaded but not decoded yet
   * - ready: the image has been loaded and decoded
   * - error: an error occurred while loading the image
   */
  const [status, setStatus] = useState<
    "loading" | "loaded" | "ready" | "error"
  >("loading");

  /**
   * the image that has been loaded, null if the image is still loading, or an error occurred
   */
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const image = new Image();
    image.src = src;

    /**
     * here we set the event listeners for the image, to update the status and the image itself.
     */

    // [onload] is called when the image has been loaded successfully and is ready to be decoded.
    image.onload = () => {
      setStatus("loaded");
      setImage(image);
    };

    // [onerror] is called when an error occurred while loading the image.
    image.onerror = (
      event: Event | string,
      source?: string,
      lineno?: number,
      colno?: number,
      error?: Error
    ) => {
      setStatus("error");
      setError(error || new Error("Image failed to load"));
    };

    // [decode] is called when the image has been decoded and is ready to be displayed on the screen safely.
    /**
     * According to the MDN documentation, [https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/decode] 
     * the [decode] method returns a promise that resolves when the image is decoded and can be rendered on the screen.
     */
    image.decode().then(() => {
      setStatus("ready");
    });

    return () => {
      image.onload = null;
    };
  }, [src]);

  return { status, image, error };
};
