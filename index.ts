import { useEffect, useState } from "react";

export const useImg = (src: string) => {
  const [status, setStatus] = useState<
    "loading" | "loaded" | "ready" | "error"
  >("loading");

  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const image = new Image();
    image.src = src;

    image.onload = () => {
      setStatus("loaded");
      setImage(image);
    };

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

    image.decode().then(() => {
      setStatus("ready");
    });

    return () => {
      image.onload = null;
    };
  }, [src]);

  return { status, image, error };
};
