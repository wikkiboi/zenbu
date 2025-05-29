import { useEffect, useState } from "react";

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  showRank: boolean;
  rank?: number;
}

function ImageSkeleton() {
  return (
    <div className="skeleton md:w-44 w-28 aspect-[7/10] mx-auto mb-2"></div>
  );
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

  return (
    <>
      {!isLoaded && <ImageSkeleton />}
      <div className="relative md:w-44 w-28 mx-auto">
        <img
          className={`${
            isLoaded ? "block" : "hidden"
          } object-cover aspect-[7/10] mb-2 rounded max-h-[240px]`}
          src={src}
          alt={`Image of ${alt}`}
          onLoad={() => setIsLoaded(true)}
        />
        {showRank && (
          <div className="absolute top-1 left-1 bg-opacity-50 text-white btn btn-circle md:btn-sm btn-xs">
            <h2 className="text-md font-bold m-auto">{rank ? rank : "N/A"}</h2>
          </div>
        )}
      </div>
    </>
  );
}
