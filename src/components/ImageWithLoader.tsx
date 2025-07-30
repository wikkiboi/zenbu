import { useEffect, useState } from "react";

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
    <>
      {!isLoaded && <ImageSkeleton />}
      <div className="relative w-11/12 max-sm:w-full mx-auto">
        <div className="relative">
          <img
            className={`object-cover aspect-[7/10] mx-auto mb-2 rounded w-full`}
            src={src}
            alt={`Image of ${alt}`}
            onLoad={() => setIsLoaded(true)}
          />
          <div className="absolute inset-0 flex items-end">
            <div className="bg-gradient-to-t from-black/90 md:from-black/100 to-transparent w-full rounded">
              <h2 className="line-clamp-4 p-1.5 text-left text-[9px] sm:text-base md:text-lg lg:text-xl font-bold">
                {alt}
              </h2>
            </div>
          </div>
        </div>
        {showRank && (
          <div
            className={`${
              isLoaded ? "" : "hidden"
            } absolute inset-0 sm:top-2 sm:left-2 top-0.5 left-0.5 bg-opacity-70 bg-black text-white border-transparent btn btn-circle xl:btn-sm btn-xs`}
          >
            <h2 className="text-sm font-bold m-auto">{rank ? rank : "N/A"}</h2>
          </div>
        )}
      </div>
    </>
  );
}
