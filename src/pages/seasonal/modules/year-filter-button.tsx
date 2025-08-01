import { Link, useSearch } from "@tanstack/react-router";
import { getCurrentDate } from "../../../helper";
import { useEffect, useRef, useState } from "react";
import arrowIcon from "../../../svg/dropdown-arrow.svg";

export default function YearFilterButton() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { year: searchYear } = useSearch({ from: "/seasonal" });

  const currentYear = searchYear ?? getCurrentDate().year;

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

  const current = new Date().getFullYear();
  const years = Array.from(
    { length: current - 2009 },
    (_, i) => 2010 + i
  ).reverse();

  return (
    <div ref={dropdownRef} className="relative z-10 md:ml-3 ml-1">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="btn btn-sm gap-0.5 flex max-sm:text-xs"
      >
        {currentYear}
        <img
          src={arrowIcon}
          alt="Arrow Icon"
          className={`w-4 invert ${open && "rotate-180"}`}
        />
      </button>
      {open && (
        <div className="absolute menu bg-base-300 rounded-box z-[1] p-2 mt-1 shadow-md max-h-60 overflow-y-auto">
          {years.map((year) => (
            <Link
              to="."
              key={year}
              className={`btn btn-ghost ${
                currentYear === year
                  ? "bg-secondary text-secondary-content"
                  : ""
              } mb-1`}
              search={{ year, page: 1 }}
              onClick={() => setOpen(false)}
            >
              {year}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
