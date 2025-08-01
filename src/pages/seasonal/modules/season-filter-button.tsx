import { Link, useSearch } from "@tanstack/react-router";
import { getCurrentDate } from "../../../helper";
import { useEffect, useRef, useState } from "react";
import arrowIcon from "../../../svg/dropdown-arrow.svg";

export default function SeasonFilterButton() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { season: searchSeason } = useSearch({ from: "/seasonal" });

  const currentSeason = searchSeason ?? getCurrentDate().season;

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
    <div ref={dropdownRef} className="relative z-10">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="btn btn-sm gap-0.5 flex capitalize max-sm:text-xs"
      >
        {currentSeason}
        <img
          src={arrowIcon}
          alt="Arrow Icon"
          className={`w-4 invert ${open && "rotate-180"}`}
        />
      </button>
      {open && (
        <div className="absolute menu bg-base-300 rounded-box z-[1] p-2 mt-1 shadow-md">
          {["spring", "winter", "summer", "fall"].map((season) => (
            <Link
              to="."
              key={season}
              className={`btn btn-ghost capitalize ${
                currentSeason === season
                  ? "bg-secondary text-secondary-content"
                  : ""
              } mb-1`}
              search={{ season, page: 1 }}
              onClick={() => setOpen(false)} // Close dropdown on click
            >
              {season}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
