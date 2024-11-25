import { Link } from "@tanstack/react-router";
import { AnimeType } from "../api/types";
import { formatType } from "../helper/formatType";

const animeTypes: AnimeType[] = [
  "tv",
  "movie",
  "ova",
  "special",
  "ona",
  "music",
  "cm",
  "pv",
  "tv_special",
];

interface TypeButtonProps {
  type: AnimeType;
}

export default function TypeButtons({ type }: TypeButtonProps) {
  return (
    <div className="dropdown">
      <div tabIndex={0} className="btn btn-sm ">
        {formatType(type)}
      </div>
      <div
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2"
      >
        {animeTypes.map((type) => (
          <Link
            to="."
            key={type}
            className="btn btn-ghost"
            search={{ type, page: 1 }}
          >
            {formatType(type)}
          </Link>
        ))}
      </div>
    </div>
  );
}
