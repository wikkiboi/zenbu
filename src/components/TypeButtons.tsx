import { Link } from "@tanstack/react-router";
import { AnimeType } from "../api/types";
import { formatType } from "../helper/formatType";
import arrowIcon from "../svg/dropdown-arrow.svg";
import filterIcon from "../svg/filter-button.svg";
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
    <div className="dropdown z-10">
      <button
        tabIndex={0}
        role="button"
        className="btn btn-sm gap-1.5 hidden md:flex"
      >
        {formatType(type)}
        <img src={arrowIcon} alt="Arrow Icon" className="w-4 invert" />
      </button>
      <div tabIndex={0} className="btn btn-sm md:hidden p-2">
        <img src={filterIcon} alt="Filter Icon" className="w-4 invert" />
      </div>
      <div
        tabIndex={0}
        className="dropdown-content menu bg-base-300 rounded-box z-[1] p-2"
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
