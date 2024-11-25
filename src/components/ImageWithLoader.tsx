import { useEffect, useState } from "react";
import ImageSkeleton from "../skeleton/ImageSkeleton";

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  showRank: boolean;
  rank?: number;
}

export default function ImageWithLoader({
  src,
  alt,
  showRank,
  rank,
}: ImageWithLoaderProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    if (img.complete) {
      setIsLoaded(true);
    }
  }, [src]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <>
      {!isLoaded && <ImageSkeleton />}
      <div className="relative w-44 mx-auto">
        <img
          className={`${
            isLoaded ? "block" : "hidden"
          } object-cover aspect-[7/10] mb-2 rounded`}
          src={src}
          alt={`Image of ${alt}`}
          loading="lazy"
          onLoad={handleImageLoad}
        />
        {showRank && (
          <div className="absolute top-1 left-1 bg-opacity-50 text-white btn btn-circle btn-sm">
            <h2 className="text-md font-bold m-auto">{rank ? rank : "N/A"}</h2>
          </div>
        )}
      </div>
    </>
  );
}
