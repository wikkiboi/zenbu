import { Suspense, useEffect, useState } from "react";

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  showRank: boolean;
  rank?: number;
}

function ImageSkeleton() {
  return <div className="skeleton inline-block w-11/12 mx-auto mb-2"></div>;
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
    <Suspense fallback={<ImageSkeleton />}>
      {!isLoaded && <ImageSkeleton />}
      <div className="relative inline-block w-11/12 max-sm:w-full mx-auto">
        <img
          className={`${
            isLoaded ? "" : "hidden"
          } object-cover aspect-[7/10] mx-auto mb-2 rounded w-11/12 max-sm:w-full`}
          src={src}
          alt={`Image of ${alt}`}
          onLoad={() => setIsLoaded(true)}
        />
        {showRank && (
          <div
            className={`${
              isLoaded ? "" : "hidden"
            } absolute inset-0 top-1 lg:top-2 left-2 lg:left-3 bg-opacity-70 bg-black text-white border-transparent btn btn-circle md:btn-sm btn-xs`}
          >
            <h2 className="text-sm font-bold m-auto">{rank ? rank : "N/A"}</h2>
          </div>
        )}
      </div>
    </Suspense>
  );
}
