import { Link, useSearch } from "@tanstack/react-router";
import { AnimeType } from "../../../types";
import { formatType } from "../../../helper/formatType";
import arrowIcon from "../../../svg/dropdown-arrow.svg";
import { useEffect, useRef, useState } from "react";
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
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { type: currentType = "tv" } = useSearch({ from: "/" });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative z-10 ml-3">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="btn btn-sm gap-1.5 flex"
      >
        {formatType(type)}
        <img
          src={arrowIcon}
          alt="Arrow Icon"
          className={`w-4 invert ${open && "rotate-180"}`}
        />
      </button>
      {open && (
        <div className="absolute menu bg-base-300 rounded-box z-[1] p-2 mt-1 shadow-md -translate-x-3">
          {animeTypes.map((type) => (
            <Link
              to="."
              key={type}
              className={`btn btn-ghost ${
                currentType === type
                  ? "bg-secondary text-secondary-content"
                  : ""
              } mb-1`}
              search={{ type, page: 1 }}
              onClick={() => setOpen(false)} // Close dropdown on click
            >
              {formatType(type)}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
