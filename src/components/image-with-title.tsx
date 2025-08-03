import { useState } from "react";

interface ImageWithTitleProps {
  src: string;
  alt: string;
  showRank: boolean;
  rank?: number;
}

function ImageSkeleton({ isLoaded }: { isLoaded: boolean }) {
  return (
    <div
      className={`skeleton absolute inset-0 w-full aspect-[7/10] rounded ${
        isLoaded && "opacity-0"
      }`}
    ></div>
  );
}

export default function ImageWithTitle({
  src,
  alt,
  showRank,
  rank,
}: ImageWithTitleProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full mx-auto">
      <div className="relative group">
        <div className="relative group-hover:opacity-70 transition-opacity mb-2">
          <ImageSkeleton isLoaded={isLoaded} />
          <img
            className="object-cover aspect-[7/10] mx-auto rounded w-full"
            src={src}
            alt={`Image of ${alt}`}
            onLoad={() => setIsLoaded(true)}
          />
        </div>
        <div
          className={`absolute inset-0 flex items-end ${!isLoaded && "hidden"}`}
        >
          <div className="bg-gradient-to-t from-black/90 md:from-black/100 to-transparent w-full rounded">
            <h2 className="line-clamp-4 p-1 sm:p-1.5 text-left text-[9px] sm:text-base md:text-lg font-bold">
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
  );
}
