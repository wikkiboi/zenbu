import { Link } from "@tanstack/react-router";
import { AnimeType } from "../api/types";
import { formatType } from "../helper/formatType";
import arrowIcon from "../../public/svg/dropdown-arrow.svg";
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
      <div tabIndex={0} className="btn btn-sm gap-1.5">
        {formatType(type)}
        <img
          src={arrowIcon}
          alt="Arrow Icon"
          className="w-4 font-bold invert"
        />
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
